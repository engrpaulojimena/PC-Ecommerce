"use client";
export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { loadCartFromDB, setLocalCart, syncCartToDB } from "@/lib/cart";

const DEMO_ACCOUNTS = {
  admin: { email: "demoadmin@pcforge.com", password: "demo1234", label: "Demo Admin" },
  customer: { email: "democustomer@pcforge.com", password: "demo1234", label: "Demo Customer" },
};

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      const previousUserRaw = localStorage.getItem("pcforge_user");
      const previousUser = previousUserRaw ? JSON.parse(previousUserRaw) : null;
      if (previousUser && previousUser.email !== data.user.email) {
        localStorage.removeItem("pcforge_cart");
      }

      localStorage.setItem("pcforge_user", JSON.stringify(data.user));

      const mergedCart = await loadCartFromDB();
      setLocalCart(mergedCart);
      await syncCartToDB(mergedCart);

      window.dispatchEvent(new Event("userUpdated"));
      window.dispatchEvent(new Event("cartUpdated"));

      router.refresh();

      const redirect = searchParams.get("redirect");
      if (redirect) {
        router.push(redirect);
      } else {
        router.push(data.user.role === "admin" ? "/admin/dashboard" : "/");
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  function fillDemo(type: "admin" | "customer") {
    setForm({ email: DEMO_ACCOUNTS[type].email, password: DEMO_ACCOUNTS[type].password });
    setError("");
  }

  return (
    <div className="form-card">
      <h2>Log in</h2>

      {/* Demo accounts */}
      <div style={{
        background: "rgba(99,102,241,0.07)",
        border: "1px solid rgba(99,102,241,0.2)",
        borderRadius: 10,
        padding: "12px 14px",
        marginBottom: 20,
      }}>
        <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "#818CF8", marginBottom: 8 }}>
          🎭 Try a demo account
        </p>
        <div style={{ display: "flex", gap: 8 }}>
          {(["admin", "customer"] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => fillDemo(type)}
              style={{
                flex: 1,
                padding: "6px 10px",
                fontSize: "0.75rem",
                fontWeight: 600,
                borderRadius: 7,
                background: "rgba(99,102,241,0.15)",
                color: "#A5B4FC",
                border: "1px solid rgba(99,102,241,0.25)",
                cursor: "pointer",
              }}
            >
              {DEMO_ACCOUNTS[type].label}
            </button>
          ))}
        </div>
        <p style={{ fontSize: "0.7rem", color: "var(--text-dim)", marginTop: 7, textAlign: "center" }}>
          Password for both: <strong>demo1234</strong>
        </p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required autoComplete="email" />
        <label>Password</label>
        <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required autoComplete="current-password" />
        <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: 24 }} disabled={loading}>
          {loading ? "Logging in..." : "Log in →"}
        </button>
      </form>
      <p style={{ marginTop: 18, fontSize: "0.82rem", color: "var(--text-dim)", textAlign: "center" }}>
        No account yet? <Link href="/register">Create one</Link>
      </p>
    </div>
  );
}