import { sql } from "@/lib/db";
import { Product, formatPrice } from "@/lib/types";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const [product] = await sql`
    SELECT p.*, c.name AS category_name
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.id = ${params.id}
  ` as Product[];

  if (!product) notFound();

  const related = await sql`
    SELECT p.*, c.name AS category_name FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.category_id = ${product.category_id} AND p.id != ${product.id}
    LIMIT 4
  ` as Product[];

  const stockLabel = product.stock === 0 ? "Out of stock"
    : product.stock <= 5 ? `Only ${product.stock} left`
    : `${product.stock} units in stock`;
  const stockColor = product.stock === 0 ? "var(--danger)"
    : product.stock <= 5 ? "var(--warn)"
    : "var(--good)";

  return (
    <>
      <Link href="/" style={{ color: "var(--text-dim)", fontSize: "0.78rem", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 24, fontFamily: "var(--font-display)", letterSpacing: "0.5px" }}>
        ← Back to shop
      </Link>

      <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 40, marginBottom: 60 }}>
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", height: 300, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12, color: "var(--accent)", opacity: 0.2 }}>
          <svg width="64" height="64" viewBox="0 0 40 40" fill="none">
            <rect x="8" y="8" width="24" height="24" rx="2" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="12" y="12" width="16" height="16" rx="1" stroke="currentColor" strokeWidth="1"/>
            <line x1="20" y1="8" x2="20" y2="4" stroke="currentColor" strokeWidth="1.5"/>
            <line x1="20" y1="36" x2="20" y2="32" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "0.6rem", letterSpacing: "2px" }}>NO IMAGE</span>
        </div>

        <div>
          <div className="card-cat" style={{ fontSize: "0.65rem", marginBottom: 10 }}>{product.category_name ?? "Uncategorized"}</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginBottom: 14, lineHeight: 1.25 }}>
            {product.name}
          </h1>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: "var(--accent)", marginBottom: 6 }}>
            {formatPrice(product.price)}
          </div>
          <div style={{ fontSize: "0.78rem", color: stockColor, marginBottom: 20, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: stockColor, display: "inline-block" }} />
            {stockLabel}
          </div>

          {product.description && (
            <p style={{ color: "var(--text-dim)", lineHeight: 1.7, maxWidth: 520, marginBottom: 28, fontSize: "0.9rem" }}>
              {product.description}
            </p>
          )}

          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            {product.stock > 0 ? (
              <AddToCartButton productId={product.id} name={product.name} price={product.price} stock={product.stock} />
            ) : (
              <button className="btn" disabled>Out of stock</button>
            )}
            <Link href="/cart" className="btn">View cart →</Link>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <>
          <div className="section-title">Related components</div>
          <div className="grid">
            {related.map((p) => (
              <div key={p.id} className="card">
                <div className="card-img">
                  <div className="card-img-placeholder">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" color="#3898ff">
                      <rect x="8" y="8" width="24" height="24" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                    <span>{p.category_name ?? "Part"}</span>
                  </div>
                  {p.stock === 0 && <span className="card-badge badge-outofstock">Out of stock</span>}
                  {p.stock > 0 && p.stock <= 5 && <span className="card-badge badge-lowstock">Low stock</span>}
                </div>
                <div className="card-body">
                  <div className="card-cat">{p.category_name ?? "Uncategorized"}</div>
                  <div className="card-name">{p.name}</div>
                  <div className="card-price">{formatPrice(p.price)}</div>
                  <div className="card-actions">
                    <Link href={`/product/${p.id}`} className="btn btn-sm">View</Link>
                    {p.stock > 0 && <AddToCartButton productId={p.id} name={p.name} price={p.price} stock={p.stock} size="sm" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
