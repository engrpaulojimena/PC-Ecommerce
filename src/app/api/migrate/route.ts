import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

// GET /api/migrate — run once to create cart_items table
export async function GET() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS cart_items (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
        quantity INTEGER NOT NULL DEFAULT 1,
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(user_id, product_id)
      )
    `;
    return NextResponse.json({ success: true, message: "cart_items table ready" });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
