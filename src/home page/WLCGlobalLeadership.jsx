import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import img from '../../public/image/ha2.webp'
import {
  ArrowUpRight,
  Landmark,
  Megaphone,
  Rocket,
  Lightbulb,
  Newspaper,
  GraduationCap,
  Handshake,
} from "lucide-react";

/* ---------- animation variants ---------- */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 },
  }),
};

const slideLeft = {
  hidden: { opacity: 0, x: 60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

/* ---------- roster data ---------- */
const ROSTER = [
  { icon: Landmark, role: "Policymakers", note: "shaping sustainable policies." },
  { icon: Megaphone, role: "Activists", note: "advocating for equality & human rights." },
  { icon: Rocket, role: "Entrepreneurs", note: "driving economic & social innovation." },
  { icon: Lightbulb, role: "Innovators", note: "creating solutions for global challenges." },
  { icon: Newspaper, role: "Journalists", note: "amplifying critical narratives." },
  { icon: GraduationCap, role: "Educators", note: "empowering future leaders." },
  { icon: Handshake, role: "Diplomats", note: "fostering international cooperation." },
];

const COMPOSITION = [
  { value: "07", label: "Disciplines" },
  { value: "42", label: "Nationalities" },
  { value: "100%", label: "Mission-aligned" },
];

const WLCGlobalLeadership = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      data-testid="wlc-leadership-section"
      className="relative bg-gray-100 overflow-hidden"
    >
      {/* ===== Decorative background ===== */}
      <div
        aria-hidden="true"
        className="absolute -top-10 right-0 h-72 w-72 bg-dots opacity-70 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 h-1.5 w-1/3 bg-[#4B67D1]"
      />
      {/* giant faded "WLC" mark */}
      <div
        aria-hidden="true"
        className="absolute -bottom-16 -left-8 font-editorial italic text-[#4B67D1]/[0.06] leading-none select-none pointer-events-none hidden md:block"
        style={{ fontSize: "clamp(220px, 28vw, 420px)" }}
      >
        WLC
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 md:py-24 lg:py-28">
        {/* ===== Editorial header ===== */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20"
          data-testid="leadership-header"
        >
          <div className="flex items-center gap-4">
            <span className="font-editorial italic text-[#4B67D1] text-5xl md:text-6xl leading-none">
              04
            </span>
            <span className="h-px w-12 bg-[#4B67D1]/40" />
            <div>
              <p className="font-geist text-[11px] md:text-xs uppercase tracking-[0.4em] text-gray-500">
                Masthead · The Roster
              </p>
              <p className="font-geist text-[11px] md:text-xs uppercase tracking-[0.3em] text-gray-400 mt-1">
                Edition · Spring 2026
              </p>
            </div>
          </div>

          <div className="font-geist text-xs uppercase tracking-[0.3em] text-gray-500">
            Geneva · New York · Singapore
          </div>
        </motion.div>

        {/* ===== Headline ===== */}
        <motion.h2
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          data-testid="leadership-headline"
          className="font-editorial text-gray-900 text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] leading-[0.95] tracking-tight max-w-5xl"
        >
          WLC Global{" "}
          <span className="italic text-[#4B67D1]">Leadership</span>
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
            The Global Team
          </span>
        </motion.div>

        {/* ===== Main grid ===== */}
        <div className="mt-14 md:mt-20 grid grid-cols-12 gap-y-14 md:gap-x-10 lg:gap-x-16 items-start">
          {/* ----- Left: numbered roster ----- */}
          <div className="col-span-12 lg:col-span-7 order-2 lg:order-1">
            <motion.p
              variants={fadeUp}
              custom={3}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              data-testid="leadership-lede"
              className="font-editorial text-2xl md:text-3xl leading-snug text-gray-900 max-w-2xl"
            >
              <span className="float-left font-editorial text-[#4B67D1] text-6xl md:text-7xl leading-none mr-3 mt-1">
                T
              </span>
              he WLC Global Team is a diverse network of professionals
              committed to global change. The masthead reads as a roll call of
              quiet conviction:
            </motion.p>

            {/* roster list */}
            <ul
              className="mt-12 divide-y divide-gray-300/70 border-t border-b border-gray-300/70"
              data-testid="leadership-roster"
            >
              {ROSTER.map((r, i) => {
                const Icon = r.icon;
                return (
                  <motion.li
                    key={r.role}
                    variants={fadeUp}
                    custom={4 + i}
                    initial="hidden"
                    animate={inView ? "show" : "hidden"}
                    data-testid={`leadership-roster-${i}`}
                    className="group flex items-center gap-4 md:gap-6 py-5 md:py-6 hover:bg-white/60 transition-colors duration-500 px-2 md:px-4 -mx-2 md:-mx-4 cursor-default"
                  >
                    {/* index number */}
                    <span className="font-editorial italic text-gray-300 group-hover:text-[#4B67D1] transition-colors duration-500 text-2xl md:text-3xl w-10 md:w-12 leading-none">
                      0{i + 1}
                    </span>

                    {/* icon chip */}
                    <span className="w-11 h-11 md:w-12 md:h-12 flex-shrink-0 flex items-center justify-center bg-[#4B67D1]/10 text-[#4B67D1] group-hover:bg-[#4B67D1] group-hover:text-white transition-colors duration-500">
                      <Icon className="w-5 h-5" strokeWidth={1.75} />
                    </span>

                    {/* role + note */}
                    <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-baseline md:gap-3">
                      <h4 className="font-editorial text-gray-900 text-xl md:text-2xl leading-tight">
                        {r.role}
                      </h4>
                      <p className="font-geist text-sm md:text-[0.95rem] text-gray-600 leading-relaxed md:flex-1 md:truncate">
                        {r.note}
                      </p>
                    </div>

                    {/* arrow */}
                    <ArrowUpRight
                      className="w-4 h-4 md:w-5 md:h-5 text-gray-300 group-hover:text-[#4B67D1] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0"
                      strokeWidth={1.75}
                    />
                  </motion.li>
                );
              })}
            </ul>

            {/* italic closing line */}
            <motion.p
              variants={fadeUp}
              custom={12}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="mt-10 font-editorial italic text-gray-700 text-xl md:text-2xl leading-snug max-w-2xl"
            >
              Together, the WLC team works toward{" "}
              <span className="text-[#4B67D1]">collaboration</span>,{" "}
              <span className="text-[#4B67D1]">innovation</span>, and impactful
              global action.
            </motion.p>

            {/* CTA */}
            <motion.div
              variants={fadeUp}
              custom={13}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                to="/our-team"
                data-testid="leadership-our-team-btn"
                className="group inline-flex items-center gap-2 bg-[#4B67D1] hover:bg-[#1a2a8a] text-white px-7 md:px-8 py-3.5 md:py-4 font-geist font-medium text-sm uppercase tracking-[0.2em] rounded-full transition-all duration-300 shadow-[0_10px_30px_-12px_rgba(75,103,209,0.7)] hover:shadow-[0_14px_40px_-10px_rgba(75,103,209,0.8)]"
              >
                Meet Our Team
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

             
            </motion.div>
          </div>

          {/* ----- Right: portrait card ----- */}
          <div className="col-span-12 lg:col-span-5 order-1 lg:order-2 relative lg:sticky lg:top-24">
            <motion.div
              variants={slideLeft}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="relative"
              data-testid="leadership-portrait"
            >
              {/* offset frame */}
              <div
                aria-hidden="true"
                className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-full h-full border-2 border-[#4B67D1] hidden sm:block"
              />

              {/* image */}
              <div className="relative overflow-hidden bg-white">
                <img
                  src={img}
                  alt="WLC Global Team"
                  className="w-full h-[420px] sm:h-[520px] md:h-[600px] lg:h-[640px] object-cover transition-transform duration-[1400ms] ease-out hover:scale-[1.04]"
                />

                {/* duotone wash */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#4B67D1]/40 via-transparent to-transparent pointer-events-none" />

               

              
              </div>

             
            </motion.div>
          </div>
        </div>

        {/* ===== Composition strip ===== */}
       
      </div>

      {/* bottom diagonal accent */}
      <div aria-hidden="true" className="h-1.5 w-1/4 bg-[#4B67D1] ml-auto" />
    </section>
  );
};

export default WLCGlobalLeadership;