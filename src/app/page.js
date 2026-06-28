import prisma from "@/lib/prisma";
import MatchesClient from "@/components/MatchesClient";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const games = await prisma.game.findMany({
    include: {
      homeTeam: { include: { group: true } },
      awayTeam: true,
      stadium: true,
    },
    orderBy: { date: "asc" }
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-gradient-to-r from-bg-base via-[#0f171e] to-[#162521] px-6 py-20 lg:px-24 border-b border-white/5">
        <div className="absolute top-0 right-0 w-[800px] h-full opacity-30 pointer-events-none">
           {/* Decorative blurred blob */}
           <div className="absolute top-[-100px] right-[-200px] w-[600px] h-[600px] bg-brand-secondary rounded-full blur-[120px] opacity-20"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-brand-secondary/10 border border-brand-secondary/20">
            <span className="w-2 h-2 rounded-full bg-brand-secondary"></span>
            <span className="text-xs font-semibold tracking-wider text-brand-secondary uppercase">Ingressos disponíveis agora</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-black italic tracking-tighter text-white mb-2 uppercase">
            FIFA WORLD CUP
          </h1>
          <h1 className="text-5xl lg:text-7xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-cyan-400 mb-6 uppercase">
            2026
          </h1>
          
          <p className="max-w-2xl text-lg text-gray-400 mb-12 leading-relaxed">
            Garanta seu lugar na maior competição de futebol do planeta. EUA, Canadá e México recebem 48 seleções em 104 jogos épicos.
          </p>

          <div className="flex flex-wrap gap-12">
            <div>
              <div className="text-4xl font-black italic text-cyan-400 tracking-tighter">104</div>
              <div className="text-sm font-medium tracking-widest text-gray-500 uppercase mt-1">Jogos</div>
            </div>
            <div>
              <div className="text-4xl font-black italic text-cyan-400 tracking-tighter">48</div>
              <div className="text-sm font-medium tracking-widest text-gray-500 uppercase mt-1">Seleções</div>
            </div>
            <div>
              <div className="text-4xl font-black italic text-cyan-400 tracking-tighter">16</div>
              <div className="text-sm font-medium tracking-widest text-gray-500 uppercase mt-1">Estádios</div>
            </div>
          </div>
        </div>
      </section>

      {/* Matches Section extracted to Client Component */}
      <MatchesClient games={games} />
    </div>
  );
}
