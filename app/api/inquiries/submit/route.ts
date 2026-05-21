import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { contact, locations } from "@/lib/locations";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Public endpoint. Two things happen on POST:
//   1. The inquiry is persisted to public.inquiries via the service role
//      key (RLS keeps this table invisible to anon).
//   2. If RESEND_API_KEY is set, a notification email is also sent to
//      `info@theorientgates.com`. If it isn't, the row is still saved so
//      nothing is lost — operators can monitor inquiries via the admin
//      UI / Supabase dashboard until email is wired.

interface InquiryPayload {
  name?: string;
  email?: string;
  phone?: string;
  country?: string;
  inquiryType?: string;
  budgetRange?: string;
  collectorType?: string;
  preferredContact?: string;
  timeline?: string;
  pieceName?: string;
  message?: string;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildEmailHtml(p: InquiryPayload, id: string) {
  const row = (label: string, value: string | undefined) =>
    value
      ? `<tr><td style="padding:8px 12px;color:#888;text-transform:uppercase;font-size:11px;letter-spacing:0.1em;border-bottom:1px solid #eee">${label}</td><td style="padding:8px 12px;border-bottom:1px solid #eee">${escapeHtml(value)}</td></tr>`
      : "";
  return `<!doctype html><html><body style="font-family:Georgia,serif;background:#f7f5f0;padding:24px;margin:0">
  <div style="max-width:640px;margin:0 auto;background:#fff;padding:32px;border:1px solid #ddd">
    <h1 style="font-family:Georgia,serif;color:#0a0a0a;font-size:22px;margin:0 0 4px">New inquiry from theorientgates.com</h1>
    <p style="color:#888;font-size:12px;margin:0 0 24px">Reference: ${id}</p>
    <table style="width:100%;border-collapse:collapse;font-size:14px;color:#222">
      ${row("Name", p.name)}
      ${row("Email", p.email)}
      ${row("Phone", p.phone)}
      ${row("Country", p.country)}
      ${row("Inquiry type", p.inquiryType)}
      ${row("Budget", p.budgetRange)}
      ${row("Collector type", p.collectorType)}
      ${row("Preferred contact", p.preferredContact)}
      ${row("Timeline", p.timeline)}
      ${row("Piece", p.pieceName)}
    </table>
    <div style="margin-top:24px">
      <p style="color:#888;text-transform:uppercase;font-size:11px;letter-spacing:0.1em;margin:0 0 8px">Message</p>
      <div style="white-space:pre-wrap;padding:16px;background:#faf8f3;border-left:3px solid #b8972f;color:#333;line-height:1.6">${escapeHtml(p.message || "")}</div>
    </div>
    <p style="color:#aaa;font-size:11px;margin:32px 0 0">Reply directly — this email is sent on behalf of ${escapeHtml(p.name || "")}.</p>
  </div>
</body></html>`;
}

async function sendEmail(payload: InquiryPayload, id: string): Promise<{ sent: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.RESEND_FROM_ADDRESS || "no-reply@theorientgates.com";
  if (!apiKey) return { sent: false, error: "RESEND_API_KEY not set" };

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `The Orient Gates <${fromAddress}>`,
      to: [contact.email],
      reply_to: payload.email,
      subject: `Inquiry from ${payload.name || "the website"}${payload.pieceName ? ` — ${payload.pieceName}` : ""}`,
      html: buildEmailHtml(payload, id),
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    return { sent: false, error: `Resend ${res.status}: ${text.slice(0, 200)}` };
  }
  return { sent: true };
}

export async function POST(req: NextRequest) {
  let body: InquiryPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Required fields
  if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
    return NextResponse.json(
      { ok: false, error: "Name, email, and message are required." },
      { status: 400 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return NextResponse.json(
      { ok: false, error: "That email address doesn't look valid." },
      { status: 400 }
    );
  }
  if (body.message.length > 5000) {
    return NextResponse.json(
      { ok: false, error: "Message is too long." },
      { status: 400 }
    );
  }

  // Capture useful metadata
  const ua = req.headers.get("user-agent") || null;
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    null;

  // Persist via service role (bypasses RLS)
  const sb = createSupabaseAdmin();
  const { data: inserted, error: dbError } = await sb
    .from("inquiries")
    .insert({
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone || null,
      country: body.country || null,
      inquiry_type: body.inquiryType || null,
      budget_range: body.budgetRange || null,
      collector_type: body.collectorType || null,
      preferred_contact: body.preferredContact || null,
      timeline: body.timeline || null,
      piece_name: body.pieceName || null,
      message: body.message.trim(),
      source: "website",
      user_agent: ua,
      ip,
    })
    .select("id")
    .single();

  if (dbError) {
    console.error("[inquiries] DB insert failed:", dbError.message);
    return NextResponse.json(
      { ok: false, error: "Could not save inquiry. Please email us directly." },
      { status: 500 }
    );
  }

  // Send email (best-effort; DB write already succeeded)
  let emailResult: { sent: boolean; error?: string } = { sent: false };
  try {
    emailResult = await sendEmail(body, inserted.id);
  } catch (e) {
    emailResult = { sent: false, error: e instanceof Error ? e.message : "unknown" };
  }
  if (!emailResult.sent) {
    console.warn("[inquiries] email not sent:", emailResult.error);
  }

  return NextResponse.json({
    ok: true,
    id: inserted.id,
    emailSent: emailResult.sent,
    // Echo back the WhatsApp numbers so the thank-you screen can offer them.
    fallbackContacts: locations.map((l) => ({ city: l.city, whatsapp: l.whatsapp })),
  });
}
