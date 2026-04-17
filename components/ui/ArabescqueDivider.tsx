export default function ArabesqueDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`relative py-10 ${className}`}>
      <div className="flex items-center justify-center">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-brass/25" />
        <svg width="200" height="40" viewBox="0 0 200 40" fill="none" className="flex-shrink-0 mx-2">
          {/* Left arabesque curls */}
          <path d="M0 20 Q15 6 30 20 Q45 34 60 20" stroke="rgba(184,151,47,0.35)" strokeWidth="0.8" fill="none" />
          <path d="M0 20 Q15 34 30 20 Q45 6 60 20" stroke="rgba(184,151,47,0.2)" strokeWidth="0.8" fill="none" />
          {/* Left small diamond */}
          <rect x="64" y="14" width="8" height="8" rx="1" transform="rotate(45 68 18)" stroke="rgba(184,151,47,0.3)" strokeWidth="0.5" fill="none" />
          {/* Center ornament — nested diamonds with dot */}
          <rect x="88" y="8" width="24" height="24" rx="2" transform="rotate(45 100 20)" stroke="rgba(184,151,47,0.4)" strokeWidth="0.8" fill="none" />
          <rect x="92" y="12" width="16" height="16" rx="1" transform="rotate(45 100 20)" stroke="rgba(184,151,47,0.25)" strokeWidth="0.5" fill="none" />
          <circle cx="100" cy="20" r="2.5" fill="rgba(184,151,47,0.4)" />
          <circle cx="100" cy="20" r="1" fill="rgba(184,151,47,0.6)" />
          {/* Right small diamond */}
          <rect x="128" y="14" width="8" height="8" rx="1" transform="rotate(45 132 18)" stroke="rgba(184,151,47,0.3)" strokeWidth="0.5" fill="none" />
          {/* Right arabesque curls */}
          <path d="M140 20 Q155 6 170 20 Q185 34 200 20" stroke="rgba(184,151,47,0.35)" strokeWidth="0.8" fill="none" />
          <path d="M140 20 Q155 34 170 20 Q185 6 200 20" stroke="rgba(184,151,47,0.2)" strokeWidth="0.8" fill="none" />
          {/* Small dots at endpoints */}
          <circle cx="60" cy="20" r="1" fill="rgba(184,151,47,0.3)" />
          <circle cx="140" cy="20" r="1" fill="rgba(184,151,47,0.3)" />
        </svg>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-brass/25" />
      </div>
    </div>
  );
}
