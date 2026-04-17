import GeometricFrieze from "./GeometricFrieze";

export default function ArabesqueDivider({ className = "", variant = "full" }: { className?: string; variant?: "full" | "simple" }) {
  if (variant === "simple") {
    return (
      <div className={`relative py-4 ${className}`}>
        <div className="flex items-center justify-center">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-brass/20" />
          <svg width="60" height="20" viewBox="0 0 60 20" fill="none" className="flex-shrink-0 mx-3">
            <rect x="24" y="4" width="12" height="12" rx="1" transform="rotate(45 30 10)" stroke="rgba(184,151,47,0.4)" strokeWidth="0.6" fill="none" />
            <circle cx="30" cy="10" r="1.5" fill="rgba(184,151,47,0.4)" />
          </svg>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-brass/20" />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative py-2 ${className}`}>
      <GeometricFrieze />
    </div>
  );
}
