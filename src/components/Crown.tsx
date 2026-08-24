export function Crown({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 48" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="crownGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.62 0.11 80)" />
          <stop offset="35%" stopColor="oklch(0.94 0.14 96)" />
          <stop offset="60%" stopColor="oklch(0.78 0.13 86)" />
          <stop offset="100%" stopColor="oklch(0.55 0.1 74)" />
        </linearGradient>
        <linearGradient id="crownBase" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.88 0.16 96)" />
          <stop offset="100%" stopColor="oklch(0.55 0.1 74)" />
        </linearGradient>
        <filter id="crownGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dy="1.5" stdDeviation="1.6" floodColor="oklch(0.76 0.13 86)" floodOpacity="0.65" />
        </filter>
      </defs>
      <g filter="url(#crownGlow)">
        <path
          d="M4 38 L9 12 L20 26 L32 6 L44 26 L55 12 L60 38 Z"
          fill="url(#crownGold)"
          stroke="oklch(0.5 0.09 72)"
          strokeWidth="1"
        />
        <rect x="4" y="38" width="56" height="7" rx="2.4" fill="url(#crownBase)" />
        <circle cx="32" cy="34" r="3.1" fill="oklch(0.97 0.05 96)" opacity="0.95" />
        <circle cx="16" cy="35" r="2" fill="oklch(0.97 0.05 96)" opacity="0.8" />
        <circle cx="48" cy="35" r="2" fill="oklch(0.97 0.05 96)" opacity="0.8" />
        <circle cx="32" cy="4" r="2.6" fill="oklch(0.95 0.13 96)" />
        <circle cx="9" cy="10" r="2" fill="oklch(0.95 0.13 96)" />
        <circle cx="55" cy="10" r="2" fill="oklch(0.95 0.13 96)" />
      </g>
    </svg>
  );
}
