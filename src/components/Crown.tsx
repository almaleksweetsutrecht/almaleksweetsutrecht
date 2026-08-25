export function Crown({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 84" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="malekGold" x1="0" y1="0" x2="0.25" y2="1">
          <stop offset="0%" stopColor="oklch(0.9 0.13 92)" />
          <stop offset="28%" stopColor="oklch(0.97 0.11 98)" />
          <stop offset="52%" stopColor="oklch(0.8 0.14 88)" />
          <stop offset="76%" stopColor="oklch(0.66 0.12 80)" />
          <stop offset="100%" stopColor="oklch(0.52 0.09 72)" />
        </linearGradient>
        <linearGradient id="malekGoldBar" x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0%" stopColor="oklch(0.6 0.1 76)" />
          <stop offset="22%" stopColor="oklch(0.95 0.12 96)" />
          <stop offset="60%" stopColor="oklch(0.78 0.13 86)" />
          <stop offset="100%" stopColor="oklch(0.55 0.09 74)" />
        </linearGradient>
        <linearGradient id="malekSheen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(1 0 0)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="oklch(1 0 0)" stopOpacity="0" />
        </linearGradient>
        <filter id="malekEmboss" x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dy="1" stdDeviation="0.6" floodColor="oklch(0.3 0.05 40)" floodOpacity="0.55" />
          <feDropShadow dy="3" stdDeviation="4" floodColor="oklch(0.75 0.13 86)" floodOpacity="0.35" />
        </filter>
      </defs>

      <g filter="url(#malekEmboss)">
        {/* crown body: five ball-tipped points with scalloped valleys */}
        <path
          d="M10 62
             C10 62 8 34 12 30
             C16 44 26 50 33 44
             C40 38 44 26 49 22
             C52 30 55 34 60 34
             C65 34 68 30 71 22
             C76 26 80 38 87 44
             C94 50 104 44 108 30
             C112 34 110 62 110 62 Z"
          fill="url(#malekGold)"
          stroke="oklch(0.52 0.09 72)"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        {/* ball finials */}
        <circle cx="60" cy="20" r="9" fill="url(#malekGold)" stroke="oklch(0.52 0.09 72)" strokeWidth="0.8" />
        <circle cx="24" cy="27" r="7.5" fill="url(#malekGold)" stroke="oklch(0.52 0.09 72)" strokeWidth="0.8" />
        <circle cx="96" cy="27" r="7.5" fill="url(#malekGold)" stroke="oklch(0.52 0.09 72)" strokeWidth="0.8" />
        <circle cx="11.5" cy="30" r="5.6" fill="url(#malekGold)" stroke="oklch(0.52 0.09 72)" strokeWidth="0.8" />
        <circle cx="108.5" cy="30" r="5.6" fill="url(#malekGold)" stroke="oklch(0.52 0.09 72)" strokeWidth="0.8" />
        {/* highlights on finials */}
        <ellipse cx="57.5" cy="16.5" rx="3.4" ry="2.4" fill="url(#malekSheen)" />
        <ellipse cx="21.8" cy="24" rx="2.7" ry="1.9" fill="url(#malekSheen)" />
        <ellipse cx="93.8" cy="24" rx="2.7" ry="1.9" fill="url(#malekSheen)" />
        {/* inner sheen across the band of points */}
        <path
          d="M13 33 C18 45 27 50 34 44 C41 38 45 27 49 24 C52 31 55 35 60 35 C65 35 68 31 71 24 C75 27 79 38 86 44 C93 50 102 45 107 33 L107 38 C101 49 92 53 85 47 C78 41 74 31 71 29 C68 36 65 39 60 39 C55 39 52 36 49 29 C46 31 42 41 35 47 C28 53 19 49 13 38 Z"
          fill="url(#malekSheen)"
          opacity="0.5"
        />
        {/* base bar */}
        <rect x="8" y="62" width="104" height="9" rx="2" fill="url(#malekGoldBar)" stroke="oklch(0.5 0.09 72)" strokeWidth="0.7" />
        <rect x="10" y="63.4" width="100" height="2.2" rx="1.1" fill="url(#malekSheen)" />
      </g>
    </svg>
  );
}
