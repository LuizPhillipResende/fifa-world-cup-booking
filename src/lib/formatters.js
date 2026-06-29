/**
 * Utilitários de formatação para o projeto FIFA World Cup Booking.
 * Centraliza toda a lógica de formatação de datas, horários e moeda,
 * evitando duplicação de código entre componentes.
 */

/**
 * Formata uma data para o padrão brasileiro.
 * @param {string|Date|null|undefined} date - Data a ser formatada.
 * @returns {string} Data formatada (ex: "15 de jun. de 2026"), ou string vazia se inválido.
 */
export function formatDate(date) {
  if (!date) return '';
  try {
    const dateObj = date instanceof Date ? date : new Date(date);
    if (isNaN(dateObj.getTime())) return '';
    return dateObj.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

/**
 * Formata um horário no padrão HH:MM.
 * @param {string|Date|null|undefined} date - Data/hora a ser formatada.
 * @returns {string} Horário formatado (ex: "18:00"), ou string vazia se inválido.
 */
export function formatTime(date) {
  if (!date) return '';
  try {
    const dateObj = date instanceof Date ? date : new Date(date);
    if (isNaN(dateObj.getTime())) return '';
    return dateObj.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

/**
 * Formata um valor numérico como moeda brasileira (BRL).
 * @param {number|null|undefined} value - Valor a ser formatado.
 * @returns {string} Valor formatado (ex: "R$ 1.105,00"), ou "R$ 0,00" se inválido.
 */
export function formatCurrency(value) {
  if (value === null || value === undefined || isNaN(value)) {
    return 'R$ 0,00';
  }
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}
