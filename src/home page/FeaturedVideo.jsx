import React from "react";
import { Link } from "react-router-dom";

const FeaturedVideo = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#fafbff] py-16 sm:py-20 md:py-28 lg:py-16">
      <style>{`
        @import url('htt...');

        @keyframes fv-fade-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fv-frame-in { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
        @keyframes fv-line-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes fv-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.35; } }

        .fv-fade-up  { animation: fv-fade-up 0.8s cubic-bezier(.2,.7,.2,1) both; }
        .fv-frame-in { animation: fv-frame-in 1s cubic-bezier(.2,.7,.2,1) both; }
        .fv-line     { transform-origin: left; animation: fv-line-grow 1.1s 0.3s cubic-bezier(.2,.7,.2,1) both; }
        .fv-pulse    { animation: fv-pulse 1.6s ease-in-out infinite; }

        .fv-d1 { animation-delay: 0.10s; }
        .fv-d2 { animation-delay: 0.22s; }
        .fv-d3 { animation-delay: 0.34s; }
        .fv-d4 { animation-delay: 0.46s; }
        .fv-d5 { animation-delay: 0.58s; }

        .fv-headline { font-family: 'Cormorant Garamond', serif; font-weight: 500; letter-spacing: -0.015em; line-height: 1.02; }
        .fv-italic   { font-family: 'Cormorant Garamond', serif; font-style: italic; font-weight: 400; }
        .fv-sans     { font-family: 'Inter', sans-serif; }

        .fv-video-frame::before {
          content: ""; position: absolute; inset: -12px;
          border: 1px solid rgba(75,103,232,0.28);
          pointer-events: none; z-index: 0;
        }
        @media (min-width: 768px)  { .fv-video-frame::before { inset: -18px; } }
        @media (min-width: 1024px) { .fv-video-frame::before { inset: -24px; } }

        .fv-vertical {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
        }

        .fv-arrow { transition: transform 0.5s cubic-bezier(.2,.7,.2,1); }
        .fv-btn:hover .fv-arrow { transform: translateX(6px); }

        .fv-play-pulse::before {
          content: ""; position: absolute; inset: -8px;
          border: 1px solid rgba(75,103,232,0.5);
          border-radius: 9999px;
          animation: fv-pulse 2s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .fv-fade-up, .fv-frame-in, .fv-line, .fv-pulse, .fv-arrow {
            animation: none !important; transition: none !important;
            opacity: 1 !important; transform: none !important;
          }
        }
      `}</style>

      {/* Background grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#4b67e8 1px, transparent 1px), linear-gradient(90deg, #4b67e8 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
        }}
      />

      {/* Watermark */}
      <div
        aria-hidden="true"
        className="hidden lg:block absolute -top-4 right-8 fv-headline text-[#4b67e8]/[0.06] select-none pointer-events-none"
        style={{ fontSize: "220px", lineHeight: 1 }}
      >
        Play
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Top eyebrow row */}
        <div
          data-testid="fv-eyebrow"
          className="fv-fade-up fv-d1 flex items-center gap-3 sm:gap-4 mb-10 sm:mb-14 md:mb-16"
        >
          <span className="block w-8 sm:w-10 h-px bg-[#4b67e8]" />
          <span className="fv-sans text-[10px] md:text-[11px] font-medium tracking-[0.35em] sm:tracking-[0.4em] uppercase text-[#4b67e8]">
            WLC Presents
          </span>
          <span className="hidden sm:block flex-1 h-px bg-[#0a0e28]/10" />
          <span className="hidden md:flex items-center gap-2 fv-sans text-[10px] tracking-[0.3em] uppercase text-[#0a0e28]/40 whitespace-nowrap">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full fv-pulse" />
            Live Session
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 md:gap-14 lg:gap-16 items-center">
          {/* ── Left: Content ── */}
          <div className="lg:col-span-5 relative">
            {/* Vertical PLAY tag */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute -left-6 top-2 fv-sans text-[10px] tracking-[0.5em] uppercase text-[#0a0e28]/40 fv-vertical"
            >
              Featured · Forum
            </div>

            <div className="fv-fade-up fv-d2 flex items-baseline gap-3 mb-6">
              <span className="fv-sans text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-[#0a0e28]/40">
                01 — Now Streaming
              </span>
            </div>

            <h2
              data-testid="fv-heading"
              className="fv-headline text-[#0a0e28] fv-fade-up fv-d3"
              style={{ fontSize: "clamp(40px, 5.4vw, 76px)" }}
            >
              Featured{" "}
              <span className="fv-italic text-[#4b67e8]">Video.</span>
            </h2>

            <div className="mt-7 mb-7 sm:mt-8 sm:mb-8 h-px bg-[#0a0e28]/10 fv-fade-up fv-d3">
              <div className="h-px w-20 bg-[#4b67e8] fv-line" />
            </div>

            <p
              data-testid="fv-subheading"
              className="fv-sans text-[#0a0e28]/65 text-[15px] md:text-base font-light leading-[1.95] mb-10 fv-fade-up fv-d4 max-w-md"
            >
              Global Forum on{" "}
              <span className="text-[#4b67e8] font-medium">
                Energy Transition
              </span>{" "}
              &amp;{" "}
              <span className="text-[#4b67e8] font-medium">
                Sustainable Cities
              </span>
              .
            </p>

            {/* Session meta strip */}
            <div className="fv-fade-up fv-d4 grid grid-cols-3 gap-4 mb-10 sm:mb-12 max-w-md">
              <div>
                <span className="fv-sans text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#0a0e28]/40 block mb-1.5">
                  Forum
                </span>
                <span className="fv-headline text-[#0a0e28] text-lg sm:text-xl">
                  Global
                </span>
              </div>
              <div>
                <span className="fv-sans text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#0a0e28]/40 block mb-1.5">
                  Format
                </span>
                <span className="fv-headline text-[#0a0e28] text-lg sm:text-xl">
                  Keynote
                </span>
              </div>
              <div>
                <span className="fv-sans text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#0a0e28]/40 block mb-1.5">
                  By
                </span>
                <span className="fv-headline text-[#0a0e28] text-lg sm:text-xl">
                  WLC
                </span>
              </div>
            </div>

            <div className="fv-fade-up fv-d5">
              <Link
                to="/about"
                data-testid="fv-learnmore-link"
                className="inline-flex"
              >
                <button
                  data-testid="fv-learnmore-btn"
                  className="fv-btn inline-flex items-center gap-3 fv-sans bg-[#0a0e28] hover:bg-[#4b67e8] text-white px-8 sm:px-10 py-4 sm:py-[18px] text-[10px] sm:text-[11px] tracking-[0.4em] uppercase font-medium transition-colors duration-300"
                >
                  Learn More
                  <svg
                    className="fv-arrow"
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

          {/* ── Right: Video ── */}
          <div className="lg:col-span-7 relative fv-frame-in fv-d2">
            <div className="relative fv-video-frame">
              {/* Offset matted block */}
              <div
                aria-hidden="true"
                className="absolute -bottom-3 -right-3 sm:-bottom-5 sm:-right-5 md:-bottom-6 md:-right-6 w-full h-full bg-[#4b67e8]/10"
              />

              {/* Video */}
              <div className="relative bg-black aspect-video overflow-hidden">
                <iframe
                  data-testid="fv-video"
                  src="https://www.youtube.com/embed/objSzi93RcQ"
                  title="WLC Featured Video"
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Top-left floating play badge */}
              <div
                data-testid="fv-play-badge"
                className="absolute -top-5 -left-5 sm:-top-6 sm:-left-6 md:-top-7 md:-left-7 z-10 fv-play-pulse"
              >
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#fafbff] flex items-center justify-center shadow-[0_18px_40px_-18px_rgba(10,14,40,0.30)]">
                  <svg
                    width="18"
                    height="20"
                    viewBox="0 0 18 20"
                    fill="#4b67e8"
                  >
                    <path d="M1 1l16 9-16 9V1z" />
                  </svg>
                </div>
              </div>

              {/* Bottom dark caption bar */}
              <div className="relative z-10 bg-[#0a0e28] flex items-center justify-between px-5 sm:px-6 py-3 sm:py-3.5">
                <div className="flex items-center gap-3">
                  <span className="block w-1.5 h-1.5 bg-[#4b67e8]" />
                  <span className="fv-sans text-white/70 text-[10px] sm:text-[11px] tracking-[0.3em] uppercase">
                    World Leaders Consortium
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="block w-1.5 h-1.5 bg-red-500 rounded-full fv-pulse" />
                  <span className="fv-sans text-white/50 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase">
                    Live Session
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom editorial strip */}
        <div className="mt-16 sm:mt-20 pt-10 border-t border-[#0a0e28]/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="fv-italic text-[#0a0e28] text-lg sm:text-xl md:text-2xl max-w-2xl">
            “Shaping the cities — and the energy — of a sustainable century.”
          </p>
          <div className="flex items-center gap-3">
            <span className="block w-10 h-px bg-[#4b67e8]" />
            <span className="fv-sans text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-[#0a0e28]/50">
              From the Forum
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVideo;