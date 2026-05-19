"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import GoldRain from "@/components/GoldRain";
import Chandelier from "@/components/Chandelier";

export default function Home() {
  return (
    <>
      <GoldRain />
      <Chandelier />
      <div>
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
