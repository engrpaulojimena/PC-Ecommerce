import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  const categories = await sql`SELECT * FROM categories ORDER BY name`;
  return NextResponse.json({ categories });
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const { name } = await req.json();
    if (!name || !name.trim()) {
      return NextResponse.json({ error: "Category name is required." }, { status: 400 });
    }
    const [category] = await sql`
      INSERT INTO categories (name) VALUES (${name.trim()})
      ON CONFLICT (name) DO NOTHING
      RETURNING *
    `;
    if (!category) {
      return NextResponse.json({ error: "Category already exists." }, { status: 409 });
    }
    return NextResponse.json({ category });
  } catch (err) {
    const msg = (err as Error).message;
    if (msg === "Unauthorized") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await requireAdmin();
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "ID required." }, { status: 400 });
    await sql`DELETE FROM categories WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (err) {
    const msg = (err as Error).message;
    if (msg === "Unauthorized") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
