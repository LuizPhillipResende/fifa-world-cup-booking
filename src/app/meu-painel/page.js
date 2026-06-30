import { PrismaClient } from "@prisma/client";
import { requireAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Ticket, CheckCircle2, Clock, Receipt, Eye, X } from "lucide-react";
import StatCard from "@/components/ui/StatCard";
import StatusBadge from "@/components/ui/StatusBadge";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { formatCurrency, formatDate, formatTime } from "@/lib/formatters";
import Image from "next/image";
import CancelButton from "./CancelButton";

const prisma = new PrismaClient();

export default async function MeuPainelPage() {
  const { session, errorResponse } = await requireAuth();

  if (errorResponse) {
    redirect("/login");
  }

  const reservations = await prisma.reservation.findMany({
    where: { userId: session.user.id },
    include: {
      game: {
        include: {
          homeTeam: true,
          awayTeam: true,
          stadium: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const totalInvested = reservations
    .filter((r) => r.status !== "CANCELLED")
    .reduce((sum, r) => sum + r.price, 0);

  const confirmedCount = reservations.filter(
    (r) => r.status === "CONFIRMED"
  ).length;
  const pendingCount = reservations.filter(
    (r) => r.status === "PENDING"
  ).length;

  return (
    <div className="flex flex-col flex-1 min-h-screen p-6 lg:p-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 pb-6 border-b border-white/10 gap-4">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter text-white uppercase">
            Meu Painel
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Olá, {session.user.name} — Copa do Mundo 2026
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
        >
          Comprar Ingresso{" "}
          <span className="ml-2 text-lg leading-none">&rsaquo;</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard
          label="Reservas"
          value={reservations.length}
          icon={<Ticket className="w-5 h-5 text-cyan-400" />}
          color="cyan"
        />
        <StatCard
          label="Confirmadas"
          value={confirmedCount}
          icon={<CheckCircle2 className="w-5 h-5 text-green-500" />}
          color="green"
        />
        <StatCard
          label="Pendentes"
          value={pendingCount}
          icon={<Clock className="w-5 h-5 text-orange-500" />}
          color="orange"
        />
        <StatCard
          label="Investido"
          value={formatCurrency(totalInvested)}
          icon={<Receipt className="w-5 h-5 text-[#d6b4e7]" />}
          color="purple"
        />
      </div>

      {/* Reservations List */}
      <div>
        <h2 className="text-xl font-black italic tracking-tighter text-white uppercase mb-6">
          Minhas Reservas
        </h2>

        {reservations.length === 0 ? (
          <div className="text-gray-400">Você ainda não possui reservas.</div>
        ) : (
          <div className="flex flex-col gap-4">
            {reservations.map((res) => (
              <Card
                key={res.id}
                hover
                className="flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                {/* Match Info */}
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    <div className="w-10 h-8 rounded border-2 border-[#151a23] overflow-hidden relative z-10">
                      {res.game.homeTeam?.flag ? (
                        <Image src={res.game.homeTeam.flag} alt={res.game.homeTeam.name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full bg-[#d6b4e7]"></div>
                      )}
                    </div>
                    <div className="w-10 h-8 rounded border-2 border-[#151a23] overflow-hidden relative">
                      {res.game.awayTeam?.flag ? (
                        <Image src={res.game.awayTeam.flag} alt={res.game.awayTeam.name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full bg-cyan-200"></div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1">
                      {res.game.homeTeam?.code || "TBD"} vs{" "}
                      {res.game.awayTeam?.code || "TBD"}
                    </h3>
                    <p className="text-xs text-gray-400">
                      {formatDate(res.game.date)} • {formatTime(res.game.date)} • {res.seatSector} • Assento {res.seatRow}{res.seatNumber}
                    </p>
                  </div>
                </div>

                {/* Right side controls */}
                <div className="flex flex-wrap items-center gap-6">
                  {/* Price & ID */}
                  <div className="text-right">
                    <div className="text-sm font-bold text-green-500">
                      {formatCurrency(res.price)}
                    </div>
                    <div className="text-[10px] text-gray-500 mt-0.5">
                      #{res.id.substring(0, 8)}
                    </div>
                  </div>

                  {/* Status Badge */}
                  <StatusBadge status={res.status} />

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={<Eye className="w-4 h-4" />}
                      className="border border-cyan-400/50 hover:bg-cyan-400/10 text-cyan-400"
                      href={`/mapa-assentos?jogoId=${res.game.id}`}
                    >
                      Ver
                    </Button>
                    <CancelButton reservationId={res.id} status={res.status} />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
