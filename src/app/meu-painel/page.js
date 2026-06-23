"use client";

import Link from "next/link";
import { Ticket, CheckCircle2, Clock, Receipt, Eye, X } from "lucide-react";

const reservations = [
  {
    id: "WCB-4421",
    team1: "Brasil",
    team2: "Argentina",
    team1Flag: "BR",
    team2Flag: "AR",
    date: "15 Jun 2026",
    time: "18:00",
    category: "Premium",
    seat: "A7",
    price: "1.800",
    status: "confirmado",
  },
  {
    id: "WCB-3897",
    team1: "França",
    team2: "Alemanha",
    team1Flag: "FR",
    team2Flag: "DE",
    date: "16 Jun 2026",
    time: "15:00",
    category: "Premium",
    seat: "J11",
    price: "650",
    status: "pendente",
  },
  {
    id: "WCB-3102",
    team1: "Portugal",
    team2: "Espanha",
    team1Flag: "PT",
    team2Flag: "ES",
    date: "17 Jun 2026",
    time: "21:00",
    category: "Premium",
    seat: "E4",
    price: "1.200",
    status: "cancelado",
  },
  {
    id: "WCB-2841",
    team1: "Inglaterra",
    team2: "Itália",
    team1Flag: "EN",
    team2Flag: "IT",
    date: "18 Jun 2026",
    time: "18:00",
    category: "Premium",
    seat: "F9",
    price: "1.200",
    status: "confirmado",
  },
];

export default function MeuPainelPage() {
  return (
    <div className="flex flex-col flex-1 min-h-screen p-6 lg:p-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 pb-6 border-b border-white/10 gap-4">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter text-white uppercase">
            Meu Painel
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Olá, João Silva — Copa do Mundo 2026
          </p>
        </div>
        <Link 
          href="/" 
          className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
        >
          Comprar Ingresso <span className="ml-2 text-lg leading-none">&rsaquo;</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-[#151a23] border border-white/5 rounded-2xl p-6 flex flex-col hover:border-white/10 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">Reservas</span>
            <Ticket className="w-5 h-5 text-cyan-400" />
          </div>
          <span className="text-4xl font-black italic tracking-tighter text-cyan-400">4</span>
        </div>

        <div className="bg-[#151a23] border border-white/5 rounded-2xl p-6 flex flex-col hover:border-white/10 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">Confirmadas</span>
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          </div>
          <span className="text-4xl font-black italic tracking-tighter text-green-500">2</span>
        </div>

        <div className="bg-[#151a23] border border-white/5 rounded-2xl p-6 flex flex-col hover:border-white/10 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">Pendentes</span>
            <Clock className="w-5 h-5 text-orange-500" />
          </div>
          <span className="text-4xl font-black italic tracking-tighter text-orange-500">1</span>
        </div>

        <div className="bg-[#151a23] border border-white/5 rounded-2xl p-6 flex flex-col hover:border-white/10 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">Investido</span>
            <Receipt className="w-5 h-5 text-[#d6b4e7]" />
          </div>
          <span className="text-4xl font-black italic tracking-tighter text-[#d6b4e7]">R$ 3.650</span>
        </div>
      </div>

      {/* Reservations List */}
      <div>
        <h2 className="text-xl font-black italic tracking-tighter text-white uppercase mb-6">
          Minhas Reservas
        </h2>

        <div className="flex flex-col gap-4">
          {reservations.map((res) => {
            
            let statusConfig = {
              color: "text-green-500",
              border: "border-green-500/30",
              bg: "bg-green-500/10",
              icon: <CheckCircle2 className="w-4 h-4" />,
              label: "Confirmado"
            };

            if (res.status === "pendente") {
              statusConfig = {
                color: "text-orange-500",
                border: "border-orange-500/30",
                bg: "bg-orange-500/10",
                icon: <Clock className="w-4 h-4" />,
                label: "Pendente"
              };
            } else if (res.status === "cancelado") {
              statusConfig = {
                color: "text-red-500",
                border: "border-red-500/30",
                bg: "bg-red-500/10",
                icon: <X className="w-4 h-4" />,
                label: "Cancelado"
              };
            }

            return (
              <div key={res.id} className="bg-[#151a23] border border-white/5 rounded-2xl p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:border-white/10 transition-colors">
                
                {/* Match Info */}
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    <div className="w-10 h-8 rounded bg-[#d6b4e7] border-2 border-[#151a23] relative z-10"></div>
                    <div className="w-10 h-8 rounded bg-cyan-200 border-2 border-[#151a23]"></div>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1">
                      {res.team1} vs {res.team2}
                    </h3>
                    <p className="text-xs text-gray-400">
                      {res.date} • {res.time} • {res.category} • Assento {res.seat}
                    </p>
                  </div>
                </div>

                {/* Right side controls */}
                <div className="flex flex-wrap items-center gap-6">
                  {/* Price & ID */}
                  <div className="text-right">
                    <div className="text-sm font-bold text-green-500">R$ {res.price}</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">#{res.id}</div>
                  </div>

                  {/* Status Badge */}
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${statusConfig.border} ${statusConfig.bg} ${statusConfig.color} text-xs font-semibold`}>
                    {statusConfig.icon}
                    <span>{statusConfig.label}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 border border-cyan-400/50 hover:bg-cyan-400/10 text-cyan-400 text-sm font-medium rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                      Ver
                    </button>
                    {res.status !== "cancelado" && (
                      <button className="flex items-center gap-2 px-4 py-2 border border-red-500/50 hover:bg-red-500/10 text-red-500 text-sm font-medium rounded-lg transition-colors">
                        <X className="w-4 h-4" />
                        Cancelar
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
