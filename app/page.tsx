"use client";

import Link from "next/link";
import { builds, spacePhotos } from "@/data/content";
import Reveal from "@/components/Reveal";
import { useTranslation } from "@/components/LanguageContext";

function bg(src: string): React.CSSProperties {
  return { backgroundImage: `url(${src})` };
}

const processImages = [
  "/images/Screenshot_2026-05-28_11-13-07.webp",
  "/images/motor.webp",
  "/images/Screenshot_2026-05-28_11-13-26.webp",
];

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      {/* HERO — not translated */}
      <section className="hero">
        <div className="hero-bg" style={bg("/images/backg22.webp")} />
        <div className="hero-content">
          <Reveal>
            <span className="kicker" style={{ color: "#fff" }}>Est. — 2019</span>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="hero-title" aria-label="Cycles Custom Cult">
              <span className="hero-logo-mark" />
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="sub">Roadworthy, handmade, homemade, motorbikes in athens, greece</p>
          </Reveal>
        </div>
        <a href="#process" className="scroll-cue">Scroll</a>
      </section>

      {/* PROCESS */}
      <section className="section" id="process">
        <div className="wrap">
          <div className="process">
            {t.process.steps.map((step, i) => (
              <Reveal key={i} className="cell" delay={i * 100}>
                <div
                  className="ph"
                  style={{
                    ...bg(processImages[i]),
                    ...(i === 2 ? { filter: "grayscale(100%) contrast(145%)" } : {}),
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="txt">
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED BUILDS */}
      <section className="section" id="builds">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="kicker">{t.home.builds.kicker}</span>
              <h2>{t.home.builds.heading}</h2>
            </div>
            <Link href="/builds" className="btn ghost">{t.home.builds.cta}</Link>
          </div>
          <div className="builds-grid">
            {builds.slice(0, 2).map((b, i) => (
              <Reveal key={b.slug} delay={i * 80}>
                <Link href={`/builds/${b.slug}`} className="build-card">
                  <div className="img" style={bg(b.cover)} />
                  <div className="meta">
                    <div>
                      <h3>{b.subtitle}</h3>
                      <span>{b.year}</span>
                    </div>
                    <span className="arrow">→</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* OUR SPACE TEASER */}
      <section className="section" id="space">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="kicker">{t.home.space.kicker}</span>
              <h2>{t.home.space.heading}</h2>
            </div>
            <Link href="/space" className="btn ghost">{t.home.space.cta}</Link>
          </div>
          <div className="space-grid">
            {spacePhotos.slice(0, 3).map((s, i) => (
              <Reveal
                key={i}
                className="tile"
                delay={i * 80}
                style={bg(s.src)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="section" id="about">
        <div className="wrap about-grid">
          <Reveal>
            <div className="about-portrait" style={bg("/images/shop/Screenshot_2026-05-28_11-37-48.webp")}>
              Portrait
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div>
              <span className="kicker">{t.home.about.kicker}</span>
              <h3>{t.home.about.heading}</h3>
              <p className="lead">{t.home.about.body1}</p>
              <p style={{ marginTop: "1.4rem", color: "#34342f" }}>{t.home.about.body2}</p>
              <div style={{ marginTop: "2rem" }}>
                <Link href="/about" className="btn">{t.home.about.cta}</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <div className="wrap">
          <h2>
            {t.home.cta.line1}
            <br />
            {t.home.cta.line2}
          </h2>
          <div className="cta-actions">
            <Link href="/build" className="btn">{t.home.cta.primary}</Link>
            <Link href="/store" className="btn ghost">{t.home.cta.secondary}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
