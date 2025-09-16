"use client";
import React, { useEffect, useRef } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

export default function Modal({ open, onClose, children }: ModalProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    // focus first focusable element
    const el = ref.current?.querySelector<HTMLElement>('button,a,input,textarea,select,[tabindex]');
    el?.focus();
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />
      <div ref={ref} className="relative bg-white rounded-lg shadow-lg max-w-4xl w-full mx-4 p-6 overflow-auto">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-600">×</button>
        <div>{children}</div>
      </div>
    </div>
  );
}
