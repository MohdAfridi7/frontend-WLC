

import React from "react";
import img from '../../public/image/ha15.webp'

/**
 * WLC Global Internship Program — Premium Edition
 * -------------------------------------------------
 * • Same content & same #4F6EF7 accent
 * • Corporate premium feel with subtle CSS-only animations
 * • Single-file drop-in component (Tailwind required)
 */

const ACCENT = "#4F6EF7";

const InternshipProgram = () => {
  return (
    <section
      data-testid="internship-program-section"
      className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-b from-white via-[#F7F9FF] to-white"
    >
      {/* Ambient background flourishes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #4F6EF7 0%, transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-32 h-[28rem] w-[28rem] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, #4F6EF7 0%, transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(#4F6EF7 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5">
        {/* Eyebrow */}
        <div
          data-testid="eyebrow-badge"
          className="mx-auto mb-6 flex w-fit items-center gap-2  border border-[#4F6EF7]/20 bg-white/70 px-4 py-1.5 shadow-sm backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#4F6EF7]" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4F6EF7]">
            Global Leadership Initiative
          </span>
        </div>

        {/* Heading */}
        <h1
          data-testid="main-heading"
          className="animate-[fadeUp_0.9s_ease-out_both] text-center text-3xl sm:text-4xl md:text-6xl font-extrabold uppercase tracking-wide mb-4"
          style={{
            background: `linear-gradient(90deg, ${ACCENT} 0%, #7A93FF 50%, ${ACCENT} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          WLC Global Internship Program
        </h1>

        {/* Accent underline */}
        <div className="mx-auto mb-16 flex items-center justify-center gap-3">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#4F6EF7]/60" />
          <span className="h-2 w-2 rotate-45 bg-[#4F6EF7]" />
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#4F6EF7]/60" />
        </div>

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-14 items-start">
          {/* Left Image — premium framed */}
          <div className="w-full lg:w-[38%] flex justify-center lg:sticky lg:top-24">
            <div
              data-testid="internship-image-frame"
              className="group relative w-full max-w-md lg:max-w-full animate-[fadeUp_1s_ease-out_both]"
            >
              {/* Glow ring */}
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-[#4F6EF7]/40 via-[#4F6EF7]/10 to-transparent opacity-70 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
              />
              {/* Offset accent card */}
              <div
                aria-hidden="true"
                className="absolute -bottom-4 -right-4 h-full w-full rounded-2xl border border-[#4F6EF7]/30 bg-[#4F6EF7]/5 transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1"
              />
              <div className="relative overflow-hidden rounded-2xl bg-white p-2 shadow-[0_20px_60px_-15px_rgba(79,110,247,0.35)] ring-1 ring-black/5">
                <img
                  src={img}
                  alt="Internship"
                  className="w-full rounded-xl object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                />
                {/* Corner accent */}
                <div
                  aria-hidden="true"
                  className="absolute left-4 top-4 rounded-full border border-white/40 bg-black/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-md"
                >
                  WLC · Since 70+ Nations
                </div>
              </div>

              {/* Stat chip */}
              <div
                data-testid="stat-chip"
                className="absolute -bottom-6 left-6 flex items-center gap-3 rounded-xl border border-[#4F6EF7]/15 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-md"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#4F6EF7]/10 text-[#4F6EF7] font-bold">
                  ★
                </div>
                <div className="leading-tight">
                  <div className="text-sm font-bold text-gray-900">70+ Countries</div>
                  <div className="text-[11px] uppercase tracking-wider text-gray-500">
                    Global Reach
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-[62%] text-center lg:text-left">
            {/* About */}
            <SectionTitle testid="about-title" index="01" label="About WLC" />
            <p className="text-gray-700 text-lg leading-9 mb-14 animate-[fadeUp_0.9s_ease-out_both]">
              The World Leaders Consortium (WLC) is a global platform uniting
              visionary minds from over 70+ countries. It works at the
              intersection of policy, innovation, diplomacy, sustainability,
              entrepreneurship, and education. WLC empowers youth, women, and
              changemakers with inclusive leadership models for sustainable
              global impact, fostering dialogue and collaboration for a better
              future.
            </p>

            {/* Why Choose */}
            <SectionTitle testid="why-title" index="02" label="Why Choose WLC?" />
            <div className="grid gap-4 sm:grid-cols-2 mb-14">
              {[
                { head: "WLC", body: "Bridging Leadership Gaps for a Better World." },
                { head: "Purposeful Leadership", body: "WLC addresses the global leadership gap by empowering visionaries and changemakers." },
                { head: "Global Collaboration", body: "A platform uniting diverse experts to solve pressing global challenges." },
                { head: "UN SDG Alignment", body: "Equipping participants to address real-world issues through the UN SDG framework." },
              ].map((item, i) => (
                <FeatureCard key={i} head={item.head} body={item.body} />
              ))}
            </div>

            {/* Vision & Mission */}
            <SectionTitle testid="vm-title" index="03" label="Vision & Mission" />
            <div className="mb-14 grid gap-6 md:grid-cols-2">
              {/* Vision */}
              <div
                data-testid="vision-card"
                className="group relative overflow-hidden rounded-2xl border border-[#4F6EF7]/15 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(79,110,247,0.45)]"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#4F6EF7] to-transparent opacity-70"
                />
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#4F6EF7]/10 text-[#4F6EF7]">
                    ◈
                  </span>
                  <h3 className="text-2xl font-semibold text-gray-900">Vision</h3>
                </div>
                <p className="text-gray-700 text-[17px] leading-8">
                  To create a diverse, impactful platform for leadership,
                  collaboration, and innovation, driving progress on the UN SDGs
                  for nations and future generations.
                </p>
              </div>

              {/* Mission */}
              <div
                data-testid="mission-card"
                className="group relative overflow-hidden rounded-2xl border border-[#4F6EF7]/15 bg-gradient-to-br from-[#4F6EF7] to-[#3A56D4] p-7 text-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(79,110,247,0.6)]"
              >
                <div
                  aria-hidden="true"
                  className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"
                />
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 text-white ring-1 ring-white/30">
                    ✦
                  </span>
                  <h3 className="text-2xl font-semibold">Mission</h3>
                </div>
                <ul className="space-y-2.5 text-[16px] leading-7">
                  {[
                    "Advance understanding and action toward the SDGs.",
                    "Empower youth and women as leaders.",
                    "Build a global mentorship and partnership network.",
                    "Strengthen cooperation between the Global North and South.",
                  ].map((m, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-white/80" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Core Pillars */}
            <SectionTitle testid="pillars-title" index="04" label="Core Pillars" />
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { head: "Ethical Leadership", body: "Promoting integrity, diversity and collaboration for sustainable progress." },
                { head: "Global Collaboration", body: "Fostering cross-border partnerships to tackle global challenges." },
                { head: "Innovation", body: "Advancing technology, policy, health and education for human development." },
                { head: "Sustainable Growth", body: "Driving efforts aligned with the UN SDGs for a balanced future." },
              ].map((p, i) => (
                <PillarCard key={i} index={i + 1} head={p.head} body={p.body} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Local keyframes */}
      <style>{`
        @keyframes fadeUp {
          0%   { opacity: 0; transform: translateY(18px); }
          100% { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </section>
  );
};

/* ---------- Sub-components (same file) ---------- */

const SectionTitle = ({ index, label, testid }) => (
  <div
    data-testid={testid}
    className="mb-7 flex items-center justify-center gap-4 lg:justify-start"
  >
    <span className="font-mono text-sm font-semibold tracking-widest text-[#4F6EF7]/70">
      {index}
    </span>
    <span className="h-px w-8 bg-[#4F6EF7]/40" />
    <h2 className="text-3xl font-semibold text-gray-900">{label}</h2>
  </div>
);

const FeatureCard = ({ head, body }) => (
  <div
    data-testid={`feature-${head.toLowerCase().replace(/\s+/g, "-")}`}
    className="group relative rounded-xl border border-gray-200/80 bg-white p-5 text-left shadow-[0_1px_0_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#4F6EF7]/40 hover:shadow-[0_18px_40px_-20px_rgba(79,110,247,0.45)]"
  >
    <div
      aria-hidden="true"
      className="absolute left-0 top-5 h-8 w-1 rounded-r-full bg-[#4F6EF7] opacity-80 transition-all duration-300 group-hover:h-10"
    />
    <h4 className="mb-1.5 pl-3 text-[17px] font-semibold text-gray-900">{head}</h4>
    <p className="pl-3 text-[15px] leading-7 text-gray-600">{body}</p>
  </div>
);

const PillarCard = ({ index, head, body }) => (
  <div
    data-testid={`pillar-${head.toLowerCase().replace(/\s+/g, "-")}`}
    className="group relative overflow-hidden rounded-2xl border border-gray-200/70 bg-white p-6 text-left transition-all duration-500 hover:-translate-y-1 hover:border-[#4F6EF7]/40 hover:shadow-[0_20px_50px_-20px_rgba(79,110,247,0.45)]"
  >
    <div
      aria-hidden="true"
      className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#4F6EF7]/10 transition-transform duration-500 group-hover:scale-125"
    />
    <div className="mb-3 flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4F6EF7]/10 font-mono text-sm font-bold text-[#4F6EF7] ring-1 ring-[#4F6EF7]/20">
        0{index}
      </span>
      <h4 className="text-lg font-semibold text-gray-900">{head}</h4>
    </div>
    <p className="text-[15px] leading-7 text-gray-600">{body}</p>
    <div
      aria-hidden="true"
      className="mt-4 h-px w-0 bg-gradient-to-r from-[#4F6EF7] to-transparent transition-all duration-500 group-hover:w-full"
    />
  </div>
);

export default InternshipProgram;