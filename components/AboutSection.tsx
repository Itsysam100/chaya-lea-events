"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "200+", label: "Events Planned" },
  { value: "500+", label: "Happy Clients" },
];

export default function AboutSection() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={sectionRef} id="about" className="section-reveal py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-5xl sm:text-6xl text-pink-600 mb-3"
            style={{ fontFamily: "var(--font-great-vibes)" }}
          >
            About Me
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-px bg-yellow-600" />
            <div className="w-2 h-2 rounded-full bg-yellow-600" />
            <div className="w-12 h-px bg-yellow-600" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h3
              className="text-3xl text-pink-800 font-semibold mb-6"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Creating Unforgettable Celebrations
            </h3>
            <p
              className="text-pink-700 text-xl leading-relaxed mb-4"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {/* Replace with Chaya Lea's real bio */}
              With a passion for detail and a love for beautiful moments, I have
              been crafting elegant celebrations for families across the
              community. Every event is a unique story — and I am honoured to
              help you tell yours.
            </p>
            <p
              className="text-pink-700 text-xl leading-relaxed mb-10"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              From intimate sheva brachot gatherings to grand wedding
              receptions, I bring creativity, care, and calm to every occasion.
              Your vision is my mission.
            </p>

            <div className="grid grid-cols-3 gap-4">
              {stats.map(({ value, label }) => (
                <div
                  key={label}
                  className="text-center p-4 rounded-2xl bg-pink-50 border border-pink-100"
                >
                  <p
                    className="text-3xl text-yellow-600 font-bold"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {value}
                  </p>
                  <p
                    className="text-pink-700 text-sm mt-1"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full rounded-3xl border-2 border-yellow-200" />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[3/4]">
              {/* Replace src with a real photo of Chaya Lea */}
              <Image
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80"
                alt="Elegant event setup by Chaya Lea Rabinovitz"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
