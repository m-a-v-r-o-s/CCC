"use client";

import Link from "next/link";
import Reveal from "./Reveal";
import { useTranslation } from "./LanguageContext";

export default function AboutContent() {
  const { t } = useTranslation();
  const a = t.aboutPage;
  return (
    <>
      <section className="page-intro">
        <div className="wrap">
          <span className="kicker">{a.kicker}</span>
          <h1>{a.heading}</h1>
        </div>
      </section>

      <section className="section" style={{ borderTop: "none", paddingTop: "30px" }}>
        <div className="wrap about-grid">
          <Reveal>
            <div className="about-portrait" style={{ backgroundImage: "url(/images/founder.jpg)", backgroundPosition: "right center" }} />
            <a
              href="https://www.instagram.com/chico_b_/"
              target="_blank"
              rel="noreferrer"
              style={{ display: "block", marginTop: "10px", fontFamily: "var(--display)", fontSize: "1.4rem", letterSpacing: "0.12em", color: "var(--ink)" }}
            >(Chico)</a>
          </Reveal>
          <Reveal delay={120}>
            <div>
              <h3>
                <a href="https://www.instagram.com/giovanni.mrns/" target="_blank" rel="noreferrer" style={{ color: "inherit" }}>
                  {a.founderHeading}
                </a>
              </h3>
              <div className="role">{a.founderRole}</div>
              <p className="lead">{a.lead}</p>
              <p style={{ marginTop: "1.1rem", color: "#34342f" }}>{a.p1}</p>
              <p style={{ marginTop: "1.1rem", color: "#34342f" }}>{a.p2}</p>
              <p style={{ marginTop: "1.1rem", color: "#34342f" }}>{a.p3}</p>
              <div style={{ marginTop: "2rem", display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <Link href="/build" className="btn">{a.ctaPrimary}</Link>
                <Link href="/builds" className="btn ghost">{a.ctaSecondary}</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
