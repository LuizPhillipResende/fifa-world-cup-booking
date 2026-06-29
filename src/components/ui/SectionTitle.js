/**
 * Título de seção com barra lateral decorativa.
 * Substitui 3 repetições do padrão "barra + h2 uppercase" em StadiumsClient e sobre.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - Texto do título.
 * @param {'primary'|'cyan'|'secondary'} [props.barColor='primary'] - Cor da barra lateral.
 * @param {string} [props.subtitle] - Subtítulo abaixo do título.
 */

const barColorMap = {
  primary: "bg-brand-primary",
  cyan: "bg-cyan-400",
  secondary: "bg-brand-secondary",
};

export default function SectionTitle({
  children,
  barColor = "primary",
  subtitle,
}) {
  const barClass = barColorMap[barColor] || barColorMap.primary;

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-black italic tracking-tight text-white uppercase flex items-center gap-3">
        <span className={`w-1.5 h-8 block rounded-sm ${barClass}`}></span>
        {children}
      </h2>
      {subtitle && (
        <p className="text-gray-400 mt-2 ml-4">{subtitle}</p>
      )}
    </div>
  );
}
