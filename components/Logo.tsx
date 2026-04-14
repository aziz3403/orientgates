"use client";

interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 40, className = "" }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4b44a" />
          <stop offset="30%" stopColor="#b8972f" />
          <stop offset="60%" stopColor="#d4b44a" />
          <stop offset="100%" stopColor="#a07d20" />
        </linearGradient>
        <linearGradient id="goldLight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8d070" />
          <stop offset="50%" stopColor="#d4b44a" />
          <stop offset="100%" stopColor="#b8972f" />
        </linearGradient>
        <clipPath id="hexClip">
          <polygon points="50,3 93,28 93,72 50,97 7,72 7,28" />
        </clipPath>
      </defs>

      {/* Outer hexagon frame with bevel effect */}
      <polygon
        points="50,2 94,27 94,73 50,98 6,73 6,27"
        fill="url(#goldLight)"
        opacity="0.9"
      />
      <polygon
        points="50,6 90,29 90,71 50,94 10,71 10,29"
        fill="#0a0a0a"
      />

      {/* Inner geometric pattern */}
      <g clipPath="url(#hexClip)" stroke="url(#goldGrad)" strokeWidth="1.2" fill="none">
        {/* Central star */}
        <circle cx="50" cy="50" r="8" strokeWidth="1.5" />
        <polygon points="50,38 54,46 62,46 56,51 58,59 50,55 42,59 44,51 38,46 46,46" strokeWidth="1.3" />

        {/* Inner ring of stars */}
        {[0, 60, 120, 180, 240, 300].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const cx = 50 + 22 * Math.cos(rad - Math.PI / 2);
          const cy = 50 + 22 * Math.sin(rad - Math.PI / 2);
          return (
            <g key={angle}>
              <circle cx={cx} cy={cy} r="4.5" strokeWidth="1" />
              <line
                x1={50 + 10 * Math.cos(rad - Math.PI / 2)}
                y1={50 + 10 * Math.sin(rad - Math.PI / 2)}
                x2={cx}
                y2={cy}
                strokeWidth="0.8"
              />
            </g>
          );
        })}

        {/* Outer ring of stars */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const cx = 50 + 36 * Math.cos(rad - Math.PI / 2);
          const cy = 50 + 36 * Math.sin(rad - Math.PI / 2);
          return (
            <g key={`outer-${angle}`}>
              <circle cx={cx} cy={cy} r="3" strokeWidth="0.8" />
              <line
                x1={50 + 24 * Math.cos(rad - Math.PI / 2)}
                y1={50 + 24 * Math.sin(rad - Math.PI / 2)}
                x2={cx}
                y2={cy}
                strokeWidth="0.6"
              />
            </g>
          );
        })}

        {/* Connecting arcs */}
        {[0, 60, 120, 180, 240, 300].map((angle) => {
          const rad1 = ((angle - 15) * Math.PI) / 180;
          const rad2 = ((angle + 15) * Math.PI) / 180;
          return (
            <line
              key={`arc-${angle}`}
              x1={50 + 36 * Math.cos(rad1 - Math.PI / 2)}
              y1={50 + 36 * Math.sin(rad1 - Math.PI / 2)}
              x2={50 + 36 * Math.cos(rad2 - Math.PI / 2)}
              y2={50 + 36 * Math.sin(rad2 - Math.PI / 2)}
              strokeWidth="0.8"
            />
          );
        })}

        {/* Radial lines from center */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <line
              key={`rad-${angle}`}
              x1={50 + 8 * Math.cos(rad - Math.PI / 2)}
              y1={50 + 8 * Math.sin(rad - Math.PI / 2)}
              x2={50 + 15 * Math.cos(rad - Math.PI / 2)}
              y2={50 + 15 * Math.sin(rad - Math.PI / 2)}
              strokeWidth="0.6"
              opacity="0.7"
            />
          );
        })}
      </g>

      {/* Inner hexagon accent line */}
      <polygon
        points="50,12 85,32 85,68 50,88 15,68 15,32"
        stroke="url(#goldGrad)"
        strokeWidth="0.5"
        fill="none"
        opacity="0.4"
      />
    </svg>
  );
}
