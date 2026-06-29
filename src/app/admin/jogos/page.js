import { getGames } from "@/services/gameService";
import { getStadiums } from "@/services/stadiumService";
import { getTeams } from "@/services/teamService";
import JogosClient from "./JogosClient";

export default async function AdminJogosPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const search = resolvedParams?.search || "";
  
  const [games, stadiums, teams] = await Promise.all([
    getGames(search),
    getStadiums(),
    getTeams(),
  ]);

  return (
    <JogosClient initialGames={games} stadiums={stadiums} teams={teams} />
  );
}
