"use client";

import { Ticket, MapPin, ShieldCheck, Zap, Globe } from "lucide-react";
import Image from "next/image";
import SectionTitle from "@/components/ui/SectionTitle";
import StatCard from "@/components/ui/StatCard";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

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
            SOBRE O <span className="text-brand-primary">FIFA WC</span>{" "}
            <span className="text-cyan-400">BOOKING</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-medium max-w-2xl mx-auto">
            A plataforma oficial de reserva e venda de ingressos para a maior
            competição de futebol do planeta.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16 max-w-6xl space-y-24">
        {/* Sobre a Plataforma */}
        <section>
          <SectionTitle barColor="primary">Sobre a Plataforma</SectionTitle>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6 text-gray-400">
              <p>
                O <strong className="text-white">FIFA World Cup Booking</strong> é
                um sistema web moderno desenvolvido para facilitar a compra, reserva
                e gerenciamento de ingressos para a Copa do Mundo FIFA 2026, que
                será realizada nos Estados Unidos, Canadá e México.
              </p>
              <p>
                Nossa plataforma oferece uma experiência completa ao torcedor: desde
                a visualização dos jogos disponíveis até a escolha interativa do
                assento no mapa do estádio, tudo em um ambiente seguro, rápido e
                intuitivo.
              </p>
              <p>
                Desenvolvida com tecnologias modernas como{" "}
                <strong className="text-cyan-400">React, TypeScript</strong> e{" "}
                <strong className="text-cyan-400">Tailwind CSS</strong>, a
                plataforma garante alta performance e responsividade em qualquer
                dispositivo.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card hover>
                <Ticket className="w-8 h-8 text-brand-primary mb-4" />
                <h3 className="text-white font-bold mb-2">Compra Segura</h3>
                <p className="text-sm text-gray-500">
                  Ingressos autenticados e criptografados
                </p>
              </Card>
              <Card hover>
                <MapPin className="w-8 h-8 text-cyan-400 mb-4" />
                <h3 className="text-white font-bold mb-2">Mapa de Assentos</h3>
                <p className="text-sm text-gray-500">
                  Escolha seu lugar exato no estádio
                </p>
              </Card>
              <Card hover>
                <ShieldCheck className="w-8 h-8 text-brand-secondary mb-4" />
                <h3 className="text-white font-bold mb-2">Anti-fraude</h3>
                <p className="text-sm text-gray-500">
                  Sistema de verificação em tempo real
                </p>
              </Card>
              <Card hover>
                <Zap className="w-8 h-8 text-yellow-500 mb-4" />
                <h3 className="text-white font-bold mb-2">Rápido e Seguro</h3>
                <p className="text-sm text-gray-500">
                  Confirmação instantânea da reserva
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Copa do Mundo FIFA 2026 */}
        <section>
          <SectionTitle barColor="cyan">Copa do Mundo FIFA 2026</SectionTitle>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              variant="compact"
              label="Seleções"
              value="48"
              color="primary"
              subtitle="Maior edição da história"
            />
            <StatCard
              variant="compact"
              label="Jogos"
              value="104"
              color="cyan"
              subtitle="Fase de grupos à final"
            />
            <StatCard
              variant="compact"
              label="Estádios"
              value="16"
              color="secondary"
              subtitle="Em 3 países"
            />
            <StatCard
              variant="compact"
              label="Torcedores"
              value="5M+"
              color="yellow"
              subtitle="Esperados no torneio"
            />
          </div>

          {/* Call to action card */}
          <div className="bg-gradient-to-br from-[#11141c] to-[#151a23] border border-white/10 p-10 rounded-2xl text-center mt-16">
            <Globe className="w-12 h-12 text-cyan-400 mx-auto mb-6" />
            <h2 className="text-3xl font-black italic tracking-tight text-white uppercase mb-4">
              Pronto para viver a Copa?
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Crie sua conta agora e garanta seus ingressos antes que esgotem.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button href="/cadastro" variant="primary">
                Criar Conta Grátis
              </Button>
              <Button href="/" variant="secondary">
                Ver Jogos
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
