"use client";
export const dynamic = "force-dynamic";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const user = localStorage.getItem("pcforge_user");
    if (!user) { router.push("/login"); return; }
    const parsed = JSON.parse(user);
    if (parsed.role !== "admin") router.push("/");
  }, [router]);

  const isActive = (path: string) => pathname === path ? "active" : "";

  return (
    <div>
      <div className="admin-subnav">
        <div className="admin-subnav-inner">
          <span className="admin-label">ADMIN</span>
          <Link href="/admin/dashboard" className={`tab-item ${isActive("/admin/dashboard")}`}>Dashboard</Link>
          <Link href="/admin/products" className={`tab-item ${isActive("/admin/products")}`}>Products</Link>
          <Link href="/admin/categories" className={`tab-item ${isActive("/admin/categories")}`}>Categories</Link>
          <Link href="/admin/orders" className={`tab-item ${isActive("/admin/orders")}`}>Orders</Link>
          <Link href="/" className="tab-item" style={{ marginLeft: "auto" }}>← Shop</Link>
        </div>
      </div>
      {children}
    </div>
  );
}
