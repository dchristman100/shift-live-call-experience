import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, CheckCircle, Play, Pause, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRetellCall } from "@/hooks/useRetellCall";

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
      className="flex items-center gap-4 p-4 rounded-xl border-2 transition-colors"
      style={{ borderColor: "#1C2555", background: "#131B45" }}
    >
      <button
        onClick={toggle}
        className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
        style={{ background: playing ? "#2DD4A8" : "#131B45" }}
      >
        {playing
          ? <Pause className="w-4 h-4 text-white" />
          : <Play className="w-4 h-4" style={{ color: "#2DD4A8" }} />}
      </button>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">{label}</p>
        <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: "#0C1232" }}>
          <div
            className="h-full rounded-full transition-all duration-200"
            style={{ width: `${progress}%`, background: "#2DD4A8" }}
          />
        </div>
      </div>
      <span className="text-xs font-outfit flex-shrink-0" style={{ color: "#636D99" }}>{duration}</span>
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
  const { callStatus, startCall, hangUpCall, error } = useRetellCall();
  const [micStatus, setMicStatus] = useState("idle");
  const micStreamRef = useRef(null);
  const [showCall, setShowCall] = useState(false);
  const callLabel = (() => {
    if (micStatus === "checking") return "Checking microphone…";
    if (micStatus === "denied") return "Microphone access required";
    if (callStatus === "connecting") return "Connecting…";
    if (callStatus === "in_call") return "In Call";
    return "Ready";
  })();
  const endCallIfActive = () => {
    if (callStatus === "in_call" || callStatus === "connecting") {
      hangUpCall();
      stopMicrophone();
      setMicStatus("idle");
    }
  };
  const stopMicrophone = () => {
    if (!micStreamRef.current) return;

    micStreamRef.current.getTracks().forEach((track) => {
      track.stop();
    });

    micStreamRef.current = null;
  };
  useEffect(() => {
    if (
      !showCall &&
      (callStatus === "in_call" || callStatus === "connecting")
    ) {
      hangUpCall().finally(stopMicrophone);
    }
  }, [showCall]);
  useEffect(() => {
    return () => {
      stopMicrophone();
    };
  }, []);
  const checkMicrophonePermission = async () => {
    setMicStatus("checking");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      micStreamRef.current = stream;
      setMicStatus("granted");
      return true;
    } catch (err) {
      console.error("Mic permission denied", err);
      setMicStatus("denied");
      return false;
    }
  };
  const isCallActive =
    callStatus === "connecting" || callStatus === "in_call";


  return (
    <section id="live-demo" className="py-20 md:py-28 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-plus-jakarta text-base italic text-center text-white mb-10 max-w-[680px] mx-auto"
          >
            You just saw the leaks. Now experience the fix. Call our AI right now — see how fast it answers, how it qualifies, and how it books.
          </motion.p>
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
                  <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: "#2DD4A8" }} />
                  <span className="font-plus-jakarta text-[17px]" style={{ color: "#04081A" }}>{b}</span>
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
            <div className="rounded-2xl border-2 p-6 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)]" style={{ background: "#0C1232", borderColor: "#1C2555" }}>
              {/* Click to Call */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ background: "#2DD4A8" }}>
                  <Phone className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-outfit text-xl font-bold text-white mb-1">Call Our AI Now</h3>
                <p className="text-sm font-plus-jakarta mb-1" style={{ color: "#B8C0E0" }}>Experience a live demo call</p>
                <p className="font-outfit text-lg font-bold" style={{ color: "#2DD4A8" }}>
                  (855) 744-3824
                </p>
              </div>

              <Button
                disabled={isCallActive}
                onClick={async () => {
                  const allowed = await checkMicrophonePermission();
                  if (!allowed) return;

                  setShowCall(true);

                  if (!isCallActive) {
                    await startCall();
                  }
                }}
                className="w-full h-14 text-base font-outfit font-bold rounded-xl transition-all hover:scale-[1.02]"
                style={{
                  background: isCallActive ? "#E5E5E5" : "#FF5252",
                  color: isCallActive ? "#888888" : "white",
                  cursor: isCallActive ? "not-allowed" : "pointer",
                }}
              >
                {isCallActive ? "CALL IN PROGRESS…" : "Start Demo Call →"}
              </Button>
              
              {showCall && (
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-3xl mx-auto mt-4">
              {/* Top banner */}
              <div className="bg-orange-50 text-orange-600 text-center py-3 rounded-md mb-6">
                Questions? We're live
              </div>

              {/* Status */}
              <div className="bg-gray-100 rounded-lg py-6 text-center mb-6">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <span className="w-2 h-2 rounded-full bg-orange-500" />
                  {callLabel}
                </span>
              </div>

              {/* Mic denied warning */}
              {micStatus === "denied" && (
                <div className="text-center text-red-500 mb-4">
                  Please allow microphone access to start the call.
                </div>
              )}

              {/* Hang up */}
              {(callStatus === "in_call" || callStatus === "connecting") && (
                <button
                  onClick={async () => {
                    await hangUpCall();
                    stopMicrophone();
                    setShowCall(false);
                    setMicStatus("idle");
                  }}
                  className="w-full py-4 bg-red-500 text-white font-semibold rounded-xl"
                >
                  🔴 Hang Up Call
                </button>
              )}
            </div>
          )}  
              {/* Divider */}
              <div className="flex items-center gap-4 my-8">
                <div className="flex-1 h-px" style={{ background: "#1C2555" }} />
                <span className="text-xs font-outfit uppercase tracking-wider" style={{ color: "#636D99" }}>Or listen to real calls</span>
                <div className="flex-1 h-px" style={{ background: "#1C2555" }} />
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