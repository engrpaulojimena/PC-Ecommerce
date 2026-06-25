export const dynamic = "force-dynamic";
import { sql } from "@/lib/db";
import { formatPrice } from "@/lib/types";
import CloudinaryMigrate from "@/components/CloudinaryMigrate";

export default async function AdminDashboard() {
  const [{ count: totalProducts }] = await sql`SELECT COUNT(*)::int AS count FROM products`;
  const [{ count: totalOrders }] = await sql`SELECT COUNT(*)::int AS count FROM orders`;
  const [{ revenue }] = await sql`
    SELECT COALESCE(SUM(total_amount), 0)::numeric AS revenue
    FROM orders WHERE payment_status = 'paid'
  `;
  const lowStock = await sql`SELECT * FROM products WHERE stock <= 5 ORDER BY stock ASC`;
  const recentOrders = await sql`SELECT * FROM orders ORDER BY created_at DESC LIMIT 5`;

  // Count products still using base64 images
  const [{ count: base64Count }] = await sql`
    SELECT COUNT(*)::int AS count FROM products WHERE image LIKE 'data:%'
  `;

  return (
    <>
      <h1 style={{ fontFamily: "var(--font-display)" }}>Dashboard</h1>

      {/* Cloudinary migration banner — shows only if there are base64 images */}
      <CloudinaryMigrate base64Count={base64Count} />

      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
        <div className="card">
          <div className="card-body">
            <div className="card-cat">Products</div>
            <div className="card-price" style={{ fontSize: "1.6rem" }}>{totalProducts}</div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="card-cat">Orders</div>
            <div className="card-price" style={{ fontSize: "1.6rem" }}>{totalOrders}</div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="card-cat">Revenue (paid)</div>
            <div className="card-price" style={{ fontSize: "1.6rem" }}>{formatPrice(parseFloat(revenue))}</div>
          </div>
        </div>
      </div>

      <h2 className="section-title">Recent orders</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Payment</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {recentOrders.map((o) => (
            <tr key={o.id}>
              <td>#{o.id}</td>
              <td>{o.guest_name}</td>
              <td>{formatPrice(o.total_amount)}</td>
              <td>{o.payment_status}</td>
              <td>{o.order_status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="section-title">Low stock (≤5)</h2>
      {lowStock.length === 0 ? (
        <p style={{ color: "var(--text-dim)" }}>All products are well stocked.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {lowStock.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td style={{ color: "var(--warn)" }}>{p.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
