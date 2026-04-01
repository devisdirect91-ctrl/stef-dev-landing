import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// ---------------------------------------------------------------------------
// Rate limiting — in-memory, resets when the serverless instance restarts.
// Good enough for a low-traffic landing page.
// ---------------------------------------------------------------------------
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

const ipHits = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipHits.get(ip);

  if (!entry || now > entry.resetAt) {
    ipHits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) return true;

  entry.count += 1;
  return false;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

function notificationHtml(fields: {
  name: string;
  email: string;
  company: string;
  employees: string;
  message: string;
  budget: string;
}): string {
  const row = (label: string, value: string) =>
    value
      ? `<tr>
           <td style="padding:8px 12px;font-weight:600;color:#8A8A8E;white-space:nowrap;vertical-align:top;">${label}</td>
           <td style="padding:8px 12px;color:#F5F5F7;">${value}</td>
         </tr>`
      : "";

  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><title>Nouveau lead</title></head>
<body style="margin:0;padding:0;background:#0A0A0B;font-family:Inter,system-ui,sans-serif;">
  <div style="max-width:580px;margin:40px auto;background:#141416;border:1px solid #1F1F23;border-radius:12px;overflow:hidden;">
    <div style="padding:24px 28px;border-bottom:1px solid #1F1F23;background:#0A0A0B;">
      <span style="font-size:12px;font-weight:700;letter-spacing:0.1em;color:#3B82F6;text-transform:uppercase;">stef-dev.fr</span>
      <h1 style="margin:8px 0 0;font-size:20px;font-weight:700;color:#F5F5F7;">Nouveau lead entrant</h1>
    </div>
    <div style="padding:24px 28px;">
      <table style="width:100%;border-collapse:collapse;">
        ${row("Nom", fields.name)}
        ${row("Email", `<a href="mailto:${fields.email}" style="color:#3B82F6;">${fields.email}</a>`)}
        ${row("Entreprise", fields.company)}
        ${row("Salariés", fields.employees)}
        ${row("Budget", fields.budget)}
      </table>
    </div>
    <div style="padding:0 28px 28px;">
      <p style="margin:0 0 8px;font-weight:600;font-size:12px;color:#8A8A8E;text-transform:uppercase;letter-spacing:0.08em;">Besoin</p>
      <div style="background:#0A0A0B;border:1px solid #1F1F23;border-radius:8px;padding:16px;color:#F5F5F7;font-size:14px;line-height:1.7;white-space:pre-wrap;">${fields.message}</div>
    </div>
    <div style="padding:16px 28px;border-top:1px solid #1F1F23;text-align:right;">
      <a href="mailto:${fields.email}" style="display:inline-block;padding:10px 20px;background:#3B82F6;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;font-size:13px;">Répondre</a>
    </div>
  </div>
</body>
</html>`;
}

function confirmationHtml(name: string): string {
  const firstName = name.split(" ")[0];
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><title>Bien reçu</title></head>
<body style="margin:0;padding:0;background:#0A0A0B;font-family:Inter,system-ui,sans-serif;">
  <div style="max-width:520px;margin:40px auto;background:#141416;border:1px solid #1F1F23;border-radius:12px;overflow:hidden;">
    <div style="padding:24px 28px;border-bottom:1px solid #1F1F23;background:#0A0A0B;">
      <span style="font-size:12px;font-weight:700;letter-spacing:0.1em;color:#3B82F6;text-transform:uppercase;">stef-dev.fr</span>
    </div>
    <div style="padding:28px;color:#F5F5F7;font-size:15px;line-height:1.8;">
      <p style="margin:0 0 16px;">Bonjour ${firstName},</p>
      <p style="margin:0 0 16px;">J'ai bien reçu votre message. Je le lis et je vous réponds <strong>sous 24h</strong> avec mes premières questions ou une proposition d'échange.</p>
      <p style="margin:0 0 16px;">Si votre besoin est urgent, vous pouvez me répondre directement à cet email.</p>
      <p style="margin:0;">À très vite,</p>
    </div>
    <div style="padding:20px 28px;border-top:1px solid #1F1F23;">
      <p style="margin:0;font-size:13px;color:#8A8A8E;line-height:1.6;">
        <strong style="color:#F5F5F7;">Stef</strong><br>
        Développeur web — outils internes pour PME<br>
        <a href="https://stef-dev.fr" style="color:#3B82F6;text-decoration:none;">stef-dev.fr</a>
      </p>
    </div>
  </div>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------
export async function POST(request: NextRequest) {
  // Rate limiting
  const ip = getIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Trop de demandes. Réessayez dans une heure." },
      { status: 429 }
    );
  }

  // Parse body
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  const { name, email, company, employees, message, budget } = body as Record<string, string>;

  // Validation
  if (!name?.trim()) {
    return NextResponse.json({ error: "Le nom est requis." }, { status: 400 });
  }
  if (!email?.trim() || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Email invalide." }, { status: 400 });
  }
  if (!company?.trim()) {
    return NextResponse.json({ error: "L'entreprise est requise." }, { status: 400 });
  }
  if (!message?.trim()) {
    return NextResponse.json({ error: "Le message est requis." }, { status: 400 });
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: "Message trop long (5000 caractères max)." }, { status: 400 });
  }

  // Send emails
  const resend = new Resend(process.env.RESEND_API_KEY);
  const contactEmail = process.env.CONTACT_EMAIL ?? "stefan@stef-dev.fr";
  const fromNotif = "Site stef-dev.fr <noreply@stef-dev.fr>";
  const fromConfirm = "Stef — stef-dev.fr <noreply@stef-dev.fr>";

  const fields = {
    name: name.trim(),
    email: email.trim(),
    company: company.trim(),
    employees: employees?.trim() ?? "",
    message: message.trim(),
    budget: budget?.trim() ?? "",
  };

  try {
    const [notifResult, confirmResult] = await Promise.all([
      resend.emails.send({
        from: fromNotif,
        to: [contactEmail],
        subject: `Nouveau lead — ${fields.company} — ${fields.name}`,
        html: notificationHtml(fields),
      }),
      resend.emails.send({
        from: fromConfirm,
        to: [fields.email],
        replyTo: contactEmail,
        subject: "Bien reçu, je reviens vers vous sous 24h",
        html: confirmationHtml(fields.name),
      }),
    ]);

    if (notifResult.error || confirmResult.error) {
      console.error("Resend errors:", notifResult.error, confirmResult.error);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de l'email." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
