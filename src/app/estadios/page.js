import { PrismaClient } from "@prisma/client";
import StadiumsClient from "@/components/StadiumsClient";

const prisma = new PrismaClient();

// Revalidação a cada 1 hora para dados públicos que mudam pouco
export const revalidate = 3600;

export default async function EstadiosPage() {
  const stadiums = await prisma.stadium.findMany({
    include: {
      games: {
        include: {
          homeTeam: true,
          awayTeam: true,
        },
        orderBy: { date: "asc" },
      },
    },
    orderBy: { capacity: "desc" },
  });

  return (
    <main className="flex-1 min-h-screen relative">
      {/* Background Decorativo */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand-primary/10 via-brand-primary/5 to-bg-base pointer-events-none z-0"></div>
      
      {/* Container Principal */}
      <div className="relative z-10 pt-10 pb-24">
        <StadiumsClient stadiums={stadiums} />
      </div>
    </main>
  );
}
