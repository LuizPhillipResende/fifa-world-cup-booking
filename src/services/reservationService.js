import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getReservations(status = null) {
  const where = status ? { status } : {};

  return prisma.reservation.findMany({
    where,
    include: {
      user: true,
      game: {
        include: {
          homeTeam: true,
          awayTeam: true,
          stadium: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getReservationById(id) {
  return prisma.reservation.findUnique({
    where: { id },
    include: { game: true },
  });
}

export async function createReservation({ userId, gameId, seatSector, seatRow, seatNumber, price }) {
  if (!gameId || !seatSector || !seatRow || !seatNumber || !price) {
    throw new Error("Campos obrigatórios ausentes.");
  }

  // Verifica se assento já está reservado
  const existing = await prisma.reservation.findFirst({
    where: {
      gameId,
      seatSector,
      seatRow,
      seatNumber,
      status: { not: "CANCELLED" },
    },
  });

  if (existing) {
    throw new Error("Assento já está reservado ou vendido.");
  }

  return prisma.reservation.create({
    data: {
      userId,
      gameId,
      seatSector,
      seatRow,
      seatNumber,
      price: Number(price),
      status: "CONFIRMED", // Por padrão assumimos que foi confirmada (simulando pagamento)
    },
  });
}

export async function updateReservationStatus(id, status) {
  return prisma.reservation.update({
    where: { id },
    data: { status },
    include: { user: true, game: true },
  });
}

export async function deleteReservation(id) {
  return prisma.reservation.delete({
    where: { id },
  });
}
