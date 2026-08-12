import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  Clock,
  User,
  Mail,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { getAllBlogs, getBlogBySlug, getRecentBlogs } from "../api/WLCblogRoutes";
// ^ update this import path to wherever these live

const STEP = 4;

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : "";

// The design expects a "body" array of paragraphs; the API gives one HTML "content" field.
// Only look at DIRECT children that are block elements — walking all descendants
// (querySelectorAll) double-counts nested tags like <div><p>text</p></div> and
// produces duplicate paragraphs. <br> tags are converted to real line breaks first.
function contentToParagraphs(html = "") {
  if (!html) return [];
  const container = document.createElement("div");
  container.innerHTML = html;

  container.querySelectorAll("br").forEach((br) => br.replaceWith("\n"));

  const blockTags = new Set(["P", "DIV", "H1", "H2", "H3", "H4", "H5", "H6", "LI", "BLOCKQUOTE"]);
  const topLevelBlocks = Array.from(container.children).filter((el) => blockTags.has(el.tagName));

  const rawChunks = topLevelBlocks.length > 0
    ? topLevelBlocks.map((el) => el.textContent)
    : [container.textContent];

  return rawChunks
    .flatMap((text) => text.split("\n"))
    .map((t) => t.trim())
    .filter(Boolean);
}

// API blog object → the shape the design's JSX expects
function mapBlogToPost(b) {
  return {
    id: b._id || b.id,
    slug: b.slug,
    date: formatDate(b.postDate),
    category: b.category,
    readTime: b.readTime,
    author: b.authorName || b.author,
    title: b.title,
    image: b.image,
    excerpt: b.shortDescription,
   body: b.content,
  };
}

/* ============ TEXTURE / BACKGROUND ============ */
const grainSVG = `data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.09 0 0 0 0 0.15 0 0 0 0 0.3 0 0 0 0.35 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/></svg>`;

function Texture() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.09] mix-blend-multiply"
        style={{ backgroundImage: `url("${grainSVG}")` }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed left-1/2 top-[-200px] -z-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-blue-600/15 blur-3xl"
      />
    </>
  );
}

