import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const [calculatorData, setCalculatorData] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const gap = urlParams.get("gap");
    const invisible = urlParams.get("invisible");
    const missed = urlParams.get("missed");

    if (gap) {
      setCalculatorData({ totalGap: gap, invisible, missed });
    } else {
      try {
        const stored = localStorage.getItem("shiftCalculatorResults");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Date.now() - parsed.timestamp < 86400000) {
            setCalculatorData(parsed);
          }
        }
      } catch {}
    }
  }, []);

  const formatCurrency = (val) => {
    const num = parseInt(val);
    if (isNaN(num)) return null;
    return num.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  };

  const scrollToDemo = () => {
    document.getElementById("live-demo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(165deg, #04081A 0%, #0C1232 60%, #04081A 100%)" }}>
      
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: "48px 48px"
        }} />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #A78BFA, transparent 70%)" }} />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #FF9F43, transparent 70%)" }} />

      <div className="relative z-10 max-w-[900px] mx-auto px-6 text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <img 
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69891f74525fd7a798619082/774874628_FinalV2.png"
            alt="ShiFt Logo"
            className="h-16 md:h-20 mx-auto"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-outfit text-sm md:text-base font-bold uppercase tracking-[3px] mb-6"
          style={{ color: "#FF9F43" }}
        >
          {calculatorData?.totalGap
            ? `You're losing ${formatCurrency(calculatorData.totalGap)}/month`
            : "Roofing contractors lose $50K+/month to competitors"}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-outfit text-4xl sm:text-5xl md:text-[64px] font-extrabold text-white leading-[1.1] mb-6"
        >
          {calculatorData?.totalGap
            ? "Here's How You Fix That"
            : "Here's How to Stop the Bleeding"}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="font-plus-jakarta text-lg md:text-[32px] font-medium max-w-[680px] mx-auto leading-relaxed mb-12"
          style={{ color: "#B8C0E0" }}
        >
          AI that answers every call, identifies real buyers, and books appointments — while you sleep.
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          onClick={scrollToDemo}
          className="inline-flex items-center gap-2 font-plus-jakarta text-base transition-colors cursor-pointer group"
          style={{ color: "#B8C0E0" }}
        >
          <span>See it in action</span>
          <ChevronDown className="w-5 h-5 animate-bounce-down" />
        </motion.button>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/5 to-transparent" />
    </section>
  );
}