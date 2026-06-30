"use server";

import { requireAdmin, requireAuth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import * as reservationService from "@/services/reservationService";

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
