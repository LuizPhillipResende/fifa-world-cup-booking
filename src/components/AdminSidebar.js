"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MapPin,
  CalendarDays,
  Ticket,
  LogOut,
  ArrowLeft,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const adminLinks = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/estadios", label: "Estádios", icon: MapPin },
    { href: "/admin/jogos", label: "Jogos", icon: CalendarDays },
    { href: "/admin/reservas", label: "Reservas", icon: Ticket },
  ];

  return (
    <aside className="w-64 bg-[#0b0e14] border-r border-white/5 h-screen flex flex-col sticky top-0">
      {/* Header */}
      <div className="p-6 border-b border-white/5">
        <Link href="/admin" className="flex items-center gap-2 mb-4">
          <span className="text-xl font-black italic tracking-tighter text-white uppercase">
            Admin <span className="text-brand-primary">Panel</span>
          </span>
        </Link>
        {session?.user && (
          <div className="flex items-center gap-3 bg-[#151a23] p-3 rounded-lg border border-white/5">
            <div className="w-8 h-8 rounded-full bg-brand-primary/20 text-brand-primary flex items-center justify-center font-bold text-sm">
              {session.user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white truncate max-w-[120px]">
                {session.user.name.split(" ")[0]}
              </span>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest">
                Administrador
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <h3 className="text-[10px] font-bold text-gray-500 tracking-wider mb-4 px-2 uppercase">
          Gestão
        </h3>
        {adminLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
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
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/5 space-y-2">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Site
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>
    </aside>
  );
}
