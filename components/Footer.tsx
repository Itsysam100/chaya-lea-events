export default function Footer() {
  return (
    <footer className="py-10 px-6 bg-pink-900 text-center">
      <p
        className="text-5xl text-pink-200 mb-3"
        style={{ fontFamily: "var(--font-great-vibes)" }}
      >
        Chaya Lea Rabinovitz
      </p>
      <p
        className="text-pink-300 text-sm uppercase"
        style={{
          fontFamily: "var(--font-cormorant)",
          letterSpacing: "0.2em",
        }}
      >
        Event Planner &middot; Making Moments Magical
      </p>
      <div className="w-16 h-px bg-yellow-600/50 mx-auto my-5" />
      <p
        className="text-pink-400 text-sm"
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        &copy; 2026 Chaya Lea Rabinovitz. All rights reserved.
      </p>
    </footer>
  );
}
