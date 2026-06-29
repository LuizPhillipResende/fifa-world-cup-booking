import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const teams = await prisma.team.findMany({
      include: { group: true },
      orderBy: { name: "asc" },
    });
    return NextResponse.json(teams);
  } catch (error) {
    console.error("GET /api/teams error:", error);
    return NextResponse.json(
      { error: "Erro ao buscar times." },
      { status: 500 }
    );
  }
}
