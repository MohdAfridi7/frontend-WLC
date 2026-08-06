/**
 * BlogSection.jsx
 * A fully self-contained premium "Articles & Columns" blog section.
 * React + Tailwind CSS + Framer Motion + Lucide React. No other files needed.
 */

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft, ChevronRight, ArrowRight, ArrowUpRight, CalendarDays,
  Clock3, User2, Tag, X, Link2, Quote, Check,
} from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
/* ------------------------------------------------------------------ */
/*  1. BLOG DATA                                                       */
/* ------------------------------------------------------------------ */

const img = (seed, w = 1400, h = 900) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

const LOREM_A =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
const LOREM_B =
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.";
const LOREM_C =
  "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi.";

const makeContent = (topic) => [
  { type: "paragraph", text: `${LOREM_A}` },
  { type: "paragraph", text: LOREM_B },
  { type: "heading", text: `The Global Context of ${topic}` },
  { type: "paragraph", text: LOREM_C },
  {
    type: "list",
    items: [
      "Multilateral cooperation as the foundation of durable policy outcomes.",
      "Evidence-led governance frameworks measured against transparent indicators.",
      "Long-horizon capital allocation aligned with institutional mandates.",
      "Inclusive participation across public, private and civic institutions.",
    ],
  },
  { type: "subheading", text: "A Framework for Measured Progress" },
  { type: "paragraph", text: LOREM_A },
  {
    type: "quote",
    text: "Institutions endure not because they resist change, but because they translate it into shared and measurable progress.",
    cite: "World Leadership Congress, Plenary Address",
  },
  { type: "image", index: 0, caption: `Delegates convene during the ${topic} forum.` },
  { type: "subheading", text: "Implementation and Accountability" },
  { type: "paragraph", text: LOREM_B },
  { type: "paragraph", text: LOREM_C },
  { type: "image", index: 1, caption: "Working sessions on implementation frameworks." },
  { type: "heading", text: "Outlook" },
  { type: "paragraph", text: LOREM_A },
];

const RAW = [
  ["Rethinking Multilateral Governance for a Fragmented Decade", "Governance", "Dr. Amara Okonjo", "Mar 12, 2026", "8 min read"],
  ["The Quiet Economics of Climate Adaptation Finance", "Climate", "Henrik Lindqvist", "Mar 04, 2026", "11 min read"],
  ["Human Capital and the Next Industrial Transition", "Economy", "Sofia Marchetti", "Feb 27, 2026", "6 min read"],
  ["Digital Sovereignty and the Architecture of Trust", "Technology", "Rahul Mehta", "Feb 19, 2026", "9 min read"],
  ["Leadership Under Uncertainty: Lessons From the Field", "Leadership", "Claire Dubois", "Feb 08, 2026", "7 min read"],
  ["Food Systems, Fragility and the Politics of Supply", "Development", "Kwame Boateng", "Jan 30, 2026", "10 min read"],
  ["Rebuilding Public Trust in Global Institutions", "Governance", "Elena Volkova", "Jan 22, 2026", "5 min read"],
  ["Capital, Conscience and the Rise of Blended Finance", "Economy", "Michael Arden", "Jan 14, 2026", "12 min read"],
  ["Urban Resilience in the Age of Extreme Weather", "Climate", "Ayaka Nishimura", "Dec 29, 2025", "8 min read"],
  ["Artificial Intelligence and the Future of Public Policy", "Technology", "Daniel Rosenberg", "Dec 18, 2025", "9 min read"],
  ["Health Equity as an Instrument of Global Stability", "Development", "Dr. Nadia Haddad", "Dec 05, 2025", "7 min read"],
  ["The Diplomacy of Scarce Resources", "Leadership", "Tomás Herrera", "Nov 21, 2025", "10 min read"],
];

const BLOGS = RAW.map(([title, category, author, date, readingTime], i) => ({
  id: i + 1,
  title,
  slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
  date,
  author,
  category,
  readingTime,
  coverImage: img(`article-${i + 1}`),
  description:
    "An institutional perspective on the forces reshaping policy, capital and cooperation across borders — and what leadership must do next.",
  content: makeContent(category),
  galleryImages: [img(`gallery-${i + 1}-a`, 1400, 800), img(`gallery-${i + 1}-b`, 1400, 800)],
  tags: ["Policy", category, "Global Forum", "Insight"],
}));

const HERO_BG = img("congress-hero-bg", 1920, 1080);

/* ------------------------------------------------------------------ */
/*  2. ANIMATION VARIANTS                                              */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

