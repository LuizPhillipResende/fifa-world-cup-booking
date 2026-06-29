"use client";

/**
 * Layout compartilhado entre as páginas de Login e Cadastro.
 * Encapsula background Unsplash com overlay, gradiente e card glassmorphism.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - Conteúdo do formulário.
 * @param {string} props.title - Título principal (ex: "Acesse Sua Conta").
 * @param {string} props.subtitle - Subtítulo (ex: "Bem-vindo de volta").
 * @param {'md'|'xl'} [props.maxWidth='md'] - Largura máxima do card.
 */

const maxWidthMap = {
  md: "max-w-md",
  xl: "max-w-xl",
};

export default function AuthLayout({
  children,
  title,
  subtitle,
  maxWidth = "md",
}) {
  const widthClass = maxWidthMap[maxWidth] || maxWidthMap.md;

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-bg-base relative pb-20">
      {/* Background image overlay */}
      <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1518605368461-1ee7e53f19e4?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-bg-base via-bg-base/80 to-transparent pointer-events-none"></div>

      <div className="flex flex-1 items-center justify-center relative z-10 px-6 py-12 mt-10">
        <div
          className={`w-full ${widthClass} bg-card-bg/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl`}
        >
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black italic tracking-tighter text-white uppercase mb-2">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-gray-400">{subtitle}</p>
            )}
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
