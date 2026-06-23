"use client";

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
    const raw = localStorage.getItem("pcforge_cart");
    const cart: Record<string, { quantity: number; name: string; price: number; stock: number }> = raw
      ? JSON.parse(raw) : {};
    const current = cart[productId] ?? { quantity: 0, name, price, stock };
    const newQty = Math.min(current.quantity + quantity, stock);
    cart[productId] = { ...current, quantity: newQty };
    localStorage.setItem("pcforge_cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    window.dispatchEvent(new CustomEvent("showToast", { detail: { message: `${name} added to cart` } }));
  };

  const cls = size === "sm"
    ? "btn btn-ghost btn-sm"
    : "btn btn-primary";

  return (
    <button className={cls} onClick={handleAdd}>
      + Add to cart
    </button>
  );
}
