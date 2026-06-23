import { sql } from "@/lib/db";
import { Product, Category, formatPrice } from "@/lib/types";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";

interface Props {
  searchParams: { category?: string; q?: string };
}

const CATEGORY_ICONS: Record<string, string> = {
  cpu: `<path d="M8 8h24v24H8z" stroke="currentColor" stroke-width="1.5" rx="2"/><path d="M12 12h16v16H12z" stroke="currentColor" stroke-width="1"/><line x1="20" y1="8" x2="20" y2="4" stroke="currentColor" stroke-width="1.5"/><line x1="20" y1="36" x2="20" y2="32" stroke="currentColor" stroke-width="1.5"/><line x1="8" y1="20" x2="4" y2="20" stroke="currentColor" stroke-width="1.5"/><line x1="32" y1="20" x2="36" y2="20" stroke="currentColor" stroke-width="1.5"/>`,
  gpu: `<rect x="4" y="12" width="32" height="18" rx="2" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="12" x2="12" y2="8" stroke="currentColor" stroke-width="1.5"/><line x1="20" y1="12" x2="20" y2="8" stroke="currentColor" stroke-width="1.5"/><line x1="28" y1="12" x2="28" y2="8" stroke="currentColor" stroke-width="1.5"/><rect x="8" y="16" width="24" height="10" rx="1" stroke="currentColor" stroke-width="1"/>`,
  ram: `<rect x="6" y="12" width="28" height="16" rx="2" stroke="currentColor" stroke-width="1.5"/><rect x="10" y="16" width="20" height="8" rx="0.5" stroke="currentColor" stroke-width="1"/>`,
  storage: `<rect x="8" y="8" width="24" height="24" rx="2" stroke="currentColor" stroke-width="1.5"/><circle cx="20" cy="20" r="6" stroke="currentColor" stroke-width="1"/><circle cx="20" cy="20" r="2" fill="currentColor" opacity="0.3"/>`,
  psu: `<rect x="6" y="10" width="28" height="20" rx="2" stroke="currentColor" stroke-width="1.5"/><circle cx="28" cy="20" r="4" stroke="currentColor" stroke-width="1"/><line x1="10" y1="16" x2="18" y2="16" stroke="currentColor" stroke-width="1.2"/><line x1="10" y1="20" x2="18" y2="20" stroke="currentColor" stroke-width="1.2"/><line x1="10" y1="24" x2="18" y2="24" stroke="currentColor" stroke-width="1.2"/>`,
  case: `<rect x="8" y="4" width="20" height="32" rx="2" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="10" x2="24" y2="10" stroke="currentColor" stroke-width="1"/><circle cx="18" cy="28" r="3" stroke="currentColor" stroke-width="1"/>`,
  cooling: `<circle cx="20" cy="20" r="12" stroke="currentColor" stroke-width="1.5"/><circle cx="20" cy="20" r="4" stroke="currentColor" stroke-width="1"/><line x1="20" y1="8" x2="20" y2="14" stroke="currentColor" stroke-width="1.5"/><line x1="20" y1="26" x2="20" y2="32" stroke="currentColor" stroke-width="1.5"/>`,
  default: `<rect x="6" y="6" width="28" height="28" rx="2" stroke="currentColor" stroke-width="1.5"/><line x1="13" y1="20" x2="27" y2="20" stroke="currentColor" stroke-width="1.2"/><line x1="20" y1="13" x2="20" y2="27" stroke="currentColor" stroke-width="1.2"/>`,
};

function getCategoryIcon(name: string) {
  const key = name?.toLowerCase() ?? "default";
  return CATEGORY_ICONS[key] ?? CATEGORY_ICONS.default;
}

export default async function ShopPage({ searchParams }: Props) {
  const categoryId = searchParams.category || "";
  const search = searchParams.q?.trim() || "";

  let products: Product[];
  if (categoryId && search) {
    products = await sql`
      SELECT p.*, c.name AS category_name FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.category_id = ${categoryId} AND p.name ILIKE ${"%" + search + "%"}
      ORDER BY p.created_at DESC` as Product[];
  } else if (categoryId) {
    products = await sql`
      SELECT p.*, c.name AS category_name FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.category_id = ${categoryId}
      ORDER BY p.created_at DESC` as Product[];
  } else if (search) {
    products = await sql`
      SELECT p.*, c.name AS category_name FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.name ILIKE ${"%" + search + "%"}
      ORDER BY p.created_at DESC` as Product[];
  } else {
    products = await sql`
      SELECT p.*, c.name AS category_name FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.created_at DESC` as Product[];
  }

  const categories: Category[] = await sql`SELECT * FROM categories ORDER BY name` as Category[];

  function stockBadge(stock: number) {
    if (stock === 0) return { cls: "card-badge badge-outofstock", label: "Out of stock" };
    if (stock <= 5) return { cls: "card-badge badge-lowstock", label: "Low stock" };
    return { cls: "card-badge badge-instock", label: "In stock" };
  }

  return (
    <>
      <div className="page-hero">
        <div className="hero-row">
          <div>
            <div className="page-hero-eyebrow">// PC components store</div>
            <h1>Build your <span className="accent">next rig.</span></h1>
            <p>Browse parts, compare specs, check out fast.</p>
          </div>
          <form method="get" className="search-bar">
            <input type="text" name="q" placeholder="Search components..." defaultValue={search} />
            <button type="submit">SEARCH</button>
          </form>
        </div>
      </div>

      <div className="tab-bar-wrap">
        <div className="tab-bar">
          <Link href={search ? `/?q=${search}` : "/"} className={`tab-item ${categoryId === "" ? "active" : ""}`}>
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/?category=${cat.id}${search ? `&q=${search}` : ""}`}
              className={`tab-item ${String(categoryId) === String(cat.id) ? "active" : ""}`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
        <div className="tab-count">{products.length} ITEMS</div>
      </div>

      {products.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">⬡</div>
          <h3>No components found</h3>
          <p>Try a different search or browse all categories.</p>
          <Link href="/" className="btn btn-ghost">Clear filters</Link>
        </div>
      ) : (
        <div className="grid">
          {products.map((p) => {
            const badge = stockBadge(p.stock);
            return (
              <div key={p.id} className="card">
                <div className="card-img">
                  <div className="card-img-placeholder">
                    <svg width="44" height="44" viewBox="0 0 40 40" fill="none" color="#3898ff"
                      dangerouslySetInnerHTML={{ __html: getCategoryIcon(p.category_name ?? "") }} />
                    <span>{p.category_name ?? "Part"}</span>
                  </div>
                  <span className={badge.cls}>{badge.label}</span>
                </div>
                <div className="card-body">
                  <div className="card-cat">{p.category_name ?? "Uncategorized"}</div>
                  <div className="card-name">{p.name}</div>
                  <div className="card-price">{formatPrice(p.price)}</div>
                  <div className={`card-stock ${p.stock <= 5 && p.stock > 0 ? "warn" : ""}`}>
                    {p.stock > 0 ? `${p.stock} units in stock` : ""}
                  </div>
                  <div className="card-actions">
                    <Link href={`/product/${p.id}`} className="btn btn-sm">View</Link>
                    {p.stock > 0 && (
                      <AddToCartButton productId={p.id} name={p.name} price={p.price} stock={p.stock} size="sm" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
