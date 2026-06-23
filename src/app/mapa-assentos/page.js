"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Calendar, MapPin } from "lucide-react";

// Helper to define seat status based on prototype visual
const seatStatusMap = {
  D: ["available", "reserved", "available", "sold", "available", "reserved", "available", "available", "available", "sold", "sold", "reserved"],
  E: ["available", "available", "available", "sold", "available", "sold", "available", "available", "available", "sold", "reserved", "reserved"],
  F: ["reserved", "sold", "reserved", "reserved", "sold", "available", "available", "sold", "sold", "sold", "available", "sold"],
  G: ["available", "available", "available", "available", "available", "available", "available", "sold", "available", "available", "reserved", "available"]
};

const rows = ["D", "E", "F", "G"];
const cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function MapaAssentosPage() {
  const [selectedSeat, setSelectedSeat] = useState(null);

  const handleSeatClick = (row, col, status) => {
    if (status === "available") {
      setSelectedSeat(selectedSeat?.row === row && selectedSeat?.col === col ? null : { row, col });
    }
  };

  const getSeatColor = (row, col, status) => {
    if (selectedSeat?.row === row && selectedSeat?.col === col) {
      return "bg-[#8b5cf6] text-white"; // Selecionado (Purple)
    }
    switch (status) {
      case "available":
        return "bg-[#3fe971] text-black hover:scale-110 transition-transform cursor-pointer";
      case "reserved":
        return "bg-[#f59e0b] text-black cursor-not-allowed";
      case "sold":
        return "bg-[#991b1b] text-white/50 cursor-not-allowed";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-screen pb-20">
      {/* Header Info */}
      <div className="px-6 lg:px-20 py-8 border-b border-white/5 flex flex-col md:flex-row md:items-center gap-8">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
            Escolha o jogo e selecione seu assento
          </span>
          <div className="flex flex-wrap items-center gap-6">
            <button className="flex items-center gap-3 px-4 py-2 bg-[#151a23] border border-white/10 rounded-xl hover:bg-[#1a212d] transition-colors">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-brand-secondary border border-[#151a23]"></div>
                <div className="w-6 h-6 rounded-full bg-cyan-400 border border-[#151a23]"></div>
              </div>
              <span className="text-sm font-bold text-white">Brasil <span className="text-gray-500 font-normal mx-1">vs</span> Argentina</span>
              <span className="text-[10px] font-bold bg-[#0b0e14] px-2 py-1 rounded text-gray-400 ml-2">Grupo A</span>
              <ChevronDown className="w-4 h-4 text-gray-500 ml-2" />
            </button>

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>15 Jun 2026 • 18:00</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <MapPin className="w-4 h-4 text-brand-secondary" />
              <span>MetLife Stadium, Nova York</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col xl:flex-row px-6 lg:px-20 pt-8 gap-12 xl:gap-24 items-start">
        
        {/* Left Area - Seat Map */}
        <div className="flex-1 w-full max-w-4xl mx-auto flex flex-col items-center">
          
          <div className="w-full flex justify-start mb-12">
            <div className="bg-[#8b5cf6] text-white px-6 py-3 rounded-xl font-bold">
              Setor B — Premium <span className="text-xs ml-1 opacity-80">R$ 1.105</span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-12">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#3fe971]"></div>
              <span className="text-sm text-gray-400">Disponível</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#f59e0b]"></div>
              <span className="text-sm text-gray-400">Reservado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#991b1b]"></div>
              <span className="text-sm text-gray-400">Vendido</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#8b5cf6]"></div>
              <span className="text-sm text-gray-400">Selecionado</span>
            </div>
          </div>

          <div className="px-12 py-2 border border-white/10 rounded-full mb-12 text-sm font-bold text-cyan-400 flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-2 border-cyan-400 border-dashed flex items-center justify-center"><div className="w-1 h-1 bg-cyan-400 rounded-full"></div></div>
            CAMPO
          </div>

          {/* Grid */}
          <div className="flex flex-col gap-4">
            {rows.map((row, rowIndex) => (
              <div key={row} className="flex items-center gap-4">
                <span className="text-gray-500 font-bold w-4 text-center">{row}</span>
                <div className="flex items-center gap-2 md:gap-3">
                  {cols.map((col, colIndex) => {
                    const status = seatStatusMap[row][colIndex];
                    return (
                      <button
                        key={`${row}${col}`}
                        onClick={() => handleSeatClick(row, col, status)}
                        className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center font-bold text-xs md:text-sm ${getSeatColor(row, col, status)}`}
                      >
                        {col}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right Area - Resumo */}
        <div className="w-full xl:w-[400px] flex flex-col mt-12 xl:mt-0">
          <h2 className="text-xl font-black italic tracking-tighter text-white uppercase mb-6">
            Resumo
          </h2>

          <div className="bg-[#151a23] border border-white/5 rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-6 rounded bg-brand-secondary border-2 border-[#151a23] relative z-10"></div>
                <div className="w-8 h-6 rounded bg-cyan-400 border-2 border-[#151a23]"></div>
              </div>
              <h3 className="text-base font-bold text-white">
                Brasil <span className="text-gray-500 font-normal mx-1">vs</span> Argentina
              </h3>
            </div>
            <p className="text-xs text-gray-400 mb-1">15 Jun 2026 • 18:00</p>
            <p className="text-xs text-gray-400">MetLife Stadium</p>

            {selectedSeat && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <h4 className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-4">Assento</h4>
                <div className="flex flex-col gap-3 text-sm">
                  <div className="flex justify-between text-gray-400">
                    <span>Setor</span>
                    <span className="text-white font-bold">Premium</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Fileira</span>
                    <span className="text-white font-bold">{selectedSeat.row}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Nº</span>
                    <span className="text-white font-bold">{selectedSeat.col}</span>
                  </div>
                  <div className="flex justify-between text-gray-400 mt-2">
                    <span>Preço</span>
                    <span className="text-[#3fe971] font-bold">R$ 1.105</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {selectedSeat ? (
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center px-2">
                <span className="font-bold text-white">Total</span>
                <span className="text-xl font-bold text-[#3fe971]">R$ 1.105</span>
              </div>
              <Link 
                href="/meu-painel"
                className="w-full py-4 bg-[#3fe971] hover:bg-[#34d399] text-black font-bold rounded-xl text-center transition-colors"
              >
                Confirmar Reserva
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
               <div className="bg-[#1a212d] border border-white/5 rounded-xl py-4 text-center text-sm text-gray-400">
                  Clique em um assento verde para selecioná-lo
               </div>
               <button disabled className="w-full py-4 bg-[#1a212d] text-gray-500 font-bold rounded-xl text-center cursor-not-allowed">
                  Confirmar Reserva
               </button>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link href="/" className="text-sm font-bold text-gray-400 hover:text-white transition-colors">
              Ver todos os jogos
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
