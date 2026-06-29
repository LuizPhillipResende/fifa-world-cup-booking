"use client";

import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/ui/AuthLayout";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
    <AuthLayout
      title="Acesse Sua Conta"
      subtitle="Bem-vindo de volta ao FIFA WC Booking"
      maxWidth="md"
    >
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <InputField
          label="E-mail"
          name="email"
          type="email"
          icon={<Mail className="w-5 h-5 text-gray-500" />}
          placeholder="seu@email.com"
          required
        />

        <InputField
          label="Senha"
          name="password"
          type={showPassword ? "text" : "password"}
          icon={<Lock className="w-5 h-5 text-gray-500" />}
          placeholder="Sua senha"
          required
          headerRight={
            <Link
              href="#"
              className="text-sm font-medium text-brand-primary hover:text-brand-primary-hover transition-colors"
            >
              Esqueci minha senha
            </Link>
          }
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

        {error && (
          <div className="text-red-500 text-sm text-center font-medium">
            {error}
          </div>
        )}

        <Button
          type="submit"
          fullWidth
          loading={loading}
          loadingText="Entrando..."
        >
          Entrar na Conta
        </Button>
      </form>

      <div className="mt-8 pt-6 border-t border-white/10 text-center">
        <span className="text-gray-400 text-sm">Não tem conta? </span>
        <Link
          href="/cadastro"
          className="text-brand-secondary font-bold hover:text-cyan-300 transition-colors"
        >
          Criar conta grátis
        </Link>
      </div>
    </AuthLayout>
  );
}
