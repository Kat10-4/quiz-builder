'use client';

import { useEffect } from 'react';
import { FormButton } from '@/components/FormButton';

type ConfirmModalProps = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  busyLabel?: string;
  cancelLabel?: string;
  busy?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

function ConfirmModal({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  busyLabel,
  cancelLabel = 'Cancel',
  busy = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && !busy) {
        onCancel();
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, busy, onCancel]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4"
      role="presentation"
      onClick={() => {
        if (!busy) {
          onCancel();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        aria-describedby="confirm-modal-description"
        className="w-full max-w-sm border border-[var(--border)] bg-[var(--bg)] p-5 shadow-[var(--shadow)]"
        onClick={(event) => event.stopPropagation()}
      >
        <h2
          id="confirm-modal-title"
          className="break-words text-lg font-semibold text-[var(--ink)]"
        >
          {title}
        </h2>
        <p id="confirm-modal-description" className="mt-2 break-words text-sm text-[var(--muted)]">
          {description}
        </p>
        <div className="mt-5 flex flex-wrap justify-end gap-3">
          <FormButton
            type="button"
            variant="secondary"
            size="sm"
            disabled={busy}
            onClick={onCancel}
          >
            {cancelLabel}
          </FormButton>
          <FormButton type="button" variant="primary" size="sm" disabled={busy} onClick={onConfirm}>
            {busy ? (busyLabel ?? `${confirmLabel}…`) : confirmLabel}
          </FormButton>
        </div>
      </div>
    </div>
  );
}

export { ConfirmModal };
export type { ConfirmModalProps };
