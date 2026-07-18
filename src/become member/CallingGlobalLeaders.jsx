

import React from "react";
import {
  Landmark,
  Globe2,
  Megaphone,
  GraduationCap,
  Briefcase,
  Building2,
  Newspaper,
  Rocket,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const roles = [
  { label: "Policymakers", icon: Landmark },
  { label: "Diplomats", icon: Globe2 },
  { label: "Activists", icon: Megaphone },
  { label: "Educationists", icon: GraduationCap },
  { label: "Bureaucrats", icon: Briefcase },
  { label: "Business Leaders", icon: Building2 },
  { label: "Journalists", icon: Newspaper },
  { label: "Startup Founders", icon: Rocket },
];

const CallingGlobalLeaders = () => {
  return (
    <section className="relative bg-[#FAFBFF] py-20 md:py-28 overflow-hidden">
      {/* === TEXTURED BACKGROUND LAYERS === */}
      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.25] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(#4D6AE8 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      {/* Diagonal line texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #1A1F36 0, #1A1F36 1px, transparent 1px, transparent 12px)",
        }}
      />
      {/* Noise / grain overlay via SVG */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.5] mix-blend-overlay pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" opacity="0.35" />
      </svg>

      {/* Ambient background accents */}
      <div className="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#4D6AE8]/15 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[380px] h-[380px] bg-gradient-to-tr from-[#4D6AE8]/10 to-transparent blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-5">
        {/* Eyebrow + Heading */}
        <div className="text-center mb-20">
          <span className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-[0.25em] text-[#4D6AE8] uppercase mb-5 bg-white/70 backdrop-blur-sm px-5 py-2 rounded-full ring-1 ring-[#4D6AE8]/15 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            World Leaders Consortium
            <Sparkles className="w-3.5 h-3.5" />
          </span>
          <h2 className="text-[#1A1F36] text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wide leading-tight">
            WLC Calling{" "}
            <span className="relative inline-block text-[#4D6AE8]">
              Global Leaders
              <svg
                className="absolute left-0 -bottom-2 w-full h-3"
                viewBox="0 0 400 12"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 9C80 2 320 2 398 9"
                  stroke="#4D6AE8"
                  strokeWidth="4"
                  strokeLinecap="butt"
                  fill="none"
                  opacity="0.35"
                />
              </svg>
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-16 lg:gap-24 items-start">
          {/* === LEFT: Framed image with floating badges === */}
          <div className="relative flex justify-center lg:justify-start lg:sticky lg:top-24">
            {/* Decorative offset frame */}
            <div className="absolute -inset-5 border-2 border-[#4D6AE8]/25 -z-10 -translate-x-3 translate-y-3" />
            {/* Corner accents */}
            <div className="absolute -top-3 -left-3 w-10 h-10 border-t-4 border-l-4 border-[#4D6AE8] -z-10" />
            <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-4 border-r-4 border-[#4D6AE8] -z-10" />

            <div className="relative w-full max-w-[440px] overflow-hidden shadow-2xl ring-1 ring-black/5 group">
              <img
                src="https://img1.wsimg.com/isteam/ip/b6c56996-d063-4e20-930c-1d8a40821864/1000410232.png/:/cr=t:23.13%25,l:13.96%25,w:66.67%25,h:66.67%25/rs=w:800,cg:true,m"
                alt="WLC"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F36]/50 via-[#1A1F36]/10 to-transparent" />
              <div
                className="absolute inset-0 opacity-40 mix-blend-overlay"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, transparent 0, transparent 3px, rgba(255,255,255,0.05) 3px, rgba(255,255,255,0.05) 4px)",
                }}
              />

              {/* Top-left mini tag */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 text-[10px] font-bold tracking-[0.2em] text-[#4D6AE8] uppercase">
                • Live Consortium
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-7 -right-2 sm:right-2 lg:-right-8 bg-white shadow-xl ring-1 ring-black/5 px-6 py-5 flex items-center gap-4">
              <div className="w-12 h-12 bg-[#4D6AE8] flex items-center justify-center shrink-0 relative overflow-hidden">
                <Globe2 className="w-6 h-6 text-white relative z-10" />
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 30% 30%, white 1px, transparent 1px)",
                    backgroundSize: "6px 6px",
                  }}
                />
              </div>
              <div className="leading-tight">
                <p className="text-base font-bold text-[#1A1F36]">
                  Global Network
                </p>
                <p className="text-xs text-gray-500">Chapters worldwide</p>
              </div>
            </div>
          </div>

          {/* === RIGHT: Content === */}
          <div className="text-center lg:text-left relative">
            <h3 className="text-xl md:text-2xl font-semibold text-[#1A1F36] mb-7 relative inline-block">
              Become part of an inspiring community of:
              <span className="hidden lg:block absolute -left-6 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#4D6AE8]" />
            </h3>

            {/* Role chips grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3 mb-10">
              {roles.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="group relative flex items-center gap-2.5 bg-white hover:bg-[#4D6AE8] px-4 py-3.5 text-left transition-all duration-300 ring-1 ring-[#4D6AE8]/15 hover:ring-[#4D6AE8] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#4D6AE8]/20 overflow-hidden"
                >
                  {/* subtle pattern inside chip */}
                  <div
                    className="absolute inset-0 opacity-[0.05] group-hover:opacity-10 transition-opacity"
                    style={{
                      backgroundImage:
                        "radial-gradient(#4D6AE8 1px, transparent 1px)",
                      backgroundSize: "10px 10px",
                    }}
                  />
                  <div className="w-7 h-7 flex items-center justify-center bg-[#4D6AE8]/10 group-hover:bg-white/20 transition-colors shrink-0 relative z-10">
                    <Icon className="w-4 h-4 text-[#4D6AE8] group-hover:text-white transition-colors duration-200" />
                  </div>
                  <span className="text-sm font-medium text-gray-800 group-hover:text-white transition-colors duration-200 relative z-10">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <div className="relative bg-white/60 backdrop-blur-sm p-6 md:p-7 border-l-4 border-[#4D6AE8] ring-1 ring-black/5 shadow-sm">
              <p className="text-base md:text-lg leading-8 text-gray-600 max-w-2xl mx-auto lg:mx-0">
                We are inviting visionary leaders to join the World Leaders
                Consortium as Chapter Heads, Chapter Ambassador, Council
                Member, Convenor, Youth Ambassador, Patron & Member for
                various chapters worldwide. Lead the charge in addressing
                critical global challenges and shaping a better future.
                Let's Build a Connected and Influential World, Together.
              </p>
            </div>

            <a
              href="https://drive.google.com/file/d/1ZZIq82JN112FsT84AAkrCX-7eLXUNbyh/view"
              className="group relative inline-flex items-center gap-2 mt-9 bg-[#4D6AE8] text-white text-base md:text-lg font-medium px-7 py-4 shadow-lg shadow-[#4D6AE8]/25 hover:bg-[#3d57d1] hover:shadow-xl hover:shadow-[#4D6AE8]/40 hover:-translate-y-0.5 transition-all overflow-hidden"
            >
              {/* button texture */}
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, transparent 0, transparent 6px, rgba(255,255,255,0.15) 6px, rgba(255,255,255,0.15) 7px)",
                }}
              />
              <span className="relative z-10">WLC Regional Leadership Structure</span>
              <ArrowUpRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallingGlobalLeaders;