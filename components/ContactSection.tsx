"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function ContactSection() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={sectionRef} id="contact" className="section-reveal py-24 px-6 bg-white">
      <div className="max-w-2xl mx-auto text-center">
        <h2
          className="text-5xl sm:text-6xl text-pink-600 mb-3"
          style={{ fontFamily: "var(--font-great-vibes)" }}
        >
          Get in Touch
        </h2>
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-px bg-yellow-600" />
          <div className="w-2 h-2 rounded-full bg-yellow-600" />
          <div className="w-12 h-px bg-yellow-600" />
        </div>
        <p
          className="text-pink-700 text-xl italic mb-12"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Let&apos;s create something beautiful together
        </p>

        <div className="bg-pink-50 rounded-3xl p-8 sm:p-12 border-2 border-yellow-200 shadow-lg">
          <div className="flex flex-col gap-5">
            {/* Phone — replace with real number */}
            <a
              href="tel:+972500000000"
              className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-pink-100 hover:border-pink-300 hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 group-hover:bg-pink-200 transition-colors">
                <svg
                  className="w-5 h-5 text-pink-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <p
                  className="text-pink-400 text-xs uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  Phone
                </p>
                {/* Replace with Chaya Lea's real phone */}
                <p
                  className="text-pink-900 text-lg font-medium"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  +972 50 000 0000
                </p>
              </div>
            </a>

            {/* Email — replace with real email */}
            <a
              href="mailto:chayalea@email.com"
              className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-pink-100 hover:border-pink-300 hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 group-hover:bg-pink-200 transition-colors">
                <svg
                  className="w-5 h-5 text-pink-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <p
                  className="text-pink-400 text-xs uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  Email
                </p>
                {/* Replace with Chaya Lea's real email */}
                <p
                  className="text-pink-900 text-lg font-medium"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  chayalea@email.com
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
