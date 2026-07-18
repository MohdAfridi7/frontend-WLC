import React from "react";
import { Link } from "react-router-dom";
import { Quote, ArrowUpRight, BadgeCheck } from "lucide-react";

const AboutWlc = () => {
  return (
    <section className="relative overflow-hidden bg-gray-100 py-20 md:py-28">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fadeUp { animation: fadeUp 1s cubic-bezier(.2,.7,.2,1) both; }

        @keyframes drawLine {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .drawLine { animation: drawLine 1.4s ease both; transform-origin: left; }

        @keyframes floatY {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(-10px); }
        }
        .floatY { animation: floatY 7s ease-in-out infinite; }

        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .shimmerText {
          background: linear-gradient(90deg,#44536C 0%,#4B67D1 50%,#44536C 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shimmer 6s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .fadeUp,.drawLine,.floatY,.shimmerText { animation: none !important; }
        }
      `}</style>

      {/* Decorative background */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-10 top-10 select-none text-[14rem] font-bold leading-none tracking-tighter text-[#4B67D1]/[0.05] sm:text-[20rem] lg:text-[26rem]"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        WLC
      </div>
      <div className="pointer-events-none absolute -top-32 right-1/4 h-96 w-96 rounded-full bg-[#4B67D1]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -left-20 h-72 w-72 rounded-full bg-[#4B67D1]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">

        {/* ===== Chapter label ===== */}
        <div className="fadeUp mb-8 flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-[#4B67D1]">
            <span className="drawLine h-px w-10 bg-[#4B67D1]" />
            A Message · From The Desk
            <span className="drawLine h-px w-10 bg-[#4B67D1]" />
          </span>

          <h2
            className="mt-6 text-4xl font-medium leading-[1.05] tracking-tight text-[#44536C] sm:text-5xl md:text-6xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Message From <em className="italic font-light shimmerText">President's Desk.</em>
          </h2>
        </div>

        {/* ===== Main Content ===== */}
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">

          {/* ---- LEFT: Portrait card ---- */}
          <div className="fadeUp lg:col-span-5">
            <div className="relative mx-auto max-w-md">

              {/* Decorative frame */}
              <div className="absolute -inset-3 border border-[#4B67D1]/30" />
              <div className="absolute -bottom-4 -right-4 h-24 w-24 border-b-2 border-r-2 border-[#4B67D1]" />
              <div className="absolute -top-4 -left-4 h-24 w-24 border-t-2 border-l-2 border-[#4B67D1]" />

              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src="https://img1.wsimg.com/isteam/ip/b6c56996-d063-4e20-930c-1d8a40821864/1000519841-9ce0475.jpg/:/cr=t:1.57%25,l:33.37%25,w:56.87%25,h:97.22%25/rs=w:800,h:602,cg:true,m"
                  alt="Dr Rajat Shrivastava, President, WLC"
                  className="h-[520px] w-full object-cover transition-transform duration-[6000ms] hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#44536C]/40 via-transparent to-transparent" />

                {/* Floating badge */}
                <div className="floatY absolute right-4 top-4 flex items-center gap-2 border border-white/30 bg-white/85 px-3 py-2 backdrop-blur">
                  <BadgeCheck size={14} className="text-[#4B67D1]" />
                  <span
                    className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#44536C]"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Since 2025
                  </span>
                </div>

                {/* Bottom name plate */}
                <div className="absolute inset-x-4 bottom-4 border border-white/20 bg-white/90 p-4 backdrop-blur">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#4B67D1]">
                    President
                  </span>
                  <p
                    className="mt-1 text-xl leading-tight text-[#44536C]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Dr Rajat Shrivastava
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ---- RIGHT: Quote block ---- */}
          <div
            className="fadeUp lg:col-span-7 flex flex-col justify-center"
            style={{ animationDelay: "0.2s" }}
          >
            {/* Giant quote mark */}
            <Quote
              size={80}
              className="text-[#4B67D1]/25 mb-6"
              strokeWidth={1}
            />

            <span className="text-[11px] uppercase tracking-[0.35em] text-[#4B67D1]">
              Dr Rajat Shrivastava · President, WLC
            </span>

            <h3
              className="mt-4 text-3xl font-medium leading-[1.2] tracking-tight text-[#44536C] sm:text-4xl md:text-[2.5rem]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              "In a time of unprecedented global disruption, the world needs{" "}
              <em className="italic font-light text-[#4B67D1]">
                courageous conversations
              </em>{" "}
              and committed collaborations."
            </h3>

            <div className="mt-8 flex items-center gap-4">
              <span className="drawLine h-px w-14 bg-[#4B67D1]" />
              <p
                className="text-[11px] uppercase tracking-[0.35em] text-[#44536C]/70"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                A Movement, Not a Forum
              </p>
            </div>

            <p
              className="mt-8 text-base leading-[1.9] text-[#44536C] md:text-[17px]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              The WLC is more than a forum — it's a movement. A movement to
              co-create the future of leadership, to align our actions with the
              UN Sustainable Development Goals, and to empower people from all
              walks of life to lead with purpose and integrity.
            </p>

            {/* Signature block */}
            <div className="mt-10 flex items-center gap-6 border-t border-[#44536C]/15 pt-6">
              <div>
                <p
                  className="text-2xl leading-tight text-[#44536C]"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: "italic",
                  }}
                >
                  Dr Rajat Shrivastava
                </p>
                <p
                  className="mt-1 text-[11px] uppercase tracking-[0.3em] text-[#4B67D1]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  President · World Leaders Consortium
                </p>
              </div>

              <span className="hidden h-14 w-px bg-[#44536C]/20 sm:block" />

              <Link
                to="/our-team"
                className="group ml-auto inline-flex items-center gap-3 bg-[#4B67D1] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-white transition-all hover:bg-[#44536C]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Meet The Team
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutWlc;