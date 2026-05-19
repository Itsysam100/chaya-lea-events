"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { motion, AnimatePresence } from "framer-motion";

const FALLBACK_PHOTOS = [
  { id: "1", src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80", alt: "Elegant wedding table", category: "wedding", label: "Wedding Reception", caption: "", position: 1 },
  { id: "2", src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80", alt: "Outdoor wedding", category: "wedding", label: "Garden Wedding", caption: "", position: 2 },
  { id: "3", src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80", alt: "Wedding floral", category: "wedding", label: "Floral Decor", caption: "", position: 3 },
  { id: "4", src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80", alt: "Bar Mitzvah party", category: "barmitzvah", label: "Bar Mitzvah", caption: "", position: 1 },
  { id: "5", src: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80", alt: "Bat Mitzvah", category: "barmitzvah", label: "Bat Mitzvah", caption: "", position: 2 },
  { id: "6", src: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=800&q=80", alt: "Sheva Brachot dinner", category: "sheva", label: "Sheva Brachot", caption: "", position: 1 },
  { id: "7", src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80", alt: "Intimate gathering", category: "sheva", label: "Intimate Gathering", caption: "", position: 2 },
  { id: "8", src: "https://images.unsplash.com/photo-1501139083538-0139583c060f?auto=format&fit=crop&w=800&q=80", alt: "Engagement celebration", category: "engagement", label: "Engagement Party", caption: "", position: 1 },
  { id: "9", src: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=80", alt: "Engagement balloons", category: "engagement", label: "Engagement Celebration", caption: "", position: 2 },
  { id: "10", src: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=800&q=80", alt: "Special occasion cake", category: "other", label: "Special Occasion", caption: "", position: 1 },
  { id: "11", src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80", alt: "Private event", category: "other", label: "Private Event", caption: "", position: 2 },
  { id: "12", src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80", alt: "Birthday celebration", category: "other", label: "Birthday Celebration", caption: "", position: 3 },
];

const filters = [
  { key: "all",        label: "All Events" },
  { key: "wedding",    label: "Weddings" },
  { key: "barmitzvah", label: "Bar Mitzvahs" },
  { key: "sheva",      label: "Sheva Brachot" },
  { key: "engagement", label: "Engagements" },
  { key: "other",      label: "Other Events" },
];

interface Photo {
  id: string; src: string; alt: string; category: string;
  label: string; caption: string; position: number;
}

const carpetVariants = {
  enter: {
    clipPath: "inset(0 0 100% 0 round 6px)",
    rotateX: 14,
    opacity: 0.7,
  },
  visible: {
    clipPath: "inset(0 0 0% 0 round 0px)",
    rotateX: 0,
    opacity: 1,
    transition: {
      duration: 2,
      ease: [0.76, 0, 0.24, 1] as [number,number,number,number],
    },
  },
  exit: {
    clipPath: "inset(100% 0 0% 0 round 6px)",
    rotateX: -14,
    opacity: 0.7,
    transition: {
      duration: 2,
      ease: [0.76, 0, 0.24, 1] as [number,number,number,number],
    },
  },
};

export default function GallerySection() {
  const [photos, setPhotos]     = useState<Photo[]>(FALLBACK_PHOTOS);
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  useEffect(() => {
    fetch("/api/photos")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data) && data.length > 0) setPhotos(data); })
      .catch(() => {});
  }, []);

  const filtered = activeFilter === "all"
    ? photos
    : photos.filter((p) => p.category === activeFilter);

  const handleFilter = useCallback((key: string) => {
    setActiveFilter(key);
  }, []);

  return (
    <motion.section
      id="gallery"
      className="py-24 px-6"
      style={{ background: "#F9F3E8" }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            className="text-5xl sm:text-6xl text-gold mb-3"
            style={{ fontFamily: "var(--font-great-vibes)" }}
          >
            Our Work
          </h2>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-px bg-gold-light" />
            <div className="w-2 h-2 rotate-45 bg-gold-light" />
            <div className="w-12 h-px bg-gold-light" />
          </div>
          <p className="text-muted text-xl italic" style={{ fontFamily: "var(--font-cormorant)" }}>
            Every event tells a story — here are some of ours
          </p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {filters.map(({ key, label }) => (
            <motion.button
              key={key}
              onClick={() => handleFilter(key)}
              className="px-5 py-2 rounded-full text-sm font-medium cursor-pointer border"
              style={{
                fontFamily: "var(--font-cormorant)",
                background: activeFilter === key ? "#B8860B" : "#fff",
                color: activeFilter === key ? "#FDFAF4" : "#7A5C3A",
                borderColor: activeFilter === key ? "#B8860B" : "#D4A843",
                boxShadow: activeFilter === key ? "0 2px 12px rgba(184,134,11,0.25)" : "none",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {label}
            </motion.button>
          ))}
        </motion.div>

        {/* ── Carpet roll grid ── */}
        <div style={{ perspective: "1100px" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              variants={carpetVariants}
              initial="enter"
              animate="visible"
              exit="exit"
              style={{ transformOrigin: "top center" }}
            >
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
                {filtered.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="break-inside-avoid mb-4 group relative overflow-hidden rounded-2xl cursor-pointer shadow-md hover:shadow-xl"
                    style={{ transition: "box-shadow 0.3s" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.06,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setLightboxIndex(index)}
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={item.src}
                        alt={item.alt || item.label}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                        style={{ background: "linear-gradient(to top, rgba(61,26,8,0.75) 0%, transparent 60%)" }}
                      >
                        <p
                          className="text-ivory text-lg font-semibold"
                          style={{ fontFamily: "var(--font-cormorant)" }}
                        >
                          {item.label}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={filtered.map((p) => ({ src: p.src, alt: p.alt || p.label }))}
      />
    </motion.section>
  );
}
