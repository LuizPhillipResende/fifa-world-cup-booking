import { PrismaClient } from "@prisma/client";
import HeroSection from "@/components/HeroSection";
import MatchesClient from "@/components/MatchesClient";

const prisma = new PrismaClient();

export const revalidate = 300; // 5 minutes

export default async function Home() {
  const games = await prisma.game.findMany({
    include: {
      homeTeam: { include: { group: true } },
      awayTeam: { include: { group: true } },
      stadium: true,
    },
    orderBy: { date: "asc" },
  });

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      
      {/* Filters & Grid Container via Client Component for interactivity */}
      <div className="flex-1">
        <MatchesClient games={games} />
      </div>
    </div>
  );
}
