"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";

export default function AdminDeleteProduct({ productId, productName }: { productId: number; productName: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Delete "${productName}"?`)) return;
    setLoading(true);
    const res = await fetch(`/api/products/${productId}`, { method: "DELETE" });
    if (res.ok) {
      router.refresh();
    } else {
      alert("Failed to delete product.");
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingScreen message="Deleting product" fullScreen />}
      <button className="btn btn-sm btn-danger" onClick={handleDelete} disabled={loading}>
        Delete
      </button>
    </>
  );
}
