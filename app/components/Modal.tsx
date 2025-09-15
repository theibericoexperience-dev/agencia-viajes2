"use client";
import React from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

export default function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />
      <div className="relative bg-white rounded-lg shadow-lg max-w-4xl w-full mx-4 p-6 overflow-auto">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-600">×</button>
        <div>{children}</div>
      </div>
    </div>
  );
}
