"use client";

import { motion } from "framer-motion";

const BAR_Y = 11;

// Symmetric waterfall drops around center x=190
const DROPS = [
  { x: 50,  h: 30, w: 7,  op: 0.72 },
  { x: 86,  h: 19, w: 5,  op: 0.60 },
  { x: 124, h: 38, w: 9,  op: 0.83 },
  { x: 157, h: 15, w: 4,  op: 0.54 },
  { x: 190, h: 46, w: 11, op: 0.96 },
  { x: 223, h: 15, w: 4,  op: 0.54 },
  { x: 256, h: 38, w: 9,  op: 0.83 },
  { x: 294, h: 19, w: 5,  op: 0.60 },
  { x: 330, h: 30, w: 7,  op: 0.72 },
];

export default function Chandelier() {
  return (
    <div
      className="fixed top-0 left-1/2 pointer-events-none"
      style={{
        transform: "translateX(-50%)",
        zIndex: 45,
        width: 380,
        height: 74,
        overflow: "hidden",
      }}
      aria-hidden
    >
      {/* Warm ambient glow behind fixture */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 300,
          height: 80,
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(255,235,140,0.16) 0%, transparent 68%)",
          pointerEvents: "none",
        }}
      />

      {/* Gentle sway */}
      <motion.div
        animate={{ rotateZ: [-0.55, 0.55, -0.55] }}
        transition={{ duration: 9, ease: "easeInOut", repeat: Infinity }}
        style={{ transformOrigin: "50% 0" }}
      >
        <svg
          width="380"
          height="74"
          viewBox="0 0 380 74"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Crystal fill — white to warm gold */}
            <linearGradient id="cG" x1="25%" y1="0%" x2="75%" y2="100%">
              <stop offset="0%"   stopColor="white"   stopOpacity="0.98" />
              <stop offset="42%"  stopColor="#EFE0BE" stopOpacity="0.91" />
              <stop offset="100%" stopColor="#C49A28" stopOpacity="0.70" />
            </linearGradient>
            {/* Bar gradient — fades to transparent at ends */}
            <linearGradient id="bG" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="rgba(255,255,255,0)"    />
              <stop offset="12%"  stopColor="rgba(255,255,255,0.80)" />
              <stop offset="50%"  stopColor="rgba(255,255,255,0.96)" />
              <stop offset="88%"  stopColor="rgba(255,255,255,0.80)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)"    />
            </linearGradient>
          </defs>

          {/* ── Ceiling mount ── */}
          <rect x="182" y="0" width="16" height="5" rx="2.5" fill="rgba(255,255,255,0.88)" />
          <line
            x1="190" y1="5"
            x2="190" y2={BAR_Y}
            stroke="rgba(255,255,255,0.65)"
            strokeWidth="1.4"
          />

          {/* ── Main horizontal bar ── */}
          <rect
            x="26" y={BAR_Y - 1.5}
            width="328" height="3.5"
            rx="1.75"
            fill="url(#bG)"
          />
          {/* Depth accent — thinner bar just below */}
          <rect
            x="56" y={BAR_Y + 3}
            width="268" height="1"
            rx="0.5"
            fill="rgba(255,255,255,0.20)"
          />
          {/* End caps */}
          <circle cx="26"  cy={BAR_Y + 0.25} r="4" fill="rgba(255,255,255,0.50)" />
          <circle cx="354" cy={BAR_Y + 0.25} r="4" fill="rgba(255,255,255,0.50)" />

          {/* ── Crystal drops ── */}
          {DROPS.map(({ x, h, w, op }, i) => {
            const cy = BAR_Y + h;
            return (
              <g key={i}>
                {/* Attachment node */}
                <circle cx={x} cy={BAR_Y + 1} r="1.6" fill="rgba(255,255,255,0.58)" />
                {/* Wire */}
                <line
                  x1={x} y1={BAR_Y + 2.5}
                  x2={x} y2={cy - w}
                  stroke="rgba(255,255,255,0.48)"
                  strokeWidth="0.7"
                />
                {/* Faceted hexagon crystal */}
                <polygon
                  points={[
                    `${x},${cy - w}`,
                    `${x + w * 0.68},${cy - w * 0.22}`,
                    `${x + w * 0.54},${cy + w * 0.88}`,
                    `${x},${cy + w * 1.38}`,
                    `${x - w * 0.54},${cy + w * 0.88}`,
                    `${x - w * 0.68},${cy - w * 0.22}`,
                  ].join(" ")}
                  fill="url(#cG)"
                  opacity={op}
                />
                {/* Inner highlight facet */}
                <polygon
                  points={[
                    `${x},${cy - w * 0.72}`,
                    `${x + w * 0.30},${cy - w * 0.08}`,
                    `${x + w * 0.22},${cy + w * 0.46}`,
                    `${x},${cy + w * 0.64}`,
                    `${x - w * 0.22},${cy + w * 0.46}`,
                    `${x - w * 0.30},${cy - w * 0.08}`,
                  ].join(" ")}
                  fill="rgba(255,255,255,0.36)"
                />
                {/* Top shine line */}
                <line
                  x1={x - w * 0.28} y1={cy - w * 0.18}
                  x2={x}            y2={cy - w * 0.80}
                  stroke="rgba(255,255,255,0.52)"
                  strokeWidth="0.55"
                />
              </g>
            );
          })}

          {/* Subtle warm glow beneath center crystal */}
          <ellipse
            cx="190" cy="71"
            rx="26" ry="3.5"
            fill="rgba(255,210,70,0.07)"
          />
        </svg>
      </motion.div>
    </div>
  );
}
