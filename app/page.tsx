"use client";

import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import GoldRain from "@/components/GoldRain";
import Chandelier from "@/components/Chandelier";

export default function Home() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => {
      const el = wrapperRef.current;
      if (!el) return;
      el.classList.remove("page-twisting");
      // force reflow so re-adding the class restarts the animation
      void el.offsetWidth;
      el.classList.add("page-twisting");
      setTimeout(() => el.classList.remove("page-twisting"), 5100);
    };
    window.addEventListener("pageTwist", handler);
    return () => window.removeEventListener("pageTwist", handler);
  }, []);

  return (
    <>
      <GoldRain />
      <Chandelier />
      <div ref={wrapperRef}>
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <GallerySection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
