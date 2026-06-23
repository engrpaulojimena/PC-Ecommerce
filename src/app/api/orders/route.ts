import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    const { name, email, address, payment_method, items, totalAmount } = await req.json();

    if (!name || !email || !address || !payment_method || !items?.length) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // Create order
    const [order] = await sql`
      INSERT INTO orders (user_id, guest_name, guest_email, guest_address, total_amount, payment_method, payment_status, order_status)
      VALUES (
        ${session?.id ?? null},
        ${name},
        ${email},
        ${address},
        ${totalAmount},
        ${payment_method},
        'pending',
        'processing'
      )
      RETURNING id
    `;

    // Insert order items
    for (const item of items) {
      await sql`
        INSERT INTO order_items (order_id, product_id, product_name, price, quantity)
        VALUES (${order.id}, ${item.productId}, ${item.name}, ${item.price}, ${item.quantity})
      `;
    }

    return NextResponse.json({ orderId: order.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
