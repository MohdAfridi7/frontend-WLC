import React from "react";
import { Play, Sparkles, ArrowRight, Globe2, Mic2, Lightbulb } from "lucide-react";

export default function GlobalDialogues() {
  const scrollToContact = () => {
    const el = document.getElementById("contact-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const topics = [
    { icon: Globe2, label: "UN SDGs" },
    { icon: Lightbulb, label: "Innovation" },
    { icon: Mic2, label: "Diplomacy" },
  ];

  return (
    <section className="relative bg-[#F5F7FF] py-20 md:py-28 overflow-hidden">
      {/* ===== TEXTURED BACKGROUND ===== */}
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.25] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#4D6AE8 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      {/* Diagonal lines */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #1A1F36 0, #1A1F36 1px, transparent 1px, transparent 14px)",
        }}
      />
      {/* Grainy noise */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.4] mix-blend-overlay pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noiseGD">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseGD)" opacity="0.35" />
      </svg>
      {/* Ambient glows */}
      <div className="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#4D6AE8]/15 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[420px] h-[420px] bg-gradient-to-tr from-[#4D6AE8]/10 to-transparent blur-3xl" />

      {/* Giant background typography */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[220px] md:text-[380px] font-black text-[#4D6AE8]/[0.03] leading-none pointer-events-none select-none whitespace-nowrap tracking-tighter">
        DIALOGUES
      </div>

      <div className="relative max-w-7xl mx-auto px-5">
        <div className="grid lg:grid-cols-[420px_1fr] gap-14 lg:gap-20 items-center">
          {/* ===== LEFT: Video block with dramatic frame ===== */}
          <div className="relative flex justify-center lg:justify-start">
            {/* Offset accent frame */}
            <div className="absolute -inset-5 border-2 border-[#4D6AE8]/30 -z-10 -translate-x-4 translate-y-4" />
            {/* Corner brackets */}
            <div className="absolute -top-3 -left-3 w-12 h-12 border-t-4 border-l-4 border-[#4D6AE8] z-10" />
            <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-4 border-r-4 border-[#4D6AE8] z-10" />

            {/* Vertical label */}
            <div className="hidden lg:block absolute -left-16 top-1/2 -translate-y-1/2 -rotate-90 origin-center">
              <div className="flex items-center gap-3 text-[#4D6AE8] text-[10px] font-bold tracking-[0.4em] uppercase whitespace-nowrap">
                <span className="w-8 h-px bg-[#4D6AE8]" />
                Watch The Trailer
                <span className="w-8 h-px bg-[#4D6AE8]" />
              </div>
            </div>

            {/* Video card */}
            <div className="relative w-full max-w-[380px] shadow-2xl ring-1 ring-black/10 bg-[#1A1F36] group">
             

              {/* Vimeo portrait */}
              <div className="relative w-full" style={{ paddingTop: "177.77%" }}>
                <iframe
                  title="vimeo-player"
                  src="https://player.vimeo.com/video/1083209589?h=df6f25db18"
                  className="absolute top-0 left-0 w-full h-full"
                  frameBorder="0"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* Floating stat badge */}
            
          </div>

          {/* ===== RIGHT: Content ===== */}
          <div className="text-center lg:text-left">
            {/* Eyebrow pill */}
            <span className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-[0.25em] text-[#4D6AE8] uppercase mb-6 bg-white/70 backdrop-blur-sm px-5 py-2  ring-1 ring-[#4D6AE8]/15 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              The World Leaders Consortium presents
              <Sparkles className="w-3.5 h-3.5" />
            </span>

            {/* Main heading */}
            <h1 className="text-[#1A1F36] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-[1.05] mb-6">
              Global Dialogues:{" "}
              <span className="relative inline-block text-[#4D6AE8]">
                Conversations
                <svg
                  className="absolute left-0 -bottom-2 w-full h-3"
                  viewBox="0 0 400 12"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 9C80 2 320 2 398 9"
                    stroke="#4D6AE8"
                    strokeWidth="4"
                    fill="none"
                    opacity="0.35"
                  />
                </svg>
              </span>{" "}
              That Shape The World
            </h1>

            {/* Divider with dots */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
              <div className="w-12 h-1 bg-[#4D6AE8]" />
              <div className="w-2 h-2 bg-[#4D6AE8]/60 rounded-full" />
              <div className="w-1 h-1 bg-[#4D6AE8]/30 rounded-full" />
            </div>

            {/* First paragraph */}
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-5 font-medium">
              A transformative platform where visionary leaders unite to spark
              bold ideas and address the challenges that define our era.
            </p>

            {/* Quote card */}
            <div className="relative bg-white/70 backdrop-blur-sm p-6 md:p-7 border-l-4 border-[#4D6AE8] ring-1 ring-black/5 shadow-sm mb-8">
              {/* Inner pattern */}
              <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(#4D6AE8 1px, transparent 1px)",
                  backgroundSize: "14px 14px",
                }}
              />
              <p className="relative text-gray-600 text-base sm:text-lg leading-relaxed">
                From advancing the UN (SDGs) to shaping the future of global
                economies, education and empowerment, innovation and
                technology, art and culture, and diplomacy and governance —{" "}
                <span className="italic font-bold text-[#4D6AE8] underline decoration-2 underline-offset-4">
                  your voice matters.
                </span>
              </p>
            </div>

            

            {/* CTA button */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={scrollToContact}
                className="group relative bg-[#4D6AE8] hover:bg-[#3d57d1] text-white font-bold tracking-[0.2em] px-8 py-4 shadow-lg shadow-[#4D6AE8]/25 hover:shadow-xl hover:shadow-[#4D6AE8]/40 hover:-translate-y-0.5 transition-all inline-flex items-center gap-2.5 overflow-hidden text-sm sm:text-base"
              >
                {/* button texture */}
                <div
                  className="absolute inset-0 opacity-15"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, transparent 0, transparent 6px, rgba(255,255,255,0.15) 6px, rgba(255,255,255,0.15) 7px)",
                  }}
                />
                <span className="relative z-10">REGISTER NOW</span>
                <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
              </button>

             
            </div>
          </div>
        </div>
      </div>

      {/* Contact anchor */}
      <div id="contact-section" className="mt-24 scroll-mt-10" />
    </section>
  );
}