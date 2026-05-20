"use client";

import { useRef, useState } from "react";

interface Props {
  images: string[];
  onChange: (images: string[]) => void;
}

export default function ImageManager({ images, onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progressLabel, setProgressLabel] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

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

  const uploadFiles = async (fileList: FileList | File[]) => {
    const files = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    if (files.length === 0) {
      setUploadError("No image files selected.");
      return;
    }
    setUploadError(null);
    setUploading(true);
    setProgressLabel(`Uploading 0 / ${files.length}…`);

    const uploaded: string[] = [];
    const errors: string[] = [];

    // Upload sequentially so progress feels deterministic and we don't pile up
    // megabytes of concurrent requests against the dev server.
    for (let i = 0; i < files.length; i++) {
      setProgressLabel(`Uploading ${i + 1} / ${files.length}… (${files[i].name})`);
      const form = new FormData();
      form.append("files", files[i]);
      try {
        const res = await fetch("/api/admin/upload", { method: "POST", body: form });
        const data = await res.json();
        if (!res.ok || !data.ok) {
          errors.push(`${files[i].name}: ${data.error || res.statusText}`);
          continue;
        }
        if (Array.isArray(data.urls)) uploaded.push(...data.urls);
      } catch (e) {
        errors.push(`${files[i].name}: ${e instanceof Error ? e.message : "network error"}`);
      }
    }

    if (uploaded.length > 0) {
      onChange([...images, ...uploaded]);
    }
    if (errors.length > 0) {
      setUploadError(errors.join(" • "));
    }
    setUploading(false);
    setProgressLabel(null);
  };

  const onPickFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) uploadFiles(files);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      uploadFiles(e.dataTransfer.files);
    }
  };

  return (
    <div>
      {/* Gallery of current images */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-4">
          {images.map((url, i) => (
            <div
              key={`${url}-${i}`}
              className="border border-white/10 bg-charcoal flex flex-col"
            >
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
                <div className="absolute top-1 left-1 bg-midnight/85 text-ivory/90 text-[10px] font-mono px-1.5 py-0.5">
                  {i + 1}
                </div>
                {i === 0 && (
                  <div className="absolute top-1 right-1 bg-brass text-midnight text-[8px] tracking-[0.2em] uppercase px-1.5 py-0.5 font-sans font-medium">
                    Main
                  </div>
                )}
              </a>

              <div className="flex items-center justify-between px-1.5 py-1 border-t border-white/5">
                <div className="flex gap-0.5">
                  <button
                    type="button"
                    onClick={() => move(i, -1)}
                    disabled={i === 0 || uploading}
                    className="text-[12px] text-ivory/60 hover:text-brass px-1.5 py-0.5 disabled:opacity-20 disabled:cursor-not-allowed leading-none"
                    title="Move earlier"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => move(i, 1)}
                    disabled={i === images.length - 1 || uploading}
                    className="text-[12px] text-ivory/60 hover:text-brass px-1.5 py-0.5 disabled:opacity-20 disabled:cursor-not-allowed leading-none"
                    title="Move later"
                  >
                    →
                  </button>
                  {i > 0 && (
                    <button
                      type="button"
                      onClick={() => makeMain(i)}
                      disabled={uploading}
                      className="text-[11px] text-ivory/60 hover:text-brass px-1.5 py-0.5 leading-none disabled:opacity-30"
                      title="Make this the main photo"
                    >
                      ★
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => remove(i)}
                  disabled={uploading}
                  className="text-[12px] text-red-400/70 hover:text-red-400 px-1.5 py-0.5 leading-none disabled:opacity-30"
                  title="Remove from product (does not delete file from storage)"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => !uploading && fileInputRef.current?.click()}
        className={`relative border border-dashed cursor-pointer transition-colors px-6 py-8 text-center ${
          dragOver
            ? "border-brass bg-brass/[0.06]"
            : uploading
              ? "border-white/20"
              : "border-white/15 hover:border-brass/40 hover:bg-white/[0.02]"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          multiple
          onChange={onPickFiles}
          disabled={uploading}
          className="hidden"
        />

        {uploading ? (
          <div>
            <p className="text-brass text-[12px] tracking-[0.2em] uppercase font-sans">
              {progressLabel ?? "Uploading…"}
            </p>
            <div className="mt-3 w-32 h-px mx-auto bg-brass/30 overflow-hidden relative">
              <div className="absolute inset-y-0 w-1/3 bg-brass animate-pulse" />
            </div>
          </div>
        ) : (
          <>
            <p className="text-ivory text-[11px] tracking-[0.25em] uppercase font-sans">
              Drop images here or click to choose
            </p>
            <p className="text-warm-gray/60 text-[10px] font-sans mt-2">
              JPG · PNG · WEBP · GIF · AVIF — up to 25MB each — multiple files OK
            </p>
          </>
        )}
      </div>

      {uploadError && (
        <p className="text-red-400/80 text-[11px] font-sans mt-3 break-words">
          {uploadError}
        </p>
      )}

      <p className="text-[10px] text-warm-gray/50 font-sans mt-3 leading-relaxed">
        Files upload directly to the Supabase{" "}
        <code className="text-brass/70">product-images</code> bucket. The first
        image is the <span className="text-brass/80">main photo</span>; click ★
        on any other to promote it. ← / → reorder. ✕ removes from this product
        (the file stays in the bucket).
      </p>
    </div>
  );
}
