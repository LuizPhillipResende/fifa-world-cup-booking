"use client";

import { useState } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import DataTable from "@/components/ui/DataTable";
import ConfirmModal from "@/components/ui/ConfirmModal";
import GameFormModal from "@/components/GameFormModal";
import { Edit, Trash2 } from "lucide-react";
import { formatDate, formatTime, formatCurrency } from "@/lib/formatters";
import { deleteGameAction } from "@/actions/gameActions";
import { useRouter } from "next/navigation";

export default function JogosClient({ initialGames, stadiums, teams }) {
  const router = useRouter();

  const [formModalOpen, setFormModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [gameToDelete, setGameToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleOpenForm = (game = null) => {
    setSelectedGame(game);
    setFormModalOpen(true);
  };

  const handleCloseForm = () => {
    setSelectedGame(null);
    setFormModalOpen(false);
  };

  const handleFormSuccess = () => {
    handleCloseForm();
    router.refresh();
  };

  const handleOpenConfirm = (game) => {
    setGameToDelete(game);
    setConfirmModalOpen(true);
  };

  const handleCloseConfirm = () => {
    setGameToDelete(null);
    setConfirmModalOpen(false);
  };

  const handleDelete = async () => {
    if (!gameToDelete) return;
    setDeleting(true);
    try {
      const res = await deleteGameAction(gameToDelete.id);
      if (res.error) {
        alert(res.error);
      } else {
        handleCloseConfirm();
      }
    } catch (err) {
      alert("Erro interno ao excluir jogo.");
    } finally {
      setDeleting(false);
    }
  };

  const columns = [
    {
      key: "date",
      label: "Data/Hora",
      render: (g) => `${formatDate(g.date)} às ${formatTime(g.date)}`,
    },
    {
      key: "match",
      label: "Partida",
      render: (g) => (
        <span className="font-bold text-white">
          {g.homeTeam?.name || "TBD"} vs {g.awayTeam?.name || "TBD"}
        </span>
      ),
    },
    {
      key: "stadium",
      label: "Estádio",
      render: (g) => g.stadium?.name,
    },
    {
      key: "phase",
      label: "Fase",
    },
    {
      key: "basePrice",
      label: "Preço Base",
      render: (g) => formatCurrency(g.basePrice),
    },
    {
      key: "reservations",
      label: "Reservas",
      render: (g) => g._count?.reservations || 0,
    },
  ];

  const actions = (game) => (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleOpenForm(game)}
        icon={<Edit className="w-4 h-4 text-cyan-400" />}
      />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleOpenConfirm(game)}
        icon={<Trash2 className="w-4 h-4 text-red-500" />}
      />
    </>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <SectionTitle barColor="brand-primary" subtitle="Crie, edite e remova partidas">
          Gestão de Jogos
        </SectionTitle>

        <Button
          variant="primary"
          onClick={() => handleOpenForm()}
          className="self-start"
        >
          Novo Jogo
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={initialGames}
        loading={false}
        actions={actions}
        emptyMessage="Nenhum jogo encontrado."
      />

      <GameFormModal
        isOpen={formModalOpen}
        onClose={handleCloseForm}
        game={selectedGame}
        onSuccess={handleFormSuccess}
        stadiums={stadiums}
        teams={teams}
      />

      <ConfirmModal
        isOpen={confirmModalOpen}
        onClose={handleCloseConfirm}
        onConfirm={handleDelete}
        title="Excluir Jogo"
        message={`Tem certeza que deseja excluir este jogo? Se houverem reservas pendentes, elas serão canceladas. Esta ação não pode ser desfeita.`}
        confirmText="Excluir"
        confirmVariant="danger"
        loading={deleting}
      />
    </div>
  );
}
