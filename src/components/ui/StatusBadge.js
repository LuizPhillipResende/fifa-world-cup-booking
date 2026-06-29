"use client";

/**
 * Badge de status para reservas com ícone, cor e texto automáticos.
 * Substitui a lógica condicional inline repetida em meu-painel.
 *
 * @param {object} props
 * @param {'confirmed'|'pending'|'cancelled'|'CONFIRMED'|'PENDING'|'CANCELLED'} props.status - Status da reserva.
 */

import { CheckCircle2, Clock, X } from "lucide-react";

const statusConfig = {
  confirmed: {
    color: "text-green-500",
    border: "border-green-500/30",
    bg: "bg-green-500/10",
    icon: <CheckCircle2 className="w-4 h-4" />,
    label: "Confirmado",
  },
  pending: {
    color: "text-orange-500",
    border: "border-orange-500/30",
    bg: "bg-orange-500/10",
    icon: <Clock className="w-4 h-4" />,
    label: "Pendente",
  },
  cancelled: {
    color: "text-red-500",
    border: "border-red-500/30",
    bg: "bg-red-500/10",
    icon: <X className="w-4 h-4" />,
    label: "Cancelado",
  },
};

export default function StatusBadge({ status }) {
  const normalizedStatus = status?.toLowerCase();
  const config = statusConfig[normalizedStatus] || statusConfig.pending;

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${config.border} ${config.bg} ${config.color} text-xs font-semibold`}
    >
      {config.icon}
      <span>{config.label}</span>
    </div>
  );
}
