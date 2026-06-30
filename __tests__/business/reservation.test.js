import { createReservationAction, cancelReservationAction } from "@/actions/reservationActions";
import * as reservationService from "@/services/reservationService";
import { requireAuth } from "@/lib/auth";
import { MIN_CANCELLATION_ADVANCE_MS } from "@/lib/constants";

// Mocks
jest.mock("@/services/reservationService");
jest.mock("@/lib/auth", () => ({
  requireAuth: jest.fn(),
  requireAdmin: jest.fn(),
  getSession: jest.fn(),
}));
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

describe("Gerenciamento de Reservas (RF012 e RF014)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("[TU003] Realizar Reserva", () => {
    it("Deve criar uma reserva com assento disponível com sucesso", async () => {
      // Configura mock de autenticação
      requireAuth.mockResolvedValue({
        session: { user: { id: "user-123" } },
        errorResponse: null,
      });

      // Configura mock do service
      reservationService.createReservation.mockResolvedValue({ id: "res-123", status: "CONFIRMED" });

      const payload = {
        gameId: "game-1",
        seatSector: "Norte",
        seatRow: "A",
        seatNumber: "12",
        price: 1500,
      };

      const result = await createReservationAction(payload);

      expect(requireAuth).toHaveBeenCalled();
      expect(reservationService.createReservation).toHaveBeenCalledWith({
        userId: "user-123",
        ...payload,
      });
      expect(result).toEqual({ success: true });
    });
  });

  describe("[TU004] Cancelar Reserva (RN19 - Regra de 48h)", () => {
    const mockReservationId = "res-123";

    it("Deve cancelar a reserva se solicitada com MAIS de 48h de antecedência", async () => {
      requireAuth.mockResolvedValue({
        session: { user: { id: "user-123" } },
        errorResponse: null,
      });

      // O jogo ocorrerá daqui a 72 horas
      const futureDate = new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString();
      
      reservationService.getReservationById.mockResolvedValue({
        id: mockReservationId,
        userId: "user-123",
        game: { date: futureDate },
      });

      reservationService.updateReservationStatus.mockResolvedValue({});

      const result = await cancelReservationAction(mockReservationId);

      expect(reservationService.updateReservationStatus).toHaveBeenCalledWith(mockReservationId, "CANCELLED");
      expect(result).toEqual({ success: true });
    });

    it("Deve bloquear o cancelamento e lançar erro se solicitada com MENOS de 48h de antecedência", async () => {
      requireAuth.mockResolvedValue({
        session: { user: { id: "user-123" } },
        errorResponse: null,
      });

      // O jogo ocorrerá daqui a apenas 24 horas
      const nearFutureDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
      
      reservationService.getReservationById.mockResolvedValue({
        id: mockReservationId,
        userId: "user-123",
        game: { date: nearFutureDate },
      });

      const result = await cancelReservationAction(mockReservationId);

      // Não deve chamar a atualização de status
      expect(reservationService.updateReservationStatus).not.toHaveBeenCalled();
      
      // Deve retornar objeto com erro
      expect(result).toHaveProperty("error");
      expect(result.error).toContain("48h de antecedência");
    });
  });
});
