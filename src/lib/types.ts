export interface Product {
  id: number;
  category_id: number | null;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  image: string;
  created_at: string;
  category_name?: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Order {
  id: number;
  user_id: number | null;
  guest_name: string | null;
  guest_email: string | null;
  guest_address: string | null;
  total_amount: number;
  payment_method: "gcash" | "paypal" | "card";
  payment_status: "pending" | "paid" | "failed";
  payment_reference: string | null;
  order_status: "processing" | "shipped" | "completed" | "cancelled";
  created_at: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number | null;
  product_name: string;
  price: number;
  quantity: number;
}

export interface CartItem {
  productId: number;
  quantity: number;
  name: string;
  price: number;
  stock: number;
}

export type Cart = CartItem[];

export function formatPrice(amount: number | string | null | undefined): string {
  const num = Number(amount);
  if (isNaN(num)) return "₱0.00";
  return "₱" + num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
