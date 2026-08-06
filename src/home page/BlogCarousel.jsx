import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRight, ArrowLeft } from "lucide-react";
import { getAllBlogs } from "../api/blogRoutes";
// ^ update this import path to wherever getAllBlogs lives

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : "";

function stripHtml(html = "") {
  const div = document.createElement("div");
  div.innerHTML = html;
  return (div.textContent || div.innerText || "").trim();
}

// API blog object → the shape this component's JSX expects
function mapBlogToItem(b) {
  return {
    id: b._id,
    image: b.image,
    title: b.title,
    date: formatDate(b.postDate),
    excerpt: b.shortDescription,
    content: b.content,
  };
}

const BlogCarousel = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [featuredId, setFeaturedId] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const sectionRef = useRef(null);

 useEffect(() => {
  let isMounted = true;

  const fetchBlogs = async () => {
    try {
      const res = await getAllBlogs();

      const list = res?.data || [];

      if (isMounted) {
        const mapped = list.map(mapBlogToItem);

        setBlogs(mapped);
        setFeaturedId(mapped[0]?.id ?? null);
        setError(false);
      }
    } catch (err) {
      console.error(err);
      if (isMounted) setError(true);
    } finally {
      if (isMounted) setLoading(false);
    }
  };

  fetchBlogs();

  return () => {
    isMounted = false;
  };
}, []);

  const featured = useMemo(
    () => blogs.find((b) => b.id === featuredId) || blogs[0],
    [featuredId, blogs],
  );
  const side = useMemo(
    () => blogs.filter((b) => b.id !== featured?.id).slice(0, 5),
    [featured, blogs],
  );

  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedBlog]);

  if (loading) {
    return (
      <section className="relative bg-white py-20 md:py-18">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-14 flex flex-col gap-6 border-b border-neutral-200 pb-10 md:mb-20 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="mb-5 inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.3em] text-neutral-500">
                <span className="h-px w-8 bg-neutral-900" />
                The Journal
              </span>
              <h2
                className="font-serif text-4xl leading-[1.05] tracking-tight text-neutral-900 md:text-6xl"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Articles &amp; <em className="italic">Columns</em>
              </h2>
            </div>
          </div>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="mb-8 aspect-[16/10] w-full animate-pulse bg-neutral-100" />
              <div className="h-3 w-1/3 animate-pulse bg-neutral-100" />
              <div className="mt-4 h-8 w-4/5 animate-pulse bg-neutral-100" />
              <div className="mt-3 h-8 w-2/3 animate-pulse bg-neutral-100" />
            </div>
            <div className="lg:col-span-5 space-y-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-start gap-5 border-t border-neutral-200 py-6 first:border-t-0">
                  <div className="h-20 flex-1 animate-pulse bg-neutral-100" />
                  <div className="hidden h-20 w-24 shrink-0 animate-pulse bg-neutral-100 sm:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative bg-white py-20 md:py-18">
        <div className="mx-auto max-w-7xl px-5 text-center md:px-8">
          <p className="text-sm text-neutral-500">Couldn't load articles right now. Please refresh the page.</p>
        </div>
      </section>
    );
  }

  if (!featured) return null;

  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-20 md:py-18"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <AnimatePresence mode="wait">
          {!selectedBlog ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {/* Header */}
              <div className="mb-14 flex flex-col gap-6 border-b border-neutral-200 pb-10 md:mb-20 md:flex-row md:items-end md:justify-between">
                <div className="max-w-2xl">
                  <span className="mb-5 inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.3em] text-neutral-500">
                    <span className="h-px w-8 bg-neutral-900" />
                    The Journal
                  </span>
                  <h2
                    className="font-serif text-4xl leading-[1.05] tracking-tight text-neutral-900 md:text-6xl"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Articles &amp; <em className="italic">Columns</em>
                  </h2>
                </div>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-500 md:self-end">
                  {String(blogs.length).padStart(2, "0")} stories
                </p>
              </div>

              {/* Split layout */}
              <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                {/* Featured */}
                <div className="lg:col-span-7">
                  <AnimatePresence mode="wait">
                    <motion.article
                      key={featured.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedBlog(featured)}
                        className="group block w-full text-left"
                      >
                        <div className="relative mb-8 overflow-hidden bg-neutral-100">
                          <div className="aspect-[16/10] w-full">
                            <img
                              src={featured.image}
                              alt={featured.title}
                              loading="lazy"
                              className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                            />
                          </div>
                          <span className="absolute left-5 top-5 bg-white px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-900">
                            Featured
                          </span>
                        </div>

                        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-neutral-500">
                          {featured.date}
                        </p>

                        

                        <h3
                          className="font-serif text-3xl leading-[1.1] tracking-tight text-neutral-900 transition-colors group-hover:text-blue-600 md:text-5xl"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {featured.title}
                        </h3>

                        {(featured.excerpt || featured.content) && (
                          <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-600 md:text-lg">
                            {featured.excerpt || stripHtml(featured.content).slice(0, 180) + "…"}
                          </p>
                        )}

                        <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-neutral-900">
                          <span className="relative">
                            Read the story
                            <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-100 bg-neutral-900 transition-transform duration-300 group-hover:scale-x-0" />
                          </span>
                          <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </span>
                      </button>
                    </motion.article>
                  </AnimatePresence>
                </div>

                {/* Side list */}
                <ol className="lg:col-span-5" start={1}>
                  {side.map((b, i) => (
                    <li key={b.id} className="group border-t border-neutral-200 first:border-t-0">
                      <button
                        type="button"
                        onClick={() => setSelectedBlog(b)}
                        onMouseEnter={() => setFeaturedId(b.id)}
                        onFocus={() => setFeaturedId(b.id)}
                        className="flex w-full items-start gap-5 py-6 text-left transition-colors hover:bg-neutral-50 md:gap-7 md:py-7"
                      >
                        <span className="shrink-0 pt-1 font-mono text-xs text-neutral-400">
                          {String(i + 1).padStart(2, "0")}
                        </span>

                        <div className="flex-1">
                          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                            {b.date}
                          </p>
                          <h4
                            className="font-serif text-xl leading-snug text-neutral-900 transition-colors group-hover:text-blue-600 md:text-2xl"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                          >
                            {b.title}
                          </h4>
                        </div>

                        <div className="hidden h-20 w-24 shrink-0 overflow-hidden bg-neutral-100 sm:block md:h-24 md:w-32">
                          <img src={b.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        </div>

                        <ArrowUpRight size={18} className="mt-1 hidden shrink-0 text-neutral-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-900 md:block" />
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
            </motion.div>
          ) : (
            <BlogDetail
              key={`detail-${selectedBlog.id}`}
              blog={selectedBlog}
              allBlogs={blogs}
              onBack={() => setSelectedBlog(null)}
              onSelect={(b) => setSelectedBlog(b)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

/* ----------------------- Blog Detail (same file) ----------------------- */

const BlogDetail = ({ blog, allBlogs, onBack, onSelect }) => {
  if (!blog) return null;

  const others = allBlogs.filter((b) => b.id !== blog.id).slice(0, 4);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="mb-12 flex items-center justify-between border-b border-neutral-200 pb-6">
        <button type="button" onClick={onBack} className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900">
          <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
          Back to journal
        </button>
      </div>

      <header className="mx-auto max-w-4xl text-center">
        <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-blue-600">
          {blog.date}
        </p>

        <h1
          className="font-serif text-4xl leading-[1.05] tracking-tight text-neutral-900 md:text-6xl lg:text-7xl"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {blog.title}
        </h1>

        {blog.excerpt && (
          <p className="mt-6 text-lg leading-relaxed text-neutral-600 md:text-xl">{blog.excerpt}</p>
        )}
      </header>

      <div className="mt-14 overflow-hidden bg-neutral-100">
        <div className="aspect-[16/9] w-full">
          <img src={blog.image} alt={blog.title} className="h-full w-full object-cover" />
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-3xl">
        <div
          className="prose prose-lg max-w-none text-lg leading-[1.85] text-neutral-800 md:text-xl [&_p]:mb-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-semibold"
          style={{ fontFamily: "'Spectral', 'Playfair Display', serif" }}
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <div className="mt-16 flex items-center gap-4">
          <span className="h-px flex-1 bg-neutral-200" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-500">End of story</span>
          <span className="h-px flex-1 bg-neutral-200" />
        </div>
      </div>

      {others.length > 0 && (
        <div className="mt-24">
          <div className="mb-10 flex items-end justify-between border-b border-neutral-200 pb-6">
            <h3 className="font-serif text-2xl text-neutral-900 md:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>
              Continue reading
            </h3>
            <button type="button" onClick={onBack} className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-900">
              All stories
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((b) => (
              <button key={b.id} type="button" onClick={() => onSelect(b)} className="group text-left">
                <div className="mb-4 aspect-[4/5] w-full overflow-hidden bg-neutral-100">
                  <img src={b.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
                </div>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500">{b.date}</p>
                <h4 className="font-serif text-lg leading-snug text-neutral-900 transition-colors group-hover:text-blue-600 md:text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {b.title}
                </h4>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-neutral-500 transition-colors group-hover:text-neutral-900">
                  Read
                  <ArrowUpRight size={12} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </motion.article>
  );
};

export default BlogCarousel;