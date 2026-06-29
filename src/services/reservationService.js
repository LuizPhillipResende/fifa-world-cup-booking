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

export async function createReservation({ userId, gameId, seatSector, totalPrice }) {
  if (!gameId || !seatSector || !totalPrice) {
    throw new Error("Campos obrigatórios ausentes.");
  }

  // Verifica se assento já está reservado
  const existing = await prisma.reservation.findFirst({
    where: {
      gameId,
      seatSector,
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
      totalPrice: Number(totalPrice),
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
