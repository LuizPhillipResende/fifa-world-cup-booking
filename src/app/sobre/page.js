"use client";

import { Ticket, MapPin, ShieldCheck, Zap, Globe } from "lucide-react";
import Image from "next/image";

export default function SobrePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-20 px-6 flex flex-col items-center justify-center overflow-hidden border-b border-white/5">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=2000&auto=format&fit=crop" 
            alt="Soccer Ball on Grass"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b0e14]/80 via-[#0b0e14]/95 to-[#0b0e14]"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs font-bold text-gray-300 uppercase tracking-wider mb-6">
            <Globe className="w-3.5 h-3.5 text-brand-primary" />
            FIFA World Cup 2026
          </div>
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter text-white mb-6">
            SOBRE O <span className="text-brand-primary">FIFA WC</span> <span className="text-cyan-400">BOOKING</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-medium max-w-2xl mx-auto">
            A plataforma oficial de reserva e venda de ingressos para a maior competição de futebol do planeta.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16 max-w-6xl space-y-24">
        
        {/* Sobre a Plataforma */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <span className="w-1.5 h-8 bg-brand-primary block rounded-sm"></span>
            <h2 className="text-2xl font-black italic tracking-tight text-white uppercase">
              Sobre a Plataforma
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6 text-gray-400">
              <p>
                O <strong className="text-white">FIFA World Cup Booking</strong> é um sistema web moderno desenvolvido para facilitar a compra, reserva e gerenciamento de ingressos para a Copa do Mundo FIFA 2026, que será realizada nos Estados Unidos, Canadá e México.
              </p>
              <p>
                Nossa plataforma oferece uma experiência completa ao torcedor: desde a visualização dos jogos disponíveis até a escolha interativa do assento no mapa do estádio, tudo em um ambiente seguro, rápido e intuitivo.
              </p>
              <p>
                Desenvolvida com tecnologias modernas como <strong className="text-cyan-400">React, TypeScript</strong> e <strong className="text-cyan-400">Tailwind CSS</strong>, a plataforma garante alta performance e responsividade em qualquer dispositivo.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#11141c] p-6 rounded-xl border border-white/5 hover:border-brand-primary/30 transition-colors">
                <Ticket className="w-8 h-8 text-brand-primary mb-4" />
                <h3 className="text-white font-bold mb-2">Compra Segura</h3>
                <p className="text-sm text-gray-500">Ingressos autenticados e criptografados</p>
              </div>
              <div className="bg-[#11141c] p-6 rounded-xl border border-white/5 hover:border-brand-primary/30 transition-colors">
                <MapPin className="w-8 h-8 text-cyan-400 mb-4" />
                <h3 className="text-white font-bold mb-2">Mapa de Assentos</h3>
                <p className="text-sm text-gray-500">Escolha seu lugar exato no estádio</p>
              </div>
              <div className="bg-[#11141c] p-6 rounded-xl border border-white/5 hover:border-brand-primary/30 transition-colors">
                <ShieldCheck className="w-8 h-8 text-brand-secondary mb-4" />
                <h3 className="text-white font-bold mb-2">Anti-fraude</h3>
                <p className="text-sm text-gray-500">Sistema de verificação em tempo real</p>
              </div>
              <div className="bg-[#11141c] p-6 rounded-xl border border-white/5 hover:border-brand-primary/30 transition-colors">
                <Zap className="w-8 h-8 text-yellow-500 mb-4" />
                <h3 className="text-white font-bold mb-2">Rápido e Seguro</h3>
                <p className="text-sm text-gray-500">Confirmação instantânea da reserva</p>
              </div>
            </div>
          </div>
        </section>

        {/* Copa do Mundo FIFA 2026 */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <span className="w-1.5 h-8 bg-cyan-400 block rounded-sm"></span>
            <h2 className="text-2xl font-black italic tracking-tight text-white uppercase">
              Copa do Mundo FIFA 2026
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#11141c] p-6 rounded-xl border border-white/5 text-center">
              <span className="block text-4xl font-black text-brand-primary mb-2">48</span>
              <h3 className="text-white font-bold">Seleções</h3>
              <p className="text-xs text-gray-500 mt-1">Maior edição da história</p>
            </div>
            <div className="bg-[#11141c] p-6 rounded-xl border border-white/5 text-center">
              <span className="block text-4xl font-black text-cyan-400 mb-2">104</span>
              <h3 className="text-white font-bold">Jogos</h3>
              <p className="text-xs text-gray-500 mt-1">Fase de grupos à final</p>
            </div>
            <div className="bg-[#11141c] p-6 rounded-xl border border-white/5 text-center">
              <span className="block text-4xl font-black text-brand-secondary mb-2">16</span>
              <h3 className="text-white font-bold">Estádios</h3>
              <p className="text-xs text-gray-500 mt-1">Em 3 países</p>
            </div>
            <div className="bg-[#11141c] p-6 rounded-xl border border-white/5 text-center">
              <span className="block text-4xl font-black text-yellow-500 mb-2">5M+</span>
              <h3 className="text-white font-bold">Torcedores</h3>
              <p className="text-xs text-gray-500 mt-1">Esperados no torneio</p>
            </div>
          </div>

          {/* Call to action card at bottom of sobre page */}
          <div className="bg-gradient-to-br from-[#11141c] to-[#151a23] border border-white/10 p-10 rounded-2xl text-center mt-16">
            <Globe className="w-12 h-12 text-cyan-400 mx-auto mb-6" />
            <h2 className="text-3xl font-black italic tracking-tight text-white uppercase mb-4">
              Pronto para viver a Copa?
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Crie sua conta agora e garanta seus ingressos antes que esgotem.
            </p>
            <div className="flex items-center justify-center gap-4">
              <button className="px-6 py-3 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white font-bold transition-colors">
                Criar Conta Grátis
              </button>
              <button className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold transition-colors">
                Ver Jogos
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
