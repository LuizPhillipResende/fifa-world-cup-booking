/**
 * Constantes centralizadas do projeto FIFA World Cup Booking.
 * Evita "magic numbers" e strings repetidas espalhadas pelo código.
 */

/** Antecedência mínima para cancelamento de reserva (em milissegundos). 48 horas. */
export const MIN_CANCELLATION_ADVANCE_MS = 48 * 60 * 60 * 1000;

/** Papéis de usuário no sistema. */
export const USER_ROLES = {
  ADMIN: 'ADMIN',
  FAN: 'FAN',
};

/** Status possíveis de uma reserva. */
export const RESERVATION_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
};

/** Setores disponíveis nos estádios com multiplicadores de preço. */
export const SEAT_SECTORS = [
  { name: 'Premium', priceMultiplier: 1.0, rows: ['D', 'E', 'F', 'G'], cols: 12 },
  { name: 'Arquibancada', priceMultiplier: 0.6, rows: ['H', 'I', 'J', 'K'], cols: 16 },
];

/** Custo base padrão do ingresso em Reais (R$). */
export const DEFAULT_BASE_PRICE = 1105.0;

/** Fases do torneio. */
export const TOURNAMENT_PHASES = [
  'Fase de Grupos',
  'Oitavas de Final',
  'Quartas de Final',
  'Semifinal',
  'Disputa de 3º Lugar',
  'Final',
];
