import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const [product] = await sql`SELECT * FROM products WHERE id = ${params.id}`;
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ product });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdmin();
    const { name, description, price, stock, category_id, image } = await req.json();
    if (!name || price <= 0) {
      return NextResponse.json({ error: "Invalid name or price." }, { status: 400 });
    }
    if (image !== undefined) {
      await sql`
        UPDATE products
        SET name = ${name}, description = ${description ?? null},
            price = ${price}, stock = ${stock ?? 0}, category_id = ${category_id ?? null},
            image = ${image || "no-image.png"}
        WHERE id = ${params.id}
      `;
    } else {
      await sql`
        UPDATE products
        SET name = ${name}, description = ${description ?? null},
            price = ${price}, stock = ${stock ?? 0}, category_id = ${category_id ?? null}
        WHERE id = ${params.id}
      `;
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    const msg = (err as Error).message;
    if (msg === "Unauthorized") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdmin();
    await sql`DELETE FROM products WHERE id = ${params.id}`;
    return NextResponse.json({ success: true });
  } catch (err) {
    const msg = (err as Error).message;
    if (msg === "Unauthorized") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
