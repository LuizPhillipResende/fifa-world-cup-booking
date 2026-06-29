import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getGames(searchTerm = "") {
  const where = searchTerm
    ? {
        OR: [
          { homeTeam: { name: { contains: searchTerm } } },
          { awayTeam: { name: { contains: searchTerm } } },
          { stadium: { name: { contains: searchTerm } } },
        ],
      }
    : {};

  return prisma.game.findMany({
    where,
    include: {
      homeTeam: true,
      awayTeam: true,
      stadium: true,
      _count: {
        select: {
          reservations: {
            where: { status: { in: ["CONFIRMED", "PENDING"] } },
          },
        },
      },
    },
    orderBy: { date: "asc" },
  });
}

export async function getGameById(id) {
  const game = await prisma.game.findUnique({
    where: { id },
    include: {
      homeTeam: true,
      awayTeam: true,
      stadium: true,
      reservations: {
        where: { status: { not: "CANCELLED" } },
        select: { seatSector: true },
      },
    },
  });

  if (!game) return null;

  const takenSeats = game.reservations.map((r) => r.seatSector);

  // Removendo reservations do retorno principal
  const { reservations, ...gameData } = game;

  return { game: gameData, takenSeats };
}

export async function createGame(data) {
  return prisma.game.create({
    data,
    include: {
      homeTeam: true,
      awayTeam: true,
      stadium: true,
    },
  });
}

export async function updateGame(id, data) {
  const game = await prisma.game.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          reservations: {
            where: { status: "CONFIRMED" },
          },
        },
      },
    },
  });

  if (!game) {
    throw new Error("Jogo não encontrado.");
  }

  if (game._count.reservations > 0) {
    throw new Error("Não é possível alterar jogo com reservas confirmadas.");
  }

  return prisma.game.update({
    where: { id },
    data,
    include: {
      homeTeam: true,
      awayTeam: true,
      stadium: true,
    },
  });
}

export async function deleteGame(id) {
  const game = await prisma.game.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          reservations: {
            where: { status: "CONFIRMED" },
          },
        },
      },
    },
  });

  if (!game) {
    throw new Error("Jogo não encontrado.");
  }

  if (game._count.reservations > 0) {
    throw new Error("Não é possível excluir jogo com reservas confirmadas.");
  }

  return prisma.game.delete({
    where: { id },
  });
}
