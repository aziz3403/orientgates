export default function GeometricFrieze({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <svg viewBox="0 0 1200 60" fill="none" preserveAspectRatio="xMidYMid slice" className="w-full h-[30px] lg:h-[40px]">
        <defs>
          <pattern id="frieze-unit" x="0" y="0" width="120" height="60" patternUnits="userSpaceOnUse">
            {/* 8-point star */}
            <path d="M60 8L66 22L80 16L74 30L88 30L76 38L88 42L76 46L88 54L74 48L80 60L66 52L60 60L54 52L40 60L46 48L32 54L44 46L32 42L44 38L32 30L46 30L40 16L54 22Z"
              stroke="rgba(184,151,47,0.45)" strokeWidth="0.6" fill="none" />
            {/* Inner star */}
            <path d="M60 18L63 26L70 23L68 30L76 30L70 35L76 38L70 41L76 46L68 44L70 50L63 46L60 52L57 46L50 50L52 44L44 46L50 41L44 38L50 35L44 30L52 30L50 23L57 26Z"
              stroke="rgba(184,151,47,0.25)" strokeWidth="0.4" fill="none" />
            {/* Center jewel */}
            <circle cx="60" cy="34" r="3" stroke="rgba(184,151,47,0.35)" strokeWidth="0.5" fill="rgba(184,151,47,0.08)" />
            <circle cx="60" cy="34" r="1" fill="rgba(184,151,47,0.4)" />
            {/* Corner connectors — cross shapes */}
            <rect x="-4" y="26" width="8" height="8" rx="1" stroke="rgba(184,151,47,0.2)" strokeWidth="0.4" fill="none" />
            <rect x="116" y="26" width="8" height="8" rx="1" stroke="rgba(184,151,47,0.2)" strokeWidth="0.4" fill="none" />
            {/* Top/bottom border lines */}
            <line x1="0" y1="2" x2="120" y2="2" stroke="rgba(184,151,47,0.15)" strokeWidth="0.3" />
            <line x1="0" y1="58" x2="120" y2="58" stroke="rgba(184,151,47,0.15)" strokeWidth="0.3" />
            <line x1="0" y1="5" x2="120" y2="5" stroke="rgba(184,151,47,0.08)" strokeWidth="0.3" />
            <line x1="0" y1="55" x2="120" y2="55" stroke="rgba(184,151,47,0.08)" strokeWidth="0.3" />
          </pattern>
        </defs>
        <rect width="1200" height="60" fill="url(#frieze-unit)" />
      </svg>
    </div>
  );
}
