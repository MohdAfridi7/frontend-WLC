
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Quote, ArrowUpRight, BadgeCheck } from "lucide-react";

/* ---------- animation variants ---------- */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};

const slideRight = {
  hidden: { opacity: 0, x: -60 },
  show: { opacity: 1, x: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};

/* ---------- credentials data ---------- */
const CREDENTIALS = [
  { label: "Tenure", value: "Former Head of State" },
  { label: "Nation", value: "San Marino" },
  { label: "Affiliation", value: "WLC Member" },
];

const LeadershipImpact = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      data-testid="leadership-impact-section"
      className="relative bg-[#4967e8] overflow-hidden"
    >
      {/* ===== Decorative background layers ===== */}
      {/* large faint quote glyph */}
      <div
        aria-hidden="true"
        className="absolute -top-20 right-4 md:right-16 font-editorial italic text-white/[0.07] leading-none select-none pointer-events-none"
        style={{ fontSize: "clamp(280px, 38vw, 560px)" }}
      >
        ”
      </div>

      {/* diagonal grid pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(45deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* gradient orbs */}
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-white/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute top-0 right-1/4 w-72 h-72 rounded-full bg-[#7d96ff]/30 blur-3xl"
      />

      {/* top thin accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/20" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 md:py-24 lg:py-28">
        {/* ===== Editorial header strip ===== */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20"
          data-testid="impact-header"
        >
          <div className="flex items-center gap-4">
            <span className="font-editorial italic text-white text-5xl md:text-6xl leading-none">
              03
            </span>
            <span className="h-px w-12 bg-white/40" />
            <div>
              <p className="font-geist text-[11px] md:text-xs uppercase tracking-[0.4em] text-white/70">
                Voices · Leadership Impact
              </p>
              <p className="font-geist text-[11px] md:text-xs uppercase tracking-[0.3em] text-white/40 mt-1">
                In conversation with WLC
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-white/80">
            <BadgeCheck className="w-4 h-4" strokeWidth={1.75} />
            <span className="font-geist text-xs uppercase tracking-[0.3em]">
              Verified Statement · Vol. XII
            </span>
          </div>
        </motion.div>

        {/* ===== Main grid ===== */}
        <div className="grid grid-cols-12 gap-y-12 md:gap-x-10 lg:gap-x-16 items-start">
          {/* ----- Left: portrait stack ----- */}
          <div className="col-span-12 lg:col-span-5">
            <motion.div
              variants={slideRight}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="relative"
              data-testid="impact-portrait"
            >
              {/* offset white frame */}
              <div
                aria-hidden="true"
                className="absolute -top-4 -left-4 md:-top-6 md:-left-6 w-full h-full border-2 border-white/40 hidden sm:block"
              />

              {/* portrait */}
              <div className="relative overflow-hidden bg-[#3a55d4]">
                <img
                  src="https://img1.wsimg.com/isteam/ip/b6c56996-d063-4e20-930c-1d8a40821864/1000511703.png/:/cr=t:0%25,l:0%25,w:96.14%25,h:100%25/rs=w:1280,h:1280"
                  alt="Paolo Rondelli, Former President of San Marino"
                  className="w-full h-[380px] sm:h-[480px] md:h-[560px] lg:h-[640px] object-cover transition-transform duration-[1400ms] ease-out hover:scale-[1.04]"
                />

                {/* duotone overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#4967e8]/60 via-transparent to-transparent pointer-events-none" />

                {/* corner tag */}
                <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-white px-3 py-1.5">
                  <span className="font-geist text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#4967e8] font-medium">
                    Portrait · 2026
                  </span>
                </div>

                {/* name plate at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                  <div className="bg-white/95 backdrop-blur border-l-4 border-[#4967e8] p-4 md:p-5 max-w-md shadow-2xl">
                    <p className="font-editorial text-gray-900 text-xl md:text-2xl leading-tight">
                      Paolo Rondelli
                    </p>
                    <p className="mt-1.5 font-geist text-[11px] md:text-xs uppercase tracking-[0.25em] text-gray-500">
                      Former Captain Regent · San Marino
                    </p>
                  </div>
                </div>
              </div>

             
            </motion.div>
          </div>

          {/* ----- Right: testimonial column ----- */}
          <div className="col-span-12 lg:col-span-7 lg:pt-4">
            {/* Quote glyph */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/15 backdrop-blur border border-white/25 flex items-center justify-center">
                <Quote
                  className="w-6 h-6 md:w-7 md:h-7 text-white"
                  strokeWidth={1.5}
                  fill="currentColor"
                />
              </div>
              <div className="flex-1 h-px bg-white/20" />
              <span className="font-geist text-[11px] md:text-xs uppercase tracking-[0.3em] text-white/60">
                The Statement
              </span>
            </motion.div>

            {/* Pull quote — editorial serif */}
            <motion.blockquote
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              data-testid="impact-quote"
              className="font-editorial text-white text-3xl sm:text-4xl md:text-5xl lg:text-[2.5rem] leading-[1.1] tracking-tight"
            >
              <span className="text-white/40 mr-1">“</span>
              Emphasizing the impact of UEFA’s Club Licensing system in strengthening football governance and management over 25 years. It highlights transparency, accountability, and long-term vision, while presenting football as a global platform for leadership, collaboration, and sustainable growth.

             
              <span className="text-white/40 ml-1">”</span>
            </motion.blockquote>

          

            {/* Attribution row */}
            <motion.div
              variants={fadeUp}
              custom={3}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="mt-12 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7"
              data-testid="impact-attribution"
            >
              <div className="h-px w-16 bg-white" />
              <div>
                <p className="font-editorial text-white text-2xl md:text-3xl leading-tight">
                  Paolo Rondelli
                </p>
                <p className="font-geist text-white/70 text-sm md:text-[0.95rem] mt-1.5">
                  Former President of San Marino ·{" "}
                  <span className="text-white">Member, WLC</span>
                </p>
              </div>
            </motion.div>

            {/* Credentials strip */}
            <motion.div
              variants={fadeUp}
              custom={4}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="mt-10 grid grid-cols-3 gap-3 md:gap-5 border-t border-white/20 pt-6"
            >
              {CREDENTIALS.map((c, i) => (
                <div key={c.label} data-testid={`impact-credential-${i}`}>
                  <p className="font-geist text-[10px] md:text-xs uppercase tracking-[0.25em] text-white/50">
                    {c.label}
                  </p>
                  <p className="mt-2 font-editorial text-white text-base md:text-xl leading-snug">
                    {c.value}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              variants={fadeUp}
              custom={5}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="mt-12 flex flex-wrap items-center gap-4"
            >
              <a
                href="#full-statement"
                data-testid="impact-read-full"
                className="group inline-flex items-center gap-2 bg-white text-[#4967e8] hover:bg-[#1a2a8a] hover:text-white px-7 md:px-8 py-3.5 md:py-4 font-geist font-medium text-sm uppercase tracking-[0.2em] rounded-full transition-all duration-300 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.4)]"
              >
                Read the Full Address
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

             
            </motion.div>
          </div>
        </div>
      </div>

      {/* bottom thin accent line */}
      <div className="relative h-px bg-white/20" />
    </section>
  );
};

export default LeadershipImpact;