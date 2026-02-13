import React, { useRef, useState } from "react";
import recordingMain from "@/assets/audio/recording.wav";
import recordingEmergency from "@/assets/audio/recording1.wav";
import recordingBooking from "@/assets/audio/recording2.wav";
import roofingImage from "@/assets/audio/man-working-roof-medium-shot.jpg";
import emergencyImage from "@/assets/audio/engineer-writing-condenser-values.jpg";
import bookingImage from "@/assets/audio/calendar-agenda-event-meeting-reminder-schedule-graphic-concept.jpg";

const testimonials = [
  {
    id: "roofing",
    title: "Homeowner inquiry - Roof leak",
    image: roofingImage,
    video: recordingMain,
  },
  {
    id: "plumbing",
    title: "After-hours emergency call",
    image: emergencyImage,
    video: recordingEmergency,
  },
  {
    id: "medspa",
    title: "Appointment booking flow",
    image: bookingImage,
    video: recordingBooking,
  },
];

export default function TestimonialsSection() {
  const mediaRefs = useRef({});
  const [activeId, setActiveId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  const togglePlay = (id) => {
    const video = mediaRefs.current[id];
    if (!video) return;

    if (video.paused) {
      Object.values(mediaRefs.current).forEach((v) => {
        if (v && v !== video) {
          v.pause();
          v.currentTime = 0;
        }
      });

      video.play();
      setActiveId(id);
    } else {
      video.pause();
      setActiveId(null);
    }
  };

  return (
    <section className="py-10 md:py-18 bg-[#F2F4F8]">
      <div className="max-w-[1200px] mx-auto px-6">

        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#0d0f33] mb-12 leading-tight">
          Advanced AI Receptionist <br />
          for Seamless Customer Communication
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item) => {
            const isPlaying = activeId === item.id;
            const isHovered = hoveredId === item.id;

            return (
              <article key={item.id}>
                <div className="relative rounded-lg overflow-hidden shadow-xl p-6 bg-white">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-[350px] object-cover rounded-md mb-4"
                  />

                  <audio
                    ref={(el) => (mediaRefs.current[item.id] = el)}
                    src={item.video}
                    controls
                    className="w-full"
                    onPlay={() => {
                      Object.values(mediaRefs.current).forEach((a) => {
                        if (a && a !== mediaRefs.current[item.id]) {
                          a.pause();
                          a.currentTime = 0;
                        }
                      });
                      setActiveId(item.id);
                    }}
                    onPause={() => setActiveId(null)}
                    onEnded={() => setActiveId(null)}
                  />
                </div>
                <h3 className="text-center text-xl md:text-2xl  font-extrabold text-[#fa982f] mt-4">
                  {item.title}
                </h3>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { TestimonialsSection };

