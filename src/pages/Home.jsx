import React from "react";
import HeroSection from "../components/experience/HeroSection";
import LiveDemoSection from "../components/experience/LiveDemoSection";
import HowItWorksSection from "../components/experience/HowItWorksSection";
import ProofSection from "../components/experience/ProofSection";
import TimelineSection from "../components/experience/TimelineSection";
import FinalCTASection from "../components/experience/FinalCTASection";
import StickyMobileCTA from "../components/experience/StickyMobileCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <LiveDemoSection />
      <HowItWorksSection />
      <ProofSection />
      <TimelineSection />
      <FinalCTASection />
      <StickyMobileCTA />
    </>
  );
}