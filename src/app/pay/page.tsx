"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { formatPrice } from "@/lib/types";

function PayContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");

  const [order, setOrder] = useState<{
    id: number;
    total_amount: number;
    payment_method: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const gatewayLabels: Record<string, string> = {
    gcash: "GCash",
    paypal: "PayPal",
    card: "Credit/Debit Card",
  };

  useEffect(() => {
    if (!orderId) {
      router.push("/");
      return;
    }
    fetch(`/api/orders/${orderId}`)
      .then((r) => r.json())
      .then((data) => {
        if (!data.order || data.order.payment_status !== "pending") {
          router.push("/");
        } else {
          setOrder(data.order);
        }
        setLoading(false);
      })
      .catch(() => router.push("/"));
  }, [orderId, router]);

  const handleDecision = async (decision: "pay" | "fail") => {
    setProcessing(true);
    const res = await fetch(`/api/orders/${orderId}/pay`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ decision }),
    });
    const data = await res.json();
    if (decision === "pay" && data.success) {
      localStorage.removeItem("pcforge_cart");
      window.dispatchEvent(new Event("cartUpdated"));
      router.push(`/order-success?order_id=${orderId}`);
    } else {
      router.push(`/order-failed?order_id=${orderId}`);
    }
  };

  if (loading) return <div className="empty-state">Loading...</div>;
  if (!order) return null;

  return (
    <div className="form-card">
      <h2>Pay with {gatewayLabels[order.payment_method] ?? "Payment"}</h2>
      <p style={{ color: "var(--text-dim)", fontSize: "0.88rem" }}>
        Sandbox gateway — simulating a {gatewayLabels[order.payment_method]} payment. No real money moves here.
      </p>

      <div className="totals-box" style={{ margin: "18px 0", maxWidth: "none" }}>
        <div className="row">
          <span>Order #{order.id}</span>
          <span>{formatPrice(order.total_amount)}</span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <button
          className="btn btn-solid btn-block"
          onClick={() => handleDecision("pay")}
          disabled={processing}
        >
          Confirm payment of {formatPrice(order.total_amount)}
        </button>
        <button
          className="btn btn-danger btn-block"
          onClick={() => handleDecision("fail")}
          disabled={processing}
        >
          Cancel payment
        </button>
      </div>
    </div>
  );
}

export default function PayPage() {
  return (
    <Suspense fallback={<div className="empty-state">Loading...</div>}>
      <PayContent />
    </Suspense>
  );
}
