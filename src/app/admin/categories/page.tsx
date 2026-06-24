"use client";

import { useState, useEffect } from "react";
import type { Category } from "@/lib/types";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchCategories = async () => {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data.categories ?? []);
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add category");
      setNewName("");
      setSuccess(`Category "${data.category.name}" added!`);
      await fetchCategories();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Delete category "${name}"? Products in this category will become uncategorized.`)) return;
    setDeleteId(id);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/categories", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Failed to delete");
      setSuccess(`Category "${name}" deleted.`);
      await fetchCategories();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div style={{ padding: "32px 28px", maxWidth: 640 }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--accent)", letterSpacing: 2, marginBottom: 8, opacity: 0.8 }}>
          // admin panel
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.5px" }}>
          Categories
        </h1>
        <p style={{ color: "var(--text-dim)", fontSize: "0.88rem", marginTop: 6 }}>
          Manage product categories. Deleting a category won't delete its products.
        </p>
      </div>

      {error && <div className="alert alert-error" style={{ marginBottom: 16 }}>{error}</div>}
      {success && (
        <div style={{
          background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)",
          color: "var(--good)", borderRadius: "var(--radius-md)", padding: "12px 16px",
          fontSize: "0.85rem", marginBottom: 16,
        }}>
          {success}
        </div>
      )}

      {/* Add form */}
      <div style={{ background: "var(--bg-2)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: 24, marginBottom: 24 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: 2, textTransform: "uppercase", color: "var(--accent)", marginBottom: 14, opacity: 0.8 }}>
          Add New Category
        </div>
        <form onSubmit={handleAdd} style={{ display: "flex", gap: 10 }}>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="e.g. Cooling Systems"
            style={{ flex: 1 }}
            required
          />
          <button type="submit" className="btn btn-solid" disabled={loading || !newName.trim()}>
            {loading ? "Adding…" : "+ Add"}
          </button>
        </form>
      </div>

      {/* Categories list */}
      <div style={{ background: "var(--bg-2)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
        <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--border)", fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: 2, textTransform: "uppercase", color: "var(--accent)", opacity: 0.8 }}>
          {categories.length} {categories.length === 1 ? "Category" : "Categories"}
        </div>
        {categories.length === 0 ? (
          <div style={{ padding: "40px 20px", textAlign: "center", color: "var(--text-dim)", fontSize: "0.88rem" }}>
            No categories yet. Add one above.
          </div>
        ) : (
          <ul style={{ listStyle: "none" }}>
            {categories.map((cat, i) => (
              <li key={cat.id} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "13px 20px",
                borderBottom: i < categories.length - 1 ? "1px solid var(--border)" : "none",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent)", flexShrink: 0, opacity: 0.6 }} />
                  <span style={{ fontWeight: 500, color: "var(--text)", fontSize: "0.9rem" }}>{cat.name}</span>
                  <span style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}>#{cat.id}</span>
                </div>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(cat.id, cat.name)}
                  disabled={deleteId === cat.id}
                  style={{ fontSize: "0.75rem", padding: "5px 12px" }}
                >
                  {deleteId === cat.id ? "…" : "Delete"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
