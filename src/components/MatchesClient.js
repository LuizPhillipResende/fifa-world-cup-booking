"use client";

import { Calendar, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

const tabs = ["Todos", "Grupo A", "Grupo B", "Grupo C", "Grupo D", "Grupo E", "Grupo F", "Oitavas", "Quartas"];

export default function MatchesClient({ games }) {
  const [activeTab, setActiveTab] = useState("Todos");

  const filteredMatches = activeTab === "Todos" 
    ? games 
    : games.filter(g => g.homeTeam?.group?.name.toLowerCase() === activeTab.toLowerCase() || g.phase.toLowerCase().includes(activeTab.toLowerCase()));

  return (
    <section className="px-6 py-16 lg:px-24">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between mb-8 gap-6">
        <h2 className="text-3xl font-black italic tracking-tighter text-white uppercase">Próximos Jogos</h2>
        
        {/* Tabs */}
        <div className="flex overflow-x-auto pb-2 scrollbar-hide gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-brand-primary/20 text-brand-primary border border-brand-primary/50"
                  : "text-gray-400 hover:text-white border border-transparent"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6 text-sm text-gray-400">
        {filteredMatches.length} jogos encontrados
      </div>

      {/* Matches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {filteredMatches.map((match) => {
          const dateObj = new Date(match.date);
          const dateStr = dateObj.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
          const timeStr = dateObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

          return (
            <div key={match.id} className="bg-card-bg border border-white/5 rounded-2xl p-5 flex flex-col hover:border-white/10 transition-colors">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase bg-[#151a23] px-2 py-1 rounded-md">{match.homeTeam?.group?.name || match.phase}</span>
                <span className="text-[10px] font-bold tracking-widest text-brand-secondary uppercase">{match.phase}</span>
              </div>
              
              {/* Teams */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-10 rounded border border-white/10 overflow-hidden relative">
                    {match.homeTeam?.flag ? (
                      <Image src={match.homeTeam.flag} alt={match.homeTeam.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full bg-[#d6b4e7]"></div>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-white">{match.homeTeam?.code || "TBD"}</span>
                </div>
                <div className="text-xs font-bold text-gray-600 bg-white/5 px-2 py-1 rounded-full">VS</div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-10 rounded border border-white/10 overflow-hidden relative">
                    {match.awayTeam?.flag ? (
                      <Image src={match.awayTeam.flag} alt={match.awayTeam.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full bg-[#d6b4e7]"></div>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-white">{match.awayTeam?.code || "TBD"}</span>
                </div>
              </div>
              
              {/* Info */}
              <div className="flex flex-col gap-3 mb-6">
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-brand-secondary" />
                    <span>{dateStr}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-brand-secondary" />
                    <span>{timeStr}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <MapPin className="w-4 h-4 text-brand-secondary shrink-0" />
                  <span className="truncate">{match.stadium?.name}</span>
                </div>
              </div>
              
              <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-medium text-gray-500 uppercase mb-0.5">A partir de</div>
                  <div className="text-lg font-bold text-brand-secondary">R$ {match.basePrice.toFixed(2)}</div>
                </div>
                <Link 
                  href={`/mapa-assentos?jogoId=${match.id}`} 
                  className="px-4 py-2 bg-brand-primary hover:bg-brand-primary-hover text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Ver Ingressos
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
