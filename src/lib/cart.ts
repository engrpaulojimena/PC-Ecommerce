// Shared cart utility — handles localStorage + DB sync

export type CartMap = Record<string, { quantity: number; name: string; price: number; stock: number }>;

export function getLocalCart(): CartMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem("pcforge_cart");
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

export function setLocalCart(cart: CartMap) {
  localStorage.setItem("pcforge_cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));
}

export function clearLocalCart() {
  localStorage.removeItem("pcforge_cart");
  window.dispatchEvent(new Event("cartUpdated"));
}

// Push current localStorage cart to DB (call after login or on cart changes)
export async function syncCartToDB(cart: CartMap) {
  const items = Object.entries(cart)
    .filter(([, v]) => v.quantity > 0)
    .map(([id, v]) => ({ productId: parseInt(id), quantity: v.quantity }));

  await fetch("/api/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });
}

// Load cart from DB and merge with any existing localStorage cart
// DB wins on quantity for same items (DB is source of truth after login)
export async function loadCartFromDB(): Promise<CartMap> {
  const res = await fetch("/api/cart");
  const data = await res.json();
  if (!data.items?.length) return getLocalCart();

  const dbCart: CartMap = {};
  for (const item of data.items) {
    dbCart[String(item.productId)] = {
      quantity: item.quantity,
      name: item.name,
      price: Number(item.price),
      stock: item.stock,
    };
  }

  // Merge: combine local guest cart + db cart (add quantities, cap at stock)
  const local = getLocalCart();
  for (const [id, localItem] of Object.entries(local)) {
    if (!dbCart[id]) {
      dbCart[id] = localItem; // item only in local — keep it
    }
    // if in both, DB already has the saved state; skip local
  }

  return dbCart;
}
