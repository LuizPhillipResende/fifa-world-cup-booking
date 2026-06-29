"use client";

import { useState } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import DataTable from "@/components/ui/DataTable";
import ConfirmModal from "@/components/ui/ConfirmModal";
import StatusBadge from "@/components/ui/StatusBadge";
import { Trash2, CheckCircle2, XCircle } from "lucide-react";
import { formatDate, formatTime, formatCurrency } from "@/lib/formatters";
import { changeReservationStatusAction, deleteReservationAction } from "@/actions/reservationActions";
import { useRouter } from "next/navigation";

export default function ReservasClient({ initialReservations }) {
  const router = useRouter();
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [reservationToDelete, setReservationToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await changeReservationStatusAction(id, newStatus);
      if (res.error) {
        alert(res.error);
      } else {
        router.refresh();
      }
    } catch (err) {
      alert("Erro interno.");
    }
  };

  const handleOpenConfirm = (res) => {
    setReservationToDelete(res);
    setConfirmModalOpen(true);
  };

  const handleCloseConfirm = () => {
    setReservationToDelete(null);
    setConfirmModalOpen(false);
  };

  const handleDelete = async () => {
    if (!reservationToDelete) return;
    setDeleting(true);
    try {
      const res = await deleteReservationAction(reservationToDelete.id);
      if (res.error) {
        alert(res.error);
      } else {
        handleCloseConfirm();
      }
    } catch (err) {
      alert("Erro interno ao excluir reserva.");
    } finally {
      setDeleting(false);
    }
  };

  const columns = [
    {
      key: "user",
      label: "Usuário",
      render: (r) => (
        <div>
          <div className="font-bold text-white">{r.user?.name}</div>
          <div className="text-xs text-gray-400">{r.user?.email}</div>
        </div>
      ),
    },
    {
      key: "match",
      label: "Partida",
      render: (r) => (
        <div>
          <div className="font-bold text-white">
            {r.game?.homeTeam?.name || "TBD"} vs {r.game?.awayTeam?.name || "TBD"}
          </div>
          <div className="text-xs text-gray-400">
            {r.game ? `${formatDate(r.game.date)} às ${formatTime(r.game.date)}` : "TBD"}
          </div>
        </div>
      ),
    },
    {
      key: "seat",
      label: "Setor",
      render: (r) => r.seatSector,
    },
    {
      key: "price",
      label: "Valor Total",
      render: (r) => formatCurrency(r.totalPrice),
    },
    {
      key: "status",
      label: "Status",
      render: (r) => <StatusBadge status={r.status} />,
    },
  ];

  const actions = (r) => (
    <div className="flex items-center justify-end gap-2">
      {r.status === "PENDING" && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleStatusChange(r.id, "CONFIRMED")}
          icon={<CheckCircle2 className="w-4 h-4 text-green-500" />}
        />
      )}
      {r.status === "PENDING" && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleStatusChange(r.id, "CANCELLED")}
          icon={<XCircle className="w-4 h-4 text-orange-500" />}
        />
      )}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleOpenConfirm(r)}
        icon={<Trash2 className="w-4 h-4 text-red-500" />}
      />
    </div>
  );

  return (
    <div className="space-y-6">
      <SectionTitle barColor="brand-secondary" subtitle="Acompanhe todas as reservas feitas pelos torcedores">
        Gestão de Reservas
      </SectionTitle>

      <DataTable
        columns={columns}
        data={initialReservations}
        loading={false}
        actions={actions}
        emptyMessage="Nenhuma reserva encontrada."
      />

      <ConfirmModal
        isOpen={confirmModalOpen}
        onClose={handleCloseConfirm}
        onConfirm={handleDelete}
        title="Excluir Reserva"
        message={`Tem certeza que deseja excluir esta reserva? O assento será liberado.`}
        confirmText="Excluir"
        confirmVariant="danger"
        loading={deleting}
      />
    </div>
  );
}
