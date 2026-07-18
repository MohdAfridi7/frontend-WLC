import React from "react";
import { Link } from "react-router-dom";
import img from '../../public/image/blog-5.webp'


const AboutWLC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#fafbff] py-20 sm:py-24 md:py-28">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');

        @keyframes wlc-fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes wlc-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes wlc-seal-in {
          from { opacity: 0; transform: scale(0.85) rotate(-8deg); }
          to   { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes wlc-spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        .wlc-fade-up { animation: wlc-fade-up 0.9s cubic-bezier(.2,.7,.2,1) both; }
        .wlc-fade-in { animation: wlc-fade-in 1.2s ease both; }
        .wlc-seal    { animation: wlc-seal-in 1s 0.5s cubic-bezier(.2,.7,.2,1) both; }
        .wlc-seal-ring { animation: wlc-spin-slow 40s linear infinite; }

        .wlc-d1 { animation-delay: 0.10s; }
        .wlc-d2 { animation-delay: 0.22s; }
        .wlc-d3 { animation-delay: 0.34s; }
        .wlc-d4 { animation-delay: 0.46s; }
        .wlc-d5 { animation-delay: 0.58s; }

        .wlc-headline { font-family: 'Cormorant Garamond', serif; font-weight: 500; letter-spacing: -0.015em; line-height: 1.04; }
        .wlc-italic   { font-family: 'Cormorant Garamond', serif; font-style: italic; font-weight: 400; }
        .wlc-sans     { font-family: 'Inter', sans-serif; }

        .wlc-image { transition: transform 1.8s cubic-bezier(.2,.7,.2,1), filter 1.8s ease; }
        .wlc-image-wrap:hover .wlc-image { transform: scale(1.04); }

        .wlc-spine {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }

        .wlc-cta-primary {
          border: 1px solid rgba(10,14,40,0.16);
          transition: border-color 0.4s ease, color 0.4s ease, background 0.4s ease;
        }
        .wlc-cta-primary:hover {
          border-color: #4b67e8;
          background: #4b67e8;
          color: #fafbff;
        }

        .wlc-cta-secondary .wlc-arrow { transition: transform 0.5s cubic-bezier(.2,.7,.2,1); }
        .wlc-cta-secondary:hover .wlc-arrow { transform: translateX(6px); }
        .wlc-cta-secondary { transition: color 0.4s ease; }
        .wlc-cta-secondary:hover { color: #f1f3f9; }

        @media (prefers-reduced-motion: reduce) {
          .wlc-fade-up, .wlc-fade-in, .wlc-seal, .wlc-seal-ring, .wlc-image {
            animation: none !important; transition: none !important;
            opacity: 1 !important; transform: none !important;
          }
        }
      `}</style>

      {/* ===== Background: gradient + coordinate pattern ===== */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-50/70 via-[#fafbff] to-blue-50/50" />

        {/* Fine dot grid, lower-left */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: "radial-gradient(#4b67e8 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            maskImage: "radial-gradient(ellipse 60% 55% at 12% 85%, black 0%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse 60% 55% at 12% 85%, black 0%, transparent 70%)",
          }}
        />

        {/* Longitude arcs, right side, behind image */}
        <svg
          viewBox="0 0 500 500"
          className="pointer-events-none absolute -right-32 top-1/2 -translate-y-1/2 h-[520px] w-[520px] opacity-[0.10]"
          fill="none"
        >
          <circle cx="250" cy="250" r="230" stroke="#0a0e28" strokeWidth="1" />
          <circle cx="250" cy="250" r="150" stroke="#0a0e28" strokeWidth="1" />
          <ellipse cx="250" cy="250" rx="230" ry="90" stroke="#4b67e8" strokeWidth="1" />
          <ellipse cx="250" cy="250" rx="90" ry="230" stroke="#4b67e8" strokeWidth="1" />
        </svg>

        <div className="absolute left-0 top-0 h-[280px] w-[280px] rounded-full bg-blue-200/25 blur-[110px]" />
        <div className="absolute right-10 bottom-0 h-[300px] w-[300px] rounded-full bg-indigo-200/25 blur-[100px]" />

        {/* Diagonal accent beam */}
        <div
          aria-hidden="true"
          className="absolute -left-1/4 top-0 h-full w-[140%] opacity-[0.05]"
          style={{
            background: "linear-gradient(115deg, transparent 42%, #4b67e8 48%, #4b67e8 50%, transparent 56%)",
          }}
        />
      </div>

      <div className="relative max-w-8xl md:mr-38 mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-y-14">

          {/* ── Left: vertical masthead spine ── */}
          <div className="hidden lg:flex lg:col-span-1 justify-start wlc-fade-in">
            <div className="wlc-spine wlc-sans text-[10px] tracking-[0.5em] uppercase text-[#0a0e28]/40 py-2">
              Global Leadership Network — Est. Consortium
            </div>
          </div>

          {/* ── Center: headline + copy + CTAs ── */}
          <div className="lg:col-span-6 lg:pr-10 flex flex-col justify-center order-2 lg:order-1">
            <div className="flex lg:hidden items-center gap-3 mb-8 wlc-fade-up wlc-d1">
              <span className="block w-8 h-px bg-[#4b67e8]" />
              <span className="wlc-sans text-[10px] font-medium tracking-[0.35em] uppercase text-[#4b67e8]">
                Global Leadership Network
              </span>
            </div>

            <h2
              className="wlc-headline text-[#0a0e28] mb-8 sm:mb-10 wlc-fade-up wlc-d2"
              style={{ fontSize: "clamp(36px, 5.2vw, 72px)" }}
            >
              World Leaders
              <br />
              <span className="wlc-italic text-[#4b67e8]">Consortium.</span>
            </h2>

            <div className="flex items-baseline gap-6 mb-8 sm:mb-10 wlc-fade-up wlc-d3">
              <span className="wlc-headline italic text-[#4b67e8] text-5xl sm:text-6xl leading-none">W</span>
              <span className="wlc-sans text-[#0a0e28] text-sm md:text-base font-medium tracking-wide">
                About the World Leaders Consortium (WLC)
              </span>
            </div>

            <p className="wlc-sans text-[#0a0e28]/65 text-[14px] sm:text-[15px] md:text-base font-light leading-[1.95] sm:leading-[2] mb-10 sm:mb-12 wlc-fade-up wlc-d4 max-w-lg border-l border-[#0a0e28]/10 pl-6 sm:pl-7">
              The World Leaders Consortium (WLC) is a global initiative designed
              to unite leaders from politics, business, academia, and social
              innovation. With a mission to drive sustainable global progress,
              foster international collaboration, and champion ethical
              leadership across borders.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6 wlc-fade-up wlc-d5">
              <Link to="/become-member" className="inline-flex">
                <button className="wlc-cta-secondary inline-flex items-center gap-3 wlc-sans bg-[#0a0e28] hover:bg-[#4b67e8] text-white px-8 sm:px-9 py-3.5 sm:py-4 text-[10px] sm:text-[11px] tracking-[0.35em] sm:tracking-[0.4em] uppercase font-medium transition-colors duration-300">
                  Join WLC
                  <svg className="wlc-arrow" width="18" height="8" viewBox="0 0 18 8" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M0 4h14M11 1l3 3-3 3" />
                  </svg>
                </button>
              </Link>

              <Link to="/about" className="inline-flex">
                <button className="wlc-cta-primary inline-flex items-center gap-3 wlc-sans text-[#0a0e28] px-8 sm:px-9 py-3.5 sm:py-4 text-[10px] sm:text-[11px] tracking-[0.35em] sm:tracking-[0.4em] uppercase font-medium">
                  Read More
                </button>
              </Link>
            </div>
          </div>

          {/* ── Right: full-bleed image with seal badge ── */}
          <div className="lg:col-span-5 relative order-1 lg:order-2 wlc-fade-up wlc-d3">
            <div className="wlc-image-wrap relative overflow-hidden lg:-mr-12 xl:-mr-12 lg:ml-6">
              <img
                src={img}
                alt="World Leaders Consortium"
                className="wlc-image w-full h-[280px] sm:h-[480px] md:h-[560px] lg:h-[450px] object-contain"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(200deg, rgba(10,14,40,0.15) 0%, transparent 35%, rgba(10,14,40,0.30) 100%)" }}
              />

              {/* caption strip */}
              <div className="absolute top-5 left-5 sm:top-7 sm:left-7 z-10 flex items-center gap-2 wlc-sans text-white">
                <span className="text-[9px] sm:text-[10px] tracking-[0.35em] uppercase font-light">
                  A Global Initiative
                </span>
              </div>
            </div>

            {/* Seal / stamp badge, overlapping bottom-left of the image */}
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutWLC;