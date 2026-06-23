"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Category { id: number; name: string; }
interface Product {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  category_id?: number | null;
}

interface Props {
  categories: Category[];
  product?: Product;
}

export default function AdminProductForm({ categories, product }: Props) {
  const router = useRouter();
  const isEdit = !!product?.id;

  const [form, setForm] = useState({
    name: product?.name ?? "",
    description: product?.description ?? "",
    price: product?.price?.toString() ?? "",
    stock: product?.stock?.toString() ?? "0",
    category_id: product?.category_id?.toString() ?? "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const body = {
        name: form.name,
        description: form.description || null,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
        category_id: form.category_id ? parseInt(form.category_id) : null,
      };
      const url = isEdit ? `/api/products/${product!.id}` : "/api/products";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save product");
      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 style={{ fontFamily: "var(--font-display)" }}>
        {isEdit ? "Edit product" : "Add product"}
      </h1>
      {error && <div className="alert alert-error">{error}</div>}
      <form onSubmit={handleSubmit} className="form-card" style={{ maxWidth: 520, margin: 0 }}>
        <label>Name</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <label>Description</label>
        <textarea
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <label>Category</label>
        <select
          value={form.category_id}
          onChange={(e) => setForm({ ...form, category_id: e.target.value })}
        >
          <option value="">— None —</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <label>Price (₱)</label>
        <input
          type="number"
          step="0.01"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <label>Stock</label>
        <input
          type="number"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
          required
        />
        <button
          type="submit"
          className="btn btn-solid btn-block"
          style={{ marginTop: 18 }}
          disabled={loading}
        >
          {loading ? "Saving..." : isEdit ? "Save changes" : "Add product"}
        </button>
        <a
          href="/admin/products"
          className="btn btn-block"
          style={{ marginTop: 8, textAlign: "center" }}
        >
          Cancel
        </a>
      </form>
    </>
  );
}
