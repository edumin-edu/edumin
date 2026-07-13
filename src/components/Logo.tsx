import React from 'react';

export default function Logo({ className = "w-8 h-8", theme = "dark" }: { className?: string; theme?: 'dark' | 'light' }) {
  // Deep navy blue color for the mountains. In dark theme, we can make it a bit brighter or keep it classic navy.
  const mountainColor = "#0f2e5c"; // Brand dark navy

  return (
    <svg
      className={className}
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* --- MOUNTAIN OUTLINES (Navy Blue) --- */}
      
      {/* Top triple mountain peak */}
      <path
        d="M250 100 L300 180 L275 180 L250 140 L225 180 L200 180 Z"
        fill={mountainColor}
      />
      <path
        d="M250 100 L210 164 L225 180 L250 140 Z"
        fill="#1e4e8c" // subtle highlight on top peak left facet
      />
      <path
        d="M175 160 L210 216 L190 216 L175 192 L160 216 L140 216 Z"
        fill={mountainColor}
      />
      <path
        d="M325 160 L360 216 L340 216 L325 192 L310 216 L290 216 Z"
        fill={mountainColor}
      />

      {/* Main Top Peak (Large) */}
      <path
        d="M150 190 L250 50 L350 190 H310 L250 105 L190 190 H150 Z"
        fill={mountainColor}
      />

      {/* Left side mountain & terraces */}
      <path
        d="M135 190 L65 285 L145 390 L180 345 L150 305 L165 285 L125 230 L165 190 H135 Z"
        fill={mountainColor}
      />
      {/* Terraces left */}
      <path
        d="M85 280 Q115 285 140 260 M95 305 Q125 310 150 285 M105 330 Q130 335 160 310"
        stroke={mountainColor}
        strokeWidth="10"
        strokeLinecap="round"
      />

      {/* Right side mountain & terraces */}
      <path
        d="M365 190 L435 285 L355 390 L320 345 L350 305 L335 285 L375 230 L335 190 H365 Z"
        fill={mountainColor}
      />
      {/* Terraces right */}
      <path
        d="M415 280 Q385 285 360 260 M405 305 Q375 310 350 285 M395 330 Q370 335 340 310"
        stroke={mountainColor}
        strokeWidth="10"
        strokeLinecap="round"
      />

      {/* Bottom connecting base line/bars */}
      <path
        d="M145 390 L160 410 H340 L355 390 H315 L300 370 H200 L185 390 H145 Z"
        fill={mountainColor}
      />

      {/* --- CENTRAL ORANGE Z WITH 3D BEVELS --- */}
      
      {/* Top Bar of Z */}
      {/* Highlight/Top facet */}
      <path
        d="M170 200 H330 L300 240 H230 L210 240 L170 200 Z"
        fill="#ea580c" // Bright orange
      />
      <path
        d="M170 200 H330 L315 220 H185 L170 200 Z"
        fill="#fb923c" // Orange highlight
      />
      <path
        d="M185 220 H315 L300 240 H230 L215 240 L185 220 Z"
        fill="#c2410c" // Darker orange shadow
      />

      {/* Diagonal Bar of Z */}
      {/* Left bevel facet */}
      <path
        d="M300 240 L200 360 H250 L330 240 H300 Z"
        fill="#f97316" // Medium Orange
      />
      {/* Right bevel facet */}
      <path
        d="M250 360 L170 360 L270 240 H300 L200 360 H250 Z"
        fill="#ea580c"
      />
      {/* Inner split shading */}
      <path
        d="M300 240 L200 360 H215 L315 240 H300 Z"
        fill="#fb923c" // bright diagonal reflection
      />
      <path
        d="M285 240 L185 360 H200 L300 240 H285 Z"
        fill="#9a3412" // dark core shadow
      />

      {/* Bottom Bar of Z */}
      {/* Highlight/Top facet */}
      <path
        d="M170 360 H330 L300 400 H200 L170 360 Z"
        fill="#f97316"
      />
      <path
        d="M170 360 H330 L315 380 H185 L170 360 Z"
        fill="#fb923c"
      />
      <path
        d="M185 380 H315 L300 400 H200 L185 380 Z"
        fill="#c2410c"
      />
    </svg>
  );
}
