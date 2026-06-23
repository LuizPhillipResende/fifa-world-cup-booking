"use client";

import Link from "next/link";
import { ArrowLeft, User, Mail, Phone, Lock, Eye, Circle, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CadastroPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!termsAccepted) {
      setError("Você deve aceitar os Termos de Uso.");
      return;
    }

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phone }),
      });

      if (res.ok) {
        router.push("/login?registered=true");
      } else {
        const data = await res.json();
        setError(data.error || "Ocorreu um erro ao criar conta.");
      }
    } catch (err) {
      setError("Erro interno ao conectar.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col flex-1 min-h-screen bg-bg-base relative pb-20">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1518605368461-1ee7e53f19e4?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-bg-base via-bg-base/80 to-transparent pointer-events-none"></div>
      
      <div className="flex flex-1 items-center justify-center relative z-10 px-6 py-12 mt-10">
        <div className="w-full max-w-xl bg-card-bg/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          
          <Link href="/login" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Voltar</span>
          </Link>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-black italic tracking-tighter text-white uppercase mb-2">
              Criar Conta
            </h1>
            <p className="text-sm text-gray-400">
              Preencha seus dados para se cadastrar
            </p>
          </div>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold tracking-widest text-gray-400 uppercase">Nome Completo</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-gray-500" />
                </div>
                <input 
                  type="text" 
                  name="name"
                  required
                  placeholder="Seu nome completo" 
                  className="w-full pl-10 pr-4 py-3 bg-[#151a23] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold tracking-widest text-gray-400 uppercase">E-mail</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-500" />
                  </div>
                  <input 
                    type="email"
                    name="email"
                    required 
                    placeholder="seu@email.com" 
                    className="w-full pl-10 pr-4 py-3 bg-[#151a23] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold tracking-widest text-gray-400 uppercase">Telefone</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="w-5 h-5 text-gray-500" />
                  </div>
                  <input 
                    type="tel"
                    name="phone"
                    required 
                    placeholder="+55 11 9 9999-9999" 
                    className="w-full pl-10 pr-4 py-3 bg-[#151a23] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold tracking-widest text-gray-400 uppercase">Senha</label>
                <span className="text-[10px] text-gray-500">Mín. 6 caracteres</span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-500" />
                </div>
                <input 
                  type="password"
                  name="password"
                  required
                  minLength={6} 
                  placeholder="Mínimo 6 caracteres" 
                  className="w-full pl-10 pr-12 py-3 bg-[#151a23] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold tracking-widest text-gray-400 uppercase">Confirmar Senha</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-500" />
                </div>
                <input 
                  type="password"
                  name="confirmPassword"
                  required 
                  placeholder="Repita a senha" 
                  className="w-full pl-10 pr-12 py-3 bg-[#151a23] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                />
              </div>
            </div>

            <div 
              className={`flex items-center gap-3 mt-2 p-4 border rounded-xl cursor-pointer transition-colors ${termsAccepted ? 'bg-brand-primary/10 border-brand-primary/50' : 'bg-[#151a23]/50 border-white/5'}`}
              onClick={() => setTermsAccepted(!termsAccepted)}
            >
              <button type="button" className={`shrink-0 transition-colors ${termsAccepted ? 'text-brand-primary' : 'text-gray-500 hover:text-gray-300'}`}>
                {termsAccepted ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
              </button>
              <span className="text-sm text-gray-400">
                Li e aceito os <Link href="#" className="text-brand-primary hover:underline" onClick={(e) => e.stopPropagation()}>Termos de Uso</Link> e a <Link href="#" className="text-brand-primary hover:underline" onClick={(e) => e.stopPropagation()}>Política de Privacidade</Link>.
              </span>
            </div>

            {error && <div className="text-red-500 text-sm text-center font-medium">{error}</div>}

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-4 bg-brand-primary hover:bg-brand-primary-hover text-white font-bold rounded-xl shadow-lg shadow-brand-primary/20 transition-all disabled:opacity-50"
            >
              {loading ? "Criando..." : "Criar Minha Conta"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <span className="text-gray-400 text-sm">Já tem uma conta? </span>
            <Link href="/login" className="text-brand-secondary font-bold hover:text-cyan-300 transition-colors">
              Entrar aqui
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
