export const dynamic = "force-dynamic";

import { sql } from "@/lib/db";
import { Category } from "@/lib/types";
import AdminProductForm from "@/components/AdminProductForm";

export default async function NewProductPage() {
  const categories = await sql`SELECT * FROM categories ORDER BY name` as unknown as Category[];
  return <AdminProductForm categories={categories} />;
}
