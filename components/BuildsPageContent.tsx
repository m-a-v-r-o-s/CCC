"use client";

import Link from "next/link";
import { builds } from "@/data/content";
import Reveal from "./Reveal";
import { useTranslation } from "./LanguageContext";

export default function BuildsPageContent() {
  const { t } = useTranslation();
  const b = t.buildsPage;
  return (
    <>
      <section className="page-intro">
        <div className="wrap">
          <span className="kicker">{b.kicker}</span>
          <h1>{b.heading}</h1>
          <p className="lead" style={{ marginTop: "1.6rem" }}>{b.lead}</p>
        </div>
      </section>

      <section className="section" style={{ borderTop: "none", paddingTop: "40px" }}>
        <div className="wrap">
          <div className="builds-grid">
            {builds.map((build, i) => (
              <Reveal key={build.slug} delay={i * 80}>
                <Link href={`/builds/${build.slug}`} className="build-card">
                  <div className="img" style={{ backgroundImage: `url(${build.cover})` }} />
                  <div className="meta">
                    <div>
                      <h3>{build.subtitle}</h3>
                      <span>{build.year}</span>
                    </div>
                    <span className="arrow">→</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
