"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface Photo {
  id: string;
  src: string;
  alt: string;
  label: string;
  caption: string;
  position: number;
}

interface CategoryGalleryProps {
  photos: Photo[];
  categoryLabel: string;
}

export default function CategoryGallery({ photos, categoryLabel }: CategoryGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);

  return (
    <div className="min-h-screen bg-pink-50">
      {/* Floating nav */}
      <nav className="fixed top-4 left-4 right-4 z-50 bg-white/90 backdrop-blur-md rounded-2xl border border-pink-200 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="text-3xl text-pink-600 cursor-pointer hover:opacity-75 transition-opacity"
            style={{ fontFamily: "var(--font-great-vibes)" }}
          >
            Chaya Lea
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-pink-700 text-base font-medium hover:text-yellow-600 transition-colors cursor-pointer"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 pt-28 pb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="text-6xl sm:text-7xl text-pink-600 mb-3"
            style={{ fontFamily: "var(--font-great-vibes)" }}
          >
            {categoryLabel}
          </h1>
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-12 h-px bg-yellow-600" />
            <div className="w-2 h-2 rounded-full bg-yellow-600" />
            <div className="w-12 h-px bg-yellow-600" />
          </div>
          <p
            className="text-pink-500 text-lg italic"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {photos.length} event{photos.length !== 1 ? "s" : ""}
          </p>
        </div>

        {photos.length === 0 ? (
          <div className="text-center py-24">
            <p
              className="text-pink-400 text-xl italic"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Photos coming soon…
            </p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                className="break-inside-avoid mb-4 group cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 aspect-[4/3]">
                  <Image
                    src={photo.src}
                    alt={photo.alt || photo.label}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p
                      className="text-white text-lg font-semibold"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      {photo.label}
                    </p>
                  </div>
                </div>
                {photo.caption && (
                  <p
                    className="text-pink-600 text-sm italic mt-2 px-1"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {photo.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={photos.map((p) => ({ src: p.src, alt: p.alt || p.label }))}
      />
    </div>
  );
}
