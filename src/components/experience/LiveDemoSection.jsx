import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Phone, CheckCircle, Play, Pause, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const audioDemos = [
  { label: "Homeowner inquiry — Roof leak", duration: "1:23" },
  { label: "After-hours emergency call", duration: "0:58" },
  { label: "Appointment booking flow", duration: "1:45" },
];

function AudioPlayer({ label, duration, index }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const toggle = () => {
    setPlaying(!playing);
    if (!playing) {
      // Simulate progress
      let p = 0;
      const interval = setInterval(() => {
        p += 2;
        if (p >= 100) {
          clearInterval(interval);
          setPlaying(false);
          setProgress(0);
          return;
        }
        setProgress(p);
      }, 200);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 * index, duration: 0.4 }}
      className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-white hover:border-purple-200 transition-colors"
    >
      <button
        onClick={toggle}
        className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
        style={{ background: playing ? "#8B5CF6" : "#F3E8FF" }}
      >
        {playing
          ? <Pause className="w-4 h-4 text-white" />
          : <Play className="w-4 h-4 text-purple-600 ml-0.5" />}
      </button>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 truncate">{label}</p>
        <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-200"
            style={{ width: `${progress}%`, background: "#8B5CF6" }}
          />
        </div>
      </div>
      <span className="text-xs text-gray-400 font-inter flex-shrink-0">{duration}</span>
    </motion.div>
  );
}

export default function LiveDemoSection() {
  const bullets = [
    "Answers in under 30 seconds",
    "Sounds natural, not robotic",
    "Qualifies leads automatically",
    "Books appointments to your calendar",
  ];

  return (
    <section id="live-demo" className="py-20 md:py-28 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left: Intro */}
          <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          >
          <h2 className="font-outfit text-3xl md:text-[40px] font-bold leading-tight mb-6"
            style={{ color: "#04081A" }}>
              Experience ShiFt AI<br />Right Now
            </h2>
            <p className="font-plus-jakarta text-lg leading-relaxed mb-8" style={{ color: "#B8C0E0" }}>
              Don't take our word for it. Call our AI, listen to real calls, or watch it handle a live roofing inquiry. This is exactly what your customers will experience.
            </p>
            <div className="space-y-4">
              {bullets.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.4 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: "#8B5CF6" }} />
                  <span className="font-inter text-gray-700 text-[17px]">{b}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Demo Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="rounded-2xl border border-gray-200 bg-[#F8F9FA] p-6 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
              {/* Click to Call */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #8B5CF6, #7C3AED)" }}>
                  <Phone className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-montserrat text-xl font-bold text-gray-900 mb-1">Call Our AI Now</h3>
                <p className="text-sm text-gray-500 font-inter mb-1">Experience a live demo call</p>
                <p className="font-montserrat text-lg font-bold" style={{ color: "#8B5CF6" }}>
                  (855) 744-3824
                </p>
              </div>

              <a href="tel:+18557443824" className="block w-full">
                <Button
                  className="w-full h-14 text-base font-montserrat font-bold rounded-xl transition-all hover:scale-[1.02]"
                  style={{ background: "#8B5CF6", color: "white" }}
                >
                  Start Demo Call →
                </Button>
              </a>

              {/* Divider */}
              <div className="flex items-center gap-4 my-8">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400 font-inter uppercase tracking-wider">Or listen to real calls</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {/* Audio Players */}
              <div className="space-y-3">
                {audioDemos.map((demo, i) => (
                  <AudioPlayer key={i} index={i} {...demo} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}