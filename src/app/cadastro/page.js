"use client";

import Link from "next/link";
import { ArrowLeft, User, Mail, Phone, Lock, Circle, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/ui/AuthLayout";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";

export default function CadastroPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    <AuthLayout
      title="Criar Conta"
      subtitle="Preencha seus dados para se cadastrar"
      maxWidth="xl"
    >
      <Link
        href="/login"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 -mt-10"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Voltar</span>
      </Link>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <InputField
          label="Nome Completo"
          name="name"
          icon={<User className="w-5 h-5 text-gray-500" />}
          placeholder="Seu nome completo"
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputField
            label="E-mail"
            name="email"
            type="email"
            icon={<Mail className="w-5 h-5 text-gray-500" />}
            placeholder="seu@email.com"
            required
          />
          <InputField
            label="Telefone"
            name="phone"
            type="tel"
            icon={<Phone className="w-5 h-5 text-gray-500" />}
            placeholder="+55 11 9 9999-9999"
            required
          />
        </div>

        <InputField
          label="Senha"
          name="password"
          type={showPassword ? "text" : "password"}
          icon={<Lock className="w-5 h-5 text-gray-500" />}
          placeholder="Mínimo 6 caracteres"
          minLength={6}
          required
          hint="Mín. 6 caracteres"
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="hover:text-gray-300 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5 text-gray-500" />
              ) : (
                <Eye className="w-5 h-5 text-gray-500" />
              )}
            </button>
          }
        />

        <InputField
          label="Confirmar Senha"
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          icon={<Lock className="w-5 h-5 text-gray-500" />}
          placeholder="Repita a senha"
          required
          rightElement={
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="hover:text-gray-300 transition-colors"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5 text-gray-500" />
              ) : (
                <Eye className="w-5 h-5 text-gray-500" />
              )}
            </button>
          }
        />

        <div
          className={`flex items-center gap-3 mt-2 p-4 border rounded-xl cursor-pointer transition-colors ${
            termsAccepted
              ? "bg-brand-primary/10 border-brand-primary/50"
              : "bg-[#151a23]/50 border-white/5"
          }`}
          onClick={() => setTermsAccepted(!termsAccepted)}
        >
          <button
            type="button"
            className={`shrink-0 transition-colors ${
              termsAccepted ? "text-brand-primary" : "text-gray-500 hover:text-gray-300"
            }`}
          >
            {termsAccepted ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <Circle className="w-5 h-5" />
            )}
          </button>
          <span className="text-sm text-gray-400">
            Li e aceito os{" "}
            <Link
              href="#"
              className="text-brand-primary hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              Termos de Uso
            </Link>{" "}
            e a{" "}
            <Link
              href="#"
              className="text-brand-primary hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              Política de Privacidade
            </Link>
            .
          </span>
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center font-medium">
            {error}
          </div>
        )}

        <Button
          type="submit"
          fullWidth
          loading={loading}
          loadingText="Criando..."
        >
          Criar Minha Conta
        </Button>
      </form>

      <div className="mt-8 pt-6 border-t border-white/10 text-center">
        <span className="text-gray-400 text-sm">Já tem uma conta? </span>
        <Link
          href="/login"
          className="text-brand-secondary font-bold hover:text-cyan-300 transition-colors"
        >
          Entrar aqui
        </Link>
      </div>
    </AuthLayout>
  );
}
