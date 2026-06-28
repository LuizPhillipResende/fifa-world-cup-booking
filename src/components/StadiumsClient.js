"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, MapPin, Users, CalendarDays, Calendar } from "lucide-react";

export default function StadiumsClient({ stadiums }) {
  const [expandedId, setExpandedId] = useState(stadiums[0]?.id || null);

  const toggleAccordion = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const totalCapacity = stadiums.reduce((sum, s) => sum + s.capacity, 0);

  return (
    <div className="container mx-auto px-6 py-10 max-w-6xl">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-black italic tracking-tight text-white flex items-center gap-3">
          <span className="w-1.5 h-8 bg-brand-primary block rounded-sm"></span>
          ESTÁDIOS DA COPA 2026
        </h1>
        <p className="text-gray-400 mt-2 ml-4">
          EUA · Canadá · México — {stadiums.length} estádios sede
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-[#11141c] border border-white/5 rounded-xl p-6 flex flex-col items-center justify-center">
          <span className="text-3xl font-black text-cyan-400 mb-1">{stadiums.length}</span>
          <span className="text-xs text-gray-500 font-bold tracking-wider uppercase">Estádios Sede</span>
        </div>
        <div className="bg-[#11141c] border border-white/5 rounded-xl p-6 flex flex-col items-center justify-center">
          <span className="text-3xl font-black text-brand-secondary mb-1">
            {totalCapacity >= 1000000 ? (totalCapacity / 1000000).toFixed(1) + "M+" : totalCapacity.toLocaleString("pt-BR")}
          </span>
          <span className="text-xs text-gray-500 font-bold tracking-wider uppercase">Capacidade Total</span>
        </div>
        <div className="bg-[#11141c] border border-white/5 rounded-xl p-6 flex flex-col items-center justify-center">
          <span className="text-3xl font-black text-brand-primary mb-1">3</span>
          <span className="text-xs text-gray-500 font-bold tracking-wider uppercase">Países Sede</span>
        </div>
      </div>

      {/* Stadiums List */}
      <div className="space-y-4">
        {stadiums.map((stadium) => {
          const isExpanded = expandedId === stadium.id;
          return (
            <div 
              key={stadium.id} 
              className={`bg-[#11141c] border transition-colors rounded-xl overflow-hidden ${
                isExpanded ? "border-brand-primary/50" : "border-white/5"
              }`}
            >
              {/* Accordion Header */}
              <div 
                className="flex items-center justify-between p-6 cursor-pointer hover:bg-white/5 transition-colors"
                onClick={() => toggleAccordion(stadium.id)}
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-12 rounded-lg bg-gray-800 overflow-hidden relative border border-white/10">
                    {stadium.image ? (
                      <Image 
                        src={stadium.image} 
                        alt={stadium.name}
                        fill
                        className="object-cover opacity-70"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#151a23]"></div>
                    )}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-lg font-bold text-white">{stadium.name}</h2>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-gray-400 uppercase border border-white/5">
                        {stadium.country}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-brand-secondary" />
                        {stadium.city}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-cyan-400" />
                        {stadium.capacity.toLocaleString('pt-BR')} lugares
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CalendarDays className="w-4 h-4 text-brand-primary" />
                        {stadium.games?.length || 0} {(stadium.games?.length || 0) === 1 ? 'jogo' : 'jogos'}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-gray-500">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>

              {/* Accordion Body */}
              {isExpanded && (
                <div className="border-t border-brand-primary/20 bg-[#0b0e14]/50 p-6">
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Big Image */}
                    <div className="lg:col-span-1 rounded-xl overflow-hidden relative h-64 border border-white/10 bg-[#151a23]">
                      {stadium.image && (
                        <Image 
                          src={stadium.image} 
                          alt={stadium.name}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    
                    {/* Info Grid */}
                    <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="bg-[#151a23] p-4 rounded-xl border border-white/5 flex flex-col justify-center">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Capacidade</span>
                        <span className="text-lg font-bold text-cyan-400">{stadium.capacity.toLocaleString('pt-BR')}</span>
                      </div>
                      <div className="bg-[#151a23] p-4 rounded-xl border border-white/5 flex flex-col justify-center">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">País Sede</span>
                        <span className="text-lg font-bold text-yellow-500">{stadium.country}</span>
                      </div>
                      <div className="bg-[#151a23] p-4 rounded-xl border border-white/5 flex flex-col justify-center">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Cidade</span>
                        <span className="text-lg font-bold text-cyan-400">{stadium.city}</span>
                      </div>
                      <div className="bg-[#151a23] p-4 rounded-xl border border-white/5 flex flex-col justify-center">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Jogos Recebidos</span>
                        <span className="text-lg font-bold text-brand-secondary">{stadium.games?.length || 0}</span>
                      </div>
                    </div>
                  </div>

                  {/* Games in Stadium */}
                  {stadium.games && stadium.games.length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                        Jogos neste estádio
                      </h3>
                      <div className="space-y-3">
                        {stadium.games.map((game) => {
                          const dateObj = new Date(game.date);
                          const dateStr = dateObj.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
                          const timeStr = dateObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                          
                          return (
                            <div key={game.id} className="flex flex-col md:flex-row md:items-center justify-between bg-[#151a23] p-4 rounded-xl border border-white/5 hover:border-brand-primary/30 transition-colors gap-4">
                              <div className="flex items-center gap-4 md:gap-6">
                                <span className="px-2 py-1 rounded text-[10px] font-bold bg-white/5 text-gray-400 uppercase border border-white/5">
                                  {game.phase}
                                </span>
                                
                                <div className="flex items-center gap-2 md:gap-4 text-sm md:text-base font-bold text-white">
                                  <div className="flex items-center gap-2">
                                    <span className="text-gray-400 uppercase">{game.homeTeam?.code || 'TBD'}</span>
                                  </div>
                                  <span className="text-gray-600 text-xs">VS</span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-gray-400 uppercase">{game.awayTeam?.code || 'TBD'}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between md:justify-end gap-4 md:gap-8 ml-4 md:ml-0">
                                <div className="flex items-center gap-2 text-xs md:text-sm text-gray-400">
                                  <Calendar className="w-4 h-4" />
                                  {dateStr} · {timeStr}
                                </div>
                                <div className="text-sm font-bold text-brand-secondary hidden sm:block">
                                  R$ {game.basePrice.toFixed(2)}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