/* ------------------------------------------------------------------ */
/*  3. MAIN SECTION                                                    */
/* ------------------------------------------------------------------ */

export default function BlogSection() {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [copied, setCopied] = useState(false);
  const [perView, setPerView] = useState(4);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);

  const trackRef = useRef(null);
  const detailRef = useRef(null);
  const dragState = useRef({ down: false, startX: 0, moved: 0 });

  /* -------- responsive cards per view -------- */
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w >= 1280) return 4;
      if (w >= 1024) return 3;
      if (w >= 640) return 2;
      return 1;
    };
    const onResize = () => setPerView(compute());
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* -------- infinite loop: clone edges -------- */
  const loop = useMemo(
    () => [...BLOGS.slice(-perView), ...BLOGS, ...BLOGS.slice(0, perView)],
    [perView],
  );
  const offset = perView;

  const [animate, setAnimate] = useState(true);

  const next = useCallback(() => setIndex((i) => i + 1), []);
  const prev = useCallback(() => setIndex((i) => i - 1), []);

  useEffect(() => {
    if (index > BLOGS.length - 1) {
      const t = setTimeout(() => { setAnimate(false); setIndex(0); }, 620);
      return () => clearTimeout(t);
    }
    if (index < 0) {
      const t = setTimeout(() => { setAnimate(false); setIndex(BLOGS.length - 1); }, 620);
      return () => clearTimeout(t);
    }
  }, [index]);

  useEffect(() => {
    if (!animate) {
      const raf = requestAnimationFrame(() => setAnimate(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [animate]);

  /* -------- autoplay + pause on hover -------- */
  useEffect(() => {
    if (paused || dragging) return;
    const id = setInterval(next, 4200);
    return () => clearInterval(id);
  }, [paused, dragging, next]);

  /* -------- drag / swipe -------- */
  const onPointerDown = (e) => {
    dragState.current = { down: true, startX: e.clientX, moved: 0 };
    setDragging(true);
  };
  const onPointerMove = (e) => {
    if (!dragState.current.down) return;
    dragState.current.moved = e.clientX - dragState.current.startX;
  };
  const onPointerUp = () => {
    if (!dragState.current.down) return;
    const moved = dragState.current.moved;
    dragState.current.down = false;
    setDragging(false);
    if (moved < -60) next();
    else if (moved > 60) prev();
  };

  const cardClicked = () => Math.abs(dragState.current.moved) < 8;

  const openBlog = (blog) => {
    setSelectedBlog(blog);
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 220);
  };

  const closeBlog = () => setSelectedBlog(null);

  const related = useMemo(() => {
    if (!selectedBlog) return [];
    const sameCat = BLOGS.filter((b) => b.category === selectedBlog.category && b.id !== selectedBlog.id);
    const others = BLOGS.filter((b) => b.category !== selectedBlog.category && b.id !== selectedBlog.id);
    return [...sameCat, ...others].slice(0, 3);
  }, [selectedBlog]);

  const copyLink = () => {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}${window.location.pathname}#${selectedBlog.slug}`
        : selectedBlog.slug;
    navigator.clipboard?.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const translate = `translateX(-${((index + offset) * 100) / perView}%)`;

  return (
    <section
      id="articles"
      className="relative isolate w-full overflow-hidden bg-[#0a1220] py-20 sm:py-24 lg:py-32"
    >
      {/* blurred background image + dark overlay */}
      <div className="absolute inset-0 -z-10">
        <img src={HERO_BG} alt="" aria-hidden="true" className="h-full w-full scale-110 object-cover blur-[10px]" />
        <div className="absolute inset-0 bg-[#060c16]/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060c16] via-transparent to-[#060c16]" />
      </div>

      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* ---------------- Heading ---------------- */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={stagger}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p variants={fadeUp} className="text-[11px] font-semibold uppercase tracking-[0.42em] text-amber-300/80">
            Insight &amp; Perspective
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-5 font-serif text-4xl font-light leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.65rem]"
          >
            ARTICLES &amp; COLUMNS
          </motion.h2>
          <motion.div
            variants={fadeUp}
            className="mx-auto mt-7 h-px w-24 bg-gradient-to-r from-transparent via-amber-300/70 to-transparent"
          />
          <motion.p variants={fadeUp} className="mx-auto mt-7 max-w-2xl text-[15px] leading-relaxed text-slate-300/80">
            Commentary, research and long-form analysis from our global network of
            policymakers, economists and institutional leaders.
          </motion.p>
        </motion.div>

        {/* ---------------- Carousel ---------------- */}
        <div
          className="relative mt-14 sm:mt-16"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            ref={trackRef}
            className="overflow-hidden px-1 py-2 select-none"
            style={{ cursor: dragging ? "grabbing" : "grab", touchAction: "pan-y" }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onPointerLeave={onPointerUp}
          >
            <div
              className="flex"
              style={{
                transform: translate,
                transition: animate ? "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)" : "none",
              }}
            >
              {loop.map((blog, i) => (
                <div key={`${blog.id}-${i}`} className="shrink-0 px-2.5 sm:px-3" style={{ width: `${100 / perView}%` }}>
                  <BlogCard
                    blog={blog}
                    active={selectedBlog?.id === blog.id}
                    onOpen={() => cardClicked() && openBlog(blog)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* arrows */}
          <button
            type="button"
            aria-label="Previous articles"
            onClick={prev}
            className="absolute -left-2 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:border-amber-300/70 hover:bg-amber-300 hover:text-[#0a1220] sm:flex lg:-left-6"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next articles"
            onClick={next}
            className="absolute -right-2 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:border-amber-300/70 hover:bg-amber-300 hover:text-[#0a1220] sm:flex lg:-right-6"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* mobile arrows */}
          <div className="mt-8 flex items-center justify-center gap-3 sm:hidden">
            <button type="button" aria-label="Previous" onClick={prev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button type="button" aria-label="Next" onClick={next}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* ---------------- Detail panel ---------------- */}
        <div ref={detailRef} className="scroll-mt-8">
          <AnimatePresence mode="wait" initial={false}>
            {selectedBlog && (
              <motion.div
                key="detail-wrapper"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-16 sm:pt-20">
                  <AnimatePresence mode="wait">
                    <motion.article
                      key={selectedBlog.id}
                      initial={{ opacity: 0, y: 26 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -18 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden rounded-[26px] border border-white/10 bg-white shadow-[0_40px_120px_-30px_rgba(0,0,0,0.75)]"
                    >
                      <ArticleDetail blog={selectedBlog} onClose={closeBlog} copied={copied} onCopy={copyLink} />

                      {/* related */}
                      <div className="border-t border-slate-200/80 bg-[#f7f8fa] px-6 py-14 sm:px-10 lg:px-16">
                        <div className="mx-auto max-w-5xl">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.38em] text-amber-600">
                            Continue Exploring
                          </p>
                          <h3 className="mt-3 font-serif text-2xl font-light tracking-tight text-slate-900 sm:text-3xl">
                            RELATED ARTICLES
                          </h3>
                          <motion.div
                            variants={stagger}
                            initial="hidden"
                            animate="show"
                            className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                          >
                            {related.map((b) => (
                              <motion.button
                                key={b.id}
                                variants={fadeUp}
                                type="button"
                                onClick={() => openBlog(b)}
                                whileHover={{ y: -8 }}
                                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition-shadow duration-300 hover:shadow-xl"
                              >
                                <div className="relative h-44 overflow-hidden">
                                  <img
                                    src={b.coverImage}
                                    alt={b.title}
                                    loading="lazy"
                                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                                  />
                                </div>
                                <div className="flex flex-1 flex-col p-6">
                                  <span className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                                    <CalendarDays className="h-3.5 w-3.5" />
                                    {b.date}
                                  </span>
                                  <h4 className="mt-3 font-serif text-[17px] leading-snug text-slate-900 transition-colors group-hover:text-amber-700">
                                    {b.title}
                                  </h4>
                                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-600">
                                    {b.description}
                                  </p>
                                  <span className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-amber-700">
                                    Read More
                                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                                  </span>
                                </div>
                              </motion.button>
                            ))}
                          </motion.div>

                          <div className="mt-12 flex justify-center">
                            <button
                              type="button"
                              onClick={closeBlog}
                              className="group inline-flex items-center gap-2.5 rounded-full border border-slate-900 px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.22em] text-slate-900 transition-all duration-300 hover:bg-slate-900 hover:text-white"
                            >
                              <ChevronLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                              Back To Carousel
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  4. CARD COMPONENT                                                  */
/* ------------------------------------------------------------------ */

function BlogCard({ blog, onOpen, active }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -10 }}
      onClick={onOpen}
      className={`group flex h-full min-h-[430px] cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-[0_18px_50px_-24px_rgba(0,0,0,0.65)] ring-1 transition-shadow duration-500 hover:shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] ${
        active ? "ring-2 ring-amber-400" : "ring-black/5"
      }`}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={blog.coverImage}
          alt={blog.title}
          draggable="false"
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-800 backdrop-blur">
          {blog.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" />
            {blog.date}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock3 className="h-3.5 w-3.5" />
            {blog.readingTime}
          </span>
        </div>

        <h3 className="mt-4 line-clamp-3 font-serif text-[19px] font-normal leading-snug tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-amber-700">
          {blog.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">
          {blog.description}
        </p>

        <div className="mt-auto pt-6">
          <span className="inline-flex items-center gap-2 border-b border-amber-500/40 pb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-700 transition-colors duration-300 group-hover:border-amber-600">
            Continue Reading
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  5. ARTICLE DETAIL                                                  */
/* ------------------------------------------------------------------ */

function ArticleDetail({ blog, onClose, copied, onCopy }) {
  const shares = [
  { label: "Share on X", Icon: FaXTwitter },
  { label: "Share on Facebook", Icon: FaFacebookF },
  { label: "Share on LinkedIn", Icon: FaLinkedinIn },
];

  return (
    <div>
      {/* hero */}
      <div className="relative h-[300px] w-full overflow-hidden sm:h-[420px] lg:h-[520px]">
        <motion.img
          key={blog.coverImage}
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          src={blog.coverImage}
          alt={blog.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close article"
          className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/35 text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-slate-900"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="absolute inset-x-0 bottom-0 px-6 pb-8 sm:px-10 lg:px-16 lg:pb-12">
          <motion.div initial="hidden" animate="show" variants={stagger} className="mx-auto max-w-5xl">
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0a1220]"
            >
              <Tag className="h-3 w-3" />
              {blog.category}
            </motion.span>
            <motion.h3
              variants={fadeUp}
              className="mt-5 max-w-4xl font-serif text-2xl font-light leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.85rem]"
            >
              {blog.title}
            </motion.h3>
            <motion.div
              variants={fadeUp}
              className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] font-medium uppercase tracking-[0.16em] text-white/75"
            >
              <span className="inline-flex items-center gap-1.5"><User2 className="h-3.5 w-3.5" /> {blog.author}</span>
              <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" /> {blog.date}</span>
              <span className="inline-flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" /> {blog.readingTime}</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* body */}
      <div className="px-6 py-12 sm:px-10 lg:px-16 lg:py-16">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[80px_1fr]">
          {/* sticky share rail */}
          <aside className="lg:sticky lg:top-8 lg:h-fit">
            
           
          </aside>

          <motion.div variants={stagger} initial="hidden" animate="show" className="min-w-0">
            {blog.content.map((block, i) => (
              <motion.div key={i} variants={fadeUp}>
                {block.type === "paragraph" && (
                  <p className="mb-6 text-[16.5px] leading-[1.85] text-slate-700">{block.text}</p>
                )}
                {block.type === "heading" && (
                  <h4 className="mb-4 mt-12 font-serif text-2xl font-normal tracking-tight text-slate-900 sm:text-[28px]">
                    {block.text}
                  </h4>
                )}
                {block.type === "subheading" && (
                  <h5 className="mb-3 mt-9 text-[13px] font-bold uppercase tracking-[0.2em] text-amber-700">
                    {block.text}
                  </h5>
                )}
                {block.type === "list" && (
                  <ul className="mb-8 space-y-3 border-l-2 border-amber-400/60 pl-6">
                    {block.items.map((it) => (
                      <li key={it} className="relative text-[16px] leading-relaxed text-slate-700">{it}</li>
                    ))}
                  </ul>
                )}
                {block.type === "quote" && (
                  <blockquote className="my-10 rounded-2xl bg-[#0a1220] px-8 py-9 text-white">
                    <Quote className="h-7 w-7 text-amber-400" />
                    <p className="mt-4 font-serif text-xl font-light italic leading-relaxed sm:text-2xl">
                      {block.text}
                    </p>
                    <footer className="mt-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-300/80">
                      {block.cite}
                    </footer>
                  </blockquote>
                )}
                {block.type === "image" && (
                  <figure className="my-10 overflow-hidden rounded-2xl">
                    <div className="overflow-hidden">
                      <img
                        src={blog.galleryImages[block.index]}
                        alt={block.caption}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-105"
                      />
                    </div>
                    <figcaption className="mt-3 text-center text-[12px] uppercase tracking-[0.16em] text-slate-500">
                      {block.caption}
                    </figcaption>
                  </figure>
                )}
              </motion.div>
            ))}

            {/* tags */}
            <div className="mt-12 flex flex-wrap items-center gap-2.5 border-t border-slate-200 pt-8">
              {blog.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-slate-100 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-600"
                >
                  #{t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
