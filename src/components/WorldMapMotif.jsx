import React from "react";

// Simplified stylized world map SVG — continent silhouettes
// Africa is highlighted in amber; rest in gold
export default function WorldMapMotif() {
  return (
    <svg
      viewBox="0 0 1000 500"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "min(1100px, 130vw)", height: "auto" }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="africaGlow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#E8951C" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#D4A12A" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#D4A12A" stopOpacity="0.4" />
        </radialGradient>
        <radialGradient id="continentGold" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#E2B652" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#D4A12A" stopOpacity="0.4" />
        </radialGradient>
        <filter id="africaHalo">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* North America */}
      <path
        d="M 95 60 L 185 50 L 220 80 L 240 120 L 225 160 L 210 175 L 190 170 L 165 185 L 145 180 L 130 160 L 110 150 L 90 140 L 75 110 L 80 80 Z"
        fill="url(#continentGold)"
        filter="url(#softGlow)"
      />
      {/* Central America / Caribbean */}
      <path
        d="M 175 188 L 200 185 L 215 200 L 205 215 L 185 210 Z"
        fill="url(#continentGold)"
        filter="url(#softGlow)"
      />

      {/* South America */}
      <path
        d="M 200 230 L 245 215 L 275 230 L 290 270 L 295 320 L 280 370 L 255 400 L 225 410 L 200 390 L 185 350 L 180 300 L 185 260 Z"
        fill="url(#continentGold)"
        filter="url(#softGlow)"
      />

      {/* Europe */}
      <path
        d="M 430 50 L 490 45 L 520 65 L 510 90 L 490 100 L 470 105 L 450 100 L 435 85 L 428 70 Z"
        fill="url(#continentGold)"
        filter="url(#softGlow)"
      />

      {/* Africa — amber highlighted with glow */}
      <path
        d="M 445 130 L 490 120 L 530 125 L 550 145 L 555 175 L 545 210 L 540 250 L 530 290 L 505 330 L 480 355 L 455 360 L 430 345 L 415 310 L 410 270 L 415 230 L 420 190 L 425 160 Z"
        fill="url(#africaGlow)"
        filter="url(#africaHalo)"
      />
      {/* Madagascar */}
      <ellipse cx="570" cy="305" rx="10" ry="22" fill="#E8951C" opacity="0.6" />

      {/* Asia */}
      <path
        d="M 540 50 L 650 40 L 750 55 L 820 80 L 840 120 L 820 155 L 780 170 L 740 180 L 700 175 L 660 165 L 630 155 L 590 150 L 560 140 L 545 110 L 535 80 Z"
        fill="url(#continentGold)"
        filter="url(#softGlow)"
      />
      {/* Indian subcontinent */}
      <path
        d="M 655 160 L 690 155 L 710 175 L 705 210 L 685 230 L 665 225 L 650 200 L 648 175 Z"
        fill="url(#continentGold)"
        filter="url(#softGlow)"
      />
      {/* Southeast Asia */}
      <path
        d="M 750 165 L 800 160 L 830 175 L 825 200 L 800 210 L 770 200 Z"
        fill="url(#continentGold)"
        filter="url(#softGlow)"
      />

      {/* Australia */}
      <path
        d="M 780 310 L 840 295 L 890 305 L 910 335 L 895 365 L 855 375 L 810 365 L 785 345 Z"
        fill="url(#continentGold)"
        filter="url(#softGlow)"
      />

      {/* Greenland */}
      <path
        d="M 270 20 L 320 15 L 350 35 L 345 65 L 315 75 L 275 65 L 260 45 Z"
        fill="url(#continentGold)"
        opacity="0.5"
      />

      {/* Japan */}
      <ellipse cx="860" cy="115" rx="8" ry="20" fill="url(#continentGold)" opacity="0.6" transform="rotate(-20, 860, 115)" />

      {/* UK */}
      <ellipse cx="420" cy="65" rx="6" ry="12" fill="url(#continentGold)" opacity="0.6" />

      {/* Subtle meridian / grid lines */}
      <line x1="0" y1="250" x2="1000" y2="250" stroke="#D4A12A" strokeWidth="0.4" strokeOpacity="0.35" strokeDasharray="4 8" />
      <line x1="500" y1="0" x2="500" y2="500" stroke="#D4A12A" strokeWidth="0.4" strokeOpacity="0.25" strokeDasharray="4 8" />
      <ellipse cx="500" cy="250" rx="480" ry="230" fill="none" stroke="#D4A12A" strokeWidth="0.4" strokeOpacity="0.2" />
      <ellipse cx="500" cy="250" rx="300" ry="230" fill="none" stroke="#D4A12A" strokeWidth="0.3" strokeOpacity="0.15" />
    </svg>
  );
}