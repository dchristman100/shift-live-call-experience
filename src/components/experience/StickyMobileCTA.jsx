import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const demoSection = document.getElementById("live-demo");
    const ctaSection = document.getElementById("final-cta");

    const handleScroll = () => {
      if (!demoSection || !ctaSection) return;
      const demoBottom = demoSection.getBoundingClientRect().bottom;
      const ctaTop = ctaSection.getBoundingClientRect().top;
      const windowH = window.innerHeight;

      setVisible(demoBottom < 0 && ctaTop > windowH);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const buildBookingUrl = () => {
    const bookingUrl = new URL("https://makea.shiftnow.io/widget/bookings/reality");
    const urlParams = new URLSearchParams(window.location.search);
    const gap = urlParams.get("gap");
    if (gap) bookingUrl.searchParams.set("gap", gap);
    bookingUrl.searchParams.set("source", "experience-page-sticky");
    return bookingUrl.toString();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
        >
          <div className="flex items-center justify-between px-4 py-3">
            <p className="font-inter text-sm text-gray-600 font-medium pr-3">
              Ready to close your gap?
            </p>
            <a href={buildBookingUrl()} target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
              <button
                className="font-montserrat text-white text-sm font-bold px-5 py-2.5 rounded-full whitespace-nowrap"
                style={{ background: "#F54A48" }}
              >
                Book Now →
              </button>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}