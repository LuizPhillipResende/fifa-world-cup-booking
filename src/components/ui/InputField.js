"use client";

/**
 * Componente de campo de formulário com ícone, label e suporte a erros.
 * Substitui 7 repetições de input nos formulários de login e cadastro.
 *
 * @param {object} props
 * @param {string} props.label - Label do campo (exibido em uppercase).
 * @param {React.ReactNode} [props.icon] - Ícone renderizado dentro do campo (lado esquerdo).
 * @param {string} [props.type='text'] - Tipo do input HTML.
 * @param {string} props.name - Atributo name para FormData.
 * @param {string} [props.placeholder=''] - Placeholder do campo.
 * @param {boolean} [props.required=false] - Campo obrigatório.
 * @param {number} [props.minLength] - Comprimento mínimo.
 * @param {string} [props.hint] - Texto de ajuda à direita do label.
 * @param {string} [props.error] - Mensagem de erro abaixo do campo.
 * @param {React.ReactNode} [props.rightElement] - Elemento à direita do input (ex: botão mostrar senha).
 * @param {React.ReactNode} [props.headerRight] - Elemento à direita do label (ex: link "Esqueci").
 * @param {string} [props.value] - Valor controlado.
 * @param {function} [props.onChange] - Handler onChange.
 */
export default function InputField({
  label,
  icon,
  type = "text",
  name,
  placeholder = "",
  required = false,
  minLength,
  hint,
  error,
  rightElement,
  headerRight,
  value,
  onChange,
  ...rest
}) {
  const hasIcon = !!icon;

  return (
    <div className="flex flex-col gap-2">
      {/* Header: label + headerRight */}
      {(label || headerRight || hint) && (
        <div className="flex items-center justify-between">
          {label && (
            <label
              htmlFor={name}
              className="text-xs font-bold tracking-widest text-gray-400 uppercase"
            >
              {label}
            </label>
          )}
          {hint && <span className="text-[10px] text-gray-500">{hint}</span>}
          {headerRight}
        </div>
      )}

      {/* Input container */}
      <div className="relative">
        {hasIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={name}
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          minLength={minLength}
          value={value}
          onChange={onChange}
          className={`w-full ${hasIcon ? "pl-10" : "pl-4"} ${rightElement ? "pr-12" : "pr-4"} py-3 bg-[#151a23] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all`}
          {...rest}
        />
        {rightElement && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {rightElement}
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <span className="text-red-500 text-sm font-medium">{error}</span>
      )}
    </div>
  );
}
