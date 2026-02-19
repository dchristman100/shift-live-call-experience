import React from "react";
import HeroSection from "../components/experience/HeroSection";
import RevenueLeaksSection from "../components/experience/RevenueLeaksSection";
import LiveDemoSection from "../components/experience/LiveDemoSection";
import TestimonialsSection from "../components/experience/TestimonialsSection";
import HowItWorksSection from "../components/experience/HowItWorksSection";
import ProofSection from "../components/experience/ProofSection";
import TimelineSection from "../components/experience/TimelineSection";
import FinalCTASection from "../components/experience/FinalCTASection";
import StickyMobileCTA from "../components/experience/StickyMobileCTA";
import CallWidget from "../components/experience/CallWidget";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CallWidget />
      <TestimonialsSection />
      <RevenueLeaksSection />
      <LiveDemoSection />
      <HowItWorksSection />
      <ProofSection />
      <TimelineSection />
      <FinalCTASection />
      <StickyMobileCTA />
    </>
  );
}