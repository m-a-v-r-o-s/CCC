"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useCart } from "./CartContext";
import { useTranslation } from "./LanguageContext";
import { products, STORE_OPEN } from "@/data/content";

function money(cents: number, currency: string) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(cents / 100);
}

export default function Cart() {
  const { items, count, setQty, remove, isOpen, open, close } = useCart();
  const { t } = useTranslation();
  const c = t.cart;
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const lines = items
    .map((it) => ({ ...it, product: products.find((p) => p.id === it.id) }))
    .filter((l) => l.product);
  const subtotal = lines.reduce((s, l) => s + l.product!.amount * l.quantity, 0);
  const currency = lines[0]?.product?.currency ?? "usd";

  async function checkout() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: items.map((i) => ({ id: i.id, quantity: i.quantity })) }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error("checkout failed");
      window.location.href = data.url;
    } catch {
      setLoading(false);
    }
  }

  return (
    <>
      <button className={`cart-btn ${count === 0 ? "empty" : ""}`} onClick={open} aria-label={`${c.title} (${count})`}>
        <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 4h2l2.4 12.2a1 1 0 0 0 1 .8h8.2a1 1 0 0 0 1-.8L21 8H6" />
          <circle cx="9.5" cy="20" r="1.2" />
          <circle cx="17" cy="20" r="1.2" />
        </svg>
        {count > 0 && <span className="cart-count">{count}</span>}
      </button>

      {isOpen && mounted && createPortal(
        <div className="cart-overlay" onClick={close}>
          <aside className="cart-drawer" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="cart-head">
              <h2>{c.title}</h2>
              <button className="cart-close" onClick={close} aria-label="Close">×</button>
            </div>

            {lines.length === 0 ? (
              <p className="cart-empty">{c.empty}</p>
            ) : (
              <>
                <div className="cart-lines">
                  {lines.map((l) => (
                    <div className="cart-line" key={l.id}>
                      <div className="cart-thumb" style={{ backgroundImage: `url(${l.product!.image})` }} />
                      <div className="cart-info">
                        <h3>{l.product!.name}</h3>
                        <span className="cart-price">{l.product!.price}</span>
                        <div className="cart-qty">
                          <button onClick={() => setQty(l.id, l.quantity - 1)} aria-label="Decrease">−</button>
                          <span>{l.quantity}</span>
                          <button onClick={() => setQty(l.id, l.quantity + 1)} aria-label="Increase">+</button>
                        </div>
                      </div>
                      <button className="cart-remove" onClick={() => remove(l.id)} aria-label={c.remove}>×</button>
                    </div>
                  ))}
                </div>

                <div className="cart-foot">
                  <div className="cart-subtotal">
                    <span>{c.subtotal}</span>
                    <span>{money(subtotal, currency)}</span>
                  </div>
                  {STORE_OPEN ? (
                    <button className="btn cart-checkout" onClick={checkout} disabled={loading}>
                      {loading ? c.processing : c.checkout}
                    </button>
                  ) : (
                    <p className="cart-closed">{c.closed}</p>
                  )}
                </div>
              </>
            )}
          </aside>
        </div>,
        document.body
      )}
    </>
  );
}
