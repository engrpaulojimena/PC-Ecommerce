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

  const hasImage = (img: string | null | undefined) =>
    img && img !== "no-image.png" && img.length > 20;

  const stockLabel = product.stock === 0 ? "Out of stock"
    : product.stock <= 5 ? `Only ${product.stock} left in stock`
    : `${product.stock} units in stock`;
  const stockColor = product.stock === 0 ? "var(--danger)"
    : product.stock <= 5 ? "var(--warn)"
    : "var(--good)";

  return (
    <>
      <Link href="/" style={{
        color: "var(--text-dim)", fontSize: "0.8rem", display: "inline-flex", alignItems: "center",
        gap: 6, marginBottom: 28, fontFamily: "var(--font-mono)", letterSpacing: "0.5px",
        transition: "color 0.16s ease",
      }}>
        ← Back to shop
      </Link>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(280px, 420px) 1fr", gap: 48, marginBottom: 64 }}>
        {/* Product Image */}
        <div style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-xl)",
          height: 380,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
        }}>
          {hasImage(product.image) ? (
            <img src={product.image!} alt={product.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, opacity: 0.12 }}>
              <svg width="72" height="72" viewBox="0 0 40 40" fill="none" stroke="currentColor">
                <rect x="5" y="5" width="30" height="30" rx="3" strokeWidth="1.5"/>
                <circle cx="20" cy="18" r="5" strokeWidth="1.5"/>
                <path d="M5 30 L12 22 L18 28 L24 21 L35 32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "3px", color: "var(--text)" }}>
                NO IMAGE
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "2.5px",
            color: "var(--accent)", textTransform: "uppercase", marginBottom: 10, opacity: 0.8,
          }}>
            {product.category_name ?? "Uncategorized"}
          </div>

          <h1 style={{
            fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 800,
            color: "#fff", marginBottom: 16, lineHeight: 1.15, letterSpacing: "-0.5px",
          }}>
            {product.name}
          </h1>

          <div style={{
            fontFamily: "var(--font-display)", fontSize: "2.2rem", fontWeight: 800,
            color: "var(--accent)", marginBottom: 8, letterSpacing: "-1px",
          }}>
            {formatPrice(product.price)}
          </div>

          <div style={{
            fontSize: "0.8rem", color: stockColor, marginBottom: 24,
            display: "flex", alignItems: "center", gap: 8,
            fontFamily: "var(--font-mono)",
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: stockColor, display: "inline-block", flexShrink: 0 }} />
            {stockLabel}
          </div>

          {product.description && (
            <p style={{
              color: "var(--text-dim)", lineHeight: 1.75, maxWidth: 540, marginBottom: 32,
              fontSize: "0.92rem", borderLeft: "2px solid var(--accent-border)",
              paddingLeft: 16, borderRadius: 2,
            }}>
              {product.description}
            </p>
          )}

          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", marginTop: "auto" }}>
            {product.stock > 0 ? (
              <AddToCartButton productId={product.id} name={product.name} price={product.price} stock={product.stock} />
            ) : (
              <button className="btn btn-lg" disabled>Out of stock</button>
            )}
            <Link href="/cart" className="btn btn-lg">View cart →</Link>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <>
          <div className="section-title">Related components</div>
          <div className="grid">
            {related.map((p) => {
              const imgSrc = hasImage(p.image) ? p.image : null;
              return (
                <div key={p.id} className="card">
                  <Link href={`/product/${p.id}`} style={{ textDecoration: "none" }}>
                    <div className="card-img">
                      {imgSrc ? (
                        <img src={imgSrc} alt={p.name} />
                      ) : (
                        <div className="card-img-placeholder">
                          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor">
                            <rect x="8" y="8" width="24" height="24" rx="2" strokeWidth="1.5"/>
                          </svg>
                          <span>{p.category_name ?? "Part"}</span>
                        </div>
                      )}
                      {p.stock === 0 && <span className="card-badge badge-outofstock">Out of stock</span>}
                      {p.stock > 0 && p.stock <= 5 && <span className="card-badge badge-lowstock">Low stock</span>}
                    </div>
                  </Link>
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
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
