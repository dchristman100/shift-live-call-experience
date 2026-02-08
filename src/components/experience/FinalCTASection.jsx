import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function FinalCTASection() {
  const buildBookingUrl = () => {
    const bookingUrl = new URL("https://makea.shiftnow.io/widget/bookings/reality");
    const urlParams = new URLSearchParams(window.location.search);
    
    const gap = urlParams.get("gap");
    if (gap) bookingUrl.searchParams.set("gap", gap);

    ["utm_source", "utm_medium", "utm_campaign"].forEach((p) => {
      const v = urlParams.get(p);
      if (v) bookingUrl.searchParams.set(p, v);
    });
    bookingUrl.searchParams.set("source", "experience-page");

    return bookingUrl.toString();
  };

  return (
    <section
      id="final-cta"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "linear-gradient(165deg, #0D0F33 0%, #1A1D4A 60%, #0D0F33 100%)" }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px"
        }} />

      {/* Gradient orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #F54A48, transparent 70%)" }} />

      <div className="relative z-10 max-w-[680px] mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="font-montserrat text-sm font-bold uppercase tracking-[3px] mb-5"
          style={{ color: "#FA982F" }}
        >
          Ready to stop losing revenue?
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-montserrat text-3xl md:text-[44px] font-bold text-white leading-tight mb-5"
        >
          Book Your Reality Session
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-inter text-lg text-white/65 mb-10 leading-relaxed"
        >
          15 minutes. No pitch. We show you YOUR numbers — then you decide.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a href={buildBookingUrl()} target="_blank" rel="noopener noreferrer">
            <button
              className="font-montserrat text-white text-lg font-bold px-12 py-5 rounded-full transition-all duration-300 hover:scale-[1.03] animate-pulse-glow"
              style={{
                background: "#F54A48",
                boxShadow: "0 4px 24px rgba(245, 74, 72, 0.35)",
              }}
            >
              Book My Reality Session →
            </button>
          </a>
        </motion.div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="font-inter text-white/40 text-sm mt-8 mb-6"
        >
          Join 200+ contractors who stopped missing buyers
        </motion.p>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex items-center justify-center gap-4"
        >
          {/* Avatar stack */}
          <div className="flex -space-x-2.5">
            {[
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces",
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=faces",
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=faces",
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=faces",
              "https://images.unsplash.com/photo-1599566150163-29194dcabd9c?w=64&h=64&fit=crop&crop=faces",
            ].map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="w-8 h-8 rounded-full border-2 object-cover"
                style={{ borderColor: "#0D0F33" }}
              />
            ))}
          </div>

          {/* Stars + Rating */}
          <div className="flex items-center gap-1.5">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" style={{ color: "#FA982F" }} />
              ))}
            </div>
            <span className="font-inter text-white/70 text-sm">4.9 average</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}