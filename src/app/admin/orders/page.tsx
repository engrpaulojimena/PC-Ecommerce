import { sql } from "@/lib/db";
import { formatPrice } from "@/lib/types";
import AdminOrderStatus from "@/components/AdminOrderStatus";

export const dynamic = "force-dynamic";

export default async function AdminOrders() {
  const orders = await sql`SELECT * FROM orders ORDER BY created_at DESC`;

  return (
    <>
      <h1 style={{ fontFamily: "var(--font-display)" }}>Orders</h1>
      <table style={{ marginTop: 14 }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Payment</th>
            <th>Pay status</th>
            <th>Order status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>#{o.id}</td>
              <td>
                {o.guest_name}
                <br />
                <span style={{ color: "var(--text-dim)", fontSize: "0.78rem" }}>
                  {o.guest_email}
                </span>
              </td>
              <td>{formatPrice(o.total_amount)}</td>
              <td>{o.payment_method?.toUpperCase()}</td>
              <td>
                <span className={`badge badge-${o.payment_status === "paid" ? "paid" : "pending"}`}>
                  {o.payment_status}
                </span>
              </td>
              <td>
                <AdminOrderStatus orderId={o.id} currentStatus={o.order_status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
