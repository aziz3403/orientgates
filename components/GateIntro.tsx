"use client";

import { useEffect, useState } from "react";

// Auto-play gate-opening intro shown on first paint. The whole layout
// mounts once per full page load, so this only re-triggers on a real
// refresh — not on internal Next.js Link navigation.
export default function GateIntro() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Respect reduced motion — skip the whole thing.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setOpen(true);
      return;
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const tOpen = window.setTimeout(() => setOpen(true), 100);
    const tUnlock = window.setTimeout(() => {
      document.body.style.overflow = prevOverflow || "";
    }, 2700);

    return () => {
      window.clearTimeout(tOpen);
      window.clearTimeout(tUnlock);
      document.body.style.overflow = prevOverflow || "";
    };
  }, []);

  return (
    <div className={`gate-intro ${open ? "open" : ""}`} aria-hidden="true">
      <div className="gate-half left" />
      <div className="gate-half right" />
      <div className="gate-seam" />
      <div className="gate-brand">
        <div className="gate-eyebrow">Est &middot; MDCCCLXX</div>
        <div className="gate-name">The Orient Gates</div>
      </div>
    </div>
  );
}
