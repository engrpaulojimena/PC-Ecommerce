"use client";

import { getLocalCart, setLocalCart, syncCartToDB } from "@/lib/cart";

interface Props {
  productId: number;
  name: string;
  price: number;
  stock: number;
  quantity?: number;
  size?: "sm" | "default";
}

export default function AddToCartButton({ productId, name, price, stock, quantity = 1, size = "default" }: Props) {
  const handleAdd = () => {
    const cart = getLocalCart();
    const current = cart[productId] ?? { quantity: 0, name, price, stock };
    const newQty = Math.min(current.quantity + quantity, stock);
    cart[productId] = { ...current, quantity: newQty };
    setLocalCart(cart);
    window.dispatchEvent(new CustomEvent("showToast", { detail: { message: `${name} added to cart` } }));

    // Sync to DB if logged in
    const userData = localStorage.getItem("pcforge_user");
    if (userData) syncCartToDB(cart);
  };

  const cls = size === "sm" ? "btn btn-ghost btn-sm" : "btn btn-primary";

  return (
    <button className={cls} onClick={handleAdd}>
      + Add to cart
    </button>
  );
}
