export default function StarOrnament({ size = 12, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`flex-shrink-0 ${className}`}>
      <path
        d="M12 2L14 8L20 6L16 10L22 12L16 14L20 18L14 16L12 22L10 16L4 18L8 14L2 12L8 10L4 6L10 8Z"
        stroke="rgba(184,151,47,0.5)"
        strokeWidth="0.6"
        fill="rgba(184,151,47,0.06)"
      />
      <circle cx="12" cy="12" r="2" stroke="rgba(184,151,47,0.4)" strokeWidth="0.5" fill="rgba(184,151,47,0.1)" />
      <circle cx="12" cy="12" r="0.8" fill="rgba(184,151,47,0.5)" />
    </svg>
  );
}
