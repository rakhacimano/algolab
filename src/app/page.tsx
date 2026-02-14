"use client";

import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import TopicModulesSection from "@/components/landing/TopicModulesSection";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface-alt">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TopicModulesSection />
      <Footer />
    </div>
  );
}
