"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { createClient } from "@/lib/supabase/client";

// Fallback photos shown before Supabase is configured
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
  { key: "all", label: "All Events", href: null },
  { key: "wedding", label: "Weddings", href: "/weddings" },
  { key: "barmitzvah", label: "Bar & Bat Mitzvahs", href: "/bar-mitzvah" },
  { key: "sheva", label: "Sheva Brachot", href: "/sheva" },
  { key: "engagement", label: "Engagements", href: "/engagement" },
  { key: "other", label: "Other Events", href: "/other" },
];

interface Photo {
  id: string;
  src: string;
  alt: string;
  category: string;
  label: string;
  caption: string;
  position: number;
}

export default function GallerySection() {
  const [photos, setPhotos] = useState<Photo[]>(FALLBACK_PHOTOS);
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return;
    const supabase = createClient();
    supabase
      .from("photos")
      .select("*")
      .order("category")
      .order("position")
      .then(({ data }) => { if (data && data.length > 0) setPhotos(data); });
  }, []);

  const filtered = activeFilter === "all"
    ? photos
    : photos.filter((p) => p.category === activeFilter);

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);

  return (
    <section id="gallery" className="py-24 px-6 bg-pink-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="text-5xl sm:text-6xl text-pink-600 mb-3"
            style={{ fontFamily: "var(--font-great-vibes)" }}
          >
            My Work
          </h2>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-px bg-yellow-600" />
            <div className="w-2 h-2 rounded-full bg-yellow-600" />
            <div className="w-12 h-px bg-yellow-600" />
          </div>
          <p
            className="text-pink-700 text-xl italic"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Every event tells a story — here are some of mine
          </p>
        </div>

        {/* Filter buttons — category ones navigate to full pages */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {filters.map(({ key, label, href }) =>
            href ? (
              <Link
                key={key}
                href={href}
                className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer border bg-white text-pink-700 border-pink-200 hover:border-pink-400 hover:text-pink-600 hover:bg-pink-50"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {label} →
              </Link>
            ) : (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer border ${
                  activeFilter === key
                    ? "bg-pink-600 text-white border-pink-600"
                    : "bg-white text-pink-700 border-pink-200 hover:border-pink-400 hover:text-pink-600"
                }`}
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {label}
              </button>
            )
          )}
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {filtered.map((item, index) => (
            <div
              key={item.id}
              className="break-inside-avoid mb-4 group relative overflow-hidden rounded-2xl cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300"
              onClick={() => openLightbox(index)}
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.src}
                  alt={item.alt || item.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p
                    className="text-white text-lg font-semibold"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {item.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={filtered.map((p) => ({ src: p.src, alt: p.alt || p.label }))}
      />
    </section>
  );
}
