"use client";

import { useRouter } from "next/navigation";

export default function AdminDeleteProduct({ productId, productName }: { productId: number; productName: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`Delete "${productName}"?`)) return;
    const res = await fetch(`/api/products/${productId}`, { method: "DELETE" });
    if (res.ok) {
      router.refresh();
    } else {
      alert("Failed to delete product.");
    }
  };

  return (
    <button className="btn btn-sm btn-danger" onClick={handleDelete}>
      Delete
    </button>
  );
}
