"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function ContactSection() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={sectionRef} id="contact" className="section-reveal py-24 px-6 bg-ivory">
      <div className="max-w-2xl mx-auto text-center">
        <h2
          className="text-5xl sm:text-6xl text-gold mb-3"
          style={{ fontFamily: "var(--font-great-vibes)" }}
        >
          Get in Touch
        </h2>
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-px bg-gold-light" />
          <div className="w-2 h-2 rotate-45 bg-gold-light" />
          <div className="w-12 h-px bg-gold-light" />
        </div>
        <p
          className="text-muted text-xl italic mb-12"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Let&apos;s create something beautiful together
        </p>

        <div
          className="rounded-3xl p-8 sm:p-12 border-2"
          style={{ background: "#F9F3E8", borderColor: "#D4A843", boxShadow: "0 8px 40px rgba(184,134,11,0.10)" }}
        >
          <div className="flex flex-col gap-5">
            <a
              href="tel:07917866032"
              className="flex items-center gap-4 p-4 rounded-2xl bg-ivory border hover:shadow-md transition-all duration-200 cursor-pointer group"
              style={{ borderColor: "#ECD9A8" }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                style={{ background: "rgba(212,168,67,0.15)" }}
              >
                <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="text-left">
                <p
                  className="text-gold text-xs uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  Phone
                </p>
                <p
                  className="text-mahogany text-lg font-medium"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  07917 866 032
                </p>
              </div>
            </a>

            <a
              href="mailto:eliteeventsstamfordhill@gmail.com"
              className="flex items-center gap-4 p-4 rounded-2xl bg-ivory border hover:shadow-md transition-all duration-200 cursor-pointer group"
              style={{ borderColor: "#ECD9A8" }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                style={{ background: "rgba(212,168,67,0.15)" }}
              >
                <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="text-left">
                <p
                  className="text-gold text-xs uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  Email
                </p>
                <p
                  className="text-mahogany text-lg font-medium"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  eliteeventsstamfordhill@gmail.com
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
