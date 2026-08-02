import { guarded } from "@/lib/api-guard";
import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BUCKET = "product-images";
const MAX_BYTES = 25 * 1024 * 1024; // 25MB
const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);

function safeExt(name: string, fallback: string): string {
  const m = name.match(/\.([a-zA-Z0-9]{2,5})$/);
  return (m ? m[1] : fallback).toLowerCase();
}

function extFromMime(mime: string): string {
  if (mime === "image/jpeg") return "jpg";
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  if (mime === "image/gif") return "gif";
  if (mime === "image/avif") return "avif";
  return "bin";
}

async function handlePOST(req: NextRequest) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Expected multipart/form-data" },
      { status: 400 }
    );
  }

  const files = form.getAll("files").filter((v): v is File => v instanceof File);
  if (files.length === 0) {
    return NextResponse.json(
      { ok: false, error: "No files in request (use field name 'files')" },
      { status: 400 }
    );
  }

  const sb = createSupabaseAdmin();
  const urls: string[] = [];
  const errors: string[] = [];

  for (const file of files) {
    if (file.size === 0) {
      errors.push(`${file.name}: empty`);
      continue;
    }
    if (file.size > MAX_BYTES) {
      errors.push(`${file.name}: ${(file.size / 1024 / 1024).toFixed(1)}MB exceeds 25MB`);
      continue;
    }
    const mime = file.type || "application/octet-stream";
    if (!ALLOWED.has(mime)) {
      errors.push(`${file.name}: type ${mime} not allowed`);
      continue;
    }

    const ext = safeExt(file.name, extFromMime(mime));
    const stamp = Date.now();
    const rand = Math.random().toString(36).slice(2, 8);
    const path = `products/og-${stamp}-${rand}.${ext}`;

    const buf = Buffer.from(await file.arrayBuffer());
    const { error: upErr } = await sb.storage
      .from(BUCKET)
      .upload(path, buf, { contentType: mime, upsert: false });

    if (upErr) {
      errors.push(`${file.name}: ${upErr.message}`);
      continue;
    }

    const { data } = sb.storage.from(BUCKET).getPublicUrl(path);
    urls.push(data.publicUrl);
  }

  if (urls.length === 0) {
    return NextResponse.json(
      { ok: false, error: errors.join("; ") || "Upload failed" },
      { status: 400 }
    );
  }

  return NextResponse.json({ ok: true, urls, errors: errors.length ? errors : undefined });
}

export const POST = guarded(handlePOST);
