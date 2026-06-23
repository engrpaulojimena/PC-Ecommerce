"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ full_name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      localStorage.setItem("pcforge_user", JSON.stringify(data.user));
      window.dispatchEvent(new Event("userUpdated"));
      router.push("/");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-card">
      <h2>Create account</h2>
      {error && <div className="alert alert-error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>Full name</label>
        <input type="text" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} required autoComplete="name" />
        <label>Email</label>
        <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required autoComplete="email" />
        <label>Password</label>
        <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required autoComplete="new-password" minLength={8} />
        <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: 24 }} disabled={loading}>
          {loading ? "Creating account..." : "Create account →"}
        </button>
      </form>
      <p style={{ marginTop: 18, fontSize: "0.82rem", color: "var(--text-dim)", textAlign: "center" }}>
        Already have an account? <Link href="/login">Log in</Link>
      </p>
    </div>
  );
}
