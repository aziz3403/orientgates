// A large, faint Damascene girih medallion rendered as crisp SVG.
// Decorative only — sits behind content at low opacity. Stroke-only so it
// stays a whisper. Pair with `animate-medallion` for a very slow rotation.

function starPath(
  cx: number,
  cy: number,
  outer: number,
  inner: number,
  points: number,
  rotation = 0
): string {
  const step = Math.PI / points;
  let d = "";
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = i * step - Math.PI / 2 + rotation;
    const x = cx + r * Math.cos(a);
    const y = cy + r * Math.sin(a);
    d += `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)} `;
  }
  return d + "Z";
}

interface MedallionProps {
  className?: string;
  /** stroke colour; defaults to brass */
  stroke?: string;
}

export default function Medallion({ className = "", stroke = "rgba(184,151,47,0.9)" }: MedallionProps) {
  const c = 200;
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      fill="none"
      stroke={stroke}
      strokeWidth={0.6}
      aria-hidden="true"
    >
      <circle cx={c} cy={c} r={190} />
      <circle cx={c} cy={c} r={150} />
      {/* 16-point outer rosette */}
      <path d={starPath(c, c, 188, 150, 16)} />
      <path d={starPath(c, c, 150, 120, 16, Math.PI / 16)} />
      {/* octagon */}
      <path d={starPath(c, c, 118, 118, 8, Math.PI / 8)} />
      {/* interlaced 8-point khatam (two squares) */}
      <path d={starPath(c, c, 110, 46, 8)} />
      <rect x={c - 70} y={c - 70} width={140} height={140} />
      <rect
        x={c - 70}
        y={c - 70}
        width={140}
        height={140}
        transform={`rotate(45 ${c} ${c})`}
      />
      <circle cx={c} cy={c} r={40} />
      <path d={starPath(c, c, 38, 16, 8, Math.PI / 8)} />
    </svg>
  );
}
