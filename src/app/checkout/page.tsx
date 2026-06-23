"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/types";

interface CartEntry { quantity: number; name: string; price: number; stock: number; }

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<Record<string, CartEntry>>({});
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [form, setForm] = useState({ name: "", email: "", address: "", payment_method: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const cartData = localStorage.getItem("pcforge_cart");
    if (cartData) setCart(JSON.parse(cartData));
    const userData = localStorage.getItem("pcforge_user");
    if (userData) {
      const u = JSON.parse(userData);
      setUser(u);
      setForm((f) => ({ ...f, name: u.name, email: u.email }));
    }
  }, []);

  const items = Object.entries(cart).filter(([, v]) => v.quantity > 0);
  const subtotal = items.reduce((sum, [, v]) => sum + v.price * v.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.address) { setError("Please fill in all shipping details."); return; }
    if (!form.payment_method) { setError("Please choose a payment method."); return; }
    if (items.length === 0) { router.push("/cart"); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: items.map(([id, v]) => ({ productId: parseInt(id), name: v.name, price: v.price, quantity: v.quantity })),
          totalAmount: subtotal,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create order");
      router.push(`/pay?order_id=${data.orderId}`);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;
  if (items.length === 0) return (
    <div className="empty-state">
      <h3>Your cart is empty</h3>
      <a href="/" className="btn btn-ghost" style={{ marginTop: 16 }}>Browse shop</a>
    </div>
  );

  const paymentMethods = [
    { value: "gcash", label: "GCash", icon: "📱" },
    { value: "paypal", label: "PayPal", icon: "🅿️" },
    { value: "card", label: "Credit / Debit Card", icon: "💳" },
  ];

  return (
    <>
      <div className="checkout-steps">
        <div className="step-item">
          <div className="step-num done">✓</div>
          <span className="step-label">Cart</span>
        </div>
        <div className="step-divider" />
        <div className="step-item">
          <div className="step-num active">2</div>
          <span className="step-label active">Checkout</span>
        </div>
        <div className="step-divider" />
        <div className="step-item">
          <div className="step-num idle">3</div>
          <span className="step-label">Payment</span>
        </div>
        <div className="step-divider" />
        <div className="step-item">
          <div className="step-num idle">4</div>
          <span className="step-label">Confirm</span>
        </div>
      </div>

      {!user && (
        <div className="alert alert-info" style={{ marginBottom: 24 }}>
          Checking out as guest. <a href="/login">Log in</a> or <a href="/register">create an account</a> to track orders.
        </div>
      )}
      {error && <div className="alert alert-error">{error}</div>}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 28, alignItems: "start" }}>
        <form onSubmit={handleSubmit}>
          <div style={{ background: "var(--bg-2)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: 28, marginBottom: 20 }}>
            <div className="section-title" style={{ margin: "0 0 20px" }}>Shipping details</div>
            <label>Full name</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <label>Email</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <label>Delivery address</label>
            <textarea rows={3} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} required placeholder="House/Unit no., Street, City, Province, ZIP" />
          </div>

          <div style={{ background: "var(--bg-2)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: 28 }}>
            <div className="section-title" style={{ margin: "0 0 20px" }}>Payment method</div>
            <div className="pay-options">
              {paymentMethods.map((m) => (
                <label key={m.value} className="pay-option">
                  <input type="radio" name="payment_method" value={m.value} checked={form.payment_method === m.value}
                    onChange={(e) => setForm({ ...form, payment_method: e.target.value })} />
                  <span>{m.icon}</span>
                  <span>{m.label}</span>
                </label>
              ))}
            </div>
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 10 }}>
              Sandbox / demo gateway — no real charges are made.
            </p>
          </div>

          <button type="submit" className="btn btn-primary btn-block btn-lg" style={{ marginTop: 20 }} disabled={loading}>
            {loading ? "Placing order..." : `Place order — ${formatPrice(subtotal)}`}
          </button>
        </form>

        <div className="totals-box" style={{ position: "sticky", top: 80 }}>
          <h3>Order summary</h3>
          {items.map(([id, item]) => (
            <div key={id} className="row">
              <span style={{ fontSize: "0.82rem" }}>{item.name} ×{item.quantity}</span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "0.82rem" }}>{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
          <div className="row" style={{ marginTop: 8 }}>
            <span>Shipping</span>
            <span style={{ color: "var(--good)", fontFamily: "var(--font-display)", fontSize: "0.82rem" }}>Free</span>
          </div>
          <div className="row grand">
            <span>Total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
        </div>
      </div>
    </>
  );
}
