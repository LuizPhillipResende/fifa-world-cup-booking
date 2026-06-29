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

      <AdminDashboardTables 
        recentGames={recentGames} 
        recentReservations={recentReservations} 
      />
    </div>
  );
}
