import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

function randomHex(bytes: number): string {
  const arr = new Uint8Array(bytes);
  crypto.getRandomValues(arr);
  return Array.from(arr).map(b => b.toString(16).padStart(2, "0")).join("");
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { decision } = await req.json();
    const [order] = await sql`SELECT * FROM orders WHERE id = ${params.id}`;

    if (!order || order.payment_status !== "pending") {
      return NextResponse.json({ error: "Invalid order" }, { status: 400 });
    }

    if (decision === "pay") {
      const reference = `${order.payment_method.toUpperCase()}-${randomHex(4)}`;

      await sql`
        UPDATE orders SET payment_status = 'paid', payment_reference = ${reference}
        WHERE id = ${params.id}
      `;

      // Deduct stock
      const items = await sql`SELECT * FROM order_items WHERE order_id = ${params.id}`;
      for (const item of items) {
        if (item.product_id) {
          await sql`
            UPDATE products SET stock = GREATEST(0, stock - ${item.quantity})
            WHERE id = ${item.product_id}
          `;
        }
      }

      return NextResponse.json({ success: true, reference });
    } else {
      await sql`
        UPDATE orders SET payment_status = 'failed', order_status = 'cancelled'
        WHERE id = ${params.id}
      `;
      return NextResponse.json({ success: false });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
