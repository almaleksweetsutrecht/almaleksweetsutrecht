export function Crown({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 84" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="malekGold" x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0%" stopColor="oklch(0.93 0.13 95)" />
          <stop offset="30%" stopColor="oklch(0.97 0.12 99)" />
          <stop offset="58%" stopColor="oklch(0.83 0.14 90)" />
          <stop offset="82%" stopColor="oklch(0.66 0.12 80)" />
          <stop offset="100%" stopColor="oklch(0.52 0.09 72)" />
        </linearGradient>
        <linearGradient id="malekGoldBar" x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0%" stopColor="oklch(0.6 0.1 76)" />
          <stop offset="24%" stopColor="oklch(0.96 0.12 97)" />
          <stop offset="62%" stopColor="oklch(0.79 0.13 87)" />
          <stop offset="100%" stopColor="oklch(0.55 0.09 74)" />
        </linearGradient>
        <linearGradient id="malekSheen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(1 0 0)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="oklch(1 0 0)" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g>
        {/* five points: tall centre, two mid peaks, two short outer tips */}
        <path
          d="M9 63
             C9 63 9 40 11 34
             C15 44 22 48 27 43
             C32 38 36 26 38 20
             C43 26 49 32 54 33
             C56 24 58 16 60 10
             C62 16 64 24 66 33
             C71 32 77 26 82 20
             C84 26 88 38 93 43
             C98 48 105 44 109 34
             C111 40 111 63 111 63 Z"
          fill="url(#malekGold)"
        />
        {/* ball finials */}
        <circle cx="60" cy="10" r="8.6" fill="url(#malekGold)" />
        <circle cx="37" cy="20" r="7" fill="url(#malekGold)" />
        <circle cx="83" cy="20" r="7" fill="url(#malekGold)" />
        <circle cx="10.5" cy="34" r="5.4" fill="url(#malekGold)" />
        <circle cx="109.5" cy="34" r="5.4" fill="url(#malekGold)" />
        {/* highlights */}
        <ellipse cx="57.4" cy="6.6" rx="3.2" ry="2.2" fill="url(#malekSheen)" />
        <ellipse cx="34.9" cy="17.2" rx="2.6" ry="1.8" fill="url(#malekSheen)" />
        <ellipse cx="80.9" cy="17.2" rx="2.6" ry="1.8" fill="url(#malekSheen)" />
        {/* base bar */}
        <rect x="6" y="63" width="108" height="10" rx="2" fill="url(#malekGoldBar)" />
        <rect x="8" y="64.6" width="104" height="2.4" rx="1.2" fill="url(#malekSheen)" />
      </g>
    </svg>
  );
}
