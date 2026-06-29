import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getTeams() {
  return prisma.team.findMany({
    orderBy: { name: "asc" },
  });
}
