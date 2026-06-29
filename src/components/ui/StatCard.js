"use client";

/**
 * Card de estatística reutilizável com ícone, valor em destaque e label.
 * Substitui 11 repetições em meu-painel, StadiumsClient e sobre.
 *
 * @param {object} props
 * @param {string} props.label - Texto descritivo (uppercase, tracking-widest).
 * @param {string|number} props.value - Valor principal exibido em destaque.
 * @param {React.ReactNode} [props.icon] - Ícone no canto superior direito.
 * @param {'cyan'|'green'|'orange'|'purple'|'primary'|'secondary'|'yellow'} [props.color='cyan'] - Cor do valor.
 * @param {string} [props.subtitle] - Texto adicional abaixo do label.
 * @param {'default'|'compact'} [props.variant='default'] - Variante: compact centraliza e omite ícone no canto.
 */

const colorMap = {
  cyan: "text-cyan-400",
  green: "text-green-500",
  orange: "text-orange-500",
  purple: "text-[#d6b4e7]",
  primary: "text-brand-primary",
  secondary: "text-brand-secondary",
  yellow: "text-yellow-500",
};

export default function StatCard({
  label,
  value,
  icon,
  color = "cyan",
  subtitle,
  variant = "default",
}) {
  const colorClass = colorMap[color] || colorMap.cyan;

  if (variant === "compact") {
    return (
      <div className="bg-[#11141c] border border-white/5 rounded-xl p-6 flex flex-col items-center justify-center text-center">
        <span className={`text-3xl font-black ${colorClass} mb-1`}>
          {value}
        </span>
        <span className="text-xs text-gray-500 font-bold tracking-wider uppercase">
          {label}
        </span>
        {subtitle && (
          <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
        )}
      </div>
    );
  }

  return (
    <div className="bg-[#151a23] border border-white/5 rounded-2xl p-6 flex flex-col hover:border-white/10 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">
          {label}
        </span>
        {icon && <span className={colorClass}>{icon}</span>}
      </div>
      <span className={`text-4xl font-black italic tracking-tighter ${colorClass}`}>
        {value}
      </span>
      {subtitle && (
        <p className="text-xs text-gray-500 mt-2">{subtitle}</p>
      )}
    </div>
  );
}
