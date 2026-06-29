"use server";

import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import * as gameService from "@/services/gameService";

export async function createGameAction(formData) {
  try {
    const { errorResponse } = await requireAdmin();
    if (errorResponse) throw new Error("Não autorizado");

    const dateStr = formData.get("date");
    
    const data = {
      date: new Date(dateStr),
      phase: formData.get("phase"),
      stadiumId: formData.get("stadiumId"),
      homeTeamId: formData.get("homeTeamId") || null,
      awayTeamId: formData.get("awayTeamId") || null,
      basePrice: Number(formData.get("basePrice")),
    };

    await gameService.createGame(data);
    revalidatePath("/admin/jogos");
    revalidatePath("/");
    
    return { success: true };
  } catch (error) {
    return { error: error.message || "Erro ao criar jogo" };
  }
}

export async function updateGameAction(id, formData) {
  try {
    const { errorResponse } = await requireAdmin();
    if (errorResponse) throw new Error("Não autorizado");

    const dateStr = formData.get("date");
    
    const data = {
      date: new Date(dateStr),
      phase: formData.get("phase"),
      stadiumId: formData.get("stadiumId"),
      homeTeamId: formData.get("homeTeamId") || null,
      awayTeamId: formData.get("awayTeamId") || null,
      basePrice: Number(formData.get("basePrice")),
    };

    await gameService.updateGame(id, data);
    revalidatePath("/admin/jogos");
    revalidatePath("/");
    
    return { success: true };
  } catch (error) {
    return { error: error.message || "Erro ao atualizar jogo" };
  }
}

export async function deleteGameAction(id) {
  try {
    const { errorResponse } = await requireAdmin();
    if (errorResponse) throw new Error("Não autorizado");

    await gameService.deleteGame(id);
    revalidatePath("/admin/jogos");
    revalidatePath("/");
    
    return { success: true };
  } catch (error) {
    return { error: error.message || "Erro ao excluir jogo" };
  }
}
