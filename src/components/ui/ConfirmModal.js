"use client";

/**
 * Modal de confirmação reutilizável para ações destrutivas.
 * Usado em exclusões de estádios/jogos e cancelamentos de reservas.
 *
 * @param {object} props
 * @param {boolean} props.isOpen - Controla visibilidade do modal.
 * @param {function} props.onClose - Callback ao fechar.
 * @param {function} props.onConfirm - Callback ao confirmar.
 * @param {string} props.title - Título do modal.
 * @param {string} props.message - Mensagem de confirmação.
 * @param {string} [props.confirmText='Confirmar'] - Texto do botão confirmar.
 * @param {'danger'|'primary'|'success'} [props.confirmVariant='danger'] - Variante do botão.
 * @param {boolean} [props.loading=false] - Estado de loading.
 */

import Button from "./Button";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirmar",
  confirmVariant = "danger",
  loading = false,
}) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-[#151a23] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
          <p className="text-sm text-gray-400 mb-6">{message}</p>

          <div className="flex items-center justify-end gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              variant={confirmVariant}
              size="sm"
              onClick={onConfirm}
              loading={loading}
              loadingText="Processando..."
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
