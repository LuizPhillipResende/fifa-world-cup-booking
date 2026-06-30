import { PrismaClient } from "@prisma/client";
import StatCard from "@/components/ui/StatCard";
import SectionTitle from "@/components/ui/SectionTitle";
import { MapPin, CalendarDays, Ticket, Users } from "lucide-react";
import Button from "@/components/ui/Button";
import AdminDashboardTables from "./AdminDashboardTables";

const prisma = new PrismaClient();

export default async function AdminDashboard() {
  // Fetch stats in parallel
  const [
    stadiumsCount,
    gamesCount,
    reservationsCount,
    usersCount,
    recentGames,
    recentReservations,
  ] = await Promise.all([
    prisma.stadium.count(),
    prisma.game.count(),
    prisma.reservation.count(),
    prisma.user.count(),
    prisma.game.findMany({
      take: 5,
      orderBy: { date: "asc" },
      where: { date: { gte: new Date() } },
      include: { homeTeam: true, awayTeam: true, stadium: true },
    }),
    prisma.reservation.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        user: true,
        game: { include: { homeTeam: true, awayTeam: true } },
      },
    }),
  ]);

  return (
    <div className="flex flex-col flex-1 min-h-screen p-6 lg:p-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 pb-6 border-b border-white/10 gap-4">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter text-white uppercase">
            Painel Administrativo
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Copa do Mundo FIFA 2026
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard
          label="Estádios"
          value={stadiumsCount}
          icon={<MapPin className="w-5 h-5 text-cyan-400" />}
          color="cyan"
        />
        <StatCard
          label="Jogos"
          value={gamesCount}
          icon={<CalendarDays className="w-5 h-5 text-[#d6b4e7]" />}
          color="purple"
        />
        <StatCard
          label="Reservas"
          value={reservationsCount}
          icon={<Ticket className="w-5 h-5 text-green-500" />}
          color="green"
        />
        <StatCard
          label="Usuários"
          value={usersCount}
          icon={<Users className="w-5 h-5 text-orange-500" />}
          color="orange"
        />
      </div>

      {/* Tables */}
      <AdminDashboardTables
        recentGames={recentGames}
        recentReservations={recentReservations}
      />
    </div>
  );
}
