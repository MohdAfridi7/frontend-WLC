

import React, { useState } from "react";
import { Link } from "react-router-dom";

const updates = [
  {
    title:
      "Christopher Luxon in Mumbai: Strengthening New Zealand-India Ties for a Dynamic Future",
    video: "https://www.youtube.com/embed/bWuiHcCwSwo",
    description:
      "New Zealand Prime Minister Christopher Luxon recently visited Mumbai, India, as part of his first official trip to the country. During his media interaction, he emphasized strengthening ties between New Zealand and India across trade, education, defense, and technology.",
    extra:
      "Accompanied by a high-level delegation, he highlighted India’s pivotal role in the Indo-Pacific and explored opportunities for greater economic collaboration and people-to-people connections. A step towards a stronger, more prosperous partnership.",
    tag: "Diplomacy",
    region: "New Zealand × India",
  },
  {
    title:
      "Swedish PM Ulf Kristersson’s Powerful Address at 2025 EPP Congress: A Call for European Unity",
    video: "https://www.youtube.com/embed/vUumcNslawo",
    description:
      "Swedish PM Ulf Kristersson's stirring address at the 2025 EPP Congress in Valencia called for European unity in uncertain times. From NATO membership to supporting Ukraine and boosting economic competitiveness, he emphasized the need for decisive action.",
    extra:
      "A powerful call to embrace strength and lead a new European renaissance. His message highlighted the importance of unity, resilience, and cooperation across Europe.",
    tag: "Address",
    region: "Sweden × Europe",
  },
  {
    title:
      "NATO Chief Jens Stoltenberg & Norway PM Jonas Gahr Støre Discuss Security and Global Challenges",
    video: "https://www.youtube.com/embed/aSvISrGyqso",
    description:
      "NATO Secretary General Jens Stoltenberg and Norwegian Prime Minister Jonas Gahr Støre held a joint press conference on security, cooperation and the changing global landscape.",
    extra:
      "They outlined NATO’s priorities of strengthening alliances, confronting emerging threats and promoting regional stability. Both leaders reaffirmed the importance of collective security and international cooperation.",
    tag: "Security",
    region: "NATO × Norway",
  },
];

const WorldLeadersUpdate = () => {
  const [active, setActive] = useState(0);
  const current = updates[active];

  return (
    <section className="relative w-full overflow-hidden bg-[#fafbff] py-16 sm:py-20 md:py-28 lg:py-16">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');

        @keyframes wlu-fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes wlu-frame-in {
          from { opacity: 0; transform: scale(0.97); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes wlu-line-grow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .wlu-fade-up  { animation: wlu-fade-up 0.7s cubic-bezier(.2,.7,.2,1) both; }
        .wlu-frame-in { animation: wlu-frame-in 0.8s cubic-bezier(.2,.7,.2,1) both; }
        .wlu-line     { transform-origin: left; animation: wlu-line-grow 1s 0.3s cubic-bezier(.2,.7,.2,1) both; }

        .wlu-d1 { animation-delay: 0.10s; }
        .wlu-d2 { animation-delay: 0.20s; }
        .wlu-d3 { animation-delay: 0.30s; }
        .wlu-d4 { animation-delay: 0.40s; }
        .wlu-d5 { animation-delay: 0.50s; }

        .wlu-headline {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 500;
          letter-spacing: -0.015em;
          line-height: 1.05;
        }
        .wlu-italic {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 400;
        }
        .wlu-sans { font-family: 'Inter', sans-serif; }

        .wlu-video-frame::before {
          content: "";
          position: absolute;
          inset: -10px;
          border: 1px solid rgba(75,103,209,0.28);
          pointer-events: none;
          z-index: 0;
        }
        @media (min-width: 768px)  { .wlu-video-frame::before { inset: -16px; } }
        @media (min-width: 1024px) { .wlu-video-frame::before { inset: -22px; } }

        .wlu-tab {
          position: relative;
          transition: color 0.35s ease, padding 0.35s ease;
        }
        .wlu-tab::before {
          content: "";
          position: absolute;
          left: 0; top: 50%;
          width: 0; height: 1px;
          background: #4B67D1;
          transition: width 0.45s cubic-bezier(.2,.7,.2,1);
        }
        .wlu-tab.is-active { color: #0a0e28; padding-left: 56px; }
        .wlu-tab.is-active::before { width: 40px; }

        .wlu-arrow { transition: transform 0.5s cubic-bezier(.2,.7,.2,1); }
        .wlu-btn:hover .wlu-arrow { transform: translateX(6px); }

        @media (prefers-reduced-motion: reduce) {
          .wlu-fade-up, .wlu-frame-in, .wlu-line, .wlu-arrow {
            animation: none !important;
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* Background grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#4B67D1 1px, transparent 1px), linear-gradient(90deg, #4B67D1 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 75%)",
        }}
      />

      {/* Serif watermark */}
      <div
        aria-hidden="true"
        className="hidden lg:block absolute -bottom-10 -left-6 wlu-headline text-[#4B67D1]/[0.06] select-none pointer-events-none"
        style={{ fontSize: "220px", lineHeight: 2 }}
      >
        Update
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 sm:mb-16 md:mb-20">
          <div className="wlu-fade-up wlu-d1">
            <div className="flex items-center gap-3 sm:gap-4 mb-5">
              <span className="block w-8 sm:w-10 h-px bg-[#4B67D1]" />
              <span className="wlu-sans text-[10px] md:text-[11px] font-medium tracking-[0.35em] sm:tracking-[0.4em] uppercase text-[#4B67D1]">
                Voices &nbsp;·&nbsp; Briefings &nbsp;·&nbsp; Press
              </span>
            </div>
            <h2
              data-testid="wlu-heading"
              className="wlu-headline text-[#0a0e28]"
              style={{ fontSize: "clamp(36px, 5vw, 72px)" }}
            >
              World Leaders{" "}
              <span className="wlu-italic text-[#4B67D1]">Update.</span>
            </h2>
          </div>

          <div className="wlu-fade-up wlu-d2 hidden md:flex flex-col items-end">
            <span className="wlu-sans text-[10px] tracking-[0.35em] uppercase text-[#0a0e28]/40">
              Featured Brief
            </span>
            <span className="wlu-headline text-[#4B67D1] text-5xl lg:text-6xl mt-1">
              0{active + 1}
              <span className="text-[#0a0e28]/30 text-3xl lg:text-4xl">
                /0{updates.length}
              </span>
            </span>
          </div>
        </div>

        {/* Main layout */}
        <div className="grid lg:grid-cols-12 gap-10 md:gap-14 lg:gap-16">
          {/* Left: Selector list */}
          <aside className="lg:col-span-4 order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <span className="wlu-sans text-[10px] tracking-[0.35em] uppercase text-[#0a0e28]/40">
                Select Brief
              </span>
              <span className="flex-1 h-px bg-[#0a0e28]/10" />
            </div>

            <ul className="flex flex-col">
              {updates.map((item, i) => {
                const isActive = i === active;
                return (
                  <li
                    key={i}
                    className="border-b border-[#0a0e28]/10 last:border-b-0"
                  >
                    <button
                      data-testid={`wlu-tab-${i}`}
                      onClick={() => setActive(i)}
                      className={`wlu-tab w-full text-left py-5 sm:py-6 group ${
                        isActive ? "is-active" : "text-[#0a0e28]/55"
                      }`}
                    >
                      <div className="flex items-baseline gap-4">
                        <span
                          className={`wlu-sans text-[11px] tracking-[0.3em] ${
                            isActive ? "text-[#4B67D1]" : "text-[#0a0e28]/30"
                          }`}
                        >
                          0{i + 1}
                        </span>
                        <div className="flex-1">
                          <span className="wlu-sans text-[10px] tracking-[0.3em] uppercase block mb-1.5">
                            {item.tag} &nbsp;·&nbsp; {item.region}
                          </span>
                          <h3
                            className={`wlu-headline text-lg sm:text-xl md:text-[22px] leading-[1.25] ${
                              isActive ? "text-[#0a0e28]" : "text-[#0a0e28]/70"
                            }`}
                          >
                            {item.title.split(":")[0]}
                          </h3>
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* Right: Featured brief */}
          <article
            key={active}
            className="lg:col-span-8 order-1 lg:order-2"
            data-testid="wlu-featured"
          >
            {/* Video */}
            <div className="relative wlu-video-frame wlu-frame-in">
              <div
                aria-hidden="true"
                className="absolute -bottom-3 -right-3 sm:-bottom-5 sm:-right-5 md:-bottom-6 md:-right-6 w-full h-full bg-[#4B67D1]/10"
              />
              <div className="relative overflow-hidden bg-black aspect-video">
                <iframe
                  data-testid="wlu-video"
                  key={current.video}
                  src={current.video}
                  title={current.title}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Floating index badge */}
              <div className="absolute -top-4 -left-4 sm:-top-5 sm:-left-5 md:-top-6 md:-left-6 z-10 bg-[#fafbff] px-4 py-3 sm:px-5 sm:py-4 shadow-[0_18px_40px_-18px_rgba(10,14,40,0.25)]">
                <span className="wlu-sans text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#0a0e28]/50 block">
                  Brief
                </span>
                <span className="wlu-headline text-[#4B67D1] text-2xl sm:text-3xl leading-none mt-1 block">
                  0{active + 1}
                </span>
              </div>
            </div>

            {/* Meta */}
            <div className="mt-10 sm:mt-12 flex items-center gap-4 wlu-fade-up wlu-d2">
              <span className="block w-8 h-px bg-[#4B67D1]" />
              <span className="wlu-sans text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-[#4B67D1]">
                {current.tag}
              </span>
              <span className="wlu-sans text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#0a0e28]/40">
                {current.region}
              </span>
            </div>

            {/* Title */}
            <h3
              data-testid="wlu-title"
              className="wlu-headline text-[#0a0e28] mt-4 sm:mt-5 wlu-fade-up wlu-d3"
              style={{ fontSize: "clamp(24px, 2.6vw, 38px)" }}
            >
              “{current.title}”
            </h3>

            {/* Divider */}
            <div className="mt-6 mb-6 sm:mt-7 sm:mb-8 h-px bg-[#0a0e28]/10 wlu-fade-up wlu-d4">
              <div className="h-px w-20 bg-[#4B67D1] wlu-line" />
            </div>

            {/* Body */}
            <div className="grid md:grid-cols-2 gap-6 md:gap-10 wlu-fade-up wlu-d5">
              <p className="wlu-sans text-[#0a0e28]/70 text-[14px] md:text-[15px] font-light leading-[1.95]">
                {current.description}
              </p>
              <p className="wlu-sans text-[#0a0e28]/70 text-[14px] md:text-[15px] font-light leading-[1.95] md:border-l md:border-[#0a0e28]/10 md:pl-10">
                {current.extra}
              </p>
            </div>
          </article>
        </div>

        {/* Footer CTA row */}
        <div className="mt-16 sm:mt-20 md:mt-24 pt-10 border-t border-[#0a0e28]/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <p className="wlu-italic text-[#0a0e28] text-xl sm:text-2xl md:text-3xl max-w-xl">
            “The world is shaped by the conversations its leaders are willing to
            have.”
          </p>

          <Link
            to="/global-updates"
            data-testid="wlu-global-updates-link"
            className="inline-flex"
          >
            <button
              data-testid="wlu-global-updates-btn"
              className="wlu-btn inline-flex items-center gap-3 wlu-sans bg-[#0a0e28] hover:bg-[#4B67D1] text-white px-8 sm:px-10 py-4 sm:py-[18px] text-[10px] sm:text-[11px] tracking-[0.4em] uppercase font-medium transition-colors duration-300"
            >
              Global Updates
              <svg
                className="wlu-arrow"
                width="20"
                height="8"
                viewBox="0 0 20 8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path d="M0 4h16M13 1l3 3-3 3" />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WorldLeadersUpdate;