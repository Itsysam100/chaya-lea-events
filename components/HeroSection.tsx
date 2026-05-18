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
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100"
    >
      {/* Decorative blurs */}
      <div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-200/30 rounded-full blur-3xl"
        aria-hidden
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-yellow-100/40 rounded-full blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        <p
          className="text-pink-500 text-lg tracking-widest uppercase mb-4"
          style={{
            fontFamily: "var(--font-cormorant)",
            letterSpacing: "0.25em",
          }}
        >
          Welcome to
        </p>

        <h1
          className="text-7xl sm:text-8xl md:text-9xl text-pink-600 mb-4 leading-none"
          style={{ fontFamily: "var(--font-great-vibes)" }}
        >
          Chaya Lea Rabinovitz
        </h1>

        <div className="flex items-center justify-center gap-4 my-6">
          <div className="w-16 h-px bg-yellow-600" />
          <svg
            className="w-5 h-5 text-yellow-600"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
          </svg>
          <div className="w-16 h-px bg-yellow-600" />
        </div>

        <p
          className="text-2xl sm:text-3xl text-pink-800 font-light italic mb-8"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Turning your most precious moments into lasting memories
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {eventTags.map((tag) => (
            <span
              key={tag}
              className="border border-yellow-600 text-yellow-700 px-5 py-1.5 rounded-full text-sm font-medium"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {tag}
            </span>
          ))}
        </div>

        <button
          onClick={scrollToGallery}
          className="bg-pink-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-pink-700 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-pink-200/60 hover:shadow-xl"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          See My Work
        </button>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        aria-hidden
      >
        <svg
          className="w-6 h-6 text-pink-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </section>
  );
}
