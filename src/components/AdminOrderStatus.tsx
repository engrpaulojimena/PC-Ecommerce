"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";

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
  const [saved, setSaved] = useState(false);

  const handleUpdate = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_status: status }),
      });
      if (!res.ok) throw new Error("Failed");
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      router.refresh();
    } catch {
      alert("Failed to update order status. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
      {saving && <LoadingScreen message="Updating order" fullScreen />}
      <select value={status} onChange={(e) => { setStatus(e.target.value); setSaved(false); }}>
        {["processing", "shipped", "completed", "cancelled"].map((s) => (
          <option key={s} value={s}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </option>
        ))}
      </select>
      <button
        className="btn btn-sm"
        onClick={handleUpdate}
        disabled={saving || status === currentStatus}
      >
        {saving ? "..." : saved ? "✓ Saved" : "Update"}
      </button>
    </div>
  );
}
