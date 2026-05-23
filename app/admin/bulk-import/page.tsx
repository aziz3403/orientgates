"use client";

import { useState, useMemo, useRef } from "react";
import Link from "next/link";

interface UploadedImage {
  filename: string;
  url: string;
}

interface ValidationFailure {
  index: number;
  title: string;
  error: string;
}

interface DryRunResponse {
  ok: boolean;
  dryRun: true;
  validCount: number;
  failed: ValidationFailure[];
  preview: unknown[];
}

interface PublishResponse {
  ok: boolean;
  inserted: number;
  failed: ValidationFailure[];
  insertedTitles: string[];
  error?: string;
}

// Template prompt the user pastes into claude.ai along with their photos.
function buildPrompt(filenames: string[]): string {
  const list = filenames.length
    ? filenames.map((f) => `- ${f}`).join("\n")
    : "- example-01.jpg\n- example-02.jpg";

  return `You are helping me write product listings for The Orient Gates — a luxury gallery of Damascene mother-of-pearl furniture and rare Islamic, European, and Asian antiques. Tone: dignified, museum-label, factual.

I'm uploading the following product photos (filenames must be used EXACTLY as the imageFile field):

${list}

For each photo, return ONE JSON object. Put all objects in a single JSON array (no markdown, no commentary — just the JSON).

Fields (required unless marked optional):
- imageFile  ── the filename string above, exactly as written
- title  ── 4-8 words, dignified. e.g. "Damascene Mother-of-Pearl Console Table"
- subtitle (optional)  ── one short line. e.g. "Hand-inlaid walnut, Syria"
- category  ── one of: "mother-of-pearl-furniture" | "antiques" | "carpets-textiles"
- subcategory (optional but recommended):
    • for "mother-of-pearl-furniture": one of mop-mirrors | mop-tables | mop-seating | mop-consoles-cabinets | mop-chest-of-drawers | mop-accessories | mop-game-tables
    • for "antiques": one of islamic-antiques | european-antiques | asian-antiques
    • for "carpets-textiles": leave blank
- origin  ── best guess at place of origin. e.g. "Damascus, Syria" or "Persia" or "Italy"
- materials  ── array of visible materials. e.g. ["Walnut", "Mother-of-pearl", "Silver wire"]
- description  ── short card blurb, 2-3 sentences, under 240 characters. Factual, no sales language.
- craftsmanship  ── one paragraph (3-5 sentences) describing the workmanship for the detail page
- condition  ── short condition note based on what you can see. e.g. "Excellent. Minor surface patina consistent with age."
- tags  ── array of 3-6 single-word lowercase keywords

DO NOT include these fields (I fill them in myself): price, period, dimensions, provenance, id, slug, sku.

Output: just the JSON array, nothing else.`;
}

