"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/types";

interface Order {
  id: number;
  total_amount: number;
  payment_status: string;
  order_status: string;
  created_at: string;
}

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("pcforge_user");
    if (!user) {
      router.push("/login");
      return;
    }
    fetch("/api/orders/my")
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          router.push("/login");
        } else {
          setOrders(data.orders);
        }
        setLoading(false);
      })
      .catch(() => router.push("/login"));
  }, [router]);

  if (loading) return <div className="empty-state">Loading...</div>;

  return (
    <>
      <h1 style={{ fontFamily: "var(--font-display)" }}>My orders</h1>
      {orders.length === 0 ? (
        <div className="empty-state">
          No orders yet. <a href="/">Start shopping</a>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Order #</th>
              <th>Date</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>#{o.id}</td>
                <td>{new Date(o.created_at).toLocaleDateString()}</td>
                <td>{formatPrice(o.total_amount)}</td>
                <td>
                  <span
                    className={`badge ${
                      o.payment_status === "paid"
                        ? "badge-paid"
                        : "badge-pending"
                    }`}
                  >
                    {o.payment_status}
                  </span>
                </td>
                <td>{o.order_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
