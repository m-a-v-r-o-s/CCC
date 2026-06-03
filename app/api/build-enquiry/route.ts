import { NextResponse } from "next/server";
import { Resend } from "resend";
import { CONTACT_EMAIL } from "@/data/content";

// "Build Me One" enquiry → email via Resend.
// Requires RESEND_API_KEY. Optional: RESEND_FROM (a verified sender on your
// Resend domain) and RESEND_TO (defaults to CONTACT_EMAIL). See .env.local.example.

type Body = {
  name?: string;
  email?: string;
  phone?: string;
  donor?: string;
  budget?: string;
  message?: string;
  lang?: "en" | "el";
};

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email is not configured. Set RESEND_API_KEY." },
      { status: 500 }
    );
  }

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email and message are required." },
      { status: 400 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const phone = (body.phone ?? "").trim();
  const donor = (body.donor ?? "").trim();
  const budget = (body.budget ?? "").trim();

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone || "—"],
    ["Donor bike", donor || "—"],
    ["Budget", budget || "—"],
  ];

  const html = `
    <h2>Build Me One — new enquiry</h2>
    <table cellpadding="6" style="border-collapse:collapse">
      ${rows.map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${esc(v)}</td></tr>`).join("")}
    </table>
    <p><strong>Message</strong></p>
    <p style="white-space:pre-wrap">${esc(message)}</p>
  `;

  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM ?? "Cycles Custom Cult <onboarding@resend.dev>";
  const to = process.env.RESEND_TO ?? CONTACT_EMAIL;

  const lang = body.lang === "el" ? "el" : "en";
  const confirmation = {
    en: {
      subject: "We got your message — Cycles Custom Cult",
      html: `
        <p>Hi ${esc(name)},</p>
        <p>Thanks for reaching out to Cycles Custom Cult about a build. We've received
        your message and will get back to you soon.</p>
        <p>Here's a copy of what you sent:</p>
        <p style="white-space:pre-wrap;border-left:3px solid #ccc;padding-left:12px;color:#444">${esc(message)}</p>
        <p>— Cycles Custom Cult</p>
      `,
    },
    el: {
      subject: "Λάβαμε το μήνυμά σου — Cycles Custom Cult",
      html: `
        <p>Γεια σου ${esc(name)},</p>
        <p>Ευχαριστούμε που επικοινώνησες με το Cycles Custom Cult για μια κατασκευή.
        Λάβαμε το μήνυμά σου και θα σου απαντήσουμε σύντομα.</p>
        <p>Ορίστε ένα αντίγραφο του μηνύματός σου:</p>
        <p style="white-space:pre-wrap;border-left:3px solid #ccc;padding-left:12px;color:#444">${esc(message)}</p>
        <p>— Cycles Custom Cult</p>
      `,
    },
  }[lang];

  try {
    // 1) Notify the shop (the important one — its failure fails the request).
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Build Me One — ${name}`,
      html,
    });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 502 });
    }

    // 2) Confirmation to the sender, in their language (best-effort).
    try {
      await resend.emails.send({
        from,
        to: email,
        replyTo: to,
        subject: confirmation.subject,
        html: confirmation.html,
      });
    } catch {
      /* don't fail the request if the confirmation can't be sent */
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to send.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
