"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "./LanguageContext";

const STORAGE_KEY = "ccc-consent";

export default function CookieConsent() {
  const { t } = useTranslation();
  const c = t.consent;
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setShow(true);
    } catch {
      /* ignore */
    }
  }, []);

  const choose = (value: "accepted" | "denied") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="consent-bar" role="dialog" aria-live="polite" aria-label="Cookie notice">
      <p className="consent-text">{c.message}</p>
      <div className="consent-actions">
        <button className="btn ghost consent-deny" onClick={() => choose("denied")}>
          {c.deny}
        </button>
        <button className="btn consent-accept" onClick={() => choose("accepted")}>
          {c.accept}
        </button>
      </div>
    </div>
  );
}
