export default function Footer() {
  return (
    <footer className="py-10 px-6 text-center" style={{ background: "#3D1A08" }}>
      <p
        className="text-5xl mb-1"
        style={{ fontFamily: "var(--font-great-vibes)", color: "#D4A843" }}
      >
        Elite Events
      </p>
      <p
        className="text-sm uppercase mb-1"
        style={{
          fontFamily: "var(--font-cormorant)",
          color: "#ECD9A8",
          letterSpacing: "0.25em",
        }}
      >
        Stamford Hill · London
      </p>
      <p
        className="text-sm italic mb-5"
        style={{ fontFamily: "var(--font-cormorant)", color: "#A87830" }}
      >
        Making Every Moment Memorable
      </p>
      <div className="w-16 h-px mx-auto mb-5" style={{ background: "rgba(212,168,67,0.4)" }} />
      <p
        className="text-sm"
        style={{ fontFamily: "var(--font-cormorant)", color: "#7A5C3A" }}
      >
        &copy; 2026 Elite Events Stamford Hill. All rights reserved.
      </p>
    </footer>
  );
}
