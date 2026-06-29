"use client";

/**
 * Componente de botão unificado do design system.
 * Substitui 4+ padrões de botão repetidos no projeto.
 *
 * @param {object} props
 * @param {'primary'|'secondary'|'danger'|'ghost'|'success'} [props.variant='primary'] - Variante visual.
 * @param {'sm'|'md'|'lg'} [props.size='md'] - Tamanho do botão.
 * @param {boolean} [props.fullWidth=false] - Ocupa 100% da largura.
 * @param {boolean} [props.disabled=false] - Estado desabilitado.
 * @param {boolean} [props.loading=false] - Exibe texto de loading.
 * @param {string} [props.loadingText='Carregando...'] - Texto durante loading.
 * @param {string} [props.href] - Se definido, renderiza como Link.
 * @param {React.ReactNode} [props.icon] - Ícone à esquerda.
 * @param {React.ReactNode} props.children - Conteúdo do botão.
 * @param {string} [props.className=''] - Classes CSS adicionais.
 * @param {function} [props.onClick] - Handler de clique.
 * @param {'button'|'submit'} [props.type='button'] - Tipo HTML.
 */

import Link from "next/link";

const variantStyles = {
  primary:
    "bg-brand-primary hover:bg-brand-primary-hover text-white shadow-lg shadow-brand-primary/20",
  secondary:
    "bg-white/5 border border-white/10 hover:bg-white/10 text-white",
  danger:
    "border border-red-500/50 hover:bg-red-500/10 text-red-500",
  ghost:
    "text-gray-400 hover:text-white",
  success:
    "bg-[#3fe971] hover:bg-[#34d399] text-black",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-xs rounded-lg",
  md: "px-4 py-2 text-sm rounded-lg",
  lg: "px-6 py-3 text-base rounded-xl",
};

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  loading = false,
  loadingText = "Carregando...",
  href,
  icon,
  children,
  className = "",
  onClick,
  type = "button",
  ...rest
}) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed";
  const classes = `${baseClasses} ${variantStyles[variant] || variantStyles.primary} ${sizeStyles[size] || sizeStyles.md} ${fullWidth ? "w-full" : ""} ${className}`;

  const content = (
    <>
      {icon && !loading && <span className="shrink-0">{icon}</span>}
      {loading ? loadingText : children}
    </>
  );

  if (href && !disabled && !loading) {
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...rest}
    >
      {content}
    </button>
  );
}
