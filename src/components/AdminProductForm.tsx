"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import type { Product, Category } from "@/lib/types";

interface Props {
  categories: Category[];
  product?: Partial<Product>;
}

export default function AdminProductForm({ categories, product }: Props) {
  const router = useRouter();
  const isEdit = !!product?.id;
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: product?.name ?? "",
    description: product?.description ?? "",
    price: product?.price?.toString() ?? "",
    stock: product?.stock?.toString() ?? "0",
    category_id: product?.category_id?.toString() ?? "",
  });
  const [imageUrl, setImageUrl] = useState<string>(product?.image && product.image !== "no-image.png" ? product.image : "");
  const [imageLoading, setImageLoading] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageLoading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setImageUrl(data.url);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setImageLoading(false);
    }
  };

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
        image: imageUrl || "no-image.png",
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
    <div className="admin-form-wrapper">
      <div className="admin-form-header">
        <div className="admin-form-eyebrow">// admin panel</div>
        <h1>{isEdit ? "Edit Product" : "Add New Product"}</h1>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit} className="admin-product-form">
        {/* Image Upload */}
        <div className="form-section">
          <div className="form-section-label">Product Image</div>
          <div className="image-upload-area" onClick={() => fileRef.current?.click()}>
            {imageUrl ? (
              <img src={imageUrl} alt="Preview" className="image-preview" />
            ) : (
              <div className="image-upload-placeholder">
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{imageLoading ? "Uploading..." : "Click to upload image"}</span>
                <span className="upload-hint">JPG, PNG, WEBP · Max 5MB</span>
              </div>
            )}
            {imageUrl && (
              <div className="image-overlay">
                <span>Change image</span>
              </div>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
          {imageUrl && (
            <button type="button" className="btn btn-sm btn-danger" style={{ marginTop: 8 }}
              onClick={() => { setImageUrl(""); if (fileRef.current) fileRef.current.value = ""; }}>
              Remove image
            </button>
          )}
        </div>

        {/* Details */}
        <div className="form-section">
          <div className="form-section-label">Product Details</div>
          <div className="form-grid-2">
            <div className="form-group full">
              <label>Product Name</label>
              <input type="text" value={form.name} placeholder="e.g. Ryzen 7 7800X3D"
                onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="form-group full">
              <label>Description</label>
              <textarea rows={3} value={form.description} placeholder="Brief product description..."
                onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })}>
                <option value="">— None —</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Price (₱)</label>
              <input type="number" step="0.01" min="0" value={form.price} placeholder="0.00"
                onChange={(e) => setForm({ ...form, price: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Stock Qty</label>
              <input type="number" min="0" value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })} required />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary btn-lg" disabled={loading || imageLoading}>
            {loading ? "Saving..." : isEdit ? "Save changes" : "Add product"}
          </button>
          <a href="/admin/products" className="btn btn-lg">Cancel</a>
        </div>
      </form>
    </div>
  );
}
