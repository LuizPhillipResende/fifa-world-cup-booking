"use client";

import Link from "next/link";
import { Menu, User, Plus } from "lucide-react";
import { useState } from "react";
import Sidebar from "./Sidebar";

export default function Header() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#0b0e14] sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-full hover:bg-white/5 transition-colors border border-white/10"
          >
            <Menu className="w-5 h-5 text-gray-300" />
          </button>

          <Link href="/" className="flex items-center gap-2">
            {/* The Back arrow if needed could be here, but usually it's conditional. Keeping simple for now */}
            <span className="text-xl font-black italic tracking-tighter text-white">
              FIFA WC <span className="text-cyan-400">BOOKING</span>
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <Link href="/" className="hover:text-white transition-colors">
            Jogos
          </Link>
          <Link
            href="/estadios"
            className="text-white border-b-2 border-brand-primary pb-1 -mb-[1px]"
          >
            Estádios
          </Link>
          <Link href="/sobre" className="hover:text-white transition-colors">
            Sobre
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#151a23] border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
          >
            <User className="w-4 h-4" />
            Entrar
          </Link>
          <Link
            href="/cadastro"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-brand-primary rounded-lg hover:bg-brand-primary-hover transition-colors"
          >
            <Plus className="w-4 h-4" />
            Criar Conta
          </Link>
        </div>
      </header>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}
