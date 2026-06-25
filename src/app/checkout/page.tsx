"use client";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/types";

interface CartEntry { quantity: number; name: string; price: number; stock: number; }

declare global {
  interface Window { L: any; }
}

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<Record<string, CartEntry>>({});
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [form, setForm] = useState({ name: "", email: "", address: "", payment_method: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [locLoading, setLocLoading] = useState(false);
  const [locError, setLocError] = useState("");
  const [mapCoords, setMapCoords] = useState<{ lat: number; lng: number } | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

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

  // Load Leaflet via CDN script tag (no npm install needed)
  const loadLeaflet = (): Promise<any> => {
    return new Promise((resolve) => {
      if (window.L) { resolve(window.L); return; }

      if (!document.getElementById("leaflet-css")) {
        const link = document.createElement("link");
        link.id = "leaflet-css";
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);
      }

      if (!document.getElementById("leaflet-js")) {
        const script = document.createElement("script");
        script.id = "leaflet-js";
        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        script.onload = () => resolve(window.L);
        document.head.appendChild(script);
      } else {
        // Script tag exists but still loading — poll until ready
        const poll = setInterval(() => {
          if (window.L) { clearInterval(poll); resolve(window.L); }
        }, 50);
      }
    });
  };

  useEffect(() => {
    if (!mapCoords || !mapRef.current) return;

    loadLeaflet().then((L) => {
      if (!L || !mapRef.current) return;

      // Fix marker icon paths broken by bundlers
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      if (!leafletMapRef.current) {
        leafletMapRef.current = L.map(mapRef.current).setView([mapCoords.lat, mapCoords.lng], 16);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
        }).addTo(leafletMapRef.current);
        markerRef.current = L.marker([mapCoords.lat, mapCoords.lng], { draggable: true }).addTo(leafletMapRef.current);

        markerRef.current.on("dragend", async () => {
          const pos = markerRef.current.getLatLng();
          setMapCoords({ lat: pos.lat, lng: pos.lng });
          setLocLoading(true);
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${pos.lat}&lon=${pos.lng}&format=json`
            );
            const data = await res.json();
            setForm((f) => ({
              ...f,
              address: data?.display_name || `${pos.lat.toFixed(6)}, ${pos.lng.toFixed(6)}`,
            }));
          } catch {
            setForm((f) => ({ ...f, address: `${pos.lat.toFixed(6)}, ${pos.lng.toFixed(6)}` }));
          } finally {
            setLocLoading(false);
          }
        });

        // Also allow dragging by tapping/clicking anywhere on the map
        leafletMapRef.current.on("click", (e: any) => {
          markerRef.current.setLatLng(e.latlng);
          markerRef.current.fire("dragend");
        });
      } else {
        leafletMapRef.current.setView([mapCoords.lat, mapCoords.lng], 16);
        markerRef.current.setLatLng([mapCoords.lat, mapCoords.lng]);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapCoords]);

  const items = Object.entries(cart).filter(([, v]) => v.quantity > 0);
  const subtotal = items.reduce((sum, [, v]) => sum + v.price * v.quantity, 0);

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocError("Geolocation is not supported by your browser.");
      return;
    }
    setLocLoading(true);
    setLocError("");
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setMapCoords({ lat: latitude, lng: longitude });
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          setForm((f) => ({ ...f, address: data?.display_name || `${latitude.toFixed(6)}, ${longitude.toFixed(6)}` }));
        } catch {
          setForm((f) => ({ ...f, address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}` }));
        }
        setLocLoading(false);
      },
      (err) => {
        setLocLoading(false);
        setLocError(
          err.code === err.PERMISSION_DENIED
            ? "Location access was denied. Please allow location permissions and try again."
            : "Unable to retrieve your location. Please enter your address manually."
        );
      }
    );
  };

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

      if (form.payment_method === "cod") {
        localStorage.removeItem("pcforge_cart");
        await fetch("/api/cart", { method: "DELETE" }).catch(() => {});
        window.dispatchEvent(new Event("cartUpdated"));
        router.push(`/order-success?order_id=${data.orderId}`);
      } else {
        router.push(`/pay?order_id=${data.orderId}`);
      }
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
    { value: "cod", label: "Cash on Delivery", icon: "💵" },
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

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <label style={{ margin: 0 }}>Delivery address</label>
              <button
                type="button"
                onClick={handleUseCurrentLocation}
                disabled={locLoading}
                style={{
                  display: "flex", alignItems: "center", gap: 5,
                  fontSize: "0.75rem", color: "var(--accent)", background: "none",
                  border: "none", cursor: locLoading ? "not-allowed" : "pointer",
                  padding: "2px 0", opacity: locLoading ? 0.6 : 1,
                }}
              >
                {locLoading ? <>⏳ Getting location...</> : <>📍 Use current location</>}
              </button>
            </div>
            {locError && (
              <div style={{ fontSize: "0.75rem", color: "var(--danger, #e74c3c)", marginBottom: 6 }}>{locError}</div>
            )}
            <textarea rows={3} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} required placeholder="House/Unit no., Street, City, Province, ZIP" />

            {mapCoords && (
              <div style={{ marginTop: 12, borderRadius: "var(--radius)", overflow: "hidden", border: "1px solid var(--border)" }}>
                <div ref={mapRef} style={{ height: 220, width: "100%", background: "var(--bg-3)" }} />
                <div style={{ padding: "6px 10px", fontSize: "0.72rem", color: "var(--text-muted)", background: "var(--bg-2)" }}>
                  📍 Drag the pin or tap the map to fine-tune your exact location.
                </div>
              </div>
            )}
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
              {form.payment_method === "cod"
                ? "Pay with cash when your order arrives at your doorstep."
                : "Sandbox / demo gateway — no real charges are made."}
            </p>
          </div>

          <button type="submit" className="btn btn-primary btn-block btn-lg" style={{ marginTop: 20 }} disabled={loading}>
            {loading
              ? "Placing order..."
              : form.payment_method === "cod"
              ? `Place order — ${formatPrice(subtotal)} (Pay on delivery)`
              : `Place order — ${formatPrice(subtotal)}`}
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
