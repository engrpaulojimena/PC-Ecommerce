
export const dynamic = "force-dynamic";

import { sql } from "@/lib/db";
import { formatPrice } from "@/lib/types";
import Link from "next/link";
import AdminDeleteProduct from "@/components/AdminDeleteProduct";


export default async function AdminProducts() {
  const products = await sql`
    SELECT p.*, c.name AS category_name
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    ORDER BY p.id DESC
  `;

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontFamily: "var(--font-display)" }}>Products</h1>
        <Link href="/admin/products/new" className="btn btn-solid">
          + Add product
        </Link>
      </div>

      <table style={{ marginTop: 14 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.category_name ?? "—"}</td>
              <td>{formatPrice(p.price)}</td>
              <td>{p.stock}</td>
              <td>
                <div style={{ display: "flex", gap: 6 }}>
                  <Link href={`/admin/products/${p.id}/edit`} className="btn btn-sm">
                    Edit
                  </Link>
                  <AdminDeleteProduct productId={p.id} productName={p.name} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
