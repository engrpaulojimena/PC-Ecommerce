export const dynamic = "force-dynamic";

import { sql } from "@/lib/db";
import { notFound } from "next/navigation";
import { Category, Product } from "@/lib/types";
import AdminProductForm from "@/components/AdminProductForm";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const rows = await sql`SELECT * FROM products WHERE id = ${params.id}` as unknown as Product[];
  const product = rows[0];
  if (!product) notFound();
  const categories = await sql`SELECT * FROM categories ORDER BY name` as unknown as Category[];
  return <AdminProductForm categories={categories} product={product} />;
}
