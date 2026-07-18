

import React from "react";

/**
 * WLC GIP Overview — Premium Edition
 * -----------------------------------
 * • Same content & same #4D6AE8 accent preserved
 * • Corporate premium design with subtle CSS-only animations
 * • Single-file drop-in component (Tailwind required)
 */

const ACCENT = "#4D6AE8";

const GIPOverview = () => {
  return (
    <section
      data-testid="gip-overview-section"
      className="relative overflow-hidden bg-[#f5f5f5] py-20 md:py-28"
    >
      {/* Ambient background flourishes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-32 h-96 w-96 rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, #4D6AE8 0%, transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-32 h-[30rem] w-[30rem] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #4D6AE8 0%, transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(#4D6AE8 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5">
        {/* Eyebrow */}
        <div
          data-testid="eyebrow-badge"
          className="mx-auto mb-6 flex w-fit items-center gap-2  border border-[#4D6AE8]/25 bg-white/80 px-4 py-1.5 shadow-sm backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#4D6AE8]" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#4D6AE8]">
            3-Month Transformative Program
          </span>
        </div>

        {/* Heading */}
        <h1
          data-testid="main-heading"
          className="animate-[fadeUp_0.9s_ease-out_both] text-center text-4xl md:text-6xl font-extrabold uppercase tracking-wide mb-4"
          style={{
            background: `linear-gradient(90deg, ${ACCENT} 0%, #7A93FF 50%, ${ACCENT} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          WLC GIP OVERVIEW
        </h1>

        {/* Divider */}
        <div className="mx-auto mb-16 flex items-center justify-center gap-3">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#4D6AE8]/60" />
          <span className="h-2 w-2 rotate-45 bg-[#4D6AE8]" />
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#4D6AE8]/60" />
        </div>

        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Left Video — Sticky Premium Frame */}
          <div className="w-full lg:sticky lg:top-24">
            <div className="group relative animate-[fadeUp_1s_ease-out_both]">
              {/* Glow ring */}
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-[#4D6AE8]/40 via-[#4D6AE8]/10 to-transparent opacity-70 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
              />
              {/* Offset accent card */}
              <div
                aria-hidden="true"
                className="absolute -bottom-4 -right-4 h-full w-full rounded-2xl border border-[#4D6AE8]/30 bg-[#4D6AE8]/5 transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1"
              />
              <div className="relative overflow-hidden rounded-2xl bg-white p-2 shadow-[0_20px_60px_-15px_rgba(77,106,232,0.4)] ring-1 ring-black/5">
                <div className="overflow-hidden rounded-xl">
                  <iframe
                    className="w-full aspect-video"
                    src="https://www.youtube.com/embed/IdzCW6T7PWo"
                    title="WLC GIP Overview"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                {/* Corner tag */}
                <div
                  aria-hidden="true"
                  className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/40 bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-md"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                  Program Preview
                </div>
              </div>

              {/* Quick Stats Bar */}
             
            </div>
          </div>

          {/* Right Content */}
          <div className="text-center lg:text-left">
            {/* Overview */}
            <SectionTitle testid="overview-title" index="01" label="GIP Overview" />
            <div className="rounded-2xl border border-[#4D6AE8]/10 bg-white p-6 md:p-8 shadow-sm mb-8">
              <p className="text-lg leading-9 text-gray-700 mb-6">
                The WLC Global Internship is a transformative 3-month program crafted for aspiring leaders and professionals. It focuses on building expertise in policy, technology, media, sustainability and business. Participants actively contribute to impactful projects, workshops and campaigns designed to advance the UN Sustainable Development Goals (SDGs).
              </p>
              <div className="flex items-start gap-3 rounded-xl border-l-4 border-[#4D6AE8] bg-[#4D6AE8]/5 p-4">
                <div>
                  <div className="text-sm font-bold uppercase tracking-wider text-[#4D6AE8]">
                    Program Formats
                  </div>
                  <p className="mt-1 text-gray-700 leading-8">
                    Choose between a virtual experience or in-person engagement organized chapter-wise.
                  </p>
                </div>
              </div>
            </div>

            {/* Learning Methodology */}
            <SectionTitle testid="learning-title" index="02" label="Learning Methodology" />
            <p className="text-lg leading-9 text-gray-700 mb-14 rounded-2xl border border-[#4D6AE8]/10 bg-white/70 backdrop-blur-sm p-6 md:p-8 shadow-sm">
              Gain hands-on experience through immersive activities in innovation hubs, policy labs and global events, empowering participants to learn by doing.
            </p>

            {/* Tracks Offered */}
            <SectionTitle testid="tracks-title" index="03" label="Tracks Offered" />
            <div className="grid gap-5 md:grid-cols-2 mb-4">
              {/* Basic */}
              <div
                data-testid="track-basic"
                className="group relative overflow-hidden rounded-2xl border border-[#4D6AE8]/15 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(77,106,232,0.45)]"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#4D6AE8] to-transparent opacity-70"
                />
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4D6AE8]/10 font-bold text-[#4D6AE8]">
                    ◇
                  </span>
                  <h3 className="text-2xl font-semibold text-gray-900">Basic Track</h3>
                </div>
                <p className="text-gray-700 leading-8">
                  Entry-level foundation with structured assignments.
                </p>
                <p className="mt-3 text-gray-700 leading-8">
                  Includes mentor access, global summits and certificates.
                </p>
              </div>

              {/* Premium */}
              <div
                data-testid="track-premium"
                className="group relative overflow-hidden rounded-2xl border border-[#4D6AE8]/15 bg-gradient-to-br from-[#4D6AE8] to-[#3558e0] p-6 text-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(77,106,232,0.6)]"
              >
                <div
                  aria-hidden="true"
                  className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"
                />
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/30 font-bold">
                    ✦
                  </span>
                  <h3 className="text-2xl font-semibold">Premium Track</h3>
                  <span className="ml-auto rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest">
                    Pro
                  </span>
                </div>
                <p className="leading-8">
                  Advanced mentorship with high-visibility projects.
                </p>
                <p className="mt-3 leading-8">
                  Includes access to global organizations like UN, UNDP, WTO, Google, Meta and many more with international leadership opportunities.
                </p>
              </div>
            </div>
            <LinkArrow href="#" label="Read More" />

            {/* Internship Roles */}
            <div className="mt-16">
              <SectionTitle testid="roles-title" index="04" label="Internship Roles" />
              <p className="text-lg text-gray-700 mb-6">
                Interns can explore dynamic roles including:
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Leadership & Research",
                  "Youth Engagement",
                  "Event Management",
                  "Technology & Innovation",
                  "Media & PR",
                  "Business Development",
                  "Social Media & Design",
                  "Data Analytics",
                ].map((role, i) => (
                  <RoleChip key={i} index={i + 1} label={role} />
                ))}
              </div>
              <LinkArrow href="#" label="Learn More" />
            </div>

            {/* Benefits of GIP */}
            <div className="mt-16">
              <SectionTitle testid="benefits-title" index="05" label="Benefits of GIP" />
              <div className="grid gap-5 md:grid-cols-2">
                <BenefitCard
                  icon="⌂"
                  title="Remote Perks"
                  body="Flexible schedules, global collaboration and cost-effective access."
                />
                <BenefitCard
                  icon="◉"
                  title="Physical Perks"
                  body="On-ground mentorship, networking and hands-on experiences."
                />
              </div>
              <LinkArrow href="#" label="Read More" />
            </div>

            {/* Who Can Apply */}
            <div className="mt-16">
              <SectionTitle testid="apply-title" index="06" label="Who Can Apply?" />
              <div className="relative overflow-hidden rounded-2xl border border-[#4D6AE8]/15 bg-white p-6 md:p-8 shadow-sm">
                <div
                  aria-hidden="true"
                  className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-[#4D6AE8]/5 blur-2xl"
                />
                <p className="text-lg leading-9 text-gray-700">
                  The program welcomes driven, curious individuals, regardless of their experience level. The only requirements are passion, purpose and a willingness to learn. Registration starts at just{" "}
                  <span className="inline-flex items-baseline rounded-md bg-[#4D6AE8]/10 px-2 py-0.5 font-bold text-[#4D6AE8]">
                    $35
                  </span>.
                </p>
              </div>
            </div>

            {/* Why Join */}
            <div className="mt-16">
              <SectionTitle testid="why-title" index="07" label="Why Join WLC GIP" />
              <div className="rounded-2xl border-l-4 border-[#4D6AE8] bg-white/80 p-6 md:p-8 shadow-sm backdrop-blur-sm">
                <p className="text-lg leading-9 text-gray-700">
                  The WLC Global Internship is not just an internship— it is a transformative experience that equips participants with leadership skills, global exposure and a future-ready mindset, making it a launchpad for impactful careers.
                </p>
              </div>
              <LinkArrow href="#" label="Read More" />
            </div>

            {/* Internship Perks */}
            <div className="mt-16">
              <SectionTitle testid="perks-title" index="08" label="Internship Perks" />
              <ul className="space-y-3">
                {[
                  "Official Internship Certificate endorsed by the Global Convenor, WLC.",
                  "Performance-based Letter of Recommendation.",
                  "Chance to present at prestigious international forums and webinars.",
                  "Exclusive mentorship sessions with world-renowned leaders.",
                  "Access to global research and innovation networks.",
                  "Featured recognition on WLC platforms for top-performing interns.",
                  "Personalized guidance from esteemed professionals across diverse fields.",
                ].map((perk, i) => (
                  <PerkItem key={i} index={i + 1} text={perk} />
                ))}
              </ul>

              <p className="text-lg leading-9 text-gray-700 mt-10 text-center lg:text-left">
                Join us to make your skills, passion and drive a part of our global mission!
              </p>

              {/* Premium CTA */}
              <div className="mt-10 text-center lg:text-left">
                <a
                  data-testid="register-cta"
                  href="https://docs.google.com/forms/d/e/1FAIpQLSd7SkRN4VzQJ0CX71su2SmpQIGzSHUI8JGK-JTaN2otn2OszA/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#4D6AE8] px-10 py-4 text-lg font-semibold uppercase tracking-wider text-white shadow-[0_10px_30px_-8px_rgba(77,106,232,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-10px_rgba(77,106,232,0.75)]"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                  />
                  <span className="relative">Register Now</span>
                  <span className="relative transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          0%   { opacity: 0; transform: translateY(18px); }
          100% { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </section>
  );
};

/* ---------- Sub-components ---------- */

const SectionTitle = ({ index, label, testid }) => (
  <div
    data-testid={testid}
    className="mb-6 flex items-center justify-center gap-4 lg:justify-start"
  >
    <span className="font-mono text-sm font-semibold tracking-widest text-[#4D6AE8]/70">
      {index}
    </span>
    <span className="h-px w-8 bg-[#4D6AE8]/40" />
    <h2 className="text-3xl font-semibold text-gray-900">{label}</h2>
  </div>
);

const StatBox = ({ value, label }) => (
  <div className="rounded-xl border border-[#4D6AE8]/15 bg-white/90 p-4 text-center shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#4D6AE8]/40">
    <div className="text-2xl font-bold text-[#4D6AE8]">{value}</div>
    <div className="text-[11px] uppercase tracking-widest text-gray-500 mt-1">
      {label}
    </div>
  </div>
);

const RoleChip = ({ index, label }) => (
  <div
    data-testid={`role-${label.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and")}`}
    className="group flex items-center gap-3 rounded-xl border border-gray-200/80 bg-white px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#4D6AE8]/40 hover:shadow-[0_10px_30px_-15px_rgba(77,106,232,0.5)]"
  >
    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#4D6AE8]/10 font-mono text-xs font-bold text-[#4D6AE8] ring-1 ring-[#4D6AE8]/20">
      0{index}
    </span>
    <span className="text-[15px] font-medium text-gray-800">{label}</span>
  </div>
);

const BenefitCard = ({ icon, title, body }) => (
  <div className="group relative overflow-hidden rounded-2xl border border-[#4D6AE8]/15 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(77,106,232,0.45)]">
    <div
      aria-hidden="true"
      className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#4D6AE8]/10 transition-transform duration-500 group-hover:scale-125"
    />
    <div className="mb-3 flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4D6AE8]/10 text-xl text-[#4D6AE8] ring-1 ring-[#4D6AE8]/20">
        {icon}
      </span>
      <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
    </div>
    <p className="text-[15px] leading-7 text-gray-600">{body}</p>
  </div>
);

const PerkItem = ({ index, text }) => (
  <li className="group flex items-start gap-4 rounded-xl border border-gray-200/70 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#4D6AE8]/40 hover:shadow-[0_10px_30px_-15px_rgba(77,106,232,0.4)]">
    <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#4D6AE8]/10 font-mono text-xs font-bold text-[#4D6AE8] ring-1 ring-[#4D6AE8]/20">
      0{index}
    </span>
    <p className="text-[16px] leading-8 text-gray-700">{text}</p>
  </li>
);

const LinkArrow = ({ href, label }) => (
  <a
    href={href}
    className="group mt-8 inline-flex items-center gap-2 text-[#4D6AE8] italic text-lg font-medium"
  >
    <span className="underline decoration-[#4D6AE8]/40 underline-offset-4 transition-all duration-300 group-hover:decoration-[#4D6AE8]">
      {label}
    </span>
    <span className="transition-transform duration-300 group-hover:translate-x-1">
      →
    </span>
  </a>
);

export default GIPOverview;