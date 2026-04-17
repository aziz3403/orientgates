export default function ArabesqueDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`relative py-8 ${className}`}>
      <div className="flex items-center justify-center gap-0">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-brass/20" />
        <svg width="120" height="24" viewBox="0 0 120 24" fill="none" className="flex-shrink-0 mx-4">
          {/* Left arabesque curl */}
          <path d="M0 12 Q10 4 20 12 Q30 20 40 12" stroke="rgba(184,151,47,0.3)" strokeWidth="0.5" fill="none" />
          <path d="M0 12 Q10 20 20 12 Q30 4 40 12" stroke="rgba(184,151,47,0.2)" strokeWidth="0.5" fill="none" />
          {/* Center diamond */}
          <rect x="54" y="6" width="12" height="12" rx="1" transform="rotate(45 60 12)" stroke="rgba(184,151,47,0.4)" strokeWidth="0.5" fill="none" />
          <rect x="56.5" y="8.5" width="7" height="7" rx="0.5" transform="rotate(45 60 12)" stroke="rgba(184,151,47,0.2)" strokeWidth="0.5" fill="none" />
          <circle cx="60" cy="12" r="1.5" fill="rgba(184,151,47,0.3)" />
          {/* Right arabesque curl */}
          <path d="M80 12 Q90 4 100 12 Q110 20 120 12" stroke="rgba(184,151,47,0.3)" strokeWidth="0.5" fill="none" />
          <path d="M80 12 Q90 20 100 12 Q110 4 120 12" stroke="rgba(184,151,47,0.2)" strokeWidth="0.5" fill="none" />
        </svg>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-brass/20" />
      </div>
    </div>
  );
}
