"use client";

import { motion } from "framer-motion";

export default function Chandelier() {
  return (
    <div
      className="fixed top-0 left-1/2 pointer-events-none"
      style={{ transform: "translateX(-50%)", zIndex: 45 }}
      aria-hidden
    >
      {/* Soft glow behind the chandelier */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 340,
          height: 200,
          background: "radial-gradient(ellipse at 50% 20%, rgba(255,245,180,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Main chandelier — gently sways */}
      <motion.div
        animate={{ rotateZ: [-1.2, 1.2, -1.2] }}
        transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
        style={{ transformOrigin: "top center" }}
      >
        <svg
          width="380"
          height="215"
          viewBox="0 0 380 215"
          xmlns="http://www.w3.org/2000/svg"
          style={{ overflow: "visible" }}
        >
          <defs>
            <linearGradient id="crystalG" x1="20%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="50%" stopColor="#ECD9A8" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#D4A843" stopOpacity="0.6" />
            </linearGradient>
            <filter id="candleGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="softGlow">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* ── Hanging chain at top ── */}
          <rect x="188" y="0" width="4" height="24" rx="2" fill="white" opacity="0.8" />
          <circle cx="190" cy="7"  r="3.5" fill="white" opacity="0.6" />
          <circle cx="190" cy="16" r="3.5" fill="white" opacity="0.6" />

          {/* ── Canopy dome ── */}
          <path
            d="M155,24 C155,18 170,13 190,13 C210,13 225,18 225,24 L222,52 Q220,62 205,66 Q197,68 190,68 Q183,68 175,66 Q160,62 158,52 Z"
            fill="white" opacity="0.90"
          />
          {/* Canopy decorative scallop edge */}
          <path
            d="M160,56 C164,63 169,59 174,64 C179,69 184,64 189,69 C194,74 199,69 204,64 C209,59 214,63 219,57"
            fill="none" stroke="rgba(212,168,67,0.5)" strokeWidth="1.5" strokeLinecap="round"
          />
          {/* Canopy gold trim ring */}
          <ellipse cx="190" cy="24" rx="35" ry="11" fill="none" stroke="rgba(212,168,67,0.4)" strokeWidth="1.5" />

          {/* ── Arms ── */}
          {/* Far left arm */}
          <path d="M165,50 C150,53 128,60 95,72" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" />
          {/* Near left arm */}
          <path d="M170,58 C158,62 145,70 128,80" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* Near right arm */}
          <path d="M210,58 C222,62 235,70 252,80" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* Far right arm */}
          <path d="M215,50 C230,53 252,60 285,72" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" />

          {/* Decorative spheres at arm joins */}
          <circle cx="165" cy="50" r="6" fill="white" opacity="0.92" />
          <circle cx="215" cy="50" r="6" fill="white" opacity="0.92" />
          <circle cx="170" cy="58" r="5" fill="white" opacity="0.85" />
          <circle cx="210" cy="58" r="5" fill="white" opacity="0.85" />

          {/* ── Candle cups ── */}
          <ellipse cx="95"  cy="74" rx="13" ry="6" fill="white" opacity="0.93" />
          <ellipse cx="285" cy="74" rx="13" ry="6" fill="white" opacity="0.93" />
          <ellipse cx="128" cy="82" rx="11" ry="5" fill="white" opacity="0.90" />
          <ellipse cx="252" cy="82" rx="11" ry="5" fill="white" opacity="0.90" />

          {/* ── Candles ── */}
          <rect x="89"  y="50" width="12" height="24" rx="3" fill="white" opacity="0.96" />
          <rect x="279" y="50" width="12" height="24" rx="3" fill="white" opacity="0.96" />
          <rect x="122" y="59" width="12" height="23" rx="3" fill="white" opacity="0.96" />
          <rect x="246" y="59" width="12" height="23" rx="3" fill="white" opacity="0.96" />

          {/* ── Candle glow auras ── */}
          <circle cx="95"  cy="54" r="22" fill="rgba(255,215,0,0.10)" filter="url(#candleGlow)" />
          <circle cx="285" cy="54" r="22" fill="rgba(255,215,0,0.10)" filter="url(#candleGlow)" />
          <circle cx="128" cy="62" r="17" fill="rgba(255,215,0,0.08)" filter="url(#candleGlow)" />
          <circle cx="252" cy="62" r="17" fill="rgba(255,215,0,0.08)" filter="url(#candleGlow)" />

          {/* ── Flames (animated separately below) ── */}
          <path d="M95,50  C92,44 98,39 95,33 C98,39 100,44 95,50 Z"  fill="#FFE566" />
          <path d="M285,50 C282,44 288,39 285,33 C288,39 290,44 285,50 Z" fill="#FFE566" />
          <path d="M128,59 C125,53 131,48 128,43 C131,48 133,53 128,59 Z" fill="#FFD700" opacity="0.92" />
          <path d="M252,59 C249,53 255,48 252,43 C255,48 257,53 252,59 Z" fill="#FFD700" opacity="0.92" />
          {/* Flame inner core */}
          <path d="M95,50  C93,46 96,43 95,39 C96,43 97,46 95,50 Z"  fill="white" opacity="0.6" />
          <path d="M285,50 C283,46 286,43 285,39 C286,43 287,46 285,50 Z" fill="white" opacity="0.6" />

          {/* ── Crystal drops — far left candle ── */}
          <line x1="91"  y1="80" x2="89"  y2="100" stroke="white" strokeWidth="1" opacity="0.55" />
          <polygon points="85,100 89,116 93,100"  fill="url(#crystalG)" opacity="0.75" />
          <line x1="97"  y1="80" x2="97"  y2="97"  stroke="white" strokeWidth="1" opacity="0.55" />
          <polygon points="93,97 97,112 101,97"   fill="white" opacity="0.65" />
          <line x1="104" y1="80" x2="106" y2="96"  stroke="white" strokeWidth="1" opacity="0.50" />
          <polygon points="102,96 106,110 110,96"  fill="white" opacity="0.55" />
          <line x1="85"  y1="80" x2="83"  y2="95"  stroke="white" strokeWidth="1" opacity="0.45" />
          <polygon points="79,95 83,108 87,95"    fill="white" opacity="0.50" />

          {/* ── Crystal drops — far right candle ── */}
          <line x1="281" y1="80" x2="279" y2="100" stroke="white" strokeWidth="1" opacity="0.55" />
          <polygon points="275,100 279,116 283,100" fill="url(#crystalG)" opacity="0.75" />
          <line x1="287" y1="80" x2="287" y2="97"  stroke="white" strokeWidth="1" opacity="0.55" />
          <polygon points="283,97 287,112 291,97"   fill="white" opacity="0.65" />
          <line x1="294" y1="80" x2="296" y2="96"  stroke="white" strokeWidth="1" opacity="0.50" />
          <polygon points="292,96 296,110 300,96"   fill="white" opacity="0.55" />
          <line x1="275" y1="80" x2="273" y2="95"  stroke="white" strokeWidth="1" opacity="0.45" />
          <polygon points="269,95 273,108 277,95"   fill="white" opacity="0.50" />

          {/* ── Crystal drops — near left candle ── */}
          <line x1="124" y1="87" x2="122" y2="104" stroke="white" strokeWidth="1" opacity="0.50" />
          <polygon points="118,104 122,118 126,104"  fill="url(#crystalG)" opacity="0.68" />
          <line x1="130" y1="87" x2="130" y2="102"  stroke="white" strokeWidth="1" opacity="0.50" />
          <polygon points="126,102 130,115 134,102"  fill="white" opacity="0.60" />
          <line x1="136" y1="87" x2="138" y2="101"  stroke="white" strokeWidth="1" opacity="0.45" />
          <polygon points="134,101 138,113 142,101"  fill="white" opacity="0.52" />

          {/* ── Crystal drops — near right candle ── */}
          <line x1="248" y1="87" x2="246" y2="104" stroke="white" strokeWidth="1" opacity="0.50" />
          <polygon points="242,104 246,118 250,104"  fill="url(#crystalG)" opacity="0.68" />
          <line x1="254" y1="87" x2="254" y2="102"  stroke="white" strokeWidth="1" opacity="0.50" />
          <polygon points="250,102 254,115 258,102"  fill="white" opacity="0.60" />
          <line x1="260" y1="87" x2="262" y2="101"  stroke="white" strokeWidth="1" opacity="0.45" />
          <polygon points="258,101 262,113 266,101"  fill="white" opacity="0.52" />

          {/* ── Centre body ── */}
          <path
            d="M174,68 Q170,84 172,100 Q178,114 190,116 Q202,114 208,100 Q210,84 206,68 Z"
            fill="white" opacity="0.84"
          />
          {/* Centre decorative ring */}
          <ellipse cx="190" cy="94" rx="20" ry="8" fill="white" opacity="0.60" />
          <ellipse cx="190" cy="94" rx="20" ry="8" fill="none" stroke="rgba(212,168,67,0.35)" strokeWidth="1.5" />

          {/* ── Centre pendant chain ── */}
          <line x1="190" y1="116" x2="190" y2="136" stroke="white" strokeWidth="2.5" opacity="0.72" />

          {/* ── Large centre crystal ── */}
          <polygon points="176,136 190,178 204,136" fill="url(#crystalG)" opacity="0.88" />
          {/* Crystal facets */}
          <polygon points="182,136 190,162 198,136" fill="white" opacity="0.40" />
          <polygon points="183,136 187,152 186,136" fill="rgba(255,255,255,0.55)" />

          {/* ── Smaller side crystals from centre ring ── */}
          <line x1="178" y1="100" x2="175" y2="120" stroke="white" strokeWidth="1" opacity="0.50" />
          <polygon points="171,120 175,134 179,120" fill="white" opacity="0.62" />
          <line x1="202" y1="100" x2="205" y2="120" stroke="white" strokeWidth="1" opacity="0.50" />
          <polygon points="201,120 205,134 209,120" fill="white" opacity="0.62" />
          <line x1="185" y1="101" x2="183" y2="122" stroke="white" strokeWidth="1" opacity="0.45" />
          <polygon points="179,122 183,137 187,122" fill="white" opacity="0.55" />
          <line x1="195" y1="101" x2="197" y2="122" stroke="white" strokeWidth="1" opacity="0.45" />
          <polygon points="193,122 197,137 201,122" fill="white" opacity="0.55" />
          <line x1="172" y1="99" x2="168" y2="117" stroke="white" strokeWidth="1" opacity="0.40" />
          <polygon points="164,117 168,130 172,117" fill="white" opacity="0.48" />
          <line x1="208" y1="99" x2="212" y2="117" stroke="white" strokeWidth="1" opacity="0.40" />
          <polygon points="208,117 212,130 216,117" fill="white" opacity="0.48" />
        </svg>
      </motion.div>

      {/* Separate flame flicker animations layered on top */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
        {/* Far left flame flicker */}
        <motion.div
          style={{ position: "absolute", top: 33, left: 88, width: 14, height: 18 }}
          animate={{ scaleY: [1, 1.15, 0.9, 1.1, 1], scaleX: [1, 0.85, 1.1, 0.9, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="14" height="18" viewBox="0 0 14 18">
            <path d="M7,0 C4,4 1,10 1,13 C1,16 4,18 7,18 C10,18 13,16 13,13 C13,10 10,4 7,0 Z" fill="#FFE566" opacity="0.9" />
          </svg>
        </motion.div>
        {/* Far right flame flicker */}
        <motion.div
          style={{ position: "absolute", top: 33, left: 278, width: 14, height: 18 }}
          animate={{ scaleY: [1, 0.9, 1.12, 0.95, 1], scaleX: [1, 1.1, 0.88, 1.05, 1] }}
          transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="14" height="18" viewBox="0 0 14 18">
            <path d="M7,0 C4,4 1,10 1,13 C1,16 4,18 7,18 C10,18 13,16 13,13 C13,10 4,4 7,0 Z" fill="#FFE566" opacity="0.9" />
          </svg>
        </motion.div>
        {/* Near left flame */}
        <motion.div
          style={{ position: "absolute", top: 43, left: 121, width: 12, height: 16 }}
          animate={{ scaleY: [1, 1.1, 0.92, 1.08, 1], scaleX: [1, 0.9, 1.08, 0.93, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="12" height="16" viewBox="0 0 12 16">
            <path d="M6,0 C3,4 0,9 0,12 C0,14.5 3,16 6,16 C9,16 12,14.5 12,12 C12,9 9,4 6,0 Z" fill="#FFD700" opacity="0.88" />
          </svg>
        </motion.div>
        {/* Near right flame */}
        <motion.div
          style={{ position: "absolute", top: 43, left: 245, width: 12, height: 16 }}
          animate={{ scaleY: [1, 0.93, 1.1, 0.95, 1], scaleX: [1, 1.07, 0.91, 1.04, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="12" height="16" viewBox="0 0 12 16">
            <path d="M6,0 C3,4 0,9 0,12 C0,14.5 3,16 6,16 C9,16 12,14.5 12,12 C12,9 9,4 6,0 Z" fill="#FFD700" opacity="0.88" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