export default function BulkImportPage() {
  // ── Step 1: image upload ──
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState<UploadedImage[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Step 3: JSON paste / dry-run / publish ──
  const [jsonText, setJsonText] = useState("");
  const [dryRun, setDryRun] = useState<DryRunResponse | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [publishResult, setPublishResult] = useState<PublishResponse | null>(null);

  const filenameToUrl = useMemo(() => {
    const map = new Map<string, string>();
    for (const u of uploaded) map.set(u.filename, u.url);
    return map;
  }, [uploaded]);

  const prompt = useMemo(
    () => buildPrompt(uploaded.map((u) => u.filename)),
    [uploaded]
  );

  // ── Image upload handler ──
  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setUploadError(null);
    try {
      const form = new FormData();
      for (const f of Array.from(files)) form.append("files", f);
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setUploadError(json.error || "Upload failed");
        return;
      }
      const newItems: UploadedImage[] = (json.urls as string[]).map((url, i) => ({
        filename: files[i]?.name ?? `image-${i}`,
        url,
      }));
      setUploaded((prev) => [...prev, ...newItems]);
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).catch(() => {});
  }

  // ── Validate JSON (dry-run) ──
  async function handleDryRun() {
    setParseError(null);
    setDryRun(null);
    setPublishResult(null);

    let parsed: unknown;
    try {
      parsed = JSON.parse(jsonText);
    } catch (e) {
      setParseError(e instanceof Error ? `JSON parse: ${e.message}` : "Invalid JSON");
      return;
    }
    if (!Array.isArray(parsed)) {
      setParseError("JSON must be an array of products");
      return;
    }

    // Resolve imageFile → URL using uploaded map.
    const resolved = parsed.map((row: unknown) => {
      if (row && typeof row === "object") {
        const r = row as Record<string, unknown>;
        const imageFile = typeof r.imageFile === "string" ? r.imageFile : undefined;
        const url = imageFile ? filenameToUrl.get(imageFile) : undefined;
        const explicitImages = Array.isArray(r.images) ? r.images : [];
        const images = explicitImages.length > 0 ? explicitImages : url ? [url] : [];
        return { ...r, images };
      }
      return row;
    });

    try {
      const res = await fetch("/api/admin/products/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products: resolved, dryRun: true }),
      });
      const json = (await res.json()) as DryRunResponse & { error?: string };
      if (!res.ok || !json.ok) {
        setParseError(json.error || "Validation failed");
        return;
      }
      setDryRun(json);
    } catch (e) {
      setParseError(e instanceof Error ? e.message : "Validation request failed");
    }
  }

  async function handlePublish() {
    if (!dryRun || dryRun.validCount === 0) return;
    setPublishing(true);
    setPublishResult(null);

    let parsed: unknown;
    try {
      parsed = JSON.parse(jsonText);
    } catch {
      setPublishing(false);
      return;
    }
    if (!Array.isArray(parsed)) {
      setPublishing(false);
      return;
    }
    const resolved = parsed.map((row: unknown) => {
      if (row && typeof row === "object") {
        const r = row as Record<string, unknown>;
        const imageFile = typeof r.imageFile === "string" ? r.imageFile : undefined;
        const url = imageFile ? filenameToUrl.get(imageFile) : undefined;
        const explicitImages = Array.isArray(r.images) ? r.images : [];
        const images = explicitImages.length > 0 ? explicitImages : url ? [url] : [];
        return { ...r, images };
      }
      return row;
    });

    try {
      const res = await fetch("/api/admin/products/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products: resolved }),
      });
      const json = (await res.json()) as PublishResponse;
      setPublishResult(json);
    } catch (e) {
      setPublishResult({
        ok: false,
        inserted: 0,
        failed: [],
        insertedTitles: [],
        error: e instanceof Error ? e.message : "Publish failed",
      });
    } finally {
      setPublishing(false);
    }
  }

  // ── Style helpers ──
  const sectionBox =
    "border border-white/[0.06] bg-charcoal/30 p-6 sm:p-8 mb-6";
  const stepLabel =
    "text-[10px] tracking-[0.4em] uppercase text-brass/60 font-sans mb-2 block";
  const h2 = "text-xl sm:text-2xl font-serif text-ivory mb-2";
  const help = "text-[13px] text-warm-gray/70 leading-relaxed mb-6 font-sans";
  const btnPrimary =
    "bg-brass text-midnight px-6 py-3 text-[11px] tracking-[0.3em] uppercase font-sans hover:bg-brass-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  const btnGhost =
    "border border-ivory/15 text-ivory/80 px-6 py-3 text-[11px] tracking-[0.3em] uppercase font-sans hover:border-brass/30 hover:text-ivory transition-colors disabled:opacity-50";

  return (
    <div className="min-h-screen bg-midnight text-ivory">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <Link
              href="/admin"
              className="text-[10px] tracking-[0.3em] uppercase text-warm-gray/70 hover:text-brass font-sans"
            >
              ← Back to Admin
            </Link>
            <h1 className="text-3xl sm:text-4xl font-serif mt-3">Bulk Import</h1>
            <p className="text-[13px] text-warm-gray/70 mt-2 font-sans max-w-xl">
              Upload many products at once. Three steps: upload photos, get AI
              drafts from claude.ai, paste the JSON back here to publish.
            </p>
          </div>
        </div>

        {/* STEP 1 */}
        <section className={sectionBox}>
          <span className={stepLabel}>Step 1</span>
          <h2 className={h2}>Upload product photos</h2>
          <p className={help}>
            Drop a folder of images (JPG / PNG / WebP, up to 25MB each). Filenames
            will be used as join keys when you paste the JSON in step 3 — so name
            them something memorable (e.g. <code className="text-brass/80">01-mirror.jpg</code>).
          </p>

          <label className="block">
            <div className="border border-dashed border-white/15 hover:border-brass/40 transition-colors p-8 text-center cursor-pointer">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => handleUpload(e.target.files)}
                disabled={uploading}
              />
              <p className="text-[13px] text-warm-gray/80 font-sans">
                {uploading
                  ? "Uploading…"
                  : "Click to select images, or drop them here"}
              </p>
            </div>
          </label>

          {uploadError && (
            <p className="mt-3 text-[12px] text-red-300/80 font-sans">{uploadError}</p>
          )}

          {uploaded.length > 0 && (
            <>
              <div className="flex items-center justify-between mt-6 mb-3">
                <span className="text-[11px] tracking-[0.25em] uppercase text-brass/70 font-sans">
                  {uploaded.length} uploaded
                </span>
                <button
                  onClick={() => setUploaded([])}
                  className="text-[10px] tracking-[0.2em] uppercase text-warm-gray/70 hover:text-red-400 font-sans"
                >
                  Clear list
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                {uploaded.map((u) => (
                  <div key={u.url} className="border border-white/[0.06] bg-midnight p-2">
                    <img
                      src={u.url}
                      alt={u.filename}
                      className="w-full aspect-square object-cover mb-1"
                    />
                    <p className="text-[10px] text-warm-gray/70 font-mono truncate" title={u.filename}>
                      {u.filename}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>

        {/* STEP 2 */}
        <section className={sectionBox}>
          <span className={stepLabel}>Step 2</span>
          <h2 className={h2}>Get the draft JSON from claude.ai</h2>
          <p className={help}>
            Open <a className="text-brass underline" href="https://claude.ai" target="_blank" rel="noopener noreferrer">claude.ai</a> in
            a new tab. Drag in the same photos you just uploaded, then paste the
            prompt below. Claude returns a JSON array — copy it for step 3.
          </p>

          <div className="relative">
            <pre className="bg-midnight border border-white/[0.06] p-4 text-[12px] text-pearl/80 font-mono max-h-96 overflow-auto whitespace-pre-wrap leading-relaxed">
{prompt}
            </pre>
            <button
              onClick={() => copyToClipboard(prompt)}
              className="absolute top-3 right-3 bg-brass text-midnight px-3 py-1.5 text-[9px] tracking-[0.2em] uppercase font-sans hover:bg-brass-light transition-colors"
            >
              Copy prompt
            </button>
          </div>

          {uploaded.length === 0 && (
            <p className="mt-3 text-[12px] text-warm-gray/60 italic font-sans">
              Upload photos in step 1 first — the prompt will be populated with
              your filenames so Claude knows what to reference.
            </p>
          )}
        </section>

        {/* STEP 3 */}
        <section className={sectionBox}>
          <span className={stepLabel}>Step 3</span>
          <h2 className={h2}>Paste Claude&apos;s JSON and publish</h2>
          <p className={help}>
            Paste the array claude.ai gave you. Hit Validate first — it will
            check every row without saving anything. When the list looks right,
            Publish all.
          </p>

          <textarea
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            placeholder='[\n  { "imageFile": "01-mirror.jpg", "title": "...", "category": "mother-of-pearl-furniture", ... }\n]'
            className="w-full h-64 bg-midnight border border-white/10 focus:border-brass/40 p-4 text-[12px] text-ivory font-mono outline-none transition-colors"
          />

          <div className="flex flex-wrap gap-3 mt-4">
            <button
              onClick={handleDryRun}
              disabled={!jsonText.trim()}
              className={btnGhost}
            >
              Validate
            </button>
            <button
              onClick={handlePublish}
              disabled={!dryRun || dryRun.validCount === 0 || publishing}
              className={btnPrimary}
            >
              {publishing
                ? "Publishing…"
                : dryRun
                  ? `Publish ${dryRun.validCount} product${dryRun.validCount === 1 ? "" : "s"}`
                  : "Publish all"}
            </button>
          </div>

          {parseError && (
            <p className="mt-4 text-[12px] text-red-300/80 font-sans">{parseError}</p>
          )}

          {/* Dry-run report */}
          {dryRun && (
            <div className="mt-6 border-t border-white/[0.04] pt-6">
              <p className="text-[11px] tracking-[0.25em] uppercase text-brass/70 font-sans mb-4">
                {dryRun.validCount} valid · {dryRun.failed.length} failed
              </p>
              {dryRun.failed.length > 0 && (
                <div className="space-y-2 mb-6">
                  {dryRun.failed.map((f) => (
                    <div key={f.index} className="border border-red-500/20 bg-red-500/[0.04] px-4 py-2">
                      <p className="text-[12px] text-red-300/90 font-sans">
                        <span className="font-mono opacity-70">[#{f.index}]</span>{" "}
                        {f.title || "(no title)"} — {f.error}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              {dryRun.preview.length > 0 && (
                <details className="text-[11px] font-mono text-warm-gray/70">
                  <summary className="cursor-pointer hover:text-ivory mb-2">
                    Preview first {dryRun.preview.length} normalized row(s)
                  </summary>
                  <pre className="bg-midnight border border-white/[0.04] p-3 overflow-auto max-h-80">
{JSON.stringify(dryRun.preview, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          )}

          {/* Publish result */}
          {publishResult && (
            <div className="mt-6 border-t border-white/[0.04] pt-6">
              {publishResult.ok ? (
                <>
                  <p className="text-[14px] text-brass font-serif italic mb-3">
                    {publishResult.inserted} product{publishResult.inserted === 1 ? "" : "s"} published.
                  </p>
                  <ul className="text-[12px] text-warm-gray/80 space-y-1">
                    {publishResult.insertedTitles.slice(0, 10).map((t) => (
                      <li key={t}>· {t}</li>
                    ))}
                    {publishResult.insertedTitles.length > 10 && (
                      <li className="opacity-60">
                        …and {publishResult.insertedTitles.length - 10} more.
                      </li>
                    )}
                  </ul>
                  <Link
                    href="/admin"
                    className="inline-block mt-6 text-[10px] tracking-[0.3em] uppercase text-brass hover:text-brass-light font-sans"
                  >
                    Open admin to edit details →
                  </Link>
                </>
              ) : (
                <p className="text-[12px] text-red-300/80 font-sans">
                  {publishResult.error || "Publish failed"}
                </p>
              )}
            </div>
          )}
        </section>

        <div className="text-center text-[11px] text-warm-gray/50 font-sans py-8">
          After publishing, open <Link href="/admin" className="text-brass hover:underline">/admin</Link> to
          fill in price, period, dimensions, and provenance for each piece.
        </div>
      </div>
    </div>
  );
}
