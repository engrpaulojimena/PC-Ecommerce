export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default function OrderFailedPage() {
  return (
    <div className="empty-state" style={{ paddingTop: 100 }}>
      <div style={{ fontSize: "3rem", marginBottom: 20, opacity: 0.5 }}>✗</div>
      <h3 style={{ color: "var(--danger)", fontSize: "1rem" }}>Payment failed</h3>
      <p style={{ marginBottom: 28 }}>Something went wrong with your payment. Your cart is still saved.</p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <a href="/cart" className="btn btn-primary">Back to cart</a>
        <a href="/" className="btn">Continue shopping</a>
      </div>
    </div>
  );
}
