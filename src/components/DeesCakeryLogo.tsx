import React from 'react';

interface LogoProps {
  className?: string;
  size?: number | string;
  showShadow?: boolean;
}

export const DeesCakeryLogo: React.FC<LogoProps> = ({
  className = '',
  size = 120,
  showShadow = true,
}) => {
  return (
    <svg
      viewBox="0 0 500 500"
      width={size}
      height={size}
      className={`inline-block select-none ${showShadow ? 'drop-shadow-lg' : ''} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Dees Cakery - Delivering happiness logo"
    >
      <defs>
        {/* Luxury Gold Gradients */}
        <linearGradient id="goldRim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4af37" />
          <stop offset="25%" stopColor="#f5e197" />
          <stop offset="50%" stopColor="#aa7c1e" />
          <stop offset="75%" stopColor="#f7e7a9" />
          <stop offset="100%" stopColor="#b8860b" />
        </linearGradient>

        <linearGradient id="innerGoldRim" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffd700" />
          <stop offset="35%" stopColor="#b8860b" />
          <stop offset="70%" stopColor="#fae08c" />
          <stop offset="100%" stopColor="#996515" />
        </linearGradient>

        <linearGradient id="frostingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffc19e" />
          <stop offset="50%" stopColor="#f39c6b" />
          <stop offset="100%" stopColor="#d97a48" />
        </linearGradient>

        <linearGradient id="cupGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d9824c" />
          <stop offset="50%" stopColor="#f5ab7a" />
          <stop offset="100%" stopColor="#c56c36" />
        </linearGradient>

        <radialGradient id="cherryGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#ff5252" />
          <stop offset="35%" stopColor="#d32f2f" />
          <stop offset="85%" stopColor="#8b0000" />
          <stop offset="100%" stopColor="#400000" />
        </radialGradient>

        <linearGradient id="hatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f7a77d" />
          <stop offset="60%" stopColor="#e88958" />
          <stop offset="100%" stopColor="#ca6b39" />
        </linearGradient>

        <linearGradient id="goldText" x1="0%" y1="0%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#fce7a8" />
          <stop offset="40%" stopColor="#e5c158" />
          <stop offset="80%" stopColor="#fae7b1" />
          <stop offset="100%" stopColor="#cda135" />
        </linearGradient>

        {/* Text curve paths */}
        <path id="curveDelivering" d="M 120 425 Q 250 478 380 425" fill="none" />
        <path id="curvePhone" d="M 170 475 Q 250 502 330 475" fill="none" />
      </defs>

      {/* Outer Circle Background */}
      <circle cx="250" cy="250" r="242" fill="#080706" />

      {/* Outer Gold Rim with metallic borders */}
      <circle
        cx="250"
        cy="250"
        r="240"
        fill="none"
        stroke="url(#goldRim)"
        strokeWidth="10"
      />
      <circle
        cx="250"
        cy="250"
        r="230"
        fill="none"
        stroke="#1a1816"
        strokeWidth="2"
      />
      <circle
        cx="250"
        cy="250"
        r="225"
        fill="none"
        stroke="url(#innerGoldRim)"
        strokeWidth="2.5"
      />

      {/* Decorative gold radial segments for gold ring realism */}
      <g stroke="url(#goldRim)" strokeWidth="1" opacity="0.3">
        <line x1="15" y1="200" x2="25" y2="210" />
        <line x1="20" y1="300" x2="32" y2="295" />
        <line x1="475" y1="200" x2="465" y2="210" />
        <line x1="470" y1="300" x2="458" y2="295" />
      </g>

      {/* === CUPCAKE COMPOSITION === */}
      <g transform="translate(0, -10)">
        {/* Chef's Hat (Baker's Toque) */}
        <g transform="rotate(22 340 140)">
          {/* Hat Puff Base */}
          <path
            d="M 285 130 C 275 105, 300 80, 325 90 C 335 70, 365 72, 380 95 C 400 85, 420 105, 415 130 C 425 155, 400 175, 380 165 C 365 178, 330 178, 315 160 C 295 165, 280 145, 285 130 Z"
            fill="url(#hatGrad)"
            stroke="#1a1816"
            strokeWidth="3.5"
          />
          {/* Hat Puff highlight/crease */}
          <path
            d="M 320 100 Q 335 125 345 150"
            fill="none"
            stroke="#fcd6be"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.8"
          />
          <path
            d="M 370 105 Q 375 128 375 148"
            fill="none"
            stroke="#fcd6be"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.8"
          />
          {/* Hat Band / Brim */}
          <path
            d="M 305 162 L 392 162 L 387 184 L 310 184 Z"
            fill="#e27c49"
            stroke="#1a1816"
            strokeWidth="3"
          />
          <path
            d="M 312 170 L 385 170"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.7"
          />
        </g>

        {/* Cupcake Swirled Frosting */}
        <g>
          {/* Lower Frosting tier */}
          <path
            d="M 166 215 C 160 195, 185 185, 220 195 C 245 180, 275 180, 295 198 C 320 185, 345 200, 342 220 C 340 232, 172 232, 166 215 Z"
            fill="url(#frostingGrad)"
            stroke="#1a1816"
            strokeWidth="4"
          />
          {/* Mid Frosting swirl */}
          <path
            d="M 172 195 C 172 165, 215 155, 250 168 C 280 152, 320 162, 325 192 C 320 205, 180 205, 172 195 Z"
            fill="url(#frostingGrad)"
            stroke="#1a1816"
            strokeWidth="4"
          />
          {/* Upper Swirl */}
          <path
            d="M 185 165 C 180 140, 220 130, 245 142 C 265 130, 298 138, 305 162 C 295 175, 195 175, 185 165 Z"
            fill="url(#frostingGrad)"
            stroke="#1a1816"
            strokeWidth="4"
          />
          {/* Frosting Tip Swirl */}
          <path
            d="M 195 140 C 190 118, 220 110, 235 125 C 245 112, 268 116, 268 135 C 255 146, 202 148, 195 140 Z"
            fill="url(#frostingGrad)"
            stroke="#1a1816"
            strokeWidth="3.5"
          />
          {/* Top dollop swirl */}
          <path
            d="M 210 120 C 205 105, 225 98, 238 112 C 240 102, 252 104, 252 118 Z"
            fill="#ffc7a8"
            stroke="#1a1816"
            strokeWidth="3"
          />

          {/* Dimensional Swirl Lines */}
          <path
            d="M 170 208 C 210 220, 270 215, 335 212"
            fill="none"
            stroke="#1a1816"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M 178 185 C 218 198, 265 190, 318 185"
            fill="none"
            stroke="#1a1816"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M 190 158 C 220 170, 258 165, 295 158"
            fill="none"
            stroke="#1a1816"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M 202 135 C 225 145, 250 142, 262 132"
            fill="none"
            stroke="#1a1816"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>

        {/* Cherry on Top */}
        <g>
          {/* Cherry Stem */}
          <path
            d="M 292 145 C 298 128, 305 120, 298 110"
            fill="none"
            stroke="#217336"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Cherry Leaf / Tip */}
          <ellipse cx="298" cy="110" rx="3.5" ry="2" fill="#2e8b45" transform="rotate(-30 298 110)" />
          {/* Cherry Body */}
          <circle cx="286" cy="158" r="20" fill="url(#cherryGrad)" stroke="#1a1816" strokeWidth="3" />
          {/* Cherry Highlight */}
          <ellipse cx="280" cy="151" rx="4.5" ry="3" fill="#ffffff" opacity="0.85" transform="rotate(-25 280 151)" />
        </g>

        {/* Cupcake Liner */}
        <g>
          {/* Cup shape */}
          <path
            d="M 165 225 L 340 225 L 322 320 C 320 326, 312 330, 305 330 L 200 330 C 193 330, 185 326, 183 320 Z"
            fill="url(#cupGrad)"
            stroke="#1a1816"
            strokeWidth="4"
          />

          {/* Fluted ridges */}
          <line x1="184" y1="228" x2="198" y2="326" stroke="#1a1816" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="210" y1="228" x2="218" y2="328" stroke="#1a1816" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="237" y1="228" x2="238" y2="328" stroke="#1a1816" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="264" y1="228" x2="262" y2="328" stroke="#1a1816" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="292" y1="228" x2="284" y2="328" stroke="#1a1816" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="318" y1="228" x2="306" y2="326" stroke="#1a1816" strokeWidth="3.5" strokeLinecap="round" />

          {/* Faint phone number printed on the cup as in original logo */}
          <text
            x="252"
            y="245"
            textAnchor="middle"
            fill="#ffffff"
            opacity="0.75"
            fontSize="10"
            fontFamily="sans-serif"
            letterSpacing="1.5"
          >
            7411728784
          </text>
        </g>
      </g>

      {/* === VEG SYMBOL (Indian Vegetarian Mark) === */}
      <g transform="translate(148, 350)">
        <rect
          x="0"
          y="0"
          width="24"
          height="24"
          fill="none"
          stroke="#00a859"
          strokeWidth="3"
          rx="2"
        />
        <circle cx="12" cy="12" r="6" fill="#00a859" />
      </g>

      {/* === BRAND TEXT: "Dees Cakery" in Elegant Cursive Script === */}
      <g fill="url(#goldText)" textAnchor="middle">
        {/* "Dees" Script */}
        <text
          x="265"
          y="370"
          fontFamily="'Playfair Display', 'Brush Script MT', 'Dancing Script', cursive, serif"
          fontSize="48"
          fontStyle="italic"
          fontWeight="600"
          letterSpacing="1"
          style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
        >
          Dees
        </text>

        {/* "Cakery" Script */}
        <text
          x="265"
          y="420"
          fontFamily="'Playfair Display', 'Brush Script MT', 'Dancing Script', cursive, serif"
          fontSize="46"
          fontStyle="italic"
          fontWeight="600"
          letterSpacing="1"
          style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
        >
          Cakery
        </text>
      </g>

      {/* === CURVED TEXT: "Delivering happiness" === */}
      <text
        fill="url(#goldText)"
        fontSize="17"
        fontFamily="'Playfair Display', serif"
        fontStyle="italic"
        letterSpacing="3"
        style={{ textShadow: '0 2px 4px rgba(0,0,0,0.9)' }}
      >
        <textPath href="#curveDelivering" startOffset="50%" textAnchor="middle">
          Delivering happiness
        </textPath>
      </text>

      {/* === CURVED TEXT: "7411728784" === */}
      <text
        fill="url(#goldText)"
        fontSize="14"
        fontFamily="'Plus Jakarta Sans', sans-serif"
        fontWeight="500"
        letterSpacing="2.5"
      >
        <textPath href="#curvePhone" startOffset="50%" textAnchor="middle">
          7411728784
        </textPath>
      </text>
    </svg>
  );
};
