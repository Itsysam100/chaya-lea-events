"use client";

const eventTags = [
  "Weddings",
  "Bar Mitzvahs",
  "Sheva Brachot",
  "Engagement Parties",
  "& More",
];

export default function HeroSection() {
  const scrollToGallery = () =>
    document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      style={{ background: "#1B2A44" }}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(212,168,67,0.10) 0%, transparent 70%)" }}
        aria-hidden
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        <p
          className="text-sm tracking-widest uppercase mb-5"
          style={{ fontFamily: "var(--font-cormorant)", letterSpacing: "0.35em", color: "#C4A86A" }}
        >
          Est. Stamford Hill · London
        </p>

        {/* Ornamental top rule */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-px flex-1 max-w-[80px]" style={{ background: "rgba(196,168,106,0.5)" }} />
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <path d="M9 1 C9 1 5 5 1 9 C5 13 9 17 9 17 C9 17 13 13 17 9 C13 5 9 1 9 1Z" fill="#C4A86A" opacity="0.7"/>
          </svg>
          <div className="h-px flex-1 max-w-[80px]" style={{ background: "rgba(196,168,106,0.5)" }} />
        </div>

        <h1
          className="mb-2 leading-none"
          style={{
            fontFamily: "var(--font-great-vibes)",
            fontSize: "clamp(4rem, 12vw, 8rem)",
            color: "#D4A843",
          }}
        >
          Elite Events
        </h1>

        <p
          className="text-sm tracking-[0.3em] uppercase mb-2"
          style={{ fontFamily: "var(--font-cormorant)", color: "#C4A86A" }}
        >
          Stamford Hill
        </p>

        {/* Logo tagline */}
        <p
          className="text-xl sm:text-2xl italic mb-6"
          style={{ fontFamily: "var(--font-cormorant)", color: "#ECD9A8" }}
        >
          We set your simcha
        </p>

        {/* Ornamental divider */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px flex-1 max-w-[60px]" style={{ background: "rgba(196,168,106,0.4)" }} />
          <div className="w-1.5 h-1.5 rotate-45" style={{ background: "#C4A86A" }} />
          <div className="h-px flex-1 max-w-[120px]" style={{ background: "rgba(196,168,106,0.4)" }} />
          <div className="w-1.5 h-1.5 rotate-45" style={{ background: "#C4A86A" }} />
          <div className="h-px flex-1 max-w-[60px]" style={{ background: "rgba(196,168,106,0.4)" }} />
        </div>

        <p
          className="text-2xl sm:text-3xl font-light italic mb-8"
          style={{ fontFamily: "var(--font-cormorant)", color: "rgba(253,250,244,0.75)" }}
        >
          Turning your most precious moments into timeless memories
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {eventTags.map((tag) => (
            <span
              key={tag}
              className="px-5 py-1.5 rounded-full text-sm font-medium"
              style={{
                fontFamily: "var(--font-cormorant)",
                border: "1px solid rgba(196,168,106,0.45)",
                color: "#ECD9A8",
                background: "rgba(196,168,106,0.08)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <button
          onClick={scrollToGallery}
          className="px-10 py-4 rounded-full text-lg font-semibold transition-all duration-200 cursor-pointer"
          style={{
            fontFamily: "var(--font-cormorant)",
            background: "#D4A843",
            color: "#1B2A44",
            boxShadow: "0 4px 24px rgba(212,168,67,0.30)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#ECD9A8";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#D4A843";
          }}
        >
          See My Work
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden>
        <svg className="w-6 h-6" fill="none" stroke="#C4A86A" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
