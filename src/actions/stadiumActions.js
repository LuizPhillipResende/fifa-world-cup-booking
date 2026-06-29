"use server";

import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import * as stadiumService from "@/services/stadiumService";

export async function createStadiumAction(formData) {
  try {
    const { errorResponse } = await requireAdmin();
    if (errorResponse) throw new Error("Não autorizado");

    const data = {
      name: formData.get("name"),
      city: formData.get("city"),
      country: formData.get("country"),
      capacity: Number(formData.get("capacity")),
    };

    await stadiumService.createStadium(data);
    revalidatePath("/admin/estadios");
    revalidatePath("/estadios");
    revalidatePath("/");
    
    return { success: true };
  } catch (error) {
    return { error: error.message || "Erro ao criar estádio" };
  }
}

export async function updateStadiumAction(id, formData) {
  try {
    const { errorResponse } = await requireAdmin();
    if (errorResponse) throw new Error("Não autorizado");

    const data = {
      name: formData.get("name"),
      city: formData.get("city"),
      country: formData.get("country"),
      capacity: Number(formData.get("capacity")),
    };

    await stadiumService.updateStadium(id, data);
    revalidatePath("/admin/estadios");
    revalidatePath("/estadios");
    revalidatePath("/");
    
    return { success: true };
  } catch (error) {
    return { error: error.message || "Erro ao atualizar estádio" };
  }
}

export async function deleteStadiumAction(id) {
  try {
    const { errorResponse } = await requireAdmin();
    if (errorResponse) throw new Error("Não autorizado");

    await stadiumService.deleteStadium(id);
    revalidatePath("/admin/estadios");
    revalidatePath("/estadios");
    revalidatePath("/");
    
    return { success: true };
  } catch (error) {
    return { error: error.message || "Erro ao excluir estádio" };
  }
}
