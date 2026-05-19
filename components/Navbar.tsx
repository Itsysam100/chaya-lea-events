"use client";

import { useState, useEffect, useCallback } from "react";

const navLinks = [
  { label: "Home",    id: "home" },
  { label: "About",   id: "about" },
  { label: "Gallery", id: "gallery" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled]           = useState(false);
  const [menuOpen, setMenuOpen]           = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { threshold: 0.4 }
    );
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((id: string) => {
    setMenuOpen(false);
    setTransitioning(true);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      setTransitioning(false);
    }, 280);
  }, []);

  return (
    <>
      {/* Page transition overlay */}
      {transitioning && <div className="page-transition-overlay" aria-hidden />}

      <nav
        className={`fixed top-4 left-4 right-4 z-50 rounded-2xl transition-all duration-300 ${
          scrolled
            ? "bg-ivory/90 backdrop-blur-md shadow-lg border border-gold-light"
            : "bg-ivory/70 backdrop-blur-sm border border-gold-pale"
        }`}
        style={scrolled ? { boxShadow: "0 4px 24px rgba(184,134,11,0.10)" } : {}}
      >
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo("home")}
            className="flex flex-col items-start cursor-pointer select-none group"
          >
            <span
              className="text-3xl text-gold leading-none group-hover:opacity-75 transition-opacity"
              style={{ fontFamily: "var(--font-great-vibes)" }}
            >
              Elite Events
            </span>
            <span
              className="text-[0.55rem] text-muted tracking-[0.25em] uppercase -mt-0.5"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Stamford Hill
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`text-base font-medium transition-all duration-200 cursor-pointer relative pb-0.5 ${
                  activeSection === id ? "text-gold" : "text-mahogany hover:text-gold"
                }`}
                style={{ fontFamily: "var(--font-cormorant)", letterSpacing: "0.1em" }}
              >
                {label}
                {activeSection === id && (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-gold rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => scrollTo("contact")}
            className="hidden md:block bg-gold text-ivory px-6 py-2 rounded-full text-sm font-semibold hover:bg-deep transition-colors duration-200 cursor-pointer"
            style={{ fontFamily: "var(--font-cormorant)", boxShadow: "0 2px 12px rgba(184,134,11,0.25)" }}
          >
            Book Now
          </button>

          {/* Hamburger */}
          <button
            className="md:hidden text-gold cursor-pointer p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-gold-pale px-6 py-4 flex flex-col gap-4 bg-ivory/95 rounded-b-2xl">
            {navLinks.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`text-lg font-medium text-left cursor-pointer transition-colors ${
                  activeSection === id ? "text-gold" : "text-mahogany hover:text-gold"
                }`}
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="bg-gold text-ivory px-6 py-2 rounded-full text-sm font-semibold cursor-pointer hover:bg-deep transition-colors w-fit"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Book Now
            </button>
          </div>
        )}
      </nav>
    </>
  );
}
