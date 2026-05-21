import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";

// Middleware already enforces auth on /api/admin/*. Trust the cookie.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const showHandled = searchParams.get("handled") === "true";
  const sb = createSupabaseAdmin();
  let query = sb.from("inquiries").select("*").order("created_at", { ascending: false });
  if (!showHandled) query = query.eq("handled", false);
  const { data, error } = await query;
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, inquiries: data || [] });
}

export async function PATCH(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const id = body?.id as string | undefined;
  if (!id) return NextResponse.json({ ok: false, error: "Missing id" }, { status: 400 });
  const update: Record<string, unknown> = {};
  if (typeof body.handled === "boolean") {
    update.handled = body.handled;
    update.handled_at = body.handled ? new Date().toISOString() : null;
  }
  if (typeof body.notes === "string") {
    update.notes = body.notes;
  }
  if (Object.keys(update).length === 0) {
    return NextResponse.json({ ok: false, error: "Nothing to update" }, { status: 400 });
  }
  const sb = createSupabaseAdmin();
  const { data, error } = await sb.from("inquiries").update(update).eq("id", id).select().single();
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, inquiry: data });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ ok: false, error: "Missing id" }, { status: 400 });
  const sb = createSupabaseAdmin();
  const { error } = await sb.from("inquiries").delete().eq("id", id);
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