export default function NewsMedia() {
  // ---- List state (GET all) ----
  const [posts, setPosts] = useState([]);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);

  // ---- Detail state (GET by slug) ----
  const [view, setView] = useState("list");
  const [activeSlug, setActiveSlug] = useState(null);
  const [activePost, setActivePost] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState(false);

  // ---- Recent posts (GET recent, excluding the open post) ----
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchList = async () => {
      try {
        const res = await getAllBlogs();
        const list = Array.isArray(res) ? res : res?.data || [];
        const arr = Array.isArray(list) ? list : [list];
        const sorted = [...arr].sort(
          (a, b) => new Date(b.postDate) - new Date(a.postDate)
        );
        if (isMounted) {
          setPosts(sorted.map(mapBlogToPost));
          setListError(false);
        }
      } catch (err) {
        if (isMounted) setListError(true);
      } finally {
        if (isMounted) setListLoading(false);
      }
    };
    fetchList();
    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch the full post (by slug) whenever we switch into detail view
  useEffect(() => {
    if (view !== "detail" || !activeSlug) return;
    let isMounted = true;

    const fetchDetail = async () => {
      setDetailLoading(true);
      setDetailError(false);
      setActivePost(null);
      setRelatedPosts([]);

      try {
        const res = await getBlogBySlug(activeSlug);
        const blog = res?.data || res;
        if (!isMounted) return;
        const mapped = mapBlogToPost(blog);
        setActivePost(mapped);

        setRelatedLoading(true);
        try {
          const recRes = await getRecentBlogs();
          const recList = Array.isArray(recRes) ? recRes : recRes?.data || [];
          const currentId = blog._id || blog.id;
          const filtered = (Array.isArray(recList) ? recList : [recList])
            .filter((b) => (b._id || b.id) !== currentId)
            .sort((a, b) => new Date(b.postDate) - new Date(a.postDate))
            .slice(0, 3);
          if (isMounted) {
            setRelatedPosts(filtered.map(mapBlogToPost));
          }
        } catch {
          if (isMounted) setRelatedPosts([]);
        } finally {
          if (isMounted) setRelatedLoading(false);
        }
      } catch (err) {
        if (isMounted) setDetailError(true);
      } finally {
        if (isMounted) setDetailLoading(false);
      }
    };

    fetchDetail();
    return () => {
      isMounted = false;
    };
  }, [view, activeSlug]);

  const openPost = (slug) => {
    setActiveSlug(slug);
    setView("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const backToList = () => {
    setView("list");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const showMore = () => setVisibleCount((c) => c + STEP);

  const visiblePosts = useMemo(() => posts.slice(0, visibleCount), [posts, visibleCount]);

  return (
    <div className="relative min-h-screen bg-[#f4f1ea] font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
      <Texture />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <h1 className="font-display text-5xl font-normal leading-[0.95] tracking-tight text-slate-900 sm:text-6xl md:text-7xl lg:text-[104px]">
            Featured
            <br />
            Articles <span className="italic text-blue-600">&amp;</span> Columns
          </h1>
          <p className="mt-6 max-w-xl font-sans text-sm leading-relaxed text-slate-600 sm:text-base">
            Perspectives on global affairs, diplomacy, and the ideas shaping our
            world — filed from desks across every continent.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {view === "list" ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              {listLoading && <ListSkeleton />}

              {!listLoading && listError && (
                <p className="text-center text-sm text-slate-500">
                  Couldn't load posts right now. Please refresh the page.
                </p>
              )}

              {!listLoading && !listError && posts.length === 0 && (
                <p className="text-center text-sm text-slate-500">No posts to show yet.</p>
              )}

              {!listLoading && !listError && posts.length > 0 && (
                <ListView
                  posts={visiblePosts}
                  hasMore={visibleCount < posts.length}
                  onShowMore={showMore}
                  onOpen={openPost}
                />
              )}
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              {detailLoading && <DetailSkeleton onBack={backToList} />}

              {!detailLoading && detailError && (
                <div className="text-center">
                  <p className="mb-4 text-sm text-slate-500">Couldn't load this post right now.</p>
                  <button
                    onClick={backToList}
                    className="inline-flex items-center gap-2 border-2 border-slate-900 bg-white px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-slate-900 shadow-[4px_4px_0_0_#2563eb] hover:bg-blue-600 hover:text-white"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" /> All Posts
                  </button>
                </div>
              )}

              {!detailLoading && !detailError && activePost && (
                <DetailView
                  post={activePost}
                  related={relatedPosts}
                  relatedLoading={relatedLoading}
                  onBack={backToList}
                  onOpen={openPost}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ============ LOADING SKELETONS ============ */
function ListSkeleton() {
  return (
    <div className="space-y-8">
      <div className="h-[420px] w-full animate-pulse border-2 border-slate-900 bg-white/60" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="h-72 animate-pulse border-2 border-slate-900 bg-white/60" />
        <div className="h-72 animate-pulse border-2 border-slate-900 bg-white/60" />
      </div>
    </div>
  );
}

function DetailSkeleton({ onBack }) {
  return (
    <>
      <button
        onClick={onBack}
        className="mb-8 inline-flex items-center gap-2 border-2 border-slate-900 bg-white px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-slate-900 shadow-[4px_4px_0_0_#2563eb] hover:bg-blue-600 hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> All Posts
      </button>
      <div className="flex items-center justify-center border-2 border-slate-900 bg-[#faf7f0] py-24 shadow-[8px_8px_0_0_#2563eb]">
        <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
      </div>
    </>
  );
}

/* ============ LIST VIEW ============ */
function ListView({ posts, hasMore, onShowMore, onOpen }) {
  const [featured, ...rest] = posts;

  return (
    <>
      {/* Featured Hero */}
      {featured && (
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => onOpen(featured.slug)}
          className="group relative mb-14 cursor-pointer overflow-hidden border-2 border-slate-900 bg-slate-900 text-white shadow-[8px_8px_0_0_#2563eb] transition-all hover:shadow-[12px_12px_0_0_#2563eb]"
        >
          <div className="grid md:grid-cols-[1.15fr_1fr]">
         <div className="relative overflow-hidden min-h-[500px]">
            <img
  src={featured.image}
  alt={featured.title}
  loading="lazy"
  className="absolute inset-0 h-full w-full object-cover grayscale-[15%] transition-all duration-[900ms] ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
/>
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/60 via-slate-900/10 to-transparent" />
              <div className="absolute bottom-4 left-4 font-display text-[100px] leading-none text-white/20">
                01
              </div>
            </div>

            <div className="relative flex flex-col justify-between border-t-2 border-slate-900 bg-[#f4f1ea] p-6 text-slate-900 sm:p-10 md:border-l-2 md:border-t-0">
              <div>
                <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3 w-3" />
                    {featured.date}
                  </span>
                </div>

                <h2 className="font-display text-3xl font-normal leading-[1.05] tracking-tight text-slate-900 transition-colors group-hover:text-blue-600 sm:text-4xl md:text-[42px]">
                  {featured.title}
                </h2>

                <p className="mt-5 line-clamp-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                  {featured.excerpt}
                </p>
              </div>

              <div className="mt-8 inline-flex w-fit items-center gap-3 border-b-2 border-blue-600 pb-1 font-mono text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                Read Full Story
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </div>
          </div>
        </motion.article>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 gap-0  border-slate-900 sm:grid-cols-2 ">
        {rest.map((p, idx) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            onClick={() => onOpen(p.slug)}
            className=" ml-2 mb-2 mr-2 group relative flex cursor-pointer flex-col border-b-2 border-r-2 border-slate-900 bg-[#faf7f0] transition-colors hover:bg-white"
          >
            <div className="absolute right-4 top-4 z-10 font-display text-3xl leading-none text-slate-900/15">
              {String(idx + 2).padStart(2, "0")}
            </div>

            <div className="relative aspect-[16/10] overflow-hidden border-b-2 border-slate-900">
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                className="h-full w-full object-cover grayscale-[20%] transition-all duration-700 ease-out group-hover:scale-[1.06] group-hover:grayscale-0"
              />
            </div>

            <div className="flex flex-1 flex-col p-6">
              <div className="mb-3 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3 w-3" />
                  {p.date}
                </span>
              </div>

              <h3 className="font-display text-2xl font-normal leading-[1.1] tracking-tight text-slate-900 transition-colors group-hover:text-blue-600">
                {p.title}
              </h3>

              <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600">
                {p.excerpt}
              </p>

              <div className="mt-6 flex items-center justify-between border-t-2 border-slate-900/10 pt-4">
                <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                  Continue Reading
                </span>
                <div className="flex h-9 w-9 items-center justify-center border-2 border-slate-900 bg-white text-slate-900 transition-all group-hover:bg-blue-600 group-hover:text-white">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Show More */}
      {hasMore && (
        <div className="mt-14 flex justify-center">
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            onClick={onShowMore}
            className="group relative inline-flex items-center gap-3 border-2 border-slate-900 bg-slate-900 px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.25em] text-white shadow-[6px_6px_0_0_#2563eb] transition-all hover:shadow-[3px_3px_0_0_#2563eb] hover:bg-blue-600"
          >
            Load More Dispatches
            <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </motion.button>
        </div>
      )}
    </>
  );
}

/* ============ DETAIL VIEW ============ */
function DetailView({ post, related, relatedLoading, onBack, onOpen }) {
  return (
    <>
      <motion.button
        whileHover={{ x: -3 }}
        onClick={onBack}
        className="mb-8 inline-flex items-center gap-2 border-2 border-slate-900 bg-white px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-slate-900 shadow-[4px_4px_0_0_#2563eb] transition-all hover:bg-blue-600 hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        All Posts
      </motion.button>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px] lg:gap-12">
        <article className="border-2 border-slate-900 bg-white p-6 shadow-[8px_8px_0_0_#2563eb] sm:p-10">
          <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3 w-3" />
              {post.date}
            </span>
          </div>

          <h1 className="font-display text-4xl font-normal leading-[1.02] tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            {post.title}
          </h1>

      <div className="mt-8 overflow-hidden border-2 border-slate-900">
  <img
    src={post.image}
    alt={post.title}
    className="h-[250px] sm:h-[350px] md:h-[500px] w-full object-cover"
  />
</div>

<div className="mt-8 sm:mt-10">
  {/* Short Description */}
  {post.excerpt && (
    <p
      className="
        mb-8 sm:mb-10
        text-base sm:text-lg md:text-xl
        font-medium
        leading-8 sm:leading-10 md:leading-[2]
        text-slate-800
        first-letter:float-left
        first-letter:mr-2 sm:first-letter:mr-3 md:first-letter:mr-4
        first-letter:font-display
        first-letter:text-[60px]
        sm:first-letter:text-[75px]
        md:first-letter:text-[90px]
        lg:first-letter:text-[100px]
        first-letter:font-normal
        first-letter:leading-[0.8]
        first-letter:text-blue-600
      "
    >
      {post.excerpt}
    </p>
  )}

{/* Content */}
<div
  className="
    prose
    prose-lg
    max-w-none
    text-slate-700

    [&_ul]:list-disc
    [&_ul]:pl-6
    [&_ul]:my-4

    [&_ol]:list-decimal
    [&_ol]:pl-6
    [&_ol]:my-4

    [&_li]:mb-2

    [&_h1]:text-4xl
    [&_h1]:font-bold

    [&_h2]:text-3xl
    [&_h2]:font-bold

    [&_h3]:text-2xl
    [&_h3]:font-semibold

    [&_strong]:font-bold
    [&_em]:italic

    [&_a]:text-blue-600
    [&_a]:underline

    [&_blockquote]:border-l-4
    [&_blockquote]:border-blue-600
    [&_blockquote]:pl-4
    [&_blockquote]:italic
  "
  dangerouslySetInnerHTML={{
    __html: post.body,
  }}
/>
</div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t-2 border-slate-900 pt-6 font-mono text-[10px] uppercase tracking-[0.2em]">
            <div className="text-slate-500">— End of Dispatch —</div>
            <button
              onClick={onBack}
              className="font-bold text-blue-600 hover:underline"
            >
              ← Back to All Posts
            </button>
          </div>
        </article>

        <aside className="space-y-8 lg:sticky lg:top-8 lg:self-start">
          <div className="relative overflow-hidden border-2 border-slate-900 bg-blue-600 p-6 text-white shadow-[8px_8px_0_0_#0f172a] sm:p-7">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #fff 1px, transparent 1.5px)",
                backgroundSize: "16px 16px",
              }}
            />
            <div className="relative">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center border-2 border-white bg-white/10 backdrop-blur">
                <Mail className="h-5 w-5" strokeWidth={2.5} />
              </div>
              <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.25em] text-blue-100">
                The Bulletin
              </div>
              <h3 className="font-display text-2xl font-normal leading-tight">
                Sign up for blog updates!
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-blue-100">
                Join my email list to receive updates and information.
              </p>
              <input
                type="email"
                placeholder="Email address"
                className="mt-5 w-full border-2 border-white bg-white/10 px-4 py-3 font-mono text-xs uppercase tracking-widest text-white placeholder-blue-200 outline-none backdrop-blur focus:bg-white/20"
              />
              <button
                onClick={() => alert("Signed up!")}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 border-2 border-white bg-white px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.25em] text-blue-700 transition hover:bg-slate-900 hover:text-white"
              >
                Sign Up
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="border-2 border-slate-900 bg-[#faf7f0] p-6 sm:p-7">
            <div className="mb-5 flex items-center gap-3">
              <div className="h-2 w-2 bg-blue-600" />
              <h3 className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-slate-900">
                Recent Posts
              </h3>
              <span className="h-px flex-1 bg-slate-900/20" />
            </div>

            {relatedLoading && (
              <div className="space-y-5">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-start gap-4 border-t-2 border-slate-900/10 pt-5 first:border-t-0 first:pt-0">
                    <div className="h-16 w-16 flex-shrink-0 animate-pulse bg-slate-200" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 w-1/2 animate-pulse bg-slate-200" />
                      <div className="h-3 w-full animate-pulse bg-slate-200" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!relatedLoading && related.length === 0 && (
              <p className="text-sm text-slate-400">No related posts.</p>
            )}

            {!relatedLoading && related.length > 0 && (
              <div className="space-y-5">
                {related.map((r, i) => (
                  <button
                    key={r.id}
                    onClick={() => onOpen(r.slug)}
                    className="group flex w-full items-start gap-4 border-t-2 border-slate-900/10 pt-5 text-left first:border-t-0 first:pt-0"
                  >
                    <span className="font-display text-2xl leading-none text-blue-600">
                      0{i + 1}
                    </span>
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden border-2 border-slate-900">
                      <img
                        src={r.image}
                        alt={r.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="line-clamp-2 font-display text-sm font-normal leading-snug text-slate-900 transition-colors group-hover:text-blue-600">
                        {r.title}
                      </h4>
                      <span className="mt-1 block font-mono text-[10px] uppercase tracking-widest text-slate-500">
                        {r.date}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </aside>
      </div>
    </>
  );
}