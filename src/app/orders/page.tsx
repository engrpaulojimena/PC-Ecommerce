"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/types";

interface Order {
  id: number;
  total_amount: number;
  payment_status: string;
  order_status: string;
  created_at: string;
  payment_method: string;
}

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: string }> = {
  processing: { label: "Processing",  color: "var(--accent, #f59e0b)",   icon: "⏳" },
  shipped:     { label: "Shipped",     color: "var(--info, #3b82f6)",     icon: "🚚" },
  completed:   { label: "Completed",   color: "var(--good, #22c55e)",     icon: "✓"  },
  cancelled:   { label: "Cancelled",   color: "var(--danger, #ef4444)",   icon: "✕"  },
};

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchOrders = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const r = await fetch("/api/orders/my");
      const data = await r.json();
      if (data.error) { router.push("/login"); return; }
      setOrders(data.orders);
      setLastUpdated(new Date());
    } catch { router.push("/login"); }
    finally { if (!silent) setLoading(false); }
  }, [router]);

  useEffect(() => {
    const user = localStorage.getItem("pcforge_user");
    if (!user) { router.push("/login"); return; }
    fetchOrders();
    const interval = setInterval(() => fetchOrders(true), 30_000);
    return () => clearInterval(interval);
  }, [router, fetchOrders]);

  if (loading) return <div className="empty-state">Loading...</div>;

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1 style={{ fontFamily: "var(--font-display)", margin: 0 }}>My orders</h1>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {lastUpdated && (
            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
              Updated {lastUpdated.toLocaleTimeString()}
            </span>
          )}
          <button onClick={() => fetchOrders()} className="btn btn-ghost btn-sm" style={{ fontSize: "0.78rem" }}>
            ↻ Refresh
          </button>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="empty-state">No orders yet. <a href="/">Start shopping</a></div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {orders.map((o) => {
            const sc = STATUS_CONFIG[o.order_status] ?? { label: o.order_status, color: "var(--text-muted)", icon: "•" };
            return (
              <div key={o.id} style={{ background: "var(--bg-2)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "18px 22px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
                  <div>
                    <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1rem" }}>Order #{o.id}</span>
                    <span style={{ marginLeft: 12, fontSize: "0.78rem", color: "var(--text-dim)" }}>
                      {new Date(o.created_at).toLocaleDateString("en-PH", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700 }}>{formatPrice(o.total_amount)}</span>
                </div>

                <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap", alignItems: "center" }}>
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: 5,
                    padding: "3px 10px", borderRadius: 99, fontSize: "0.75rem", fontWeight: 600,
                    background: `${sc.color}22`, color: sc.color, border: `1px solid ${sc.color}`,
                  }}>
                    {sc.icon} {sc.label}
                  </span>
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: 5,
                    padding: "3px 10px", borderRadius: 99, fontSize: "0.75rem",
                    background: o.payment_status === "paid" ? "#22c55e22" : "var(--bg-3)",
                    color: o.payment_status === "paid" ? "var(--good, #22c55e)" : "var(--text-dim)",
                    border: `1px solid ${o.payment_status === "paid" ? "var(--good, #22c55e)" : "var(--border)"}`,
                  }}>
                    {o.payment_status === "paid" ? "✓ Paid" : o.payment_method === "cod" ? "💵 Pay on delivery" : `⏳ ${o.payment_status}`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <p style={{ marginTop: 20, fontSize: "0.72rem", color: "var(--text-muted)", textAlign: "center" }}>
        Order status refreshes automatically every 30 seconds.
      </p>
    </>
  );
}
