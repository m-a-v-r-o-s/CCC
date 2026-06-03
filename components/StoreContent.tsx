"use client";

import { useState } from "react";
import { products, STORE_OPEN } from "@/data/content";
import Reveal from "./Reveal";
import { useTranslation } from "./LanguageContext";
import { useCart } from "./CartContext";

export default function StoreContent() {
  const { t } = useTranslation();
  const s = t.storePage;
  const c = t.cart;
  const { add, open } = useCart();
  const [justAdded, setJustAdded] = useState<string | null>(null);

  function addToCart(id: string) {
    if (!STORE_OPEN) return;
    add(id, 1);
    setJustAdded(id);
    open();
    window.setTimeout(() => setJustAdded((cur) => (cur === id ? null : cur)), 1500);
  }

  return (
    <>
      <section className="page-intro">
        <div className="wrap">
          <span className="kicker">{s.kicker}</span>
          <h1>{s.heading}</h1>
          <p className="lead" style={{ marginTop: "1.6rem" }}>{s.lead}</p>
          {!STORE_OPEN && <p className="store-closed">{s.closed}</p>}
        </div>
      </section>

      <section className="section" style={{ borderTop: "none", paddingTop: "40px" }}>
        <div className="wrap">
          <div className="store-grid">
            {products.map((p, i) => (
              <Reveal key={p.id} className="product" delay={(i % 3) * 80}>
                <div className="img" style={{ backgroundImage: `url(${p.image})` }}>{p.name}</div>
                {p.tag && <div className="tag">{s.tags[p.tag] ?? p.tag}</div>}
                <div className="row">
                  <h3>{p.name}</h3>
                  <span className="price">{p.price}</span>
                </div>
                <button
                  type="button"
                  className="btn product-buy"
                  onClick={() => addToCart(p.id)}
                  disabled={!STORE_OPEN}
                >
                  {!STORE_OPEN ? s.closedShort : justAdded === p.id ? c.added : c.add}
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
