"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { X } from "lucide-react";
import { cancelReservationAction } from "@/actions/reservationActions";
import { useToast } from "@/components/ui/ToastProvider";

export default function CancelButton({ reservationId, status }) {
  const [isCancelling, setIsCancelling] = useState(false);
  const { showToast } = useToast();

  if (status === "CANCELLED") return null;

  const handleCancel = async () => {
    if (!confirm("Tem certeza que deseja cancelar esta reserva?")) return;
    
    setIsCancelling(true);
    const result = await cancelReservationAction(reservationId);
    
    if (result.error) {
      showToast(result.error, "error");
      setIsCancelling(false);
    } else {
      showToast("Reserva cancelada com sucesso!", "success");
      // The page will be revalidated by the server action
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      icon={<X className="w-4 h-4" />}
      className="border border-red-500/50 hover:bg-red-500/10 text-red-400"
      onClick={handleCancel}
      loading={isCancelling}
    >
      Cancelar
    </Button>
  );
}
