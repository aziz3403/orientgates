import { type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return inputs.filter(Boolean).join(" ");
}

// Placeholder image generator using a luxurious gradient
export function placeholderImage(
  width: number,
  height: number,
  label?: string
): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#1a1a1a"/>
        <stop offset="50%" style="stop-color:#2c1810"/>
        <stop offset="100%" style="stop-color:#0a0a0a"/>
      </linearGradient>
      <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:rgba(184,151,47,0)"/>
        <stop offset="50%" style="stop-color:rgba(184,151,47,0.08)"/>
        <stop offset="100%" style="stop-color:rgba(184,151,47,0)"/>
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#bg)"/>
    <rect width="${width}" height="${height}" fill="url(#shimmer)"/>
    ${label ? `<text x="${width / 2}" y="${height / 2}" fill="rgba(245,240,232,0.25)" font-family="Georgia,serif" font-size="${Math.min(width, height) * 0.06}" text-anchor="middle" dominant-baseline="central">${label}</text>` : ""}
  </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
