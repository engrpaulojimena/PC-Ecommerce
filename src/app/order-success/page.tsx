export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default function OrderSuccessPage() {
  return (
    <div className="empty-state" style={{ paddingTop: 100 }}>
      <div style={{ fontSize: "3rem", marginBottom: 20 }}>✓</div>
      <h3 style={{ color: "var(--good)", fontSize: "1rem" }}>Order placed successfully!</h3>
      <p style={{ marginBottom: 28 }}>We&apos;ve received your order and will process it shortly.</p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <a href="/orders" className="btn btn-primary">View my orders</a>
        <a href="/" className="btn">Continue shopping</a>
      </div>
    </div>
  );
}
