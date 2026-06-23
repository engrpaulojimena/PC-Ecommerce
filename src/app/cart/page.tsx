"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/types";
import { getLocalCart, setLocalCart, syncCartToDB, CartMap } from "@/lib/cart";

export default function CartPage() {
  const [cart, setCart] = useState<CartMap>({});
  const [mounted, setMounted] = useState(false);
  const isLoggedIn = useRef(false);
  const syncTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
    const userData = localStorage.getItem("pcforge_user");
    isLoggedIn.current = !!userData;
    setCart(getLocalCart());
  }, []);

  const saveCart = (updated: CartMap) => {
    setLocalCart(updated);
    setCart(updated);

    // Debounce DB sync — wait 800ms after last change
    if (isLoggedIn.current) {
      if (syncTimer.current) clearTimeout(syncTimer.current);
      syncTimer.current = setTimeout(() => syncCartToDB(updated), 800);
    }
  };

  const updateQty = (id: string, qty: number) => {
    const updated = { ...cart };
    if (qty <= 0) { delete updated[id]; }
    else { updated[id] = { ...updated[id], quantity: Math.min(qty, updated[id].stock) }; }
    saveCart(updated);
  };

  const remove = (id: string) => {
    const updated = { ...cart };
    delete updated[id];
    saveCart(updated);
  };

  const items = Object.entries(cart).filter(([, v]) => v.quantity > 0);
  const subtotal = items.reduce((sum, [, v]) => sum + v.price * v.quantity, 0);

  if (!mounted) return null;

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", letterSpacing: "2px", textTransform: "uppercase", color: "var(--text-dim)", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: "var(--accent)" }}>//</span> Your cart
          {items.length > 0 && <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>({items.length} {items.length === 1 ? "item" : "items"})</span>}
        </h1>
        <Link href="/" className="btn btn-sm">← Continue shopping</Link>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">⬡</div>
          <h3>Your cart is empty</h3>
          <p>Browse components and add them to your cart.</p>
          <Link href="/" className="btn btn-ghost">Shop now</Link>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 28, alignItems: "start" }}>
          <div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Component</th>
                    <th>Unit price</th>
                    <th>Qty</th>
                    <th>Subtotal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(([id, item]) => (
                    <tr key={id}>
                      <td style={{ fontWeight: 500, color: "var(--text)" }}>{item.name}</td>
                      <td style={{ fontFamily: "var(--font-display)", color: "var(--text-dim)" }}>{formatPrice(item.price)}</td>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <button className="btn btn-sm" style={{ padding: "4px 10px" }} onClick={() => updateQty(id, item.quantity - 1)}>−</button>
                          <span style={{ fontFamily: "var(--font-display)", fontSize: "0.85rem", minWidth: 24, textAlign: "center" }}>{item.quantity}</span>
                          <button className="btn btn-sm" style={{ padding: "4px 10px" }} onClick={() => updateQty(id, item.quantity + 1)} disabled={item.quantity >= item.stock}>+</button>
                        </div>
                      </td>
                      <td style={{ fontFamily: "var(--font-display)", color: "#fff", fontWeight: 700 }}>{formatPrice(item.price * item.quantity)}</td>
                      <td>
                        <button className="btn btn-sm btn-danger" onClick={() => remove(id)}>Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: 14, display: "flex", justifyContent: "flex-end" }}>
              <button className="btn btn-sm" onClick={() => saveCart({})}>Clear cart</button>
            </div>
          </div>

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
            <Link href="/checkout" className="btn btn-primary btn-block" style={{ marginTop: 16 }}>
              Checkout →
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
