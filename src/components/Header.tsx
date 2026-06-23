"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Toast from "./Toast";

export default function Header() {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const pathname = usePathname();

  const refreshCart = () => {
    try {
      const raw = localStorage.getItem("pcforge_cart");
      if (!raw) { setCartCount(0); return; }
      const cart = JSON.parse(raw) as Record<string, { quantity: number }>;
      const total = Object.values(cart).reduce((sum, v) => sum + (v.quantity || 0), 0);
      setCartCount(total);
    } catch { setCartCount(0); }
  };

  useEffect(() => {
    const saved = (localStorage.getItem("pcforge_theme") || "dark") as "dark" | "light";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);

    try {
      const raw = localStorage.getItem("pcforge_user");
      if (raw) setUser(JSON.parse(raw));
    } catch { localStorage.removeItem("pcforge_user"); }

    refreshCart();

    const onCart = () => refreshCart();
    const onUser = () => {
      try {
        const raw = localStorage.getItem("pcforge_user");
        setUser(raw ? JSON.parse(raw) : null);
      } catch { setUser(null); }
      refreshCart();
    };

    window.addEventListener("cartUpdated", onCart);
    window.addEventListener("userUpdated", onUser);
    return () => {
      window.removeEventListener("cartUpdated", onCart);
      window.removeEventListener("userUpdated", onUser);
    };
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("pcforge_theme", next);
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    localStorage.removeItem("pcforge_user");
    localStorage.removeItem("pcforge_cart");
    setUser(null);
    setCartCount(0);
    window.dispatchEvent(new Event("userUpdated"));
    window.dispatchEvent(new Event("cartUpdated"));
    window.location.href = "/";
  };

  const isActive = (path: string) =>
    pathname === path || (path !== "/" && pathname.startsWith(path + "/"))
      ? "nav-active"
      : "";

  return (
    <>
      <header className="site-header">
        <div className="header-bar">
          <Link href="/" className="brand">
            <div className="brand-icon">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="1" y="1" width="7" height="7" rx="2" fill="white"/>
                <rect x="10" y="1" width="7" height="7" rx="2" fill="white" opacity="0.5"/>
                <rect x="1" y="10" width="7" height="7" rx="2" fill="white" opacity="0.5"/>
                <rect x="10" y="10" width="7" height="7" rx="2" fill="white"/>
              </svg>
            </div>
            <span className="brand-text">
              <span>PCJ PC</span>
              <span className="dot">.</span>
            </span>
          </Link>

          <nav className="nav-links">
            <Link href="/" className={isActive("/")}>Shop</Link>
            {user && <Link href="/orders" className={isActive("/orders")}>My Orders</Link>}
            {user?.role === "admin" && (
              <Link href="/admin/dashboard" className={isActive("/admin")}>Admin</Link>
            )}
          </nav>

          <div className="header-right">
            {user && <span className="nav-user">Hi, {user.name.split(" ")[0]}</span>}
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme" title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}>
              {theme === "dark" ? "🌙" : "☀️"}
            </button>
            <Link href="/cart" className="cart-pill">
              <svg width="14" height="14" fill="none" viewBox="0 0 16 16">
                <path d="M2 2h1.5l2 8h6.5l1.5-5H5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="8" cy="13" r="1" fill="currentColor"/>
                <circle cx="11.5" cy="13" r="1" fill="currentColor"/>
              </svg>
              Cart
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>
            {user ? (
              <button onClick={handleLogout} className="btn-logout">Sign out</button>
            ) : (
              <>
                <Link href="/login" className={`btn btn-sm ${isActive("/login")}`}>Sign in</Link>
                <Link href="/register" className="btn btn-sm btn-ghost">Register</Link>
              </>
            )}
          </div>
        </div>
      </header>
      <Toast />
    </>
  );
}
