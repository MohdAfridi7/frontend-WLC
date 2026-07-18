import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { ArrowUpRight, Radio } from "lucide-react";
import img from '../../public/image/blog-4.webp'

/* ---------- animations ---------- */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

const slideRight = {
  hidden: { opacity: 0, x: -60 },
  show: { opacity: 1, x: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};

const SOCIALS = [
  {
    Icon: FaFacebookF,
    label: "Facebook",
    href: "https://www.facebook.com/people/World-Leaders-Consortium/61575084506451/",
    testid: "dialogue-social-facebook",
  },
  {
    Icon: FaInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/worldleadersconsortium",
    testid: "dialogue-social-instagram",
  },
  {
    Icon: FaLinkedinIn,
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/worldleadersconsortium/",
    testid: "dialogue-social-linkedin",
  },
];

const GlobalDialogue = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      data-testid="global-dialogue-section"
      className="relative bg-gray-100 overflow-hidden"
    >
      {/* top thin accent + corner dots */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px bg-[#4B67D1]/20 z-10"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-12 -right-12 h-72 w-72 bg-dots opacity-60 pointer-events-none z-10"
      />

      <div className="relative grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[640px]">
        {/* ============ Left: editorial image panel ============ */}
        <motion.div
          variants={slideRight}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="relative lg:col-span-7 order-1"
          data-testid="dialogue-image-panel"
        >
          <div className="relative w-full h-[340px] sm:h-[440px] lg:h-full lg:min-h-[720px] overflow-hidden">
            <img
              src={img}
              alt="WLC Global Dialogue"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1600ms] ease-out hover:scale-[1.05]"
            />

            {/* duotone blue wash */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-br from-[#4B67D1]/55 via-[#4B67D1]/25 to-transparent mix-blend-multiply pointer-events-none"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"
            />

            {/* corner editorial tag — top-left */}
            <motion.div
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="absolute top-6 left-6 md:top-10 md:left-10 flex items-center gap-3"
              data-testid="dialogue-issue-tag"
            >
              <span className="font-editorial italic text-white text-5xl md:text-6xl leading-none">
                06
              </span>
              <span className="h-px w-10 bg-white/50" />
              <div>
                <p className="font-geist text-[10px] md:text-xs uppercase tracking-[0.35em] text-white/90">
                  Broadcast · Dialogues
                </p>
                <p className="font-geist text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/60 mt-1">
                  One-to-One · Series
                </p>
              </div>
            </motion.div>

            {/* live / on-air chip — top-right */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={
                inView
                  ? { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.6 } }
                  : {}
              }
              className="absolute top-6 right-6 md:top-10 md:right-10 flex items-center gap-2 bg-white px-3 py-1.5 shadow-xl"
              data-testid="dialogue-onair-chip"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4B67D1] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4B67D1]" />
              </span>
              <span className="font-geist text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#4B67D1] font-medium">
                On Air · WLC
              </span>
            </motion.div>

            {/* big pull-quote glyph */}
            <div
              aria-hidden="true"
              className="absolute -bottom-8 left-6 md:left-10 font-editorial italic text-white/25 leading-none select-none pointer-events-none"
              style={{ fontSize: "clamp(160px, 18vw, 280px)" }}
            >
              ”
            </div>

           
          </div>
        </motion.div>

        {/* ============ Right: editorial copy panel ============ */}
        <div className="relative lg:col-span-5 order-2 bg-white">
          {/* huge faded watermark */}
          <div
            aria-hidden="true"
            className="absolute -top-6 right-4 font-editorial italic text-[#4B67D1]/[0.05] leading-none select-none pointer-events-none hidden md:block"
            style={{ fontSize: "clamp(180px, 18vw, 260px)" }}
          >
            06
          </div>
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 h-full w-1 bg-[#4B67D1] hidden lg:block"
          />

          <div className="relative px-6 sm:px-10 md:px-14 lg:px-16 py-14 md:py-20 lg:py-24 flex flex-col justify-center min-h-full">
            {/* kicker */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="flex items-center gap-3"
              data-testid="dialogue-kicker"
            >
              <Radio className="w-4 h-4 text-[#4B67D1]" strokeWidth={1.75} />
              <span className="font-geist text-xs uppercase tracking-[0.35em] text-[#4B67D1] font-medium">
                The Interview Series
              </span>
            </motion.div>

            {/* headline */}
            <motion.h2
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              data-testid="dialogue-headline"
              className="mt-6 font-editorial text-gray-900 text-5xl sm:text-6xl md:text-[5rem] leading-[0.95] tracking-tight"
            >
              WLC Global{" "}
              <span className="italic text-[#4B67D1]">Dialogue</span>
              <span className="text-[#4B67D1]">.</span>
            </motion.h2>

            <motion.div
              variants={fadeUp}
              custom={2}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="mt-7 flex items-center gap-3"
            >
              <div className="h-px w-12 bg-[#4B67D1]" />
              <span className="font-editorial italic text-[#4B67D1] text-lg md:text-xl">
                Voices Shaping Tomorrow
              </span>
            </motion.div>

            {/* body */}
            <motion.p
              variants={fadeUp}
              custom={3}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              data-testid="dialogue-body"
              className="mt-7 font-geist text-gray-600 text-base md:text-[1.05rem] leading-[1.85]"
            >
              <span className="font-editorial text-gray-900 text-lg md:text-xl">
                Global Dialogues: Voices Shaping Tomorrow
              </span>{" "}
              is a one-to-one interview series by the WLC, featuring global
              leaders and changemakers. These insightful conversations explore
              key themes like the{" "}
              <span className="text-[#4B67D1] font-medium">UN SDGs</span>, the
              global economy, education, innovation, art, culture, and
              diplomacy — to inspire action and shape the future.
            </motion.p>

            {/* CTA */}
            <motion.div
              variants={fadeUp}
              custom={4}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="mt-10 flex flex-wrap items-center gap-5"
            >
              <Link
                to="/global-dialogue"
                data-testid="dialogue-register-btn"
                className="group inline-flex items-center gap-2 bg-[#4B67D1] hover:bg-[#1a2a8a] text-white px-8 md:px-10 py-4 font-geist font-medium text-sm uppercase tracking-[0.2em] rounded-full transition-all duration-300 shadow-[0_10px_30px_-12px_rgba(75,103,209,0.7)] hover:shadow-[0_14px_40px_-10px_rgba(75,103,209,0.85)]"
              >
                Register Now
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>

            {/* social — editorial row, no pop colors */}
            <motion.div
              variants={fadeUp}
              custom={5}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center gap-5"
              data-testid="dialogue-social-row"
            >
              <span className="font-geist text-[11px] uppercase tracking-[0.35em] text-gray-500">
                Follow the broadcast
              </span>

              <span className="hidden sm:block h-px flex-1 bg-gray-200" />

              <div className="flex items-center gap-3">
                {SOCIALS.map(({ Icon, label, href, testid }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    data-testid={testid}
                    className="group w-11 h-11 rounded-full border border-gray-300 text-gray-700 hover:bg-[#4B67D1] hover:border-[#4B67D1] hover:text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* bottom diagonal accent */}
      <div aria-hidden="true" className="relative h-1.5 w-1/4 bg-[#4B67D1] ml-auto" />
    </section>
  );
};

export default GlobalDialogue;