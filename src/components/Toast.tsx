"use client";

import { useEffect, useState } from "react";

interface ToastMsg { id: number; message: string; }

export default function Toast() {
  const [toasts, setToasts] = useState<ToastMsg[]>([]);

  useEffect(() => {
    const handler = (e: Event) => {
      const msg = (e as CustomEvent).detail?.message ?? "Done!";
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message: msg }]);
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 2800);
    };
    window.addEventListener("showToast", handler);
    return () => window.removeEventListener("showToast", handler);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className="toast">
          <div className="toast-dot" />
          {t.message}
        </div>
      ))}
    </div>
  );
}
