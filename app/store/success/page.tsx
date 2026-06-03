import Link from "next/link";

export const metadata = { title: "Order Confirmed — Cycles Custom Cult" };

export default function CheckoutSuccess() {
  return (
    <section className="page-intro" style={{ minHeight: "60vh", display: "grid", placeItems: "center", textAlign: "center" }}>
      <div className="wrap">
        <span className="kicker">Thank you</span>
        <h1>Order confirmed</h1>
        <p className="lead" style={{ marginTop: "1.6rem", marginInline: "auto" }}>
          Your payment went through and a receipt is on its way to your email. We&apos;ll be in touch about shipping.
        </p>
        <div style={{ marginTop: "2rem", display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/store" className="btn ghost">Back to Store</Link>
          <Link href="/" className="btn">Home</Link>
        </div>
      </div>
    </section>
  );
}
