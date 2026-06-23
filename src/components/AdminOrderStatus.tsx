"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminOrderStatus({
  orderId,
  currentStatus,
}: {
  orderId: number;
  currentStatus: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [saving, setSaving] = useState(false);

  const handleUpdate = async () => {
    setSaving(true);
    await fetch(`/api/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order_status: status }),
    });
    setSaving(false);
    router.refresh();
  };

  return (
    <div style={{ display: "flex", gap: 6 }}>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        {["processing", "shipped", "completed", "cancelled"].map((s) => (
          <option key={s} value={s}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </option>
        ))}
      </select>
      <button className="btn btn-sm" onClick={handleUpdate} disabled={saving}>
        {saving ? "..." : "Update"}
      </button>
    </div>
  );
}
