"use client";

import { useState } from "react";
import { useTranslation } from "@/components/LanguageContext";

export default function BuildPage() {
  const { t, lang } = useTranslation();
  const f = t.buildFormPage;

  const [form, setForm] = useState({
    name: "", email: "", phone: "", donor: "", budget: "", message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [error, setError] = useState<string | null>(null);

  const set = (k: string) => (e: any) => setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const handleSend = async () => {
    setError(null);
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError(f.required);
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/build-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, lang }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "failed");
      setStatus("success");
      setForm({ name: "", email: "", phone: "", donor: "", budget: "", message: "" });
    } catch (err) {
      setStatus("idle");
      setError(err instanceof Error && err.message !== "failed" ? err.message : f.error);
    }
  };

  return (
    <>
      <section className="page-intro">
        <div className="wrap">
          <span className="kicker">{f.kicker}</span>
          <h1>{f.heading}</h1>
          <p className="lead" style={{ marginTop: "1.6rem" }}>{f.lead}</p>
        </div>
      </section>

      <section className="section" style={{ borderTop: "none", paddingTop: "40px" }}>
        <div className="wrap" style={{ maxWidth: "880px" }}>
          <div className="form-grid">
            <div className="field">
              <label>{f.name}</label>
              <input value={form.name} onChange={set("name")} placeholder={f.namePlaceholder} />
            </div>
            <div className="field">
              <label>{f.email}</label>
              <input value={form.email} onChange={set("email")} placeholder={f.emailPlaceholder} />
            </div>
            <div className="field">
              <label>{f.phone}</label>
              <input value={form.phone} onChange={set("phone")} placeholder={f.phonePlaceholder} />
            </div>
            <div className="field">
              <label>{f.budget}</label>
              <input value={form.budget} onChange={set("budget")} placeholder={f.budgetPlaceholder} />
            </div>
            <div className="field full">
              <label>{f.donor}</label>
              <input value={form.donor} onChange={set("donor")} placeholder={f.donorPlaceholder} />
            </div>
            <div className="field full">
              <label>{f.messageLabel}</label>
              <textarea value={form.message} onChange={set("message")} placeholder={f.messagePlaceholder} />
            </div>
            <div className="field full">
              {status === "success" ? (
                <p className="form-success">{f.success}</p>
              ) : (
                <>
                  <button className="btn" onClick={handleSend} disabled={status === "sending"}>
                    {status === "sending" ? f.sending : f.send}
                  </button>
                  {error && <p className="form-error">{error}</p>}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
