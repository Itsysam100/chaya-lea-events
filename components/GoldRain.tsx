"use client";

const DROPS = [
  { id: 0,  left: "3%",  delay: "-1s",    size: 10, opacity: 0.90 },
  { id: 1,  left: "8%",  delay: "-7.2s",  size: 8,  opacity: 0.78 },
  { id: 2,  left: "14%", delay: "-13.5s", size: 12, opacity: 0.95 },
  { id: 3,  left: "19%", delay: "-3.8s",  size: 7,  opacity: 0.72 },
  { id: 4,  left: "25%", delay: "-10.1s", size: 11, opacity: 0.88 },
  { id: 5,  left: "30%", delay: "-16.4s", size: 9,  opacity: 0.80 },
  { id: 6,  left: "36%", delay: "-5.5s",  size: 13, opacity: 0.93 },
  { id: 7,  left: "41%", delay: "-12.0s", size: 8,  opacity: 0.75 },
  { id: 8,  left: "47%", delay: "-18.2s", size: 10, opacity: 0.87 },
  { id: 9,  left: "52%", delay: "-2.3s",  size: 7,  opacity: 0.70 },
  { id: 10, left: "58%", delay: "-9.0s",  size: 12, opacity: 0.95 },
  { id: 11, left: "63%", delay: "-14.7s", size: 9,  opacity: 0.79 },
  { id: 12, left: "69%", delay: "-4.2s",  size: 11, opacity: 0.90 },
  { id: 13, left: "74%", delay: "-11.6s", size: 8,  opacity: 0.73 },
  { id: 14, left: "80%", delay: "-17.0s", size: 13, opacity: 0.97 },
  { id: 15, left: "85%", delay: "-6.8s",  size: 9,  opacity: 0.82 },
  { id: 16, left: "91%", delay: "-15.3s", size: 10, opacity: 0.86 },
  { id: 17, left: "96%", delay: "-8.5s",  size: 7,  opacity: 0.71 },
  { id: 18, left: "11%", delay: "-0.5s",  size: 14, opacity: 1.00 },
  { id: 19, left: "55%", delay: "-19.0s", size: 8,  opacity: 0.76 },
];

export default function GoldRain() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 25 }}
      aria-hidden
    >
      {DROPS.map((drop) => (
        <div
          key={drop.id}
          className="absolute gold-tear-drop"
          style={{
            left: drop.left,
            top: 0,
            animationDelay: drop.delay,
            opacity: drop.opacity,
          }}
        >
          <svg
            width={drop.size}
            height={Math.round(drop.size * 1.7)}
            viewBox="0 0 20 34"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id={`gg${drop.id}`} x1="30%" y1="0%" x2="70%" y2="100%">
                <stop offset="0%"   stopColor="#FFFACD" />
                <stop offset="30%"  stopColor="#FFD700" />
                <stop offset="70%"  stopColor="#FFA500" />
                <stop offset="100%" stopColor="#B8860B" />
              </linearGradient>
            </defs>
            {/* teardrop: rounded top, pointed bottom */}
            <path
              d="M10,0 C6,5 0,13 0,20 C0,27.5 4.5,33 10,33 C15.5,33 20,27.5 20,20 C20,13 14,5 10,0 Z"
              fill={`url(#gg${drop.id})`}
            />
            {/* inner highlight */}
            <ellipse cx="7" cy="12" rx="3.5" ry="6" fill="rgba(255,255,240,0.55)" />
          </svg>
        </div>
      ))}

      {/* Bottom splash zone — small ripples that loop */}
      <div className="absolute bottom-0 left-0 right-0 h-12 flex items-end justify-around pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="gold-splash-ring"
            style={{
              left: `${4 + i * 8}%`,
              animationDelay: `${-(i * 1.6) % 19}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
