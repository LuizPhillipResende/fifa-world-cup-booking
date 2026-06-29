import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { getGameById } from "@/services/gameService";
import MapaAssentosClient from "./MapaAssentosClient";

export default async function MapaAssentosPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const jogoId = resolvedParams?.jogoId;
  
  let gameData = null;
  
  if (jogoId) {
    gameData = await getGameById(jogoId);
  }

  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center min-h-[50vh]">
          <Loader2 className="w-8 h-8 text-brand-primary animate-spin" />
        </div>
      }
    >
      <MapaAssentosClient game={gameData?.game} takenSeats={gameData?.takenSeats || []} />
    </Suspense>
  );
}
