"use client";

import { useState, useEffect } from "react";

import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import { TOURNAMENT_PHASES, DEFAULT_BASE_PRICE } from "@/lib/constants";
import { createGameAction, updateGameAction } from "@/actions/gameActions";

export default function GameFormModal({ isOpen, onClose, game, onSuccess, stadiums = [], teams = [] }) {
  const [formData, setFormData] = useState({
    date: "",
    phase: TOURNAMENT_PHASES[0],
    homeTeamId: "",
    awayTeamId: "",
    stadiumId: "",
    basePrice: DEFAULT_BASE_PRICE,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEditing = !!game;

  useEffect(() => {
    if (game) {
      // Ajustar data para o input datetime-local: YYYY-MM-DDThh:mm
      const d = new Date(game.date);
      // Considerando offset local
      const offset = d.getTimezoneOffset();
      const localDate = new Date(d.getTime() - offset * 60 * 1000);
      const dateStr = localDate.toISOString().slice(0, 16);

      setFormData({
        date: dateStr,
        phase: game.phase,
        homeTeamId: game.homeTeamId || "",
        awayTeamId: game.awayTeamId || "",
        stadiumId: game.stadiumId,
        basePrice: game.basePrice,
      });
    } else {
      setFormData({
        date: "",
        phase: TOURNAMENT_PHASES[0],
        homeTeamId: "",
        awayTeamId: "",
        stadiumId: "",
        basePrice: DEFAULT_BASE_PRICE,
      });
    }
    setError("");
  }, [game, isOpen]);

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
      const formPayload = new FormData();
      
      const dateObj = new Date(formData.date);
      formPayload.append("date", dateObj.toISOString());
      
      formPayload.append("phase", formData.phase);
      formPayload.append("stadiumId", formData.stadiumId);
      if (formData.homeTeamId) formPayload.append("homeTeamId", formData.homeTeamId);
      if (formData.awayTeamId) formPayload.append("awayTeamId", formData.awayTeamId);
      formPayload.append("basePrice", formData.basePrice);

      const result = isEditing 
        ? await updateGameAction(game.id, formPayload)
        : await createGameAction(formPayload);

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
            {isEditing ? "Editar Jogo" : "Novo Jogo"}
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                    Data e Hora
                  </label>
                  <input
                    type="datetime-local"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#151a23] border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                    Fase
                  </label>
                  <select
                    name="phase"
                    value={formData.phase}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#151a23] border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-primary"
                  >
                    {TOURNAMENT_PHASES.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                  Estádio
                </label>
                <select
                  name="stadiumId"
                  value={formData.stadiumId}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#151a23] border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-primary"
                >
                  <option value="">Selecione um estádio...</option>
                  {stadiums.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.city})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                    Mandante
                  </label>
                  <select
                    name="homeTeamId"
                    value={formData.homeTeamId}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#151a23] border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-primary"
                  >
                    <option value="">TBD (A definir)</option>
                    {teams.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                    Visitante
                  </label>
                  <select
                    name="awayTeamId"
                    value={formData.awayTeamId}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#151a23] border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-primary"
                  >
                    <option value="">TBD (A definir)</option>
                    {teams.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <InputField
                label="Preço Base (R$)"
                name="basePrice"
                type="number"
                value={formData.basePrice}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
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
