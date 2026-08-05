

import React, { useState } from "react";
import {
  Sparkles,
  Users,
  Heart,
  Briefcase,
  Cpu,
  GraduationCap,
  Globe2,
  Venus,
  Landmark,
  Leaf,
  Scale,
  ArrowUpRight,
} from "lucide-react";
import img from '../../public/image/ca2.webp'

/* ====== DATA ====== */
const councils = [
  {
    id: 1,
    icon: Users,
    title: "Council on Youth Leadership & Innovation",
    description:
      "A platform for young changemakers to co-create global solutions and empower future-ready leadership.",
  },
  {
    id: 2,
    icon: Heart,
    title: "Council on Health, Mental Wellbeing & Public Policy",
    description:
      "Advocating universal healthcare, mental health awareness, and equitable public health strategies.",
  },
  {
    id: 3,
    icon: Briefcase,
    title: "Council on Entrepreneurship & Business Strategy",
    description:
      "Supporting sustainable businesses, startups, investment policies, and cross-border collaboration.",
  },
  {
    id: 4,
    icon: Cpu,
    title: "Council on Digital Transformation & AI Governance",
    description:
      "Exploring ethical tech, AI for good, cybersecurity, and inclusive digital futures.",
  },
  {
    id: 5,
    icon: GraduationCap,
    title: "Council on Education & Skill Development",
    description:
      "Transforming education systems through innovation, technology, and inclusive learning models for the 21st century.",
  },
  {
    id: 6,
    icon: Globe2,
    title: "Council on Global Diplomacy & Peacebuilding",
    description:
      "Advocating peaceful resolutions, international cooperation, and conflict transformation across borders.",
  },
  {
    id: 7,
    icon: Venus,
    title: "Council on Women & Gender Equality",
    description:
      "Promoting women's leadership, safety, financial independence, and equal opportunities worldwide.",
  },
  {
    id: 8,
    icon: Landmark,
    title: "Council on Indigenous Voices & Cultural Heritage",
    description:
      "Celebrating native wisdom, preserving cultural identities, and ensuring representation in global forums.",
  },
  {
    id: 9,
    icon: Leaf,
    title: "Council on Climate Action & Sustainability",
    description:
      "Addressing climate change, renewable energy, environment conservation, and sustainability aligned with UN SDGs.",
  },
  {
    id: 10,
    icon: Scale,
    title: "Council on Human Rights & Social Justice",
    description:
      "Advancing justice, equity, and human dignity across race, caste, creed, and nationality.",
  },
];

