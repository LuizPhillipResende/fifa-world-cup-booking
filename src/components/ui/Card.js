/**
 * Container padronizado para cards dark mode.
 * Substitui 7 ocorrências de bg-[#151a23] border border-white/5 rounded-2xl.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - Conteúdo do card.
 * @param {string} [props.className=''] - Classes CSS adicionais.
 * @param {boolean} [props.hover=false] - Ativa efeito hover.
 * @param {'sm'|'md'|'lg'} [props.padding='md'] - Padding interno.
 */

const paddingMap = {
  sm: "p-4",
  md: "p-5",
  lg: "p-6",
};

export default function Card({
  children,
  className = "",
  hover = false,
  padding = "md",
}) {
  return (
    <div
      className={`bg-[#151a23] border border-white/5 rounded-2xl ${paddingMap[padding] || paddingMap.md} ${hover ? "hover:border-white/10 transition-colors" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
