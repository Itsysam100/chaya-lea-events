"use client";

const eventTags = [
  "Weddings",
  "Bar & Bat Mitzvahs",
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
      style={{ background: "linear-gradient(160deg, #FDFAF4 0%, #F9F0DC 55%, #F5E8C8 100%)" }}
    >
      {/* Decorative blurs */}
      <div
        className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-3xl"
        style={{ background: "rgba(212,168,67,0.12)" }}
        aria-hidden
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full blur-3xl"
        style={{ background: "rgba(184,134,11,0.08)" }}
        aria-hidden
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        <p
          className="text-gold text-sm tracking-widest uppercase mb-5"
          style={{ fontFamily: "var(--font-cormorant)", letterSpacing: "0.35em" }}
        >
          Est. Stamford Hill · London
        </p>

        <h1
          className="text-gold mb-3 leading-none"
          style={{
            fontFamily: "var(--font-great-vibes)",
            fontSize: "clamp(4rem, 12vw, 8rem)",
          }}
        >
          Elite Events
        </h1>

        <p
          className="text-muted text-sm tracking-[0.3em] uppercase mb-6"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Stamford Hill
        </p>

        {/* Gold divider with diamond */}
        <div className="flex items-center justify-center gap-4 my-6">
          <div className="w-16 h-px bg-gold-light" />
          <div className="w-2 h-2 rotate-45 bg-gold-light" />
          <div className="w-16 h-px bg-gold-light" />
        </div>

        <p
          className="text-2xl sm:text-3xl text-muted font-light italic mb-8"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Turning your most precious moments into timeless memories
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {eventTags.map((tag) => (
            <span
              key={tag}
              className="border border-gold-light text-gold px-5 py-1.5 rounded-full text-sm font-medium"
              style={{
                fontFamily: "var(--font-cormorant)",
                background: "rgba(212,168,67,0.07)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <button
          onClick={scrollToGallery}
          className="text-ivory px-10 py-4 rounded-full text-lg font-semibold transition-all duration-200 cursor-pointer"
          style={{
            fontFamily: "var(--font-cormorant)",
            background: "#B8860B",
            boxShadow: "0 4px 24px rgba(184,134,11,0.35)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#3D1A08")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#B8860B")}
        >
          See My Work
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden>
        <svg className="w-6 h-6 text-gold-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
