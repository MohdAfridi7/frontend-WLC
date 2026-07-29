

import React from "react";
import {
  Users,
  Globe2,
  Lightbulb,
  Sparkles,
  ArrowUpRight,
  Target,
  Network,
  Handshake,
} from "lucide-react";
import img from '../../public/image/ha13.jpg'

export default function CouncilsSection() {
  const stats = [
    { icon: Globe2, value: "70+", label: "Countries" },
    { icon: Users, value: "500+", label: "Experts" },
    { icon: Network, value: "12", label: "Councils" },
  ];

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-[#F5F7FF] via-white to-[#EEF1FF]">
      {/* ===== TEXTURED + GRADIENT BACKGROUND ===== */}
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.25] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#4F6EF7 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      {/* Diagonal hatch */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #1A1F36 0, #1A1F36 1px, transparent 1px, transparent 14px)",
        }}
      />
      {/* Grain */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.4] mix-blend-overlay pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noiseC">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseC)" opacity="0.35" />
      </svg>
      {/* Colored gradient blobs */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-[600px] h-[600px] bg-gradient-to-br from-[#4F6EF7]/25 via-[#4F6EF7]/10 to-transparent rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 w-[500px] h-[500px] bg-gradient-to-tr from-[#4F6EF7]/20 via-purple-300/10 to-transparent rounded-full blur-3xl" />

      {/* Huge background wordmark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[160px] md:text-[280px] font-black text-[#4F6EF7]/[0.035] leading-none pointer-events-none select-none whitespace-nowrap tracking-tighter">
        COUNCILS
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
        {/* ===== HEADING BLOCK ===== */}
        <div className="text-center mb-14 md:mb-20">
          <span className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-[0.25em] text-[#4F6EF7] uppercase mb-5 bg-white/70 backdrop-blur-sm px-5 py-2  ring-1 ring-[#4F6EF7]/15 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Global Governance
            <Sparkles className="w-3.5 h-3.5" />
          </span>
          <h1 className="font-black uppercase tracking-wide text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
            <span className="bg-gradient-to-r from-[#4F6EF7] via-[#6d85f9] to-[#4F6EF7] bg-clip-text text-transparent">
              Councils
            </span>{" "}
            <span className="text-[#1A1F36]">of the</span>
            <br />
            <span className="text-[#1A1F36]">World Leaders</span>{" "}
            <span className="relative inline-block text-[#4F6EF7]">
              Consortium
              <svg
                className="absolute left-0 -bottom-2 w-full h-3"
                viewBox="0 0 400 12"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 9C80 2 320 2 398 9"
                  stroke="#4F6EF7"
                  strokeWidth="4"
                  fill="none"
                  opacity="0.35"
                />
              </svg>
            </span>
          </h1>
        </div>

        {/* ===== MAIN GRID ===== */}
        <div className="grid lg:grid-cols-[500px_1fr] gap-14 lg:gap-16 items-start">
          {/* ===== LEFT: Image + stats stack ===== */}
          <div className="relative">
            {/* Offset gradient frame */}
            <div className="absolute -inset-5 bg-gradient-to-br from-[#4F6EF7]/40 via-transparent to-[#4F6EF7]/20 -z-10 -translate-x-4 translate-y-4 blur-sm" />
            {/* Corner brackets */}
            <div className="absolute -top-3 -left-3 w-12 h-12 border-t-4 border-l-4 border-[#4F6EF7] z-10" />
            <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-4 border-r-4 border-[#4F6EF7] z-10" />

            {/* Image card */}
            <div className="relative overflow-hidden shadow-2xl ring-1 ring-black/10 group">
              <img
                src={img}
                alt="World Leaders Consortium Councils"
                className="w-full h-[300px] md:h-[380px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F36]/70 via-[#1A1F36]/10 to-transparent" />
              {/* Diagonal stripes */}
              <div
                className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, transparent 0, transparent 3px, rgba(255,255,255,0.08) 3px, rgba(255,255,255,0.08) 4px)",
                }}
              />

              {/* Top tag */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 shadow flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#4F6EF7]" />
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#4F6EF7] uppercase">
                  Think Tanks
                </span>
              </div>

              {/* Bottom overlay content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white/80 text-[10px] font-bold tracking-[0.25em] uppercase mb-1">
                  WLC Global Councils
                </p>
                <h3 className="text-white text-xl font-bold leading-tight">
                  70+ Countries. One Mission.
                </h3>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              {stats.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="relative bg-white ring-1 ring-black/5 shadow-sm px-3 py-4 text-center overflow-hidden group hover:shadow-lg hover:shadow-[#4F6EF7]/15 hover:-translate-y-0.5 transition-all"
                >
                  <div
                    className="absolute inset-0 opacity-[0.05] group-hover:opacity-10 transition-opacity"
                    style={{
                      backgroundImage:
                        "radial-gradient(#4F6EF7 1px, transparent 1px)",
                      backgroundSize: "10px 10px",
                    }}
                  />
                  <div className="relative">
                    <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-br from-[#4F6EF7] to-[#3d57d1] flex items-center justify-center">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-[#1A1F36] font-black text-xl leading-none">
                      {value}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mt-1">
                      {label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ===== RIGHT: Content ===== */}
          <div>
            {/* Card 1 */}
            <div className="relative bg-white/80 backdrop-blur-sm ring-1 ring-black/5 shadow-lg p-7 md:p-8 mb-6 group hover:shadow-xl hover:shadow-[#4F6EF7]/10 transition-shadow overflow-hidden">
              {/* Left gradient bar */}
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#4F6EF7] to-[#3d57d1]" />
              {/* Inner subtle pattern */}
              <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(#4F6EF7 1px, transparent 1px)",
                  backgroundSize: "14px 14px",
                }}
              />

              <div className="relative flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#4F6EF7] to-[#3d57d1] flex items-center justify-center shrink-0 shadow-md shadow-[#4F6EF7]/25">
                  <Handshake className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-[#4F6EF7] uppercase mb-2">
                    <span>01</span>
                    <span className="w-6 h-px bg-[#4F6EF7]/40" />
                    <span>Mission</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-[#1A1F36] mb-4 leading-snug">
                    Empowering Action through Expertise &amp; Collaboration
                  </h2>
                  <p className="text-gray-600 text-base leading-8">
                    The World Leaders Consortium (WLC) is proud to announce the
                    formation of specialized Global Councils—each designed to
                    foster collaboration, innovation, and impact around the
                    world's most pressing issues. These councils bring together
                    distinguished experts, policymakers, diplomats,
                    entrepreneurs, educators, activists, and thought leaders
                    from over{" "}
                    <span className="font-bold text-[#4F6EF7]">
                      70+ countries
                    </span>{" "}
                    under one umbrella.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative bg-gradient-to-br from-[#1A1F36] to-[#2a3560] ring-1 ring-white/10 shadow-xl p-7 md:p-8 overflow-hidden">
              {/* Textures inside dark card */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(#4F6EF7 1.5px, transparent 1.5px)",
                  backgroundSize: "20px 20px",
                }}
              />
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, transparent 0, transparent 10px, rgba(79,110,247,0.15) 10px, rgba(79,110,247,0.15) 11px)",
                }}
              />

              <div className="relative flex items-start gap-4">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm ring-1 ring-white/20 flex items-center justify-center shrink-0">
                  <Target className="w-6 h-6 text-[#4F6EF7]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-[#4F6EF7] uppercase mb-2">
                    <span>02</span>
                    <span className="w-6 h-px bg-[#4F6EF7]/60" />
                    <span>Vision</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-4 leading-snug">
                    Why Global Councils?
                  </h2>
                  <p className="text-gray-300 text-base leading-8">
                    Our councils act as{" "}
                    <span className="font-bold text-[#4F6EF7]">
                      dedicated think-tanks and action groups
                    </span>{" "}
                    within WLC. They help develop strategic solutions,
                    influence policy discourse, initiate collaborative
                    programs, and empower youth, communities, and governments
                    to achieve shared global goals.
                  </p>

                  {/* Feature pills */}
                  <div className="flex flex-wrap gap-2 mt-5">
                    {[
                      "Strategic Solutions",
                      "Policy Discourse",
                      "Collaborative Programs",
                      "Youth Empowerment",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm ring-1 ring-white/15 text-white text-[11px] font-semibold px-3 py-1.5 hover:bg-[#4F6EF7] hover:ring-[#4F6EF7] transition-colors cursor-default"
                      >
                        <Lightbulb className="w-3 h-3 text-[#4F6EF7]" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA link */}
            <a
              href="#"
              className="group inline-flex items-center gap-2 mt-8 text-[#4F6EF7] font-bold uppercase tracking-[0.2em] text-sm hover:gap-3 transition-all"
            >
              Explore All Councils
              <span className="w-8 h-px bg-[#4F6EF7] group-hover:w-12 transition-all" />
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}