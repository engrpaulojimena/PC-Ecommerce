import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getSession } from "@/lib/auth";

// GET /api/cart — fetch cart for logged-in user
export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ items: [] });

  const items = await sql`
    SELECT c.product_id as "productId", c.quantity, p.name, p.price, p.stock
    FROM cart_items c
    JOIN products p ON p.id = c.product_id
    WHERE c.user_id = ${session.id}
  `;
  return NextResponse.json({ items });
}

// POST /api/cart — replace full cart for logged-in user
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { items } = await req.json();

  await sql`DELETE FROM cart_items WHERE user_id = ${session.id}`;

  for (const item of items) {
    if (item.quantity > 0) {
      await sql`
        INSERT INTO cart_items (user_id, product_id, quantity)
        VALUES (${session.id}, ${item.productId}, ${item.quantity})
        ON CONFLICT (user_id, product_id)
        DO UPDATE SET quantity = EXCLUDED.quantity
      `;
    }
  }

  return NextResponse.json({ success: true });
}

// DELETE /api/cart — clear cart
export async function DELETE() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await sql`DELETE FROM cart_items WHERE user_id = ${session.id}`;
  return NextResponse.json({ success: true });
}
