"use client";

import { useState } from "react";
import AnimateIn from "@/components/ui/AnimateIn";

type Status = "idle" | "loading" | "ok" | "error";

export default function CuratorsLetter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading" || status === "ok") return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/curators-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        setStatus("error");
        setErrorMsg(json.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("ok");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  const locked = status === "loading" || status === "ok";

  return (
    <section className="relative bg-midnight py-section overflow-hidden border-t border-white/[0.04]">
      <div className="relative max-w-2xl mx-auto px-6 text-center">
        <AnimateIn>
          <div className="flex items-center justify-center gap-5 mb-8">
            <div className="w-12 h-px bg-brass/40" />
            <span className="text-[10px] tracking-[0.35em] uppercase text-brass/70 font-sans">
              The Curator&apos;s Letter
            </span>
            <div className="w-12 h-px bg-brass/40" />
          </div>
        </AnimateIn>

        <AnimateIn delay={100}>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-serif text-ivory leading-[1.1] mb-6">
            One piece.
            <br />
            <span className="italic text-pearl/70">One story. Once a month.</span>
          </h2>
        </AnimateIn>

        <AnimateIn delay={200}>
          <p className="text-[14px] text-warm-gray/80 leading-[1.9] font-sans max-w-md mx-auto mb-10">
            A quiet letter from our atelier — a single object, its provenance,
            and the hands that made it. No promotions, no noise.
          </p>
        </AnimateIn>

        <AnimateIn delay={300}>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <label htmlFor="curator-email" className="sr-only">
              Email address
            </label>
            <input
              id="curator-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              disabled={locked}
              className="flex-1 bg-transparent border border-white/10 focus:border-brass/50 outline-none px-5 py-4 text-[13px] text-ivory placeholder:text-warm-gray/40 font-sans transition-colors duration-500 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={locked}
              className="bg-brass text-midnight px-8 py-4 text-[10px] tracking-[0.3em] uppercase font-sans hover:bg-brass-light transition-colors duration-500 disabled:opacity-60 disabled:hover:bg-brass"
            >
              {status === "loading"
                ? "Sending…"
                : status === "ok"
                ? "Subscribed"
                : "Subscribe"}
            </button>
          </form>

          <div className="min-h-[24px] mt-5">
            {status === "ok" && (
              <p className="text-[12px] text-brass/80 font-sans italic">
                Thank you. Your first letter will arrive at the start of next month.
              </p>
            )}
            {status === "error" && (
              <p className="text-[12px] text-red-400/80 font-sans">{errorMsg}</p>
            )}
            {(status === "idle" || status === "loading") && (
              <p className="text-[11px] text-warm-gray/50 font-sans">
                Delivered once a month. Unsubscribe at any time.
              </p>
            )}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
