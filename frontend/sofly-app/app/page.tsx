"use client";

import { useEffect } from "react";
import AppStatusBar from "@/components/AppStatusBar";
import Navbar from "@/components/sections/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/sections/Footer";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { scrollToSection as scrollToSectionUtil } from "@/lib/scrollUtils";

export default function WelcomePage() {
  useEffect(() => {
    // Handle hash-based scrolling on mount
    const hash = window.location.hash;
    if (hash) {
      // Strip the leading '#' and scroll to the section
      const sectionId = hash.substring(1);
      // Use requestAnimationFrame to ensure DOM elements are mounted
      requestAnimationFrame(() => {
        scrollToSectionUtil(sectionId);
      });
    }
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <AppStatusBar />
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </main>
  );
}

