import { Link } from "react-router-dom";


export default function HeroSection() {
  return (
    <section className="relative min-h-[72svh] w-full overflow-hidden bg-white text-neutral-900">
      <style>{`
        @keyframes hero-ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .hero-ticker-track { animation: hero-ticker 40s linear infinite; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fadeUp { animation: fadeUp 1s cubic-bezier(.2,.7,.2,1) both; }

        @keyframes drawLine {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .drawLine { animation: drawLine 1.4s cubic-bezier(.65,0,.35,1) both; transform-origin: left; }

        @keyframes pulse {
          0%,100% { opacity: 1; }
          50%     { opacity: .3; }
        }
        .pulseDot { animation: pulse 2s ease-in-out infinite; }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .shimmerText {
          background: linear-gradient(90deg, #111 0%, #2563eb 50%, #111 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shimmer 6s linear infinite;
        }

        @keyframes rotateGlobe {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .rotateGlobe { animation: rotateGlobe 90s linear infinite; transform-origin: center; }

        @keyframes drift {
          0%,100% { transform: translate(0,0); }
          50%     { transform: translate(-15px, 10px); }
        }
        .driftSlow { animation: drift 14s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .hero-ticker-track, .pulseDot, .shimmerText, .rotateGlobe, .driftSlow { animation: none; }
          .fadeUp, .drawLine {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* ===== Background: layered gradient + world-system pattern ===== */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Base multi-stop gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-100/50 via-transparent to-transparent" />

        {/* Glow accents */}
        <div className="driftSlow pointer-events-none absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-blue-300/25 blur-[100px]" />
        <div className="driftSlow pointer-events-none absolute -right-20 bottom-0 h-[380px] w-[380px] rounded-full bg-indigo-300/25 blur-[100px]" style={{ animationDelay: "3s" }} />

        {/* Latitude/longitude world-grid pattern */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.22]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="worldGrid" width="70" height="70" patternUnits="userSpaceOnUse">
              <path d="M 70 0 L 0 0 0 70" fill="none" stroke="#1d4ed8" strokeWidth="0.9" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#worldGrid)" />
        </svg>

        {/* Rotating globe/meridian motif, right side */}
        <svg
          viewBox="0 0 400 400"
          className="rotateGlobe pointer-events-none absolute -right-16 top-1/2 h-[440px] w-[440px] -translate-y-1/2 opacity-[0.28] sm:h-[560px] sm:w-[560px]"
          fill="none"
        >
          <circle cx="200" cy="200" r="180" stroke="#2563eb" strokeWidth="1.1" />
          <ellipse cx="200" cy="200" rx="180" ry="70" stroke="#2563eb" strokeWidth="1" />
          <ellipse cx="200" cy="200" rx="180" ry="120" stroke="#2563eb" strokeWidth="1" />
          <ellipse cx="200" cy="200" rx="70" ry="180" stroke="#2563eb" strokeWidth="1" />
          <ellipse cx="200" cy="200" rx="120" ry="180" stroke="#2563eb" strokeWidth="1" />
          <line x1="20" y1="200" x2="380" y2="200" stroke="#2563eb" strokeWidth="1" />
          <line x1="200" y1="20" x2="200" y2="380" stroke="#2563eb" strokeWidth="1" />
        </svg>

        {/* Scattered "city node" dots connected by lines, world-map feel */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.3]"
          viewBox="0 0 1200 800"
          fill="none"
        >
          <g stroke="#2563eb" strokeWidth="0.9">
            <line x1="140" y1="180" x2="380" y2="120" />
            <line x1="380" y1="120" x2="680" y2="220" />
            <line x1="680" y1="220" x2="950" y2="140" />
            <line x1="140" y1="180" x2="300" y2="420" />
            <line x1="300" y1="420" x2="620" y2="500" />
            <line x1="620" y1="500" x2="900" y2="440" />
            <line x1="680" y1="220" x2="620" y2="500" />
          </g>
          <g fill="#2563eb">
            <circle cx="140" cy="180" r="3.5" />
            <circle cx="380" cy="120" r="3.5" />
            <circle cx="680" cy="220" r="3.5" />
            <circle cx="950" cy="140" r="3.5" />
            <circle cx="300" cy="420" r="3.5" />
            <circle cx="620" cy="500" r="3.5" />
            <circle cx="900" cy="440" r="3.5" />
          </g>
        </svg>

        {/* Soft gradient wash for readability, kept light so pattern stays visible */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/55 via-transparent to-white/25" />
      </div>

      {/* ===== Huge background number ===== */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 top-1/2 z-[1] -translate-y-1/2 select-none text-[11rem] font-semibold leading-none tracking-tighter text-neutral-900/[0.05] sm:text-[16rem] lg:text-[24rem]"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        2026
      </div>

      {/* ===== Main column — all left aligned ===== */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-10 md:px-10 lg:pt-14">
        <div className="max-w-4xl text-left">
          <span
            className="fadeUp mb-6 inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.35em] text-neutral-700"
            style={{ fontFamily: "Inter, sans-serif", animationDelay: "0.15s" }}
          >
            <span className="h-px w-10 bg-neutral-900" />
            A Global Dialogue
          </span>

          <h1
            className="fadeUp text-[2.4rem] font-medium leading-[1.03] tracking-tight text-neutral-900 sm:text-5xl md:text-6xl lg:text-[5.5rem]"
            style={{ fontFamily: "'Playfair Display', serif", animationDelay: "0.25s" }}
          >
            A Global <br />
            Dialogue <span className="text-neutral-400">for a</span> <br />
            <em className="italic font-light shimmerText">Better Future.</em>
          </h1>

          <div
            className="fadeUp mt-6 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "0.35s" }}
          >
            <span className="drawLine h-px w-12 bg-neutral-900" />
            <p
              className="text-[11px] uppercase tracking-[0.35em] text-neutral-700"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Collaborative · Visionary · Global
            </p>
          </div>

          <p
            className="fadeUp mt-6 max-w-xl text-base leading-relaxed text-neutral-800 sm:text-lg"
            style={{ fontFamily: "Inter, sans-serif", animationDelay: "0.4s" }}
          >
            Bringing together global leaders, innovators and visionaries to
            shape the conversations that define tomorrow.
          </p>

          <div
            className="fadeUp mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center"
            style={{ animationDelay: "0.5s" }}
          >
            <Link
              to="/become-member"
              className="group inline-flex items-center justify-center gap-3 bg-neutral-900 px-10 py-4 text-xs font-medium uppercase tracking-[0.3em] text-white transition-all duration-300 hover:bg-blue-600"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Explore Now
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Now Streaming — inline, left aligned */}
          <div
            className="fadeUp mt-10 flex flex-wrap items-center gap-6 border-t border-neutral-200 pt-5"
            style={{ animationDelay: "0.55s" }}
          >
            <span
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-neutral-700"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <span className="pulseDot h-2 w-2 rounded-full bg-blue-600" />
              Now Streaming
            </span>
            <span
              className="text-sm text-neutral-800"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Keynote · The Future of Global Energy & Cooperation
            </span>
            <span
              className="text-[10px] uppercase tracking-[0.3em] text-neutral-500"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              12.4k watching
            </span>
          </div>
        </div>
      </div>

      {/* ===== Side rail (desktop only) ===== */}
      <div className="pointer-events-none absolute left-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex">
        <span className="h-12 w-px bg-neutral-900/30" />
        <span
          className="rotate-180 text-[10px] uppercase tracking-[0.4em] text-neutral-700 [writing-mode:vertical-rl]"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Scroll to Discover
        </span>
        <span className="h-12 w-px bg-neutral-900/30" />
      </div>

     
    </section>
  );
}