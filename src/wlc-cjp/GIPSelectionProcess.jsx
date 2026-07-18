import React from "react";

/* Same signature seal used across the WLC membership sections, so this
   CTA reads as part of the same system rather than a standalone banner. */
const Seal = ({ className = "" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor">
    <circle cx="50" cy="50" r="47" strokeWidth="1" />
    <circle cx="50" cy="50" r="39" strokeWidth="0.5" strokeDasharray="2 3" />
    <circle cx="50" cy="50" r="30" strokeWidth="1" />
    <text x="50" y="47" textAnchor="middle" fontSize="11" fontFamily="'IBM Plex Mono', monospace" fill="currentColor" stroke="none" letterSpacing="3">WLC</text>
    <text x="50" y="59" textAnchor="middle" fontSize="4.5" fontFamily="'IBM Plex Mono', monospace" fill="currentColor" stroke="none" letterSpacing="3">CONSORTIUM</text>
  </svg>
);

const GIPSelectionProcess = () => {
  return (
    <section className="relative overflow-hidden bg-[#1e1e1e] py-28 md:py-36">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,500;0,600;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap');
        .f-display { font-family: 'Fraunces', serif; }
        .f-mono { font-family: 'IBM Plex Mono', monospace; }
      `}</style>

      {/* Faint dot-network backdrop, consistent with the rest of the page */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:26px_26px] opacity-[0.05]" />
      <Seal className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 text-[#4D6AE8]/[0.08]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-[#4D6AE8]/50 to-transparent" />

      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center px-5 text-center">

        {/* Eyebrow */}
        <div className="f-mono inline-flex items-center gap-2 border border-[#4D6AE8]/30 bg-[#4D6AE8]/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.25em] text-[#4D6AE8]">
          <Seal className="h-3.5 w-3.5" />
          Global Internship Program
        </div>

        {/* Heading */}
        <h2 className="f-display mt-8 text-4xl leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">
          WLC GIP Selection
          <span className="block italic font-normal text-[#4D6AE8]">Process</span>
        </h2>

        {/* Divider */}
        <div className="mx-auto mt-8 flex items-center justify-center gap-3">
          <span className="h-px w-14 bg-white/15" />
          <Seal className="h-4 w-4 text-white/30" />
          <span className="h-px w-14 bg-white/15" />
        </div>

        {/* Button */}
        <a
          href="#"
          className="group relative mt-10 flex cursor-pointer items-center gap-3 border-2 border-[#4D6AE8] bg-[#4D6AE8] px-12 py-4 text-white transition-colors duration-300 hover:bg-transparent"
        >
          <span className="f-mono text-xs uppercase tracking-[0.3em]">Learn More</span>
          <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>

      </div>
    </section>
  );
};

export default GIPSelectionProcess;