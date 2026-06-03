"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "@/components/LanguageContext";

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);
  const { t } = useTranslation();
  const faq = t.faqPage;

  return (
    <>
      <section className="page-intro">
        <div className="wrap">
          <span className="kicker">{faq.kicker}</span>
          <h1>{faq.heading}</h1>
        </div>
      </section>

      <section className="section" style={{ borderTop: "none", paddingTop: "40px" }}>
        <div className="wrap" style={{ maxWidth: "880px" }}>
          {faq.items.map((f, i) => (
            <div key={i} className={`faq-item ${open === i ? "open" : ""}`}>
              <button
                className="faq-q"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span>{f.q}</span>
                <span className="faq-sign">+</span>
              </button>
              <div className="faq-a" style={{ maxHeight: open === i ? "400px" : "0" }}>
                <p>{f.a}</p>
              </div>
            </div>
          ))}

          <div style={{ marginTop: "48px" }}>
            <p className="lead" style={{ marginBottom: "1.4rem" }}>{faq.stillQuestion}</p>
            <Link href="/build" className="btn">{faq.getInTouch}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
