import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  ArrowUpRight,
  PlayCircle,
  Globe2,
  Compass,
  Sparkles,
  Users,
} from "lucide-react";

/* ---------- animation variants ---------- */
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

const slideLeft = {
  hidden: { opacity: 0, x: 60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

/* ---------- data ---------- */
const STATS = [
  { value: "120+", label: "Member Nations" },
  { value: "4.2K", label: "Global Leaders" },
  { value: "37", label: "Active Verticals" },
];

const PILLARS = [
  {
    icon: Globe2,
    title: "Global Policy",
    text: "Shaping cross-border frameworks that move from rhetoric to results.",
  },
  {
    icon: Compass,
    title: "Leadership Lab",
    text: "Equipping the next generation of decision-makers with tools and trust.",
  },
  {
    icon: Sparkles,
    title: "Innovation Bridge",
    text: "Connecting frontier ideas with the people empowered to scale them.",
  },
  {
    icon: Users,
    title: "Civic Alliances",
    text: "Convening dialogues where citizens, states, and systems intersect.",
  },
];

const OurWorkSection = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      data-testid="our-work-section"
      className="relative bg-[#f5f5f5] overflow-hidden"
    >
      {/* decorative dotted grid (top-left) */}
      <div
        aria-hidden="true"
        className="absolute -top-10 -left-10 h-64 w-64 bg-dots opacity-70 pointer-events-none"
      />
      {/* decorative diagonal blue bar (top-right) */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 h-1.5 w-1/3 bg-[#4b67e8]"
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 md:py-24 lg:py-32">
        {/* ============ Editorial header strip ============ */}
        <div className="grid grid-cols-12 gap-y-6 md:gap-x-8 items-end mb-12 md:mb-20">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="col-span-12 md:col-span-7 flex items-center gap-4"
            data-testid="our-work-issue-tag"
          >
            <span className="font-editorial text-[#4b67e8] text-5xl md:text-6xl leading-none italic">
              01
            </span>
            <span className="h-px w-12 bg-[#4b67e8]/40" />
            <span className="font-geist text-[11px] md:text-xs uppercase tracking-[0.35em] text-gray-500">
              Issue · The Work Edition
            </span>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="col-span-12 md:col-span-5 md:text-right"
          >
            <p className="font-geist text-xs md:text-sm uppercase tracking-[0.3em] text-gray-500">
              World Leaders Consortium
            </p>
            <p className="font-geist text-xs md:text-sm text-gray-400 mt-1">
              Geneva · New York · Singapore
            </p>
          </motion.div>
        </div>

        {/* ============ Headline ============ */}
        <motion.h2
          variants={fadeUp}
          custom={2}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          data-testid="our-work-headline"
          className="font-editorial text-gray-900 text-5xl sm:text-6xl md:text-7xl lg:text-[7.5rem] leading-[0.95] tracking-tight max-w-5xl"
        >
          About the{" "}
          <span className="italic text-[#4b67e8]">World Leaders</span>{" "}
          <br className="hidden md:block" />
          Consortium<span className="text-[#4b67e8]">.</span>
        </motion.h2>

        <motion.div
          variants={fadeUp}
          custom={3}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="mt-8 flex items-center gap-3"
        >
          <div className="h-px w-16 bg-[#4b67e8]" />
          <span className="font-geist text-sm uppercase tracking-[0.35em] text-[#4b67e8] font-medium">
            Our Work
          </span>
        </motion.div>

        {/* ============ Main editorial grid ============ */}
        <div className="mt-12 md:mt-16 grid grid-cols-12 gap-y-12 md:gap-x-10 lg:gap-x-14">
          {/* ----- Left: copy column ----- */}
          <div className="col-span-12 lg:col-span-5 lg:pt-6">
            <motion.p
              variants={fadeUp}
              custom={4}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              data-testid="our-work-lede"
              className="font-editorial text-2xl md:text-3xl leading-snug text-gray-900"
            >
              <span className="float-left font-editorial text-[#4b67e8] text-6xl md:text-7xl leading-none mr-3 mt-1">
                A
              </span>
              t the WLC, we build an inclusive, forward-looking platform that
              gathers leaders, innovators and policymakers to confront the
              defining challenges of our time.
            </motion.p>

            <motion.p
              variants={fadeUp}
              custom={5}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="mt-7 font-geist text-gray-600 text-base md:text-[1.05rem] leading-[1.85]"
            >
              Our work spans verticals designed to maximise global cooperation,
              measurable policy impact, and the transformation of leadership
              itself — from individual mandate to collective imagination.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              custom={6}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                to="/our-work"
                data-testid="our-work-read-more"
                className="group inline-flex items-center gap-2 bg-[#4b67e8] hover:bg-[#3a55d4] text-white px-7 md:px-8 py-3.5 md:py-4 font-geist font-medium text-sm uppercase tracking-[0.2em] rounded-full transition-all duration-300 shadow-[0_8px_30px_-12px_rgba(75,103,232,0.6)] hover:shadow-[0_12px_40px_-10px_rgba(75,103,232,0.7)]"
              >
                Read the Full Story
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

             
            </motion.div>

            {/* Stats strip */}
          
          </div>

          {/* ----- Right: image collage ----- */}
          <div className="col-span-12 lg:col-span-7 relative">
            <motion.div
              variants={slideLeft}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="relative"
              data-testid="our-work-image-card"
            >
              {/* offset blue frame */}
              <div
                aria-hidden="true"
                className="absolute -top-4 -left-4 md:-top-6 md:-left-6 w-full h-full border-2 border-[#4b67e8] hidden sm:block"
              />

              {/* image */}
              <div className="relative overflow-hidden bg-white">
                <img
                  src="https://img1.wsimg.com/isteam/ip/b6c56996-d063-4e20-930c-1d8a40821864/1000503243-a3a1e79.jpg/:/cr=t:5.36%25,l:5.36%25,w:89.29%25,h:89.29%25/rs=w:900,m"
                  alt="WLC Chapter Ambassador of Cyprus meeting the President of Cyprus"
                  className="w-full h-[320px] sm:h-[440px] md:h-[540px] lg:h-[620px] object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.04]"
                />
                {/* subtle bottom gradient */}
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/45 to-transparent pointer-events-none" />

                {/* corner index badge */}
                <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-white/95 backdrop-blur px-3 py-1.5">
                  <span className="font-geist text-[10px] md:text-xs uppercase tracking-[0.3em] text-gray-700">
                    Field Report · Cyprus
                  </span>
                </div>

                {/* caption */}
                <div className="absolute left-0 right-0 bottom-0 p-5 md:p-7">
                  <div className="bg-white border-l-4 border-[#4b67e8] p-4 md:p-5 max-w-xl shadow-xl">
                    <p className="font-editorial text-gray-900 text-base md:text-lg leading-snug">
                      “A constructive, forward-looking dialogue.”
                    </p>
                    <p className="mt-2 font-geist text-xs md:text-[13px] text-gray-600 leading-relaxed">
                      WLC Chapter Ambassador of Cyprus,{" "}
                      <span className="font-semibold text-gray-900">
                        Mr. Vassilios Demetriades
                      </span>
                      , in dialogue with President Nikos Christodoulides.
                    </p>
                  </div>
                </div>
              </div>

              {/* floating editorial chip — bottom-right */}
              <motion.div
                initial={{ opacity: 0, y: 30, rotate: -2 }}
                animate={
                  inView
                    ? { opacity: 1, y: 0, rotate: -2, transition: { delay: 0.7, duration: 0.7 } }
                    : {}
                }
                className="hidden md:block absolute -bottom-8 -right-6 bg-[#4b67e8] text-white px-5 py-4 shadow-2xl"
                data-testid="our-work-floating-chip"
              >
                <div className="font-editorial italic text-2xl leading-none">
                  Vol. XII
                </div>
                <div className="font-geist text-[10px] uppercase tracking-[0.3em] mt-1 opacity-90">
                  Spring · 2026
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ============ Pillars / Verticals ============ */}
        {/* <div className="mt-24 md:mt-32">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14"
          >
            <div>
              <div className="flex items-center gap-3">
                <span className="font-editorial text-[#4b67e8] italic text-3xl">
                  02
                </span>
                <span className="h-px w-10 bg-[#4b67e8]/40" />
                <span className="font-geist text-xs uppercase tracking-[0.35em] text-gray-500">
                  Our Verticals
                </span>
              </div>
              <h3 className="mt-4 font-editorial text-gray-900 text-4xl md:text-5xl leading-tight">
                Four pillars,{" "}
                <span className="italic text-[#4b67e8]">one consortium.</span>
              </h3>
            </div>
            <p className="md:max-w-sm font-geist text-gray-600 text-sm md:text-base leading-relaxed">
              Each pillar is a working group — not a panel. Outcomes are
              published, reviewed and revisited every cycle.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-300/70 border border-gray-300/70">
            {PILLARS.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  variants={fadeUp}
                  custom={i}
                  initial="hidden"
                  animate={inView ? "show" : "hidden"}
                  data-testid={`our-work-pillar-${i}`}
                  className="group relative bg-[#f5f5f5] hover:bg-white p-7 md:p-8 transition-colors duration-500"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 flex items-center justify-center bg-[#4b67e8]/10 text-[#4b67e8] group-hover:bg-[#4b67e8] group-hover:text-white transition-colors duration-500">
                      <Icon className="w-5 h-5" strokeWidth={1.75} />
                    </div>
                    <span className="font-editorial italic text-2xl text-gray-300 group-hover:text-[#4b67e8] transition-colors duration-500">
                      0{i + 1}
                    </span>
                  </div>
                  <h4 className="mt-6 font-editorial text-2xl md:text-[1.6rem] text-gray-900 leading-tight">
                    {p.title}
                  </h4>
                  <p className="mt-3 font-geist text-sm text-gray-600 leading-relaxed">
                    {p.text}
                  </p>
                  <div className="mt-6 h-px w-8 bg-[#4b67e8] group-hover:w-16 transition-all duration-500" />
                </motion.div>
              );
            })}
          </div>
        </div> */}
      </div>

      {/* bottom diagonal accent */}
      <div
        aria-hidden="true"
        className="h-1.5 w-1/4 bg-[#4b67e8] ml-auto"
      />
    </section>
  );
};

export default OurWorkSection;