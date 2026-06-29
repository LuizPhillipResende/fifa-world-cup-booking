"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, MapPin, Users, CalendarDays, Calendar } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";
import StatCard from "./ui/StatCard";
import Card from "./ui/Card";
import { formatDate, formatTime, formatCurrency } from "@/lib/formatters";

export default function StadiumsClient({ stadiums }) {
  const [expandedId, setExpandedId] = useState(stadiums[0]?.id || null);

  const toggleAccordion = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const totalCapacity = stadiums.reduce((sum, s) => sum + s.capacity, 0);

  return (
    <div className="container mx-auto px-6 py-10 max-w-6xl">
      {/* Page Header */}
      <SectionTitle
        barColor="primary"
        subtitle={`EUA · Canadá · México — ${stadiums.length} estádios sede`}
      >
        ESTÁDIOS DA COPA 2026
      </SectionTitle>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard
          variant="compact"
          label="Estádios Sede"
          value={stadiums.length}
          color="cyan"
        />
        <StatCard
          variant="compact"
          label="Capacidade Total"
          value={
            totalCapacity >= 1000000
              ? (totalCapacity / 1000000).toFixed(1) + "M+"
              : totalCapacity.toLocaleString("pt-BR")
          }
          color="secondary"
        />
        <StatCard
          variant="compact"
          label="Países Sede"
          value="3"
          color="primary"
        />
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
                        {stadium.capacity.toLocaleString("pt-BR")} lugares
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CalendarDays className="w-4 h-4 text-brand-primary" />
                        {stadium.games?.length || 0}{" "}
                        {(stadium.games?.length || 0) === 1 ? "jogo" : "jogos"}
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
                      <Card className="flex flex-col justify-center" padding="sm">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                          Capacidade
                        </span>
                        <span className="text-lg font-bold text-cyan-400">
                          {stadium.capacity.toLocaleString("pt-BR")}
                        </span>
                      </Card>
                      <Card className="flex flex-col justify-center" padding="sm">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                          País Sede
                        </span>
                        <span className="text-lg font-bold text-yellow-500">
                          {stadium.country}
                        </span>
                      </Card>
                      <Card className="flex flex-col justify-center" padding="sm">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                          Cidade
                        </span>
                        <span className="text-lg font-bold text-cyan-400">
                          {stadium.city}
                        </span>
                      </Card>
                      <Card className="flex flex-col justify-center" padding="sm">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                          Jogos Recebidos
                        </span>
                        <span className="text-lg font-bold text-brand-secondary">
                          {stadium.games?.length || 0}
                        </span>
                      </Card>
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
                          return (
                            <Card
                              key={game.id}
                              hover
                              padding="sm"
                              className="flex flex-col md:flex-row md:items-center justify-between gap-4"
                            >
                              <div className="flex items-center gap-4 md:gap-6">
                                <span className="px-2 py-1 rounded text-[10px] font-bold bg-white/5 text-gray-400 uppercase border border-white/5">
                                  {game.phase}
                                </span>

                                <div className="flex items-center gap-2 md:gap-4 text-sm md:text-base font-bold text-white">
                                  <div className="flex items-center gap-2">
                                    <span className="text-gray-400 uppercase">
                                      {game.homeTeam?.code || "TBD"}
                                    </span>
                                  </div>
                                  <span className="text-gray-600 text-xs">VS</span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-gray-400 uppercase">
                                      {game.awayTeam?.code || "TBD"}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center justify-between md:justify-end gap-4 md:gap-8 ml-4 md:ml-0">
                                <div className="flex items-center gap-2 text-xs md:text-sm text-gray-400">
                                  <Calendar className="w-4 h-4" />
                                  {formatDate(game.date)} · {formatTime(game.date)}
                                </div>
                                <div className="text-sm font-bold text-brand-secondary hidden sm:block">
                                  {formatCurrency(game.basePrice)}
                                </div>
                              </div>
                            </Card>
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
