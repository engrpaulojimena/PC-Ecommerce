import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  const products = await sql`
    SELECT p.*, c.name AS category_name
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    ORDER BY p.id DESC
  `;
  return NextResponse.json({ products });
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const { name, description, price, stock, category_id } = await req.json();
    if (!name || price <= 0) {
      return NextResponse.json({ error: "Invalid name or price." }, { status: 400 });
    }
    const [product] = await sql`
      INSERT INTO products (name, description, price, stock, category_id, image)
      VALUES (${name}, ${description ?? null}, ${price}, ${stock ?? 0}, ${category_id ?? null}, 'no-image.png')
      RETURNING *
    `;
    return NextResponse.json({ product });
  } catch (err) {
    const msg = (err as Error).message;
    if (msg === "Unauthorized") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
