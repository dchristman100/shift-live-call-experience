import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, ArrowRight, Quote } from "lucide-react";

function AnimatedStat({ number, unit, label, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayed, setDisplayed] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const numericPart = number.replace(/[^0-9.]/g, "");
    const target = parseFloat(numericPart);
    if (isNaN(target)) { setDisplayed(number); return; }

    const duration = 1500;
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      if (number.includes(".")) {
        setDisplayed(current.toFixed(1));
      } else {
        setDisplayed(Math.round(current).toString());
      }

      if (progress >= 1) clearInterval(timer);
    }, 30);

    return () => clearInterval(timer);
  }, [isInView, number]);

  const prefix = number.startsWith("$") ? "$" : "";
  const suffix = number.endsWith("%") ? "%" : "";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="text-center px-4"
    >
      <div className="flex items-baseline justify-center gap-1">
        <span className="font-montserrat text-5xl md:text-[64px] font-extrabold text-white">
          {prefix}{displayed}{suffix}
        </span>
        {unit && <span className="font-montserrat text-xl md:text-2xl font-bold" style={{ color: "#FA982F" }}>{unit}</span>}
      </div>
      <p className="font-inter text-white/60 text-base mt-2">{label}</p>
    </motion.div>
  );
}

const caseStudies = [
  {
    location: "Phoenix, AZ",
    metricBefore: "22%",
    metricAfter: "61%",
    metricLabel: "Close Rate",
    quote: "I only talk to buyers now. ShiFt filters out the tire-kickers before they waste my time.",
    name: "Mike R., Owner",
    company: "Desert Sun Roofing",
  },
  {
    location: "Dallas, TX",
    metric: "$67,000",
    metricLabel: "Recovered in 30 days",
    quote: "We were bleeding money after hours. First month with ShiFt, we booked 23 jobs that would have gone to voicemail.",
    name: "Sarah T., Operations Manager",
    company: "Lone Star Roofing Co.",
  },
];

export default function ProofSection() {
  return (
    <section className="py-20 md:py-28" style={{ background: "#0D0F33" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-4 mb-20">
          <AnimatedStat number="27" unit=" seconds" label="Average answer time" delay={0} />
          <AnimatedStat number="78%" unit="" label="Of jobs go to first responder" delay={0.1} />
          <div className="col-span-2 md:col-span-1">
            <AnimatedStat number="24/7" unit="/365" label="Coverage with zero missed calls" delay={0.2} />
          </div>
        </div>

        {/* Case Studies */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {caseStudies.map((study, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="rounded-2xl p-8 border"
              style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}
            >
              {/* Location */}
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="w-4 h-4" style={{ color: "#FA982F" }} />
                <span className="font-inter text-sm text-white/50">{study.location}</span>
              </div>

              {/* Metric */}
              {study.metricBefore ? (
                <div className="flex items-center gap-4 mb-6">
                  <div>
                    <span className="font-montserrat text-3xl font-extrabold text-white/40">{study.metricBefore}</span>
                  </div>
                  <ArrowRight className="w-5 h-5" style={{ color: "#FA982F" }} />
                  <div>
                    <span className="font-montserrat text-3xl font-extrabold" style={{ color: "#F54A48" }}>{study.metricAfter}</span>
                  </div>
                  <span className="font-inter text-sm text-white/50 ml-2">{study.metricLabel}</span>
                </div>
              ) : (
                <div className="mb-6">
                  <span className="font-montserrat text-3xl font-extrabold" style={{ color: "#F54A48" }}>{study.metric}</span>
                  <span className="font-inter text-sm text-white/50 ml-3">{study.metricLabel}</span>
                </div>
              )}

              {/* Quote */}
              <div className="relative pl-5 border-l-2 mb-6" style={{ borderColor: "#8B5CF640" }}>
                <p className="font-inter text-white/80 text-[17px] italic leading-relaxed">
                  "{study.quote}"
                </p>
              </div>

              {/* Attribution */}
              <div>
                <p className="font-inter text-white/90 font-medium text-sm">— {study.name}</p>
                <p className="font-inter text-white/40 text-sm">{study.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}