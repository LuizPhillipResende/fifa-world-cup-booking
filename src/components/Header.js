"use client";

import Link from "next/link";
import { Menu, User, Plus, LogOut, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Sidebar from "./Sidebar";
import Button from "./ui/Button";

export default function Header() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { data: session } = useSession();

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
            className="hover:text-white transition-colors"
          >
            Estádios
          </Link>
          <Link href="/sobre" className="hover:text-white transition-colors">
            Sobre
          </Link>
          {session?.user?.role === "ADMIN" && (
            <Link
              href="/admin"
              className="text-brand-secondary hover:text-white flex items-center gap-1 transition-colors"
            >
              <ShieldCheck className="w-4 h-4" />
              Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {session ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-white hidden md:block">
                Olá, {session.user.name.split(" ")[0]}
              </span>
              <Button
                variant="secondary"
                size="sm"
                icon={<LogOut className="w-4 h-4" />}
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Sair
              </Button>
            </div>
          ) : (
            <>
              <Button
                href="/login"
                variant="secondary"
                size="sm"
                icon={<User className="w-4 h-4" />}
              >
                Entrar
              </Button>
              <Button
                href="/cadastro"
                variant="primary"
                size="sm"
                icon={<Plus className="w-4 h-4" />}
                className="hidden sm:flex"
              >
                Criar Conta
              </Button>
            </>
          )}
        </div>
      </header>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}
