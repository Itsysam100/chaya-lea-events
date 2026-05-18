"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Gallery", id: "gallery" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-4 left-4 right-4 z-50 rounded-2xl transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-lg border border-pink-200"
          : "bg-white/70 backdrop-blur-sm border border-pink-100"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <button
          onClick={() => scrollTo("home")}
          className="text-3xl text-pink-600 cursor-pointer select-none transition-opacity hover:opacity-75"
          style={{ fontFamily: "var(--font-great-vibes)" }}
        >
          Chaya Lea
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-pink-800 text-base font-medium hover:text-yellow-600 transition-colors duration-200 cursor-pointer"
              style={{
                fontFamily: "var(--font-cormorant)",
                letterSpacing: "0.1em",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          onClick={() => scrollTo("contact")}
          className="hidden md:block bg-yellow-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-yellow-700 transition-colors duration-200 cursor-pointer"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Book Now
        </button>

        <button
          className="md:hidden text-pink-600 cursor-pointer p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-pink-100 px-6 py-4 flex flex-col gap-4 bg-white/95 rounded-b-2xl">
          {navLinks.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-pink-800 text-lg font-medium text-left cursor-pointer hover:text-yellow-600 transition-colors"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            className="bg-yellow-600 text-white px-6 py-2 rounded-full text-sm font-semibold cursor-pointer hover:bg-yellow-700 transition-colors w-fit"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Book Now
          </button>
        </div>
      )}
    </nav>
  );
}
