import React from "react";
import { motion } from "framer-motion";
import { Phone, MessageSquare, CalendarCheck, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "1",
    icon: Phone,
    title: "Phone Rings",
    description: "A homeowner needs a roofer. ShiFt AI answers in under 30 seconds — every time, 24/7/365.",
    stat: "27 sec",
    statLabel: "avg answer time",
  },
  {
    number: "2",
    icon: MessageSquare,
    title: "AI Qualifies",
    description: "Natural conversation identifies real buyers vs. tire-kickers. No scripts. No awkward pauses. Just smooth qualification.",
    stat: "78%",
    statLabel: "of jobs → first responder",
  },
  {
    number: "3",
    icon: CalendarCheck,
    title: "Appointment Booked",
    description: "Qualified leads go straight to your calendar. You wake up to booked jobs — not voicemails.",
    stat: "3.2x",
    statLabel: "more appointments",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-20 md:py-28" style={{ background: "#F8F9FA" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-montserrat text-3xl md:text-[40px] font-bold mb-4" style={{ color: "#0D0F33" }}>
            How ShiFt Works
          </h2>
          <p className="font-inter text-gray-500 text-lg max-w-[480px] mx-auto">
            Three steps. Zero missed opportunities.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-[72px] left-[16%] right-[16%] h-[2px]">
            <div className="h-full border-t-2 border-dashed" style={{ borderColor: "#8B5CF620" }} />
          </div>

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="relative bg-white rounded-2xl p-8 shadow-[0_2px_12px_rgba(0,0,0,0.05)] text-center"
              >
                {/* Number badge */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-montserrat font-bold text-white text-lg mx-auto mb-5 relative z-10"
                  style={{ background: "#F54A48" }}
                >
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                  style={{ background: "#F3E8FF" }}>
                  <Icon className="w-8 h-8" style={{ color: "#8B5CF6" }} />
                </div>

                <h3 className="font-montserrat text-xl font-semibold mb-3" style={{ color: "#0D0F33" }}>
                  {step.title}
                </h3>
                <p className="font-inter text-gray-500 text-[15px] leading-relaxed mb-6">
                  {step.description}
                </p>

                {/* Stat */}
                <div className="pt-5 border-t border-gray-100">
                  <span className="font-montserrat text-3xl font-extrabold" style={{ color: "#2E7D32" }}>
                    {step.stat}
                  </span>
                  <p className="font-inter text-sm text-gray-400 mt-1">{step.statLabel}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}