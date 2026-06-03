"use client";

import Link from "next/link";
import { CONTACT_EMAIL, INSTAGRAM, CARGR_URL } from "@/data/content";
import { useTranslation } from "./LanguageContext";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-inner">
          <span className="display" style={{ fontSize: "1.4rem", letterSpacing: "0.06em" }}>
            Cycles Custom Cult
          </span>
          <div className="footer-links">
            <Link href="/store">{t.footer.store}</Link>
            <a href={`mailto:${CONTACT_EMAIL}`}>{t.footer.contact}</a>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer">Instagram</a>
            <a href={CARGR_URL} target="_blank" rel="noreferrer">car.gr</a>
            <Link href="/build">{t.footer.buildMeOne}</Link>
          </div>
        </div>
        <div className="footer-copy">
          <small>© {new Date().getFullYear()} Cycles Custom Cult. All Rights Reserved</small>
          <small>© {new Date().getFullYear()} Akos Digital. All Rights Reserved</small>
        </div>
      </div>
    </footer>
  );
}
