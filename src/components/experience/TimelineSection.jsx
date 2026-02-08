import React, { useState } from "react";
import { motion } from "framer-motion";
import { PhoneOff, PhoneCall, Clock } from "lucide-react";

const timelineCalls = [
  { time: "2:14 AM", label: "Emergency leak call", speed: "19 sec", afterHours: true },
  { time: "6:47 AM", label: "Before-work inquiry", speed: "24 sec", afterHours: true },
  { time: "11:30 AM", label: "Lunch break call", speed: "31 sec", afterHours: false },
  { time: "3:15 PM", label: "Working hours", speed: "22 sec", afterHours: false },
  { time: "7:22 PM", label: "After dinner call", speed: "27 sec", afterHours: true },
  { time: "10:58 PM", label: "Late night emergency", speed: "18 sec", afterHours: true },
];

function TimelineDot({ call, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="relative flex flex-col items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tooltip */}
      {hovered && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-20 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-lg px-4 py-3 z-20 whitespace-nowrap"
        >
          <p className="font-inter text-sm font-medium text-gray-800">{call.label}</p>
          <p className="font-inter text-xs text-gray-400">Answered in {call.speed}</p>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-white" />
        </motion.div>
      )}

      {/* Dot */}
      <div className="relative cursor-pointer">
        <div
          className={`w-3.5 h-3.5 rounded-full z-10 relative transition-transform ${hovered ? "scale-150" : ""}`}
          style={{ background: call.afterHours ? "#FA982F" : "#8B5CF6" }}
        />
        {call.afterHours && (
          <div className="absolute inset-0 rounded-full animate-dot-pulse" style={{ background: "#FA982F40" }} />
        )}
      </div>

      {/* Time label */}
      <span className="font-inter text-xs text-gray-400 mt-3 whitespace-nowrap">{call.time}</span>
    </motion.div>
  );
}

export default function TimelineSection() {
  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <h2 className="font-montserrat text-3xl md:text-[40px] font-bold mb-5" style={{ color: "#0D0F33" }}>
            Never Miss Another Call
          </h2>
          <p className="font-inter text-gray-500 text-lg max-w-[750px] mx-auto italic leading-relaxed">
            "Last night at 11:47 PM, a homeowner in Phoenix needed a roofer. ShiFt answered in 23 seconds. They're getting measured tomorrow."
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="hidden md:block mt-16 mb-16">
          {/* Time labels */}
          <div className="flex justify-between px-8 mb-4">
            <span className="font-inter text-xs text-gray-300 uppercase tracking-wider">12 AM</span>
            <span className="font-inter text-xs text-gray-300 uppercase tracking-wider">6 AM</span>
            <span className="font-inter text-xs text-gray-300 uppercase tracking-wider">12 PM</span>
            <span className="font-inter text-xs text-gray-300 uppercase tracking-wider">6 PM</span>
            <span className="font-inter text-xs text-gray-300 uppercase tracking-wider">12 AM</span>
          </div>

          {/* Bar */}
          <div className="relative h-12 rounded-full overflow-hidden" style={{ background: "#0D0F33" }}>
            {/* After-hours highlight */}
            <div className="absolute left-0 top-0 bottom-0 w-[25%] rounded-l-full" style={{ background: "rgba(250,152,47,0.08)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-[25%] rounded-r-full" style={{ background: "rgba(250,152,47,0.08)" }} />

            {/* Dots positioned */}
            <div className="absolute inset-0 flex items-center justify-around px-12">
              {timelineCalls.map((call, i) => (
                <TimelineDot key={i} call={call} index={i} />
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FA982F" }} />
              <span className="font-inter text-xs text-gray-400">After-hours</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#8B5CF6" }} />
              <span className="font-inter text-xs text-gray-400">Business hours</span>
            </div>
          </div>
        </div>

        {/* Mobile Timeline (Vertical) */}
        <div className="md:hidden mt-12 mb-12">
          <div className="relative pl-8">
            {/* Vertical line */}
            <div className="absolute left-3 top-0 bottom-0 w-0.5" style={{ background: "#0D0F3320" }} />

            <div className="space-y-6">
              {timelineCalls.map((call, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="relative"
                >
                  {/* Dot on line */}
                  <div
                    className="absolute -left-[22px] top-1.5 w-3 h-3 rounded-full"
                    style={{ background: call.afterHours ? "#FA982F" : "#8B5CF6" }}
                  />
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-montserrat text-sm font-bold text-gray-800">{call.time}</span>
                      <span className="font-inter text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: call.afterHours ? "#FFF7ED" : "#F3E8FF",
                          color: call.afterHours ? "#FA982F" : "#8B5CF6"
                        }}>
                        {call.speed}
                      </span>
                    </div>
                    <p className="font-inter text-sm text-gray-500 mt-1">{call.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 gap-4 max-w-[700px] mx-auto"
        >
          <div className="rounded-xl p-5 text-center border border-red-100 bg-red-50/50">
            <PhoneOff className="w-6 h-6 text-red-400 mx-auto mb-2" />
            <p className="font-montserrat text-sm font-bold text-red-500 mb-1">Your Phone</p>
            <p className="font-inter text-xs text-red-400">4 of 6 go to voicemail</p>
          </div>
          <div className="rounded-xl p-5 text-center border border-green-100 bg-green-50/50">
            <PhoneCall className="w-6 h-6 mx-auto mb-2" style={{ color: "#2E7D32" }} />
            <p className="font-montserrat text-sm font-bold mb-1" style={{ color: "#2E7D32" }}>ShiFt AI</p>
            <p className="font-inter text-xs text-green-600">6 of 6 answered instantly</p>
          </div>
        </motion.div>

        {/* Supporting stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-3 gap-4 mt-12 max-w-[800px] mx-auto"
        >
          {[
            { num: "847", label: "After-hours calls answered" },
            { num: "312", label: "Weekend calls answered" },
            { num: "$2.4M", label: "Pipeline generated" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <p className="font-montserrat text-2xl md:text-3xl font-extrabold" style={{ color: "#0D0F33" }}>{s.num}</p>
              <p className="font-inter text-xs md:text-sm text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}