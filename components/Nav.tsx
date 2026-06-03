"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";
import Cart from "./Cart";
import { FlagUS, FlagGR } from "./Flags";
import { useTranslation } from "./LanguageContext";
import { CARGR_URL, INSTAGRAM } from "@/data/content";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [cargrLogoOk, setCargrLogoOk] = useState(true);
  const { t, lang, setLang } = useTranslation();

  const links = [
    { href: "/builds", label: t.nav.builds },
    { href: "/space", label: t.nav.space },
    { href: "/about", label: t.nav.about },
    { href: "/store", label: t.nav.store },
    { href: "/faq", label: t.nav.faq },
  ];

  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <button
          className={`nav-toggle ${open ? "open" : ""}`}
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>

        <Cart />

        <div className="nav-left">
          <div className="lang-switch">
            <button onClick={() => setLang("en")} className={lang === "en" ? "active" : ""} aria-label="English"><FlagUS className="flag" /></button>
            <button onClick={() => setLang("el")} className={lang === "el" ? "active" : ""} aria-label="Ελληνικά"><FlagGR className="flag" /></button>
          </div>
          <nav className={`nav-links ${open ? "open" : ""}`} data-lang={lang}>
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
            <Link href="/build" onClick={() => setOpen(false)}>
              {t.nav.buildMeOne}
            </Link>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              className="ig-link"
              onClick={() => setOpen(false)}
            >
              <img src="/images/ig.webp" alt="Instagram" className="ig-logo" />
              <span className="ig-text">Instagram</span>
            </a>
            <a
              href={CARGR_URL}
              target="_blank"
              rel="noreferrer"
              className="cargr-link"
              onClick={() => setOpen(false)}
            >
              {cargrLogoOk ? (
                <img
                  src="/images/car.webp"
                  alt="car.gr"
                  className="cargr-logo"
                  onError={() => setCargrLogoOk(false)}
                />
              ) : (
                <span className="cargr-text">car.gr</span>
              )}
            </a>
          </nav>
        </div>

        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <span
            className="brand-logo"
            style={{
              color: "var(--ink)",
              display: "flex",
              position: "relative",
              zIndex: 2,
            }}
          >
            <Logo size={300} />
          </span>
        </Link>
      </div>
    </header>
  );
}
