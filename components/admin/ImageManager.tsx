"use client";

import { useState } from "react";

interface Props {
  images: string[];
  onChange: (images: string[]) => void;
}

// Pull multiple URLs out of a paste (newline, comma, or whitespace separated).
function parseUrls(input: string): string[] {
  return input
    .split(/[\s,]+/)
    .map((s) => s.trim())
    .filter((s) => /^https?:\/\//i.test(s));
}

export default function ImageManager({ images, onChange }: Props) {
  const [newUrl, setNewUrl] = useState("");

  const move = (from: number, dir: -1 | 1) => {
    const to = from + dir;
    if (to < 0 || to >= images.length) return;
    const next = [...images];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  };

  const remove = (i: number) => {
    onChange(images.filter((_, idx) => idx !== i));
  };

  const makeMain = (i: number) => {
    if (i === 0) return;
    const next = [...images];
    const [item] = next.splice(i, 1);
    next.unshift(item);
    onChange(next);
  };

  const add = () => {
    const parsed = parseUrls(newUrl);
    if (parsed.length === 0) return;
    onChange([...images, ...parsed]);
    setNewUrl("");
  };

  return (
    <div>
      {images.length === 0 ? (
        <div className="border border-white/10 p-6 text-center mb-4">
          <p className="text-warm-gray/60 text-xs font-sans">
            No images yet. Paste one or more URLs below.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-4">
          {images.map((url, i) => (
            <div
              key={`${url}-${i}`}
              className="border border-white/10 bg-charcoal flex flex-col"
            >
              {/* Thumbnail */}
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="relative block aspect-square overflow-hidden bg-midnight/40"
                title="Open full size in new tab"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt={`Image ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const el = e.currentTarget as HTMLImageElement;
                    el.style.opacity = "0.15";
                    el.alt = "Failed to load";
                  }}
                />

                {/* Position number */}
                <div className="absolute top-1 left-1 bg-midnight/85 text-ivory/90 text-[10px] font-mono px-1.5 py-0.5">
                  {i + 1}
                </div>

                {/* MAIN badge on first image */}
                {i === 0 && (
                  <div className="absolute top-1 right-1 bg-brass text-midnight text-[8px] tracking-[0.2em] uppercase px-1.5 py-0.5 font-sans font-medium">
                    Main
                  </div>
                )}
              </a>

              {/* Controls */}
              <div className="flex items-center justify-between px-1.5 py-1 border-t border-white/5">
                <div className="flex gap-0.5">
                  <button
                    type="button"
                    onClick={() => move(i, -1)}
                    disabled={i === 0}
                    className="text-[12px] text-ivory/60 hover:text-brass px-1.5 py-0.5 disabled:opacity-20 disabled:cursor-not-allowed leading-none"
                    title="Move earlier"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => move(i, 1)}
                    disabled={i === images.length - 1}
                    className="text-[12px] text-ivory/60 hover:text-brass px-1.5 py-0.5 disabled:opacity-20 disabled:cursor-not-allowed leading-none"
                    title="Move later"
                  >
                    →
                  </button>
                  {i > 0 && (
                    <button
                      type="button"
                      onClick={() => makeMain(i)}
                      className="text-[11px] text-ivory/60 hover:text-brass px-1.5 py-0.5 leading-none"
                      title="Make this the main photo"
                    >
                      ★
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="text-[12px] text-red-400/70 hover:text-red-400 px-1.5 py-0.5 leading-none"
                  title="Remove"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add URL(s) */}
      <div className="flex gap-2 items-stretch">
        <textarea
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              add();
            }
          }}
          rows={2}
          placeholder="Paste one or more image URLs (separated by newline, space, or comma)…"
          className="flex-1 bg-transparent border border-white/10 px-3 py-2 text-ivory text-xs font-mono focus:border-brass outline-none resize-none"
        />
        <button
          type="button"
          onClick={add}
          disabled={parseUrls(newUrl).length === 0}
          className="bg-brass text-midnight px-4 text-[10px] tracking-[0.2em] uppercase font-sans disabled:opacity-30 self-stretch"
        >
          Add
        </button>
      </div>
      <p className="text-[10px] text-warm-gray/50 font-sans mt-2 leading-relaxed">
        Upload files in the{" "}
        <a
          href="https://supabase.com/dashboard/project/rtdxmomppohpvyiewfyh/storage/buckets/product-images"
          target="_blank"
          rel="noreferrer"
          className="text-brass/70 underline hover:text-brass"
        >
          Supabase Storage dashboard
        </a>
        , copy each public URL, paste above. The first image is the{" "}
        <span className="text-brass/80">main photo</span>; click ★ on any other
        to promote it. ← / → reorder. ✕ removes (does not delete from
        Storage). Click a thumbnail to open it full-size.
      </p>
    </div>
  );
}