export default function OurCouncils() {
  const [activeId, setActiveId] = useState(1);

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-[#F5F7FF] via-white to-[#EEF1FF]">
      {/* ===== TEXTURED + GRADIENT BACKGROUND ===== */}
      <div
        className="absolute inset-0 opacity-[0.25] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#4F6EF7 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #1A1F36 0, #1A1F36 1px, transparent 1px, transparent 14px)",
        }}
      />
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.4] mix-blend-overlay pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noiseOC">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseOC)" opacity="0.35" />
      </svg>
      <div className="pointer-events-none absolute -top-24 -right-24 w-[600px] h-[600px] bg-gradient-to-br from-[#4F6EF7]/25 via-[#4F6EF7]/10 to-transparent rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 w-[500px] h-[500px] bg-gradient-to-tr from-[#4F6EF7]/20 via-purple-300/10 to-transparent rounded-full blur-3xl" />

      {/* Huge background wordmark */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-[160px] md:text-[300px] font-black text-[#4F6EF7]/[0.035] leading-none pointer-events-none select-none whitespace-nowrap tracking-tighter">
        COUNCILS
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
        {/* ===== HEADING ===== */}
        <div className="text-center mb-14 md:mb-20">
          <span className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-[0.25em] text-[#4F6EF7] uppercase mb-5 bg-white/70 backdrop-blur-sm px-5 py-2  ring-1 ring-[#4F6EF7]/15 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            10 Global Think Tanks
            <Sparkles className="w-3.5 h-3.5" />
          </span>
          <h1 className="font-black uppercase tracking-wide text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
            <span className="text-[#1A1F36]">Our </span>
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#4F6EF7] via-[#6d85f9] to-[#4F6EF7] bg-clip-text text-transparent">
                Councils
              </span>
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
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto mt-6">
            Ten specialised councils driving strategy, dialogue and impact
            across the world's most pressing issues.
          </p>
        </div>

        {/* ===== MAIN GRID ===== */}
        <div className="grid lg:grid-cols-[440px_1fr] gap-12 lg:gap-16 items-start">
          {/* ===== LEFT: Sticky image + active council preview ===== */}
          <div className="lg:sticky lg:top-10">
            <div className="relative">
              {/* Offset gradient frame */}
              <div className="absolute -inset-5 bg-gradient-to-br from-[#4F6EF7]/40 via-transparent to-[#4F6EF7]/20 -z-10 -translate-x-4 translate-y-4 blur-sm" />
              {/* Corner brackets */}
              <div className="absolute -top-3 -left-3 w-12 h-12 border-t-4 border-l-4 border-[#4F6EF7] z-10" />
              <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-4 border-r-4 border-[#4F6EF7] z-10" />

              {/* Image */}
              <div className="relative overflow-hidden shadow-2xl ring-1 ring-black/10">
                <img
                  src={img}
                  alt="World Leaders Consortium Councils"
                  className="w-full h-[320px] object-cover"
                />
                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F36]/85 via-[#1A1F36]/30 to-transparent" />
                <div
                  className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(135deg, transparent 0, transparent 3px, rgba(255,255,255,0.08) 3px, rgba(255,255,255,0.08) 4px)",
                  }}
                />

               
              </div>
            </div>

           

          
          </div>

          {/* ===== RIGHT: Councils list ===== */}
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-6 top-2 bottom-2 w-px bg-gradient-to-b from-[#4F6EF7]/0 via-[#4F6EF7]/40 to-[#4F6EF7]/0 hidden md:block" />

            <div className="space-y-4">
              {councils.map((c, idx) => {
                const Icon = c.icon;
                const isActive = activeId === c.id;
                return (
                  <div
                    key={c.id}
                    onMouseEnter={() => setActiveId(c.id)}
                    onClick={() => setActiveId(c.id)}
                    className={`group relative flex items-start gap-4 md:gap-6 cursor-pointer transition-all duration-300 ${
                      isActive ? "lg:translate-x-1" : ""
                    }`}
                  >
                    {/* Number badge */}
                    <div
                      className={`relative shrink-0 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center font-black text-lg z-10 transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-br from-[#4F6EF7] to-[#3d57d1] text-white shadow-lg shadow-[#4F6EF7]/30"
                          : "bg-white text-[#1A1F36] ring-1 ring-[#4F6EF7]/20 group-hover:ring-[#4F6EF7]"
                      }`}
                    >
                      {String(idx + 1).padStart(2, "0")}
                      {/* Inner dot pattern when active */}
                      {isActive && (
                        <div
                          className="absolute inset-0 opacity-25"
                          style={{
                            backgroundImage:
                              "radial-gradient(circle at 30% 30%, white 1px, transparent 1px)",
                            backgroundSize: "6px 6px",
                          }}
                        />
                      )}
                    </div>

                    {/* Card content */}
                    <div
                      className={`relative flex-1 bg-white/80 backdrop-blur-sm p-5 md:p-6 ring-1 shadow-sm overflow-hidden transition-all duration-300 ${
                        isActive
                          ? "ring-[#4F6EF7]/30 shadow-xl shadow-[#4F6EF7]/10"
                          : "ring-black/5 group-hover:shadow-lg group-hover:shadow-[#4F6EF7]/10 group-hover:ring-[#4F6EF7]/20"
                      }`}
                    >
                      {/* Left accent bar */}
                      <div
                        className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 ${
                          isActive
                            ? "bg-gradient-to-b from-[#4F6EF7] to-[#3d57d1]"
                            : "bg-[#4F6EF7]/20"
                        }`}
                      />
                      {/* Inner pattern */}
                      <div
                        className="absolute inset-0 opacity-[0.04] pointer-events-none"
                        style={{
                          backgroundImage:
                            "radial-gradient(#4F6EF7 1px, transparent 1px)",
                          backgroundSize: "14px 14px",
                        }}
                      />

                      <div className="relative flex items-start gap-4">
                        {/* Icon */}
                        <div
                          className={`w-10 h-10 flex items-center justify-center shrink-0 transition-all duration-300 ${
                            isActive
                              ? "bg-[#4F6EF7] text-white"
                              : "bg-[#4F6EF7]/10 text-[#4F6EF7] group-hover:bg-[#4F6EF7] group-hover:text-white"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-[#4F6EF7] uppercase mb-2">
                            <span>Council</span>
                            <span className="w-4 h-px bg-[#4F6EF7]/40" />
                            <span>Global</span>
                          </div>
                          <h2 className="text-lg sm:text-xl font-bold text-[#1A1F36] mb-2 leading-snug">
                            {c.title}
                          </h2>
                          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                            {c.description}
                          </p>

                          {/* Arrow revealed on active */}
                          <div
                            className={`flex items-center gap-2 mt-3 text-[#4F6EF7] text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                              isActive
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 -translate-x-2 h-0 overflow-hidden"
                            }`}
                          >
                            Learn More
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}