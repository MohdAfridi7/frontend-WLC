/**
 * BlogSection.jsx
 * A fully self-contained premium "Articles & Columns" blog section.
 * React + Tailwind CSS + Framer Motion + Lucide React. No other files needed.
 *
 * >>> API WIRING NOTES <<<
 * - Data now comes from your wlc-blog API (getAllBlogs / getBlogBySlug /
 *   getBlogById / getRelatedBlogs) instead of the hardcoded RAW/BLOGS arrays.
 * - Adjust the import path below ("./blogApi") to wherever you save the
 *   file you shared (the one with createBlog/getAllBlogs/etc.).
 * - normalizeBlog() maps whatever your backend returns onto the exact
 *   shape this UI already expects (title, slug, date, author, category,
 *   readingTime, coverImage, description, content, galleryImages, tags).
 *   If your backend field names differ, tweak ONLY normalizeBlog() —
 *   nothing else needs to change.
 * - blog.content: this UI renders rich "blocks"
 *   ({type:"paragraph"|"heading"|"subheading"|"list"|"quote"|"image", ...}).
 *   If your API instead returns a plain HTML string in `content`, it is
 *   automatically rendered as HTML (see the fallback in ArticleDetail).
 */

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft, ChevronRight, ArrowRight, ArrowUpRight, CalendarDays,
  Clock3, User2, Tag, X, Link2, Quote, Check, Loader2,
} from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import {
  getAllBlogs,
  getBlogBySlug,
  getBlogById,
  getRelatedBlogs,
} from "../api/WLCblogRoutes"; // <-- adjust this path to match your project

/* ------------------------------------------------------------------ */
/*  1. HELPERS + NORMALIZATION                                         */
/* ------------------------------------------------------------------ */

// Fallback placeholder image if a blog has no cover image from the API.
const img = (seed, w = 1400, h = 900) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

const HERO_BG = img("congress-hero-bg", 1920, 1080);

const formatDate = (value) => {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
};

// Unwraps common API response envelopes: { data }, { blogs }, { blog }, or a raw array/object.
const unwrap = (res, ...keys) => {
  if (Array.isArray(res)) return res;
  if (res && typeof res === "object") {
    for (const k of keys) {
      if (res[k] !== undefined) return res[k];
    }
    if (res.data !== undefined) return res.data;
  }
  return res;
};

/**
 * Maps a raw blog object from the API to the shape this component expects.
 * Adjust the right-hand side field names here if your backend differs.
 */
const normalizeBlog = (b = {}) => {
  const id = b._id || b.id || b.slug;
  const category =
    (typeof b.category === "object" ? b.category?.name : b.category) || "General";
  const author =
    (typeof b.author === "object" ? b.author?.name : b.author) || "";

  return {
    id,
    title: b.title || "Untitled",
    slug: b.slug || String(id),
    date: b.date || formatDate(b.createdAt || b.publishedAt || b.updatedAt),
    category,
    coverImage: b.coverImage || b.image || b.thumbnail || b.cover || img(`blog-${id}`),
    description: b.description || b.excerpt || b.summary || "",
    content: b.content ?? [],
    galleryImages: b.galleryImages || b.images || b.gallery || [],
    tags: Array.isArray(b.tags) ? b.tags : b.tags ? [b.tags] : [category],
  };
};

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
  /* -------- blog list (from API) -------- */
  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [blogsError, setBlogsError] = useState(null);

  /* -------- selected / detail (from API) -------- */
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [related, setRelated] = useState([]);

  const [copied, setCopied] = useState(false);
  const [perView, setPerView] = useState(4);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);

  const trackRef = useRef(null);
  const detailRef = useRef(null);
  const dragState = useRef({ down: false, startX: 0, moved: 0 });

  /* -------- fetch all blogs on mount -------- */
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        setLoadingBlogs(true);
        setBlogsError(null);
        const res = await getAllBlogs();
        const list = unwrap(res, "blogs", "results");
        if (active) setBlogs((Array.isArray(list) ? list : []).map(normalizeBlog));
      } catch (err) {
        if (active) setBlogsError(err?.message || "Failed to load articles.");
      } finally {
        if (active) setLoadingBlogs(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

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
    () =>
      blogs.length
        ? [...blogs.slice(-perView), ...blogs, ...blogs.slice(0, perView)]
        : [],
    [perView, blogs],
  );
  const offset = perView;

  const [animate, setAnimate] = useState(true);

  const next = useCallback(() => setIndex((i) => i + 1), []);
  const prev = useCallback(() => setIndex((i) => i - 1), []);

  useEffect(() => {
    if (!blogs.length) return;
    if (index > blogs.length - 1) {
      const t = setTimeout(() => { setAnimate(false); setIndex(0); }, 620);
      return () => clearTimeout(t);
    }
    if (index < 0) {
      const t = setTimeout(() => { setAnimate(false); setIndex(blogs.length - 1); }, 620);
      return () => clearTimeout(t);
    }
  }, [index, blogs.length]);

  useEffect(() => {
    if (!animate) {
      const raf = requestAnimationFrame(() => setAnimate(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [animate]);

  /* -------- autoplay + pause on hover -------- */
  useEffect(() => {
    if (paused || dragging || blogs.length < 2) return;
    const id = setInterval(next, 4200);
    return () => clearInterval(id);
  }, [paused, dragging, next, blogs.length]);

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

  /* -------- open a blog: show summary instantly, then fetch full detail + related -------- */
  const openBlog = async (blogSummary) => {
    setSelectedBlog(blogSummary);
    setRelated([]);
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 220);

    setDetailLoading(true);
    try {
      let res;
      try {
        res = await getBlogBySlug(blogSummary.slug);
      } catch {
        res = await getBlogById(blogSummary.id);
      }
      const full = unwrap(res, "blog");
      if (full) setSelectedBlog(normalizeBlog(full));
    } catch (err) {
      // keep showing the summary version if the detail fetch fails
    } finally {
      setDetailLoading(false);
    }

    try {
      const relRes = await getRelatedBlogs(blogSummary.id);
      const relList = unwrap(relRes, "blogs", "related");
      setRelated((Array.isArray(relList) ? relList : []).map(normalizeBlog));
    } catch (err) {
      setRelated([]);
    }
  };

  const closeBlog = () => {
    setSelectedBlog(null);
    setRelated([]);
  };

  const copyLink = () => {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}${window.location.pathname}#${selectedBlog.slug}`
        : selectedBlog.slug;
    navigator.clipboard?.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const translate = `translateX(-${((index + offset) * 100) / (perView || 1)}%)`;

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
            WLC Global Activities
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
        {loadingBlogs ? (
          <div className="mt-16 flex items-center justify-center gap-3 py-20 text-slate-300">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm uppercase tracking-[0.2em]">Loading articles…</span>
          </div>
        ) : blogsError ? (
          <div className="mt-16 flex flex-col items-center justify-center gap-3 py-20 text-center text-slate-300">
            <p className="text-sm">{blogsError}</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="mt-16 flex items-center justify-center py-20 text-slate-300">
            <p className="text-sm">No articles published yet.</p>
          </div>
        ) : (
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
        )}

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
                      <ArticleDetail
                        blog={selectedBlog}
                        onClose={closeBlog}
                        copied={copied}
                        onCopy={copyLink}
                        loading={detailLoading}
                      />

                      {/* related */}
                      <div className="border-t border-slate-200/80 bg-[#f7f8fa] px-6 py-14 sm:px-10 lg:px-16">
                        <div className="mx-auto max-w-5xl">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.38em] text-amber-600">
                            Continue Exploring
                          </p>
                          <h3 className="mt-3 font-serif text-2xl font-light tracking-tight text-slate-900 sm:text-3xl">
                            RELATED ARTICLES
                          </h3>
                          {related.length > 0 && (
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
                          )}

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
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" />
            {blog.date}
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

function ArticleDetail({ blog, onClose, copied, onCopy, loading }) {
  const shares = [
    { label: "Share on X", Icon: FaXTwitter },
    { label: "Share on Facebook", Icon: FaFacebookF },
    { label: "Share on LinkedIn", Icon: FaLinkedinIn },
  ];

  const isBlockContent = Array.isArray(blog.content);
  const galleryFallback = blog.galleryImages.length ? blog.galleryImages : [blog.coverImage, blog.coverImage];

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

        {loading && (
          <div className="absolute left-5 top-5 z-10 flex h-11 items-center gap-2 rounded-full border border-white/30 bg-black/35 px-4 text-white backdrop-blur-md">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-[11px] uppercase tracking-[0.16em]">Loading</span>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 px-6 pb-8 sm:px-10 lg:px-16 lg:pb-12">
          <motion.div initial="hidden" animate="show" variants={stagger} className="mx-auto max-w-5xl">
            
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
       
              <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" /> {blog.date}</span>
      
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
            {isBlockContent ? (
              blog.content.map((block, i) => (
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
                          src={galleryFallback[block.index] || blog.coverImage}
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
              ))
            ) : (
              // Fallback: API returned plain HTML/string content instead of blocks
              <motion.div
                variants={fadeUp}
                className="prose prose-slate mb-6 max-w-none text-[16.5px] leading-[1.85] text-slate-700 prose-headings:font-serif prose-headings:font-normal prose-headings:text-slate-900"
                dangerouslySetInnerHTML={{ __html: blog.content || blog.description || "" }}
              />
            )}

           
          </motion.div>
        </div>
      </div>
    </div>
  );
}