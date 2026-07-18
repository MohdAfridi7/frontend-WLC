import React from "react";
import {
  Sparkles,
  TrendingUp,
  Briefcase,
  Building2,
  Megaphone,
  ArrowUpRight,
  UserCheck,
  Users,
  GraduationCap,
  Award,
  Mail,
  FileText,
  CheckCircle2,
} from "lucide-react";

const councils = [
  {
    id: 1,
    icon: TrendingUp,
    title: "Council on Finance, Investment & Impact Capital",
    description:
      "Driving sustainable finance, ESG investment, financial inclusion, and impact-driven global economic growth.",
  },
  {
    id: 2,
    icon: Briefcase,
    title: "Council on Future of Work & Employment",
    description:
      "Shaping the evolving world of work through reskilling, digital transitions, decent work policies, and labour innovation.",
  },
  {
    id: 3,
    icon: Building2,
    title: "Council on Infrastructure, Urbanisation & Smart Cities",
    description:
      "Promoting sustainable urban growth, green infrastructure, mobility innovation, and resilient smart city development.",
  },
  {
    id: 4,
    icon: Megaphone,
    title: "Council on Media, Communications & Global Narrative",
    description:
      "Empowering ethical media leadership, global storytelling, and narrative diplomacy to build trust and informed societies.",
  },
];

const roles = [
  { icon: UserCheck, label: "Ambassador" },
  { icon: Users, label: "Council Member" },
  { icon: GraduationCap, label: "Youth Delegate" },
  { icon: Award, label: "Advisor / Fellow" },
];

const CouncilsContent = () => {
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
        <filter id="noiseCC">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseCC)" opacity="0.35" />
      </svg>
      <div className="pointer-events-none absolute -top-24 -right-24 w-[600px] h-[600px] bg-gradient-to-br from-[#4F6EF7]/25 via-[#4F6EF7]/10 to-transparent rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 w-[500px] h-[500px] bg-gradient-to-tr from-[#4F6EF7]/20 via-purple-300/10 to-transparent rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-5">
        {/* ===== HEADING ===== */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-[0.25em] text-[#4F6EF7] uppercase mb-5 bg-white/70 backdrop-blur-sm px-5 py-2  ring-1 ring-[#4F6EF7]/15 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            More Councils
            <Sparkles className="w-3.5 h-3.5" />
          </span>
          <h1 className="font-black uppercase tracking-wide text-3xl sm:text-4xl md:text-5xl leading-tight">
            <span className="text-[#1A1F36]">Expanding Our </span>
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#4F6EF7] via-[#6d85f9] to-[#4F6EF7] bg-clip-text text-transparent">
                Impact
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
        </div>

        {/* ===== 4 COUNCIL CARDS GRID ===== */}
        <div className="grid md:grid-cols-2 gap-5 mb-20">
          {councils.map((c, idx) => {
            const Icon = c.icon;
            return (
              <div
                key={c.id}
                className="group relative bg-white/80 backdrop-blur-sm p-7 ring-1 ring-black/5 shadow-md hover:shadow-2xl hover:shadow-[#4F6EF7]/15 hover:-translate-y-1 transition-all duration-500 overflow-hidden"
              >
                {/* Left accent bar */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#4F6EF7] to-[#3d57d1]" />
                {/* Inner dot pattern */}
                <div
                  className="absolute inset-0 opacity-[0.04] pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(#4F6EF7 1px, transparent 1px)",
                    backgroundSize: "14px 14px",
                  }}
                />
                {/* Watermark number */}
                <span className="absolute bottom-2 right-4 text-[80px] font-black text-[#4F6EF7]/[0.06] leading-none pointer-events-none select-none">
                  0{idx + 1}
                </span>

                <div className="relative">
                  {/* Icon + number */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#4F6EF7] to-[#3d57d1] flex items-center justify-center shadow-md shadow-[#4F6EF7]/25">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-[10px] font-bold tracking-[0.2em] text-[#4F6EF7] uppercase flex items-center gap-2">
                      <span className="w-6 h-px bg-[#4F6EF7]/40" />
                      Council 0{idx + 1}
                    </div>
                  </div>

                  <h2 className="text-lg md:text-xl font-bold text-[#1A1F36] mb-3 leading-snug">
                    {c.title}
                  </h2>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    <span className="font-semibold text-[#4F6EF7]">{c.title.replace("Council on ", "")}</span> — {c.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ===== GET INVOLVED PANEL ===== */}
        <div className="relative bg-gradient-to-br from-[#1A1F36] via-[#242c50] to-[#2a3560] p-8 md:p-12 shadow-2xl overflow-hidden">
          {/* Texture layers */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(#4F6EF7 1.5px, transparent 1.5px)",
              backgroundSize: "22px 22px",
            }}
          />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent 0, transparent 10px, rgba(79,110,247,0.12) 10px, rgba(79,110,247,0.12) 11px)",
            }}
          />
          <div className="absolute -top-24 -right-24 w-[400px] h-[400px] bg-gradient-to-br from-[#4F6EF7]/40 to-transparent rounded-full blur-3xl" />

          <div className="relative">
            {/* Eyebrow */}
            <span className="inline-flex items-center gap-2 text-[10px] md:text-xs font-bold tracking-[0.3em] text-[#4F6EF7] uppercase mb-4 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full ring-1 ring-white/10">
              <Sparkles className="w-3 h-3" />
              Join The Movement
            </span>

            <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-black uppercase leading-tight mb-5">
              Get{" "}
              <span className="text-[#4F6EF7]">Involved</span>
            </h2>

            <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-3xl mb-10">
              Are you a{" "}
              <span className="text-white font-semibold">
                subject expert, visionary, or changemaker
              </span>{" "}
              who wants to contribute to global dialogue and drive real change?
            </p>

            {/* Roles */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-px bg-[#4F6EF7]" />
                <h3 className="text-white text-lg md:text-xl font-bold uppercase tracking-wider">
                  Join a WLC Council as a:
                </h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {roles.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="group relative bg-white/5 backdrop-blur-sm ring-1 ring-white/10 hover:ring-[#4F6EF7] hover:bg-[#4F6EF7]/10 p-4 transition-all cursor-default overflow-hidden"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-[#4F6EF7]/20 group-hover:bg-[#4F6EF7] flex items-center justify-center transition-colors">
                        <Icon className="w-4 h-4 text-[#4F6EF7] group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">
                          {label}
                        </p>
                        <p className="text-gray-400 text-[10px] uppercase tracking-widest">
                          Role
                        </p>
                      </div>
                    </div>
                    <CheckCircle2 className="absolute top-2 right-2 w-3.5 h-3.5 text-[#4F6EF7] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>

            {/* Vision statement link */}
            <a
              href="https://drive.google.com/file/d/1I66FZUVpRDNEBPtO-lfHJyAr2lvjPQNg/view"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-white/10 hover:bg-white/15 backdrop-blur-sm ring-1 ring-white/15 hover:ring-[#4F6EF7] px-5 py-3.5 mb-10 transition-all"
            >
              <div className="w-9 h-9 bg-[#4F6EF7] flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold text-sm md:text-base underline decoration-[#4F6EF7] decoration-2 underline-offset-4">
                  WLC Global Councils Vision Statement
                </p>
                <p className="text-gray-400 text-[10px] uppercase tracking-widest mt-0.5">
                  PDF Document
                </p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-[#4F6EF7] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* Closing paragraph */}
            <div className="relative bg-white/5 backdrop-blur-sm ring-1 ring-white/10 p-6 md:p-8 border-l-4 border-[#4F6EF7]">
              <p className="text-gray-300 text-base md:text-lg leading-8 mb-4">
                Each council organizes{" "}
                <span className="text-white font-semibold">
                  roundtables, reports, international summits,
                </span>{" "}
                and publishes{" "}
                <span className="text-white font-semibold">
                  actionable white papers.
                </span>
              </p>
              <p className="text-[#4F6EF7] text-lg md:text-xl font-bold italic mb-2">
                "Together, We Build a Better World."
              </p>
              <p className="text-gray-300 text-base leading-8">
                Be a part of this global movement.
              </p>

              {/* Contact row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-6 pt-6 border-t border-white/10">
                <a
                  href="#"
                  className="group inline-flex items-center gap-2 bg-[#4F6EF7] hover:bg-[#3d57d1] text-white font-bold tracking-[0.2em] uppercase text-xs px-6 py-3 shadow-lg shadow-[#4F6EF7]/30 hover:shadow-xl hover:shadow-[#4F6EF7]/50 hover:-translate-y-0.5 transition-all"
                >
                  Apply Now
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <span className="text-gray-400 text-xs uppercase tracking-widest">
                  or write to us
                </span>

                <a
                  href="mailto:info@worldleadersconsortium.com"
                  className="group inline-flex items-center gap-2 text-[#4F6EF7] hover:text-white text-sm font-semibold transition-colors break-all"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  info@worldleadersconsortium.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CouncilsContent;