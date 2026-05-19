export default function Footer() {
  return (
    <footer className="py-12 px-6 text-center" style={{ background: "#1B2A44" }}>
      {/* Ornamental top rule */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="h-px flex-1 max-w-[80px]" style={{ background: "rgba(196,168,106,0.35)" }} />
        <div className="w-1.5 h-1.5 rotate-45" style={{ background: "#C4A86A" }} />
        <div className="h-px flex-1 max-w-[200px]" style={{ background: "rgba(196,168,106,0.35)" }} />
        <div className="w-1.5 h-1.5 rotate-45" style={{ background: "#C4A86A" }} />
        <div className="h-px flex-1 max-w-[80px]" style={{ background: "rgba(196,168,106,0.35)" }} />
      </div>

      <p
        className="text-5xl mb-1"
        style={{ fontFamily: "var(--font-great-vibes)", color: "#D4A843" }}
      >
        Elite Events
      </p>
      <p
        className="text-sm uppercase mb-1"
        style={{ fontFamily: "var(--font-cormorant)", color: "#C4A86A", letterSpacing: "0.25em" }}
      >
        Stamford Hill · London
      </p>
      <p
        className="text-base italic mb-5"
        style={{ fontFamily: "var(--font-cormorant)", color: "#ECD9A8" }}
      >
        We set your simcha
      </p>

      <div className="w-16 h-px mx-auto mb-5" style={{ background: "rgba(196,168,106,0.3)" }} />

      <p
        className="text-sm"
        style={{ fontFamily: "var(--font-cormorant)", color: "rgba(196,168,106,0.55)" }}
      >
        &copy; 2026 Elite Events Stamford Hill. All rights reserved.
      </p>
    </footer>
  );
}
