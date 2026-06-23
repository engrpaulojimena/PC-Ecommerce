import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const orders = await sql`
    SELECT * FROM orders WHERE user_id = ${session.id} ORDER BY created_at DESC
  `;
  return NextResponse.json({ orders });
}
