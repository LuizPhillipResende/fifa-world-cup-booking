import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getStadiums(searchTerm = "") {
  const where = searchTerm
    ? {
        OR: [
          { name: { contains: searchTerm } },
          { city: { contains: searchTerm } },
        ],
      }
    : {};

  return prisma.stadium.findMany({
    where,
    include: { _count: { select: { games: true } } },
    orderBy: { name: "asc" },
  });
}

export async function createStadium(data) {
  return prisma.stadium.create({ data });
}

export async function updateStadium(id, data) {
  return prisma.stadium.update({
    where: { id },
    data,
  });
}

export async function deleteStadium(id) {
  const stadium = await prisma.stadium.findUnique({
    where: { id },
    include: { _count: { select: { games: true } } },
  });

  if (!stadium) {
    throw new Error("Estádio não encontrado.");
  }

  if (stadium._count.games > 0) {
    throw new Error("Não é possível excluir estádio com jogos vinculados.");
  }

  return prisma.stadium.delete({
    where: { id },
  });
}
