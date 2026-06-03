"use client";

import { spacePhotos } from "@/data/content";
import Reveal from "./Reveal";
import { useTranslation } from "./LanguageContext";

export default function SpaceContent() {
  const { t } = useTranslation();
  const s = t.spacePage;
  return (
    <>
      <section className="page-intro">
        <div className="wrap">
          <span className="kicker">{s.kicker}</span>
          <h1>{s.heading}</h1>
          <p className="lead" style={{ marginTop: "1.6rem" }}>{s.lead}</p>
        </div>
      </section>

      <section className="section" style={{ borderTop: "none", paddingTop: "40px" }}>
        <div className="wrap">
          <div className="space-grid">
            {spacePhotos.map((photo, i) => (
              <Reveal
                key={i}
                className="tile"
                delay={(i % 3) * 80}
                style={{ backgroundImage: `url(${photo.src})` }}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
