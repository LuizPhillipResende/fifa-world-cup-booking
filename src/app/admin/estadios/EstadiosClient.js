"use client";

import { useState } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import DataTable from "@/components/ui/DataTable";
import ConfirmModal from "@/components/ui/ConfirmModal";
import StadiumFormModal from "@/components/StadiumFormModal";
import { Edit, Trash2, Search } from "lucide-react";
import InputField from "@/components/ui/InputField";
import { useRouter } from "next/navigation";
import { deleteStadiumAction } from "@/actions/stadiumActions";

export default function EstadiosClient({ initialStadiums, initialSearch }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(initialSearch || "");

  const [formModalOpen, setFormModalOpen] = useState(false);
  const [selectedStadium, setSelectedStadium] = useState(null);

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [stadiumToDelete, setStadiumToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Update URL search params
  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/admin/estadios?search=${encodeURIComponent(searchTerm)}`);
  };

  const handleOpenForm = (stadium = null) => {
    setSelectedStadium(stadium);
    setFormModalOpen(true);
  };

  const handleCloseForm = () => {
    setSelectedStadium(null);
    setFormModalOpen(false);
  };

  const handleFormSuccess = () => {
    handleCloseForm();
    // revalidatePath in Server Action already updates the data
    // router.refresh() is implicitly handled or we can force it
    router.refresh(); 
  };

  const handleOpenConfirm = (stadium) => {
    setStadiumToDelete(stadium);
    setConfirmModalOpen(true);
  };

  const handleCloseConfirm = () => {
    setStadiumToDelete(null);
    setConfirmModalOpen(false);
  };

  const handleDelete = async () => {
    if (!stadiumToDelete) return;
    setDeleting(true);
    try {
      const res = await deleteStadiumAction(stadiumToDelete.id);
      if (res.error) {
        alert(res.error);
      } else {
        handleCloseConfirm();
      }
    } catch (err) {
      alert("Erro interno ao excluir estádio.");
    } finally {
      setDeleting(false);
    }
  };

  const columns = [
    { key: "name", label: "Nome" },
    { key: "city", label: "Cidade" },
    { key: "country", label: "País" },
    {
      key: "capacity",
      label: "Capacidade",
      render: (s) => s.capacity.toLocaleString("pt-BR"),
    },
    {
      key: "games",
      label: "Jogos",
      render: (s) => s._count?.games || 0,
    },
  ];

  const actions = (stadium) => (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleOpenForm(stadium)}
        icon={<Edit className="w-4 h-4 text-cyan-400" />}
      />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleOpenConfirm(stadium)}
        icon={<Trash2 className="w-4 h-4 text-red-500" />}
      />
    </>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <SectionTitle barColor="cyan" subtitle="Crie, edite e remova estádios">
          Gestão de Estádios
        </SectionTitle>

        <Button
          variant="primary"
          onClick={() => handleOpenForm()}
          className="self-start"
        >
          Novo Estádio
        </Button>
      </div>

      <form onSubmit={handleSearch} className="max-w-md flex gap-2">
        <InputField
          name="search"
          placeholder="Buscar por nome ou cidade..."
          icon={<Search className="w-4 h-4 text-gray-500" />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button type="submit" variant="secondary" className="mt-1">
          Buscar
        </Button>
      </form>

      <DataTable
        columns={columns}
        data={initialStadiums}
        loading={false} // No loading state needed, SSR handled it
        actions={actions}
        emptyMessage="Nenhum estádio encontrado."
      />

      <StadiumFormModal
        isOpen={formModalOpen}
        onClose={handleCloseForm}
        stadium={selectedStadium}
        onSuccess={handleFormSuccess}
      />

      <ConfirmModal
        isOpen={confirmModalOpen}
        onClose={handleCloseConfirm}
        onConfirm={handleDelete}
        title="Excluir Estádio"
        message={`Tem certeza que deseja excluir o estádio "${stadiumToDelete?.name}"? Esta ação não pode ser desfeita.`}
        confirmText="Excluir"
        confirmVariant="danger"
        loading={deleting}
      />
    </div>
  );
}
