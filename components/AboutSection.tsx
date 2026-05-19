"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const DEFAULT_CONTENT = {
  heading: "Creating Unforgettable Celebrations",
  para1: "With a passion for detail and a love for beautiful moments, we have been crafting elegant celebrations for families across the community. Every event is a unique story — and we are honoured to help you tell yours.",
  para2: "From intimate sheva brachot gatherings to grand wedding receptions, we bring creativity, care, and calm to every occasion. Your vision is our mission.",
};

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "200+", label: "Events Planned" },
  { value: "500+", label: "Happy Clients" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const statPop = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

export default function AboutSection() {
  const [content, setContent] = useState(DEFAULT_CONTENT);

  useEffect(() => {
    fetch("/api/about")
      .then((r) => r.json())
      .then((d) => setContent(d))
      .catch(() => {});
  }, []);

  return (
    <section id="about" className="py-24 px-6 bg-ivory">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.h2
            className="text-5xl sm:text-6xl text-gold mb-3"
            style={{ fontFamily: "var(--font-great-vibes)" }}
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            About Us
          </motion.h2>
          <motion.div
            className="flex items-center justify-center gap-3"
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-12 h-px bg-gold-light" />
            <div className="w-2 h-2 rotate-45 bg-gold-light" />
            <div className="w-12 h-px bg-gold-light" />
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Text + Stats */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            <motion.h3
              className="text-3xl text-mahogany font-semibold mb-6"
              style={{ fontFamily: "var(--font-cormorant)" }}
              variants={fadeUp}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {content.heading}
            </motion.h3>

            <motion.p
              className="text-muted text-xl leading-relaxed mb-4"
              style={{ fontFamily: "var(--font-cormorant)" }}
              variants={fadeUp}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {content.para1}
            </motion.p>

            <motion.p
              className="text-muted text-xl leading-relaxed mb-10"
              style={{ fontFamily: "var(--font-cormorant)" }}
              variants={fadeUp}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {content.para2}
            </motion.p>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-4"
              variants={stagger}
            >
              {stats.map(({ value, label }) => (
                <motion.div
                  key={label}
                  className="text-center p-4 rounded-2xl border"
                  style={{ background: "#F9F3E8", borderColor: "#ECD9A8" }}
                  variants={statPop}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                >
                  <p
                    className="text-3xl text-gold font-bold"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {value}
                  </p>
                  <p
                    className="text-muted text-sm mt-1"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            className="relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeRight}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="absolute -top-4 -left-4 w-full h-full rounded-3xl border-2"
              style={{ borderColor: "#D4A843" }}
            />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[3/4]">
              <Image
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80"
                alt="Elegant event setup by Elite Events Stamford Hill"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
