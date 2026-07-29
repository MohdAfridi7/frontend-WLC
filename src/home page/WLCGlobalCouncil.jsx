import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import img from '../../public/image/ha3.webp'
import {
  ArrowUpRight,
  Globe,
  Leaf,
  GraduationCap,
  HeartPulse,
  Scale,
  Cpu,
} from "lucide-react";

/* ---------- animations ---------- */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};



const WLCGlobalCouncil = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      data-testid="wlc-council-section"
      className="relative bg-white overflow-hidden"
    >
      {/* ===== Decorative background ===== */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 h-1.5 w-1/3 bg-[#4B67D1]"
      />
      <div
        aria-hidden="true"
        className="absolute -top-12 -right-12 h-80 w-80 bg-dots opacity-60 pointer-events-none"
      />
      {/* huge faded glyph */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 -left-10 font-editorial italic text-[#4B67D1]/[0.05] leading-none select-none pointer-events-none hidden md:block"
        style={{ fontSize: "clamp(220px, 26vw, 380px)" }}
      >
        Council
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 md:py-24 lg:py-28">
        {/* ===== Editorial header ===== */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16"
          data-testid="council-header"
        >
          <div className="flex items-center gap-4">
            <span className="font-editorial italic text-[#4B67D1] text-5xl md:text-6xl leading-none">
              05
            </span>
            <span className="h-px w-12 bg-[#4B67D1]/40" />
            <div>
              <p className="font-geist text-[11px] md:text-xs uppercase tracking-[0.4em] text-gray-500">
                Chambers · The Council Brief
              </p>
              <p className="font-geist text-[11px] md:text-xs uppercase tracking-[0.3em] text-gray-400 mt-1">
                Convened across six chambers
              </p>
            </div>
          </div>

          <div className="font-geist text-xs uppercase tracking-[0.3em] text-gray-500">
            WLC · Standing Order 2026/05
          </div>
        </motion.div>

        {/* ===== Headline ===== */}
        <motion.h2
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          data-testid="council-headline"
          className="font-editorial text-gray-900 text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] leading-[0.95] tracking-tight max-w-5xl"
        >
          WLC Global{" "}
          <span className="italic text-[#4B67D1]">Council</span>
          <span className="text-[#4B67D1]">.</span>
        </motion.h2>

        <motion.div
          variants={fadeUp}
          custom={2}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="mt-8 flex items-center gap-3"
        >
          <div className="h-px w-16 bg-[#4B67D1]" />
          <span className="font-geist text-sm uppercase tracking-[0.35em] text-[#4B67D1] font-medium">
            Specialised Chambers
          </span>
        </motion.div>

        {/* ===== Intro grid: emblem + lede ===== */}
        <div className="mt-14 md:mt-20 grid grid-cols-12 gap-y-12 md:gap-x-10 lg:gap-x-16 items-center">
          {/* ----- Emblem (left) ----- */}
          <div className="col-span-12 lg:col-span-5 flex justify-center lg:justify-start">
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="relative w-[300px] sm:w-[360px] md:w-[420px] aspect-square"
              data-testid="council-emblem"
            >
              {/* concentric rings */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full border border-[#4B67D1]/20"
              />
              <motion.div
                aria-hidden="true"
                className="absolute inset-6 rounded-full border-2 border-dashed border-[#4B67D1]/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-12 rounded-full bg-[#4B67D1]/[0.04]"
              />

              {/* badge image */}
              <div className="absolute inset-16 sm:inset-20 rounded-full overflow-hidden bg-white shadow-[0_20px_60px_-20px_rgba(75,103,209,0.45)]">
                <img
                  src={img}
                  alt="WLC Global Council"
                  className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out hover:scale-105"
                />
              </div>

              {/* orbiting badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  inView
                    ? { opacity: 1, y: 0, transition: { delay: 0.7, duration: 0.7 } }
                    : {}
                }
                className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#4B67D1] text-white px-4 py-2 shadow-xl"
                data-testid="council-badge-est"
              >
                <span className="font-geist text-[10px] uppercase tracking-[0.3em]">
                  Est. 2026
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={
                  inView
                    ? { opacity: 1, x: 0, transition: { delay: 0.85, duration: 0.7 } }
                    : {}
                }
                className="hidden sm:block absolute top-1/2 -left-4 -translate-y-1/2 bg-white border border-[#4B67D1]/30 text-[#4B67D1] px-3 py-2 shadow-lg"
                data-testid="council-badge-chambers"
              >
                <div className="font-editorial italic text-2xl leading-none">06</div>
                <div className="font-geist text-[9px] uppercase tracking-[0.25em] text-gray-500 mt-1">
                  Chambers
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={
                  inView
                    ? { opacity: 1, x: 0, transition: { delay: 1, duration: 0.7 } }
                    : {}
                }
                className="hidden sm:block absolute bottom-6 -right-4 bg-white border border-[#4B67D1]/30 text-gray-900 px-3 py-2 shadow-lg"
                data-testid="council-badge-quorum"
              >
                <div className="font-editorial italic text-xl leading-none text-[#4B67D1]">
                  ✦
                </div>
                <div className="font-geist text-[9px] uppercase tracking-[0.25em] text-gray-500 mt-1">
                  Quorum · 2026
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* ----- Lede (right) ----- */}
          <div className="col-span-12 lg:col-span-7">
            <motion.p
              variants={fadeUp}
              custom={3}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              data-testid="council-lede"
              className="font-editorial text-2xl md:text-[1.85rem] leading-snug text-gray-900"
            >
              <span className="float-left font-editorial text-[#4B67D1] text-6xl md:text-7xl leading-none mr-3 mt-1">
                T
              </span>
              he World Leaders Consortium unites experts, policymakers and
              changemakers through{" "}
              <span className="italic text-[#4B67D1]">specialised councils</span>{" "}
              addressing the most pressing global challenges of our era.
            </motion.p>

            <motion.p
              variants={fadeUp}
              custom={4}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="mt-7 font-geist text-gray-600 text-base md:text-[1.05rem] leading-[1.85] max-w-2xl"
            >
              Each chamber develops solutions, influences policy, and empowers
              communities — from diplomacy and climate action to education,
              health, gender equality and digital transformation. Join as a
              member, youth delegate or advisor to create impact.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={5}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                to="/global-councils"
                data-testid="council-learn-more-btn"
                className="group inline-flex items-center gap-2 bg-[#4B67D1] hover:bg-[#1a2a8a] text-white px-7 md:px-8 py-3.5 md:py-4 font-geist font-medium text-sm uppercase tracking-[0.2em] rounded-full transition-all duration-300 shadow-[0_10px_30px_-12px_rgba(75,103,209,0.7)] hover:shadow-[0_14px_40px_-10px_rgba(75,103,209,0.8)]"
              >
                Learn More
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              
            </motion.div>
          </div>
        </div>

       
      </div>

      {/* bottom diagonal accent */}
      <div aria-hidden="true" className="h-1.5 w-1/4 bg-[#4B67D1] ml-auto" />
    </section>
  );
};

export default WLCGlobalCouncil;