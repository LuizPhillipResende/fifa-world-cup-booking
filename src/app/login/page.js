"use client";

import Link from "next/link";
import { Mail, Lock, Eye } from "lucide-react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError(res.error);
      setLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  };
  return (
    <div className="flex flex-col flex-1 min-h-screen bg-bg-base relative">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1518605368461-1ee7e53f19e4?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-bg-base via-bg-base/80 to-transparent pointer-events-none"></div>
      
      <div className="flex flex-1 items-center justify-center relative z-10 px-6 py-12">
        <div className="w-full max-w-md bg-card-bg/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black italic tracking-tighter text-white uppercase mb-2">
              Acesse Sua Conta
            </h1>
            <p className="text-sm text-gray-400">
              Bem-vindo de volta ao FIFA WC Booking
            </p>
          </div>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
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
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold tracking-widest text-gray-400 uppercase">Senha</label>
                <Link href="#" className="text-sm font-medium text-brand-primary hover:text-brand-primary-hover transition-colors">
                  Esqueci minha senha
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-500" />
                </div>
                <input 
                  type="password"
                  name="password"
                  required 
                  placeholder="Sua senha" 
                  className="w-full pl-10 pr-12 py-3 bg-[#151a23] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                />
                <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <Eye className="w-5 h-5 text-gray-500 hover:text-gray-300 transition-colors" />
                </button>
              </div>
            </div>

            {error && <div className="text-red-500 text-sm text-center font-medium">{error}</div>}

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-4 bg-brand-primary hover:bg-brand-primary-hover text-white font-bold rounded-xl shadow-lg shadow-brand-primary/20 transition-all disabled:opacity-50"
            >
              {loading ? "Entrando..." : "Entrar na Conta"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <span className="text-gray-400 text-sm">Não tem conta? </span>
            <Link href="/cadastro" className="text-brand-secondary font-bold hover:text-cyan-300 transition-colors">
              Criar conta grátis
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
