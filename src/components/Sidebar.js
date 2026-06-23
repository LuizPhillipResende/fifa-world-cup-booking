"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  X, Trophy, Home, CalendarDays, MapPin, 
  Info, LogIn, Armchair, Ticket, Circle 
} from "lucide-react";

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();

  const mainLinks = [
    { href: "/", label: "Início", icon: Home },
    { href: "/jogos", label: "Jogos", icon: CalendarDays },
    { href: "/estadios", label: "Estádios", icon: MapPin },
    { href: "/sobre", label: "Sobre", icon: Info },
  ];

  const fanLinks = [
    { href: "/login", label: "Login / Conta", icon: LogIn },
    { href: "/mapa-assentos", label: "Mapa Assentos", icon: Armchair },
    { href: "/meu-painel", label: "Meu Painel", icon: Ticket },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-50 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 bottom-0 w-[280px] bg-[#0b0e14] border-r border-white/5 z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6">
          <Link href="/" className="flex items-center gap-2" onClick={onClose}>
            <Trophy className="w-5 h-5 text-brand-primary" />
            <span className="text-lg font-black italic tracking-tighter text-white">
              FIFA WC <span className="text-cyan-400">BOOKING</span>
            </span>
          </Link>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-8">
          {/* PRINCIPAL */}
          <div>
            <h3 className="text-[10px] font-bold text-gray-500 tracking-wider mb-4 px-2 uppercase">
              Principal
            </h3>
            <div className="space-y-1">
              {mainLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive 
                        ? "bg-brand-primary/10 text-white border border-brand-primary/20" 
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* TORCEDOR */}
          <div>
            <h3 className="text-[10px] font-bold text-gray-500 tracking-wider mb-4 px-2 uppercase">
              Torcedor
            </h3>
            <div className="space-y-1">
              {fanLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive 
                        ? "bg-brand-primary/10 text-white border border-brand-primary/20" 
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* BOTTOM CARD */}
        <div className="p-4">
          <div className="bg-[#151a23] border border-white/5 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Circle className="w-2 h-2 fill-brand-secondary text-brand-secondary" />
              <span className="text-[10px] font-bold text-brand-secondary tracking-wider uppercase">
                Copa 2026
              </span>
            </div>
            <p className="text-xs text-gray-400 font-medium mb-1">
              EUA · Canadá · México
            </p>
            <p className="text-xs text-white font-bold">
              Jun — Jul 2026
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
