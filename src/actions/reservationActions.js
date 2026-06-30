"use server";

import { requireAdmin, requireAuth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import * as reservationService from "@/services/reservationService";
import { MIN_CANCELLATION_ADVANCE_MS } from "@/lib/constants";

export async function createReservationAction(payload) {
  try {
    const { session, errorResponse } = await requireAuth();
    if (errorResponse) throw new Error("Usuário não logado", { cause: 401 });

    await reservationService.createReservation({
      userId: session.user.id,
      gameId: payload.gameId,
      seatSector: payload.seatSector,
      seatRow: payload.seatRow,
      seatNumber: payload.seatNumber,
      price: payload.price,
    });
    
    revalidatePath("/meu-painel");
    revalidatePath("/admin/reservas");
    
    return { success: true };
  } catch (error) {
    if (error.cause === 401) return { error: "Não logado", status: 401 };
    return { error: error.message || "Erro ao criar reserva" };
  }
}

export async function changeReservationStatusAction(id, status) {
  try {
    const { errorResponse } = await requireAdmin();
    if (errorResponse) throw new Error("Não autorizado");

    await reservationService.updateReservationStatus(id, status);
    revalidatePath("/admin/reservas");
    
    return { success: true };
  } catch (error) {
    return { error: error.message || "Erro ao atualizar reserva" };
  }
}

export async function deleteReservationAction(id) {
  try {
    const { errorResponse } = await requireAdmin();
    if (errorResponse) throw new Error("Não autorizado");

    await reservationService.deleteReservation(id);
    revalidatePath("/admin/reservas");
    
    return { success: true };
  } catch (error) {
    return { error: error.message || "Erro ao excluir reserva" };
  }
}

export async function cancelReservationAction(id) {
  try {
    const { session, errorResponse } = await requireAuth();
    if (errorResponse) throw new Error("Usuário não logado");

    const reservation = await reservationService.getReservationById(id);
    if (!reservation) throw new Error("Reserva não encontrada");

    // Verifica se a reserva pertence ao usuário logado
    if (reservation.userId !== session.user.id) {
      throw new Error("Não autorizado");
    }

    // Regra de Negócio: Cancelamento com 48h de antecedência (RN19)
    const now = new Date();
    const gameDate = new Date(reservation.game.date);
    const differenceInMs = gameDate.getTime() - now.getTime();

    if (differenceInMs < MIN_CANCELLATION_ADVANCE_MS) {
      throw new Error("O cancelamento só é permitido com pelo menos 48h de antecedência do jogo.");
    }

    await reservationService.updateReservationStatus(id, "CANCELLED");
    revalidatePath("/meu-painel");
    
    return { success: true };
  } catch (error) {
    return { error: error.message || "Erro ao cancelar reserva" };
  }
}
