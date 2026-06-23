import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { signToken } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const { full_name, email, password } = await req.json();

    if (!full_name || !email || !password) {
      return NextResponse.json({ error: "Please fill in all fields." }, { status: 400 });
    }

    const [existing] = await sql`SELECT id FROM users WHERE email = ${email}`;
    if (existing) {
      return NextResponse.json(
        { error: "An account with that email already exists." },
        { status: 409 }
      );
    }

    const hash = await bcrypt.hash(password, 10);
    const [user] = await sql`
      INSERT INTO users (full_name, email, password, role)
      VALUES (${full_name}, ${email}, ${hash}, 'customer')
      RETURNING id, full_name, email, role
    `;

    const token = await signToken({
      id: user.id,
      name: user.full_name,
      email: user.email,
      role: user.role,
    });

    const cookieStore = cookies();
    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return NextResponse.json({
      user: { id: user.id, name: user.full_name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
