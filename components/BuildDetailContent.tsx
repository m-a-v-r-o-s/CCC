"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Build } from "@/data/content";
import Reveal from "./Reveal";
import { useTranslation } from "./LanguageContext";

export default function BuildDetailContent({ build: b }: { build: Build }) {
  const { t } = useTranslation();
  const d = t.buildDetail;
  const donor = b.specs.find((s) => s.label === "Donor")?.value;
  const images = [...b.gallery, b.cover];
  const [lightbox, setLightbox] = useState<number | null>(null);

  const isOpen = lightbox !== null;
  const step = (dir: number) =>
    setLightbox((i) => (i === null ? i : (i + dir + images.length) % images.length));

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, images.length]);
  return (
    <>
      <div className="detail-hero-wrap">
        <div className="detail-hero" style={{ backgroundImage: `url(${b.cover})` }} />
        <a href="#gallery" className="btn ghost see-more">See more pictures</a>
      </div>

      <div className="wrap">
        <div className="detail-head">
          <span className="kicker">{b.year}</span>
          <h1>{b.subtitle}</h1>
          {donor && donor !== "TBD" && (
            <p className="sub">{donor}</p>
          )}
        </div>

        <div className="detail-grid">
          <Reveal>
            <div>
              <p className="lead">{b.excerpt}</p>
              <p style={{ marginTop: "1.4rem", color: "#34342f" }}>{b.description}</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div>
              <span className="kicker">Spec Sheet</span>
              <div className="spec-table" style={{ marginTop: "16px" }}>
                {b.specs.map((s) => (
                  <div className="spec-row" key={s.label}>
                    <span className="label">{s.label}</span>
                    <span>{s.value}</span>
                  </div>
                ))}
              </div>

              {b.credits && b.credits.length > 0 && (
                <div style={{ marginTop: "32px" }}>
                  <span className="kicker">Credits</span>
                  <div className="spec-table" style={{ marginTop: "16px" }}>
                    {b.credits.map((c, i) => (
                      <div className="spec-row" key={i}>
                        <span className="label">{c.label}</span>
                        <a
                          href={`https://www.instagram.com/${c.handle}`}
                          target="_blank"
                          rel="noreferrer"
                          style={{ color: "var(--ink)", textDecoration: "underline", textUnderlineOffset: "3px" }}
                        >
                          @{c.handle}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>

      <section className="section" id="gallery" style={{ paddingTop: "60px" }}>
        <div className="wrap">
          <span className="kicker">{d.gallery}</span>
          <div className="gallery" style={{ marginTop: "20px" }}>
            {images.map((g, i) => (
              <button
                type="button"
                key={i}
                className={`g ${i === 0 ? "wide" : ""}`}
                style={{ backgroundImage: `url(${g})` }}
                onClick={() => setLightbox(i)}
                aria-label="Open full screen"
              />
            ))}
          </div>
          <div style={{ marginTop: "48px", display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <Link href="/builds" className="btn ghost">{d.back}</Link>
            <Link href="/build" className="btn">{d.cta}</Link>
          </div>
        </div>
      </section>

      {isOpen && (
        <div className="lightbox" onClick={() => setLightbox(null)} role="dialog" aria-modal="true">
          <button type="button" className="lightbox-close" aria-label="Close">×</button>
          <button
            type="button"
            className="lightbox-nav prev"
            aria-label="Previous"
            onClick={(e) => { e.stopPropagation(); step(-1); }}
          >
            ‹
          </button>
          <img src={images[lightbox!]} alt={b.subtitle} onClick={(e) => e.stopPropagation()} />
          <button
            type="button"
            className="lightbox-nav next"
            aria-label="Next"
            onClick={(e) => { e.stopPropagation(); step(1); }}
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
