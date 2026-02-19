import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";

const leaks = [
  {
    number: 1,
    name: "Slow Lead Response",
    quote: "67% of prospects book with the competitor who responds first",
    fix: "AI answers every call in < 30 seconds",
    showDemo: true,
  },
  {
    number: 2,
    name: "After-Hours Lead Loss",
    quote: "35% of leads arrive when your office is closed — 90% are gone forever",
    fix: "24/7 AI — your business never closes",
    showDemo: true,
  },
  {
    number: 3,
    name: "Booking Conversion Gap",
    quote: "Leads you contact but never convert to booked appointments",
    fix: "AI booking + automated scheduling",
    showDemo: true,
  },
  {
    number: 4,
    name: "Appointment No-Shows",
    quote: "40-50% of booked appointments never show up",
    fix: "Automated confirmations + reminders + rescheduling",
    showDemo: false,
  },
  {
    number: 5,
    name: "Low Close Rate",
    quote: "Unqualified prospects waste your sales team's time",
    fix: "Pre-qualified, pre-sold appointments",
    showDemo: false,
  },
  {
    number: 6,
    name: "Follow-Up Failure",
    quote: "Leads fall through pipeline cracks and never get re-engaged",
    fix: "AI follow-up recovers every dropped lead",
    showDemo: false,
  },
  {
    number: 7,
    name: "Marketing Waste",
    quote: "No idea which marketing actually works — money disappears",
    fix: "AI eliminates SDR overhead + tracks every dollar",
    showDemo: false,
  },
];

function LeakCard({ leak, index }) {
  const handleCardClick = () => {
    base44.analytics.track({
      eventName: "leak_card_clicked",
      properties: { leak_number: leak.number, leak_name: leak.name },
    });
  };

  const handleDemoClick = (e) => {
    e.stopPropagation();
    base44.analytics.track({
      eventName: "leak_demo_link_clicked",
      properties: { leak_number: leak.number },
    });
    document.getElementById("live-demo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.07 * index, duration: 0.45 }}
      onClick={handleCardClick}
      className="rounded-lg p-5 flex flex-col gap-3 cursor-default"
      style={{
        background: "#12143A",
        border: "1px solid rgba(255,255,255,0.08)",
        borderLeft: "3px solid #F54A48",
        minHeight: "180px",
      }}
    >
      <p className="font-outfit text-xs font-bold uppercase" style={{ color: "#F54A48", letterSpacing: "1px" }}>
        🩸 LEAK {leak.number}
      </p>
      <p className="font-outfit text-lg font-bold text-white leading-snug">{leak.name}</p>
      <p className="text-sm italic flex-1" style={{ color: "#64748B" }}>"{leak.quote}"</p>
      <p className="text-xs">
        <span className="font-semibold" style={{ color: "#22C55E" }}>ShiFt Fix:</span>{" "}
        <span className="text-white">{leak.fix}</span>
      </p>
      {leak.showDemo && (
        <button
          onClick={handleDemoClick}
          className="text-xs font-semibold text-left transition-opacity hover:opacity-70 mt-1"
          style={{ color: "#F54A48" }}
        >
          See Demo ↓
        </button>
      )}
    </motion.div>
  );
}

export default function RevenueLeaksSection() {
  const sectionRef = useRef(null);
  const hasTracked = useRef(false);

  const fromCalculator = !!(
    new URLSearchParams(window.location.search).get("from") === "calculator" ||
    new URLSearchParams(window.location.search).get("gap")
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasTracked.current) {
          hasTracked.current = true;
          base44.analytics.track({
            eventName: "leaks_section_viewed",
            properties: { from_calculator: fromCalculator },
          });
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const buildBookingUrl = () => {
    const bookingUrl = new URL("https://makea.shiftnow.io/widget/bookings/reality");
    const urlParams = new URLSearchParams(window.location.search);
    const gap = urlParams.get("gap");
    if (gap) bookingUrl.searchParams.set("gap", gap);
    ["utm_source", "utm_medium", "utm_campaign"].forEach((p) => {
      const v = urlParams.get(p);
      if (v) bookingUrl.searchParams.set(p, v);
    });
    bookingUrl.searchParams.set("source", "experience-leaks");
    return bookingUrl.toString();
  };

  const handleBookingClick = () => {
    base44.analytics.track({
      eventName: "experience_to_booking",
      properties: {
        from_section: "leaks",
        time_on_page: Math.round(window.performance.now() / 1000),
      },
    });
  };

  return (
    <section ref={sectionRef} className="py-20 md:py-28" style={{ background: "#0D0F33" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="font-outfit text-xs font-bold uppercase mb-4"
            style={{ color: "#F54A48", letterSpacing: "2px" }}
          >
            WHY MOST CONTRACTORS LOSE $30K–$100K/MONTH
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-outfit text-2xl md:text-[32px] font-bold text-white mb-4"
          >
            The 7 Revenue Leaks Hiding in Your Business
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-plus-jakarta text-base max-w-[600px] mx-auto"
            style={{ color: "#64748B" }}
          >
            Every service business has them. Most don't know they exist. Here's what they are — and how ShiFt plugs each one.
          </motion.p>
        </div>

        {/* Top row: 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {leaks.slice(0, 3).map((leak, i) => (
            <LeakCard key={leak.number} leak={leak} index={i} />
          ))}
        </div>

        {/* Bottom row: 4 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {leaks.slice(3).map((leak, i) => (
            <LeakCard key={leak.number} leak={leak} index={i + 3} />
          ))}
        </div>

        {/* Summary block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 text-center max-w-[680px] mx-auto"
        >
          <p className="font-plus-jakarta text-base mb-3" style={{ color: "#64748B" }}>
            The calculator showed you 2-3 of these leaks.
          </p>
          <p className="font-outfit text-lg md:text-xl font-bold text-white mb-8">
            Your Reality Session reveals all 7 — with exact dollar amounts from YOUR business.
          </p>
          <a href={buildBookingUrl()} target="_blank" rel="noopener noreferrer" onClick={handleBookingClick}>
            <button
              className="font-outfit text-white text-base md:text-lg font-bold px-10 py-4 rounded-full transition-all duration-300 hover:scale-[1.03]"
              style={{
                background: "#F54A48",
                boxShadow: "0 4px 24px rgba(245, 74, 72, 0.35)",
              }}
            >
              Book Your Reality Session →
            </button>
          </a>
          <p className="font-plus-jakarta mt-4 text-sm" style={{ color: "#64748B" }}>
            15 minutes. Your numbers. Zero obligation.
          </p>
        </motion.div>
      </div>
    </section>
  );
}