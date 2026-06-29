"use client";

/**
 * Tabela de dados reutilizável para páginas administrativas.
 * Suporta colunas configuráveis, render customizado e ações por linha.
 *
 * @param {object} props
 * @param {Array<{key: string, label: string, render?: function}>} props.columns - Definição das colunas.
 * @param {Array<object>} props.data - Dados para exibir.
 * @param {function} [props.actions] - Função que recebe o item e retorna JSX de ações.
 * @param {string} [props.emptyMessage='Nenhum dado encontrado.'] - Mensagem quando vazio.
 * @param {boolean} [props.loading=false] - Estado de carregamento.
 */
export default function DataTable({
  columns,
  data,
  actions,
  emptyMessage = "Nenhum dado encontrado.",
  loading = false,
}) {
  if (loading) {
    return (
      <div className="bg-[#151a23] border border-white/5 rounded-2xl p-12 flex items-center justify-center">
        <span className="text-gray-400 text-sm animate-pulse">
          Carregando dados...
        </span>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-[#151a23] border border-white/5 rounded-2xl p-12 flex items-center justify-center">
        <span className="text-gray-500 text-sm">{emptyMessage}</span>
      </div>
    );
  }

  return (
    <div className="bg-[#151a23] border border-white/5 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-4 text-left text-[10px] font-bold tracking-widest text-gray-500 uppercase"
                >
                  {col.label}
                </th>
              ))}
              {actions && (
                <th className="px-6 py-4 text-right text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                  Ações
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={item.id || index}
                className="border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition-colors"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-6 py-4 text-sm text-gray-300"
                  >
                    {col.render ? col.render(item) : item[col.key]}
                  </td>
                ))}
                {actions && (
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {actions(item)}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
