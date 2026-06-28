import prisma from "@/lib/prisma";
import StadiumsClient from "@/components/StadiumsClient";

export const dynamic = 'force-dynamic';

export default async function EstadiosPage() {
  const stadiums = await prisma.stadium.findMany({
    include: {
      games: {
        include: {
          homeTeam: true,
          awayTeam: true,
        },
        orderBy: { date: "asc" }
      }
    },
    orderBy: { capacity: "desc" }
  });

  return <StadiumsClient stadiums={stadiums} />;
}
