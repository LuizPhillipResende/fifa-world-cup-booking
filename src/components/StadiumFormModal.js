"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import { createStadiumAction, updateStadiumAction } from "@/actions/stadiumActions";

export default function StadiumFormModal({
  isOpen,
  onClose,
  stadium,
  onSuccess,
}) {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    country: "",
    capacity: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEditing = !!stadium;

  useEffect(() => {
    if (stadium) {
      setFormData({
        name: stadium.name,
        city: stadium.city,
        country: stadium.country,
        capacity: stadium.capacity.toString(),
        image: stadium.image || "",
      });
    } else {
      setFormData({
        name: "",
        city: "",
        country: "",
        capacity: "",
        image: "",
      });
    }
    setError("");
  }, [stadium, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Build FormData from state
      const formPayload = new FormData();
      formPayload.append("name", formData.name);
      formPayload.append("city", formData.city);
      formPayload.append("country", formData.country);
      formPayload.append("capacity", formData.capacity);

      const result = isEditing 
        ? await updateStadiumAction(stadium.id, formPayload)
        : await createStadiumAction(formPayload);

      if (result.error) {
        throw new Error(result.error);
      }

      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 z-50 transition-opacity"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-[#151a23] border border-white/10 rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-tight">
            {isEditing ? "Editar Estádio" : "Novo Estádio"}
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <InputField
              label="Nome do Estádio"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Ex: MetLife Stadium"
            />

            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Cidade"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                placeholder="Ex: Nova York"
              />
              <InputField
                label="País"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                placeholder="Ex: EUA"
              />
            </div>

            <InputField
              label="Capacidade"
              name="capacity"
              type="number"
              value={formData.capacity}
              onChange={handleChange}
              required
              placeholder="Ex: 82500"
              min="1"
            />

            <InputField
              label="URL da Imagem (opcional)"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://..."
            />

            {error && (
              <div className="text-red-500 text-sm font-medium">{error}</div>
            )}

            <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-white/5">
              <Button
                variant="secondary"
                size="sm"
                onClick={onClose}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                loading={loading}
                loadingText="Salvando..."
              >
                Salvar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
