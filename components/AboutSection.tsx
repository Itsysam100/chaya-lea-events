"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const DEFAULT_CONTENT = {
  heading: "Creating Unforgettable Celebrations",
  para1: "With a passion for detail and a love for beautiful moments, we have been crafting elegant celebrations for families across the community. Every event is a unique story — and we are honoured to help you tell yours.",
  para2: "From intimate sheva brachot gatherings to grand wedding receptions, we bring creativity, care, and calm to every occasion. Your vision is our mission.",
  para3: "",
  photoUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80",
  stats: [
    { value: "10+", label: "Years Experience" },
    { value: "200+", label: "Events Planned" },
    { value: "500+", label: "Happy Clients" },
  ],
};

const statPop = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

const staggerStats = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.28 } },
};

export default function AboutSection() {
  const [content, setContent] = useState(DEFAULT_CONTENT);

  useEffect(() => {
    fetch("/api/about")
      .then((r) => r.json())
      .then((d) => setContent({ ...DEFAULT_CONTENT, ...d }))
      .catch(() => {});
  }, []);

  return (
    <section id="about" className="py-24 px-6 bg-ivory overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Heading fades in first */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            className="text-5xl sm:text-6xl text-gold mb-3"
            style={{ fontFamily: "var(--font-great-vibes)" }}
          >
            About Us
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-px bg-gold-light" />
            <div className="w-2 h-2 rotate-45 bg-gold-light" />
            <div className="w-12 h-px bg-gold-light" />
          </div>
        </motion.div>

        {/* ── Carpet unroll wraps the whole content grid ── */}
        <motion.div
          initial={{
            clipPath: "inset(0 0 100% 0 round 8px)",
            rotateX: 16,
            opacity: 0.6,
          }}
          whileInView={{
            clipPath: "inset(0 0 0% 0 round 0px)",
            rotateX: 0,
            opacity: 1,
          }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.2, ease: [0.76, 0, 0.24, 1] }}
          style={{ perspective: "900px", transformOrigin: "top center" }}
        >
          <div className="grid md:grid-cols-2 gap-16 items-center">

            {/* Text + Stats */}
            <div>
              <motion.h3
                className="text-3xl text-mahogany font-semibold mb-6"
                style={{ fontFamily: "var(--font-cormorant)" }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.08 }}
              >
                {content.heading}
              </motion.h3>

              <motion.p
                className="text-muted text-xl leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-cormorant)" }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.13 }}
              >
                {content.para1}
              </motion.p>

              <motion.p
                className="text-muted text-xl leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-cormorant)" }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.18 }}
              >
                {content.para2}
              </motion.p>

              {content.para3 && (
                <motion.p
                  className="text-muted text-xl leading-relaxed mb-4"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.22 }}
                >
                  {content.para3}
                </motion.p>
              )}

              {/* Stats pop in after carpet finishes */}
              <motion.div
                className="grid grid-cols-3 gap-4 mt-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerStats}
              >
                {content.stats.map(({ value, label }) => (
                  <motion.div
                    key={label}
                    className="text-center p-4 rounded-2xl border"
                    style={{ background: "#F9F3E8", borderColor: "#ECD9A8" }}
                    variants={statPop}
                    transition={{ type: "spring", stiffness: 200, damping: 18 }}
                  >
                    <p className="text-3xl text-gold font-bold" style={{ fontFamily: "var(--font-cormorant)" }}>
                      {value}
                    </p>
                    <p className="text-muted text-sm mt-1" style={{ fontFamily: "var(--font-cormorant)" }}>
                      {label}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Image glides in from right */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="absolute -top-4 -left-4 w-full h-full rounded-3xl border-2"
                style={{ borderColor: "#D4A843" }}
              />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[3/4]">
                <Image
                  src={content.photoUrl}
                  alt="Elegant event setup by Elite Events Stamford Hill"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
