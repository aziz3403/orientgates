#!/usr/bin/env node
// One-shot generator for The Orient Gates favicon set + OG image.
// Run with `node scripts/build-favicons.mjs`.
//
// Requires: rsvg-convert + magick (imagemagick) on PATH. Both are installed
// via `brew install librsvg imagemagick` on macOS dev machines.

import { execFileSync } from "node:child_process";
import { writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";

const OUT = join(process.cwd(), "public");

// ── 1. Build a clean standalone SVG of just the Orient Gates hexagonal mark.
//      This mirrors components/Logo.tsx but resolves the Math.* loops to
//      static SVG so rsvg-convert can rasterise it. The 100×100 viewBox stays.
function buildLogoSvg() {
  const polar = (cx, cy, r, angleDeg) => {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
  };
  const fix = (n) => n.toFixed(3);

  // inner ring (6 nodes)
  const innerRing = [0, 60, 120, 180, 240, 300]
    .map((a) => {
      const [cx, cy] = polar(50, 50, 22, a);
      const [lx, ly] = polar(50, 50, 10, a);
      return `<g><circle cx="${fix(cx)}" cy="${fix(cy)}" r="4.5" stroke-width="1"/><line x1="${fix(lx)}" y1="${fix(ly)}" x2="${fix(cx)}" y2="${fix(cy)}" stroke-width="0.8"/></g>`;
    })
    .join("");

  // outer ring (12 nodes)
  const outerRing = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]
    .map((a) => {
      const [cx, cy] = polar(50, 50, 36, a);
      const [lx, ly] = polar(50, 50, 24, a);
      return `<g><circle cx="${fix(cx)}" cy="${fix(cy)}" r="3" stroke-width="0.8"/><line x1="${fix(lx)}" y1="${fix(ly)}" x2="${fix(cx)}" y2="${fix(cy)}" stroke-width="0.6"/></g>`;
    })
    .join("");

  // connecting arcs (6 chords on outer ring)
  const arcs = [0, 60, 120, 180, 240, 300]
    .map((a) => {
      const [x1, y1] = polar(50, 50, 36, a - 15);
      const [x2, y2] = polar(50, 50, 36, a + 15);
      return `<line x1="${fix(x1)}" y1="${fix(y1)}" x2="${fix(x2)}" y2="${fix(y2)}" stroke-width="0.8"/>`;
    })
    .join("");

  // radial lines (12 short lines)
  const radials = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]
    .map((a) => {
      const [x1, y1] = polar(50, 50, 8, a);
      const [x2, y2] = polar(50, 50, 15, a);
      return `<line x1="${fix(x1)}" y1="${fix(y1)}" x2="${fix(x2)}" y2="${fix(y2)}" stroke-width="0.6" opacity="0.7"/>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#d4b44a"/>
      <stop offset="30%" stop-color="#b8972f"/>
      <stop offset="60%" stop-color="#d4b44a"/>
      <stop offset="100%" stop-color="#a07d20"/>
    </linearGradient>
    <linearGradient id="goldLight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#e8d070"/>
      <stop offset="50%" stop-color="#d4b44a"/>
      <stop offset="100%" stop-color="#b8972f"/>
    </linearGradient>
    <clipPath id="hexClip">
      <polygon points="50,3 93,28 93,72 50,97 7,72 7,28"/>
    </clipPath>
  </defs>
  <polygon points="50,2 94,27 94,73 50,98 6,73 6,27" fill="url(#goldLight)" opacity="0.9"/>
  <polygon points="50,6 90,29 90,71 50,94 10,71 10,29" fill="#0a0a0a"/>
  <g clip-path="url(#hexClip)" stroke="url(#goldGrad)" stroke-width="1.2" fill="none">
    <circle cx="50" cy="50" r="8" stroke-width="1.5"/>
    <polygon points="50,38 54,46 62,46 56,51 58,59 50,55 42,59 44,51 38,46 46,46" stroke-width="1.3"/>
    ${innerRing}
    ${outerRing}
    ${arcs}
    ${radials}
  </g>
  <polygon points="50,12 85,32 85,68 50,88 15,68 15,32" stroke="url(#goldGrad)" stroke-width="0.5" fill="none" opacity="0.4"/>
</svg>`;
}

// ── 2. Write the SVG, rasterise at each required size, build .ico.
const svgPath = join(OUT, "icon.svg");
writeFileSync(svgPath, buildLogoSvg());
console.log(`wrote ${svgPath}`);

const sizes = [
  { out: "favicon-16x16.png", size: 16 },
  { out: "favicon-32x32.png", size: 32 },
  { out: "favicon-48x48.png", size: 48 },
  { out: "apple-touch-icon.png", size: 180 },
  { out: "icon-192.png", size: 192 },
  { out: "icon-512.png", size: 512 },
];

for (const { out, size } of sizes) {
  const file = join(OUT, out);
  execFileSync("rsvg-convert", [
    "-w", String(size),
    "-h", String(size),
    "-o", file,
    svgPath,
  ]);
  console.log(`  ${out} (${size}×${size})`);
}

// favicon.ico — multi-resolution from 16/32/48 PNGs
const icoPath = join(OUT, "favicon.ico");
execFileSync("magick", [
  join(OUT, "favicon-16x16.png"),
  join(OUT, "favicon-32x32.png"),
  join(OUT, "favicon-48x48.png"),
  icoPath,
]);
console.log(`  favicon.ico (multi-size)`);

// ── 3. Web manifest for PWA support.
writeFileSync(
  join(OUT, "site.webmanifest"),
  JSON.stringify(
    {
      name: "The Orient Gates",
      short_name: "Orient Gates",
      description:
        "Rare antiques and handcrafted mother-of-pearl furniture, by four generations of the Harb family.",
      icons: [
        { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      theme_color: "#0a0a0a",
      background_color: "#0a0a0a",
      display: "standalone",
      start_url: "/",
    },
    null,
    2
  )
);
console.log("  site.webmanifest");

// ── 4. Open Graph image: 1200×630 hero from the MoP mirror room shot.
const ogPath = join(OUT, "images", "og-image.jpg");
execFileSync("magick", [
  join(OUT, "images", "cat-mop.jpg"),
  "-resize", "1600x1600^",  // ^ = fill at least these dims
  "-gravity", "center",
  "-extent", "1200x630",
  "-quality", "84",
  ogPath,
]);
console.log("  og-image.jpg (1200×630)");

console.log("\nDone.");
