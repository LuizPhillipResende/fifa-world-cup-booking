"use client";

import DataTable from "@/components/ui/DataTable";
import StatusBadge from "@/components/ui/StatusBadge";
import Button from "@/components/ui/Button";
import { formatDate, formatTime } from "@/lib/formatters";

export default function AdminDashboardTables({ recentGames, recentReservations }) {
  const recentGamesColumns = [
    {
      key: "match",
      label: "Partida",
      render: (g) => (
        <span className="font-bold text-white">
          {g.homeTeam?.code || "TBD"} vs {g.awayTeam?.code || "TBD"}
        </span>
      ),
    },
    {
      key: "date",
      label: "Data/Hora",
      render: (g) => `${formatDate(g.date)} às ${formatTime(g.date)}`,
    },
    { key: "stadium", label: "Estádio", render: (g) => g.stadium?.name },
  ];

  const recentReservationsColumns = [
    {
      key: "user",
      label: "Usuário",
      render: (r) => (
        <div>
          <div className="font-bold text-white">{r.user?.name}</div>
          <div className="text-xs text-gray-400">{r.user?.email}</div>
        </div>
      ),
    },
    {
      key: "game",
      label: "Partida",
      render: (r) =>
        `${r.game?.homeTeam?.code || "TBD"} vs ${
          r.game?.awayTeam?.code || "TBD"
        }`,
    },
    { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
      {/* Recent Games */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
            Próximos Jogos
          </h3>
          <Button href="/admin/jogos" variant="ghost" size="sm">
            Ver todos
          </Button>
        </div>
        <DataTable
          columns={recentGamesColumns}
          data={recentGames}
          emptyMessage="Nenhum jogo futuro cadastrado."
        />
      </div>

      {/* Recent Reservations */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
            Últimas Reservas
          </h3>
          <Button href="/admin/reservas" variant="ghost" size="sm">
            Ver todas
          </Button>
        </div>
        <DataTable
          columns={recentReservationsColumns}
          data={recentReservations}
          emptyMessage="Nenhuma reserva encontrada."
        />
      </div>
    </div>
  );
}
