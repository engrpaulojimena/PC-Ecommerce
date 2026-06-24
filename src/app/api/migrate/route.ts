import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

// GET /api/migrate — setup tables
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

// POST /api/migrate — migrate base64 images to Cloudinary
export async function POST() {
  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      return NextResponse.json({
        error: "Cloudinary not configured. Add CLOUDINARY_CLOUD_NAME and CLOUDINARY_UPLOAD_PRESET to .env.local"
      }, { status: 500 });
    }

    // Find all products with base64 images
    const products = await sql`
      SELECT id, name, image FROM products
      WHERE image LIKE 'data:%'
    `;

    if (products.length === 0) {
      return NextResponse.json({ success: true, migrated: 0, message: "No base64 images found — already migrated!" });
    }

    const results: { id: number; name: string; status: "ok" | "error"; url?: string; error?: string }[] = [];

    for (const product of products) {
      try {
        // Upload base64 directly to Cloudinary (it accepts data URLs natively)
        const fd = new FormData();
        fd.append("file", product.image);
        fd.append("upload_preset", uploadPreset);
        fd.append("folder", "pcjecom");
        fd.append("public_id", `product_${product.id}`);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: "POST",
          body: fd,
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error?.message ?? "Upload failed");

        // Update DB with new Cloudinary URL
        await sql`UPDATE products SET image = ${data.secure_url} WHERE id = ${product.id}`;

        results.push({ id: product.id, name: product.name, status: "ok", url: data.secure_url });
      } catch (err) {
        results.push({ id: product.id, name: product.name, status: "error", error: (err as Error).message });
      }
    }

    const migrated = results.filter(r => r.status === "ok").length;
    const failed = results.filter(r => r.status === "error").length;

    return NextResponse.json({ success: true, migrated, failed, results });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
