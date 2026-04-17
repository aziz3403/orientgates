export default function ArabesqueDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`relative py-6 ${className}`}>
      <div className="flex items-center justify-center">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-brass/20" />
        <svg width="280" height="48" viewBox="0 0 280 48" fill="none" className="flex-shrink-0">
          {/* Left flowing vine */}
          <path d="M0 24 C12 24 18 14 30 14 C42 14 42 24 54 24" stroke="rgba(184,151,47,0.3)" strokeWidth="0.7" />
          <path d="M0 24 C12 24 18 34 30 34 C42 34 42 24 54 24" stroke="rgba(184,151,47,0.15)" strokeWidth="0.7" />
          {/* Left palmette leaf */}
          <path d="M36 14 C33 8 30 5 27 8" stroke="rgba(184,151,47,0.2)" strokeWidth="0.5" />
          <path d="M36 14 C39 8 42 5 45 8" stroke="rgba(184,151,47,0.2)" strokeWidth="0.5" />
          <path d="M30 34 C27 40 24 43 21 40" stroke="rgba(184,151,47,0.15)" strokeWidth="0.5" />
          <path d="M30 34 C33 40 36 43 39 40" stroke="rgba(184,151,47,0.15)" strokeWidth="0.5" />

          {/* Left connector diamond */}
          <rect x="58" y="18" width="8" height="8" rx="1" transform="rotate(45 62 22)" stroke="rgba(184,151,47,0.25)" strokeWidth="0.5" />
          <circle cx="62" cy="22" r="1" fill="rgba(184,151,47,0.25)" />

          {/* Inner left arc */}
          <path d="M70 24 C80 16 90 12 100 16" stroke="rgba(184,151,47,0.25)" strokeWidth="0.6" />
          <path d="M70 24 C80 32 90 36 100 32" stroke="rgba(184,151,47,0.15)" strokeWidth="0.6" />

          {/* ══ CENTER MEDALLION ══ */}
          {/* Outer pointed oval (mandorla) */}
          <path d="M110 24 Q120 6 140 6 Q160 6 170 24 Q160 42 140 42 Q120 42 110 24Z" stroke="rgba(184,151,47,0.3)" strokeWidth="0.8" />
          {/* Inner pointed oval */}
          <path d="M118 24 Q126 12 140 12 Q154 12 162 24 Q154 36 140 36 Q126 36 118 24Z" stroke="rgba(184,151,47,0.18)" strokeWidth="0.6" />
          {/* Center 8-point star */}
          <path d="M140 14L143 20L149 17L147 23L153 24L147 25L149 31L143 28L140 34L137 28L131 31L133 25L127 24L133 23L131 17L137 20Z" stroke="rgba(184,151,47,0.35)" strokeWidth="0.6" />
          {/* Center dot */}
          <circle cx="140" cy="24" r="2" fill="rgba(184,151,47,0.4)" />
          <circle cx="140" cy="24" r="0.8" fill="rgba(184,151,47,0.6)" />
          {/* Cross arms inside star */}
          <line x1="136" y1="24" x2="144" y2="24" stroke="rgba(184,151,47,0.15)" strokeWidth="0.3" />
          <line x1="140" y1="20" x2="140" y2="28" stroke="rgba(184,151,47,0.15)" strokeWidth="0.3" />

          {/* Inner right arc */}
          <path d="M180 16 C190 12 200 16 210 24" stroke="rgba(184,151,47,0.25)" strokeWidth="0.6" />
          <path d="M180 32 C190 36 200 32 210 24" stroke="rgba(184,151,47,0.15)" strokeWidth="0.6" />

          {/* Right connector diamond */}
          <rect x="214" y="18" width="8" height="8" rx="1" transform="rotate(45 218 22)" stroke="rgba(184,151,47,0.25)" strokeWidth="0.5" />
          <circle cx="218" cy="22" r="1" fill="rgba(184,151,47,0.25)" />

          {/* Right flowing vine */}
          <path d="M226 24 C238 24 238 14 250 14 C262 14 268 24 280 24" stroke="rgba(184,151,47,0.3)" strokeWidth="0.7" />
          <path d="M226 24 C238 24 238 34 250 34 C262 34 268 24 280 24" stroke="rgba(184,151,47,0.15)" strokeWidth="0.7" />
          {/* Right palmette leaves */}
          <path d="M244 14 C241 8 238 5 235 8" stroke="rgba(184,151,47,0.2)" strokeWidth="0.5" />
          <path d="M244 14 C247 8 250 5 253 8" stroke="rgba(184,151,47,0.2)" strokeWidth="0.5" />
          <path d="M250 34 C247 40 244 43 241 40" stroke="rgba(184,151,47,0.15)" strokeWidth="0.5" />
          <path d="M250 34 C253 40 256 43 259 40" stroke="rgba(184,151,47,0.15)" strokeWidth="0.5" />
        </svg>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-brass/20" />
      </div>
    </div>
  );
}
