"use client";

import { Calendar, Clock, MapPin } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { formatDate, formatTime, formatCurrency } from "@/lib/formatters";

const phases = ["Todos", "Fase de Grupos", "Oitavas", "Quartas", "Semifinal", "Final"];
const groupLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

export default function MatchesClient({ games }) {
  const [activePhase, setActivePhase] = useState("Todos");
  const [activeGroup, setActiveGroup] = useState(null);

  const filteredMatches = games.filter((g) => {
    if (activePhase === "Todos") return true;
    if (activePhase === "Fase de Grupos") {
      if (activeGroup) {
        return g.homeTeam?.group?.name === `Grupo ${activeGroup}`;
      }
      return g.phase === "Fase de Grupos";
    }
    return g.phase.toLowerCase().includes(activePhase.toLowerCase());
  });

  const handlePhaseClick = (phase) => {
    setActivePhase(phase);
    if (phase !== "Fase de Grupos") {
      setActiveGroup(null);
    }
  };

  return (
    <section className="px-6 py-16 lg:px-24">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          <h2 className="text-3xl font-black italic tracking-tighter text-white uppercase">
            Próximos Jogos
          </h2>

          {/* Phase Filter */}
          <div className="flex overflow-x-auto pb-2 scrollbar-hide gap-2">
            {phases.map((phase) => (
              <button
                key={phase}
                onClick={() => handlePhaseClick(phase)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activePhase === phase
                    ? "bg-brand-primary/20 text-brand-primary border border-brand-primary/50"
                    : "text-gray-400 hover:text-white border border-transparent"
                }`}
              >
                {phase}
              </button>
            ))}
          </div>
        </div>

        {/* Group Sub-filter — only shown when "Fase de Grupos" is active */}
        {activePhase === "Fase de Grupos" && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold tracking-wider text-gray-500 uppercase mr-2">
              Filtrar por grupo:
            </span>
            <button
              onClick={() => setActiveGroup(null)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeGroup === null
                  ? "bg-gradient-to-r from-cyan-500/20 to-cyan-400/10 text-cyan-400 border border-cyan-400/40 shadow-md shadow-cyan-400/10"
                  : "bg-white/5 text-gray-400 hover:text-white border border-white/10 hover:border-white/25 hover:bg-white/10"
              }`}
            >
              Todos
            </button>
            {groupLetters.map((letter) => (
              <button
                key={letter}
                onClick={() => setActiveGroup(letter)}
                className={`w-11 h-11 rounded-xl text-sm font-bold transition-all ${
                  activeGroup === letter
                    ? "bg-gradient-to-r from-cyan-500/20 to-cyan-400/10 text-cyan-400 border border-cyan-400/40 shadow-md shadow-cyan-400/10 scale-110"
                    : "bg-white/5 text-gray-400 hover:text-white border border-white/10 hover:border-white/25 hover:bg-white/10"
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mb-6 text-sm text-gray-400">
        {filteredMatches.length} jogos encontrados
      </div>

      {/* Matches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {filteredMatches.map((match) => {
          return (
            <div
              key={match.id}
              className="bg-card-bg border border-white/5 rounded-2xl p-5 flex flex-col hover:border-white/10 transition-colors"
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase bg-[#151a23] px-2 py-1 rounded-md">
                  {match.homeTeam?.group?.name || match.phase}
                </span>
                <span className="text-[10px] font-bold tracking-widest text-brand-secondary uppercase">
                  {match.phase}
                </span>
              </div>

              {/* Teams */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-10 rounded border border-white/10 overflow-hidden relative">
                    {match.homeTeam?.flag ? (
                      <Image
                        src={match.homeTeam.flag}
                        alt={match.homeTeam.name || "TBD"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#d6b4e7]"></div>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-white">
                    {match.homeTeam?.code || "TBD"}
                  </span>
                </div>
                <div className="text-xs font-bold text-gray-600 bg-white/5 px-2 py-1 rounded-full">
                  VS
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-10 rounded border border-white/10 overflow-hidden relative">
                    {match.awayTeam?.flag ? (
                      <Image
                        src={match.awayTeam.flag}
                        alt={match.awayTeam.name || "TBD"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#d6b4e7]"></div>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-white">
                    {match.awayTeam?.code || "TBD"}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="flex flex-col gap-3 mb-6">
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-brand-secondary" />
                    <span>{formatDate(match.date)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-brand-secondary" />
                    <span>{formatTime(match.date)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <MapPin className="w-4 h-4 text-brand-secondary shrink-0" />
                  <span className="truncate">{match.stadium?.name}</span>
                </div>
              </div>

              <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-medium text-gray-500 uppercase mb-0.5">
                    A partir de
                  </div>
                  <div className="text-lg font-bold text-brand-secondary">
                    {formatCurrency(match.basePrice)}
                  </div>
                </div>
                <Button
                  href={`/mapa-assentos?jogoId=${match.id}`}
                  variant="primary"
                  size="sm"
                >
                  Ver Ingressos
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
