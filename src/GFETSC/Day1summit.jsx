import { useEffect, useState } from "react";
import { getAllGfetsc } from "../api/gfetscRoutes";
// ^ update this import path to wherever getAllGfetsc lives

/* ---------- Image with fallback ---------- */
function Img({ src, alt, className = "", ratio = "aspect-[4/3]" }) {
  const [err, setErr] = useState(false);
  if (!src || err) {
    return (
      <div className={`w-full ${ratio} bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 text-xs uppercase tracking-widest ${className}`}>
        {alt || "No Image"}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className={`w-full ${ratio} object-cover block ${className}`}
      onError={() => setErr(true)}
    />
  );
}

/* ---------- Reusable bits ---------- */
const H2 = ({ children, className = "" }) => (
  <h2 className={`font-serif font-semibold text-gray-800 text-2xl md:text-3xl leading-tight ${className}`}>
    {children}
  </h2>
);

const Chapter = ({ n, label, title, blueLabel = false }) => (
  <div className="mb-10">
    <div className="flex items-baseline gap-4 mb-2">
      <span className="font-serif text-blue-700 text-3xl md:text-4xl font-semibold tabular-nums">
        {n}
      </span>
      <span className={`text-[11px] font-semibold uppercase tracking-[3px] ${blueLabel ? "text-blue-700" : "text-gray-500"}`}>
        {label}
      </span>
    </div>
    <H2>{title}</H2>
    <div className="mt-3 h-[3px] w-16 bg-blue-700" />
  </div>
);

function stripHtml(html = "") {
  const div = document.createElement("div");
  div.innerHTML = html;
  return (div.textContent || div.innerText || "").trim();
}

/* ---------- GFETSC card ---------- */
function GfetscCard({ item }) {
  const [expanded, setExpanded] = useState(false);

  const plainText = stripHtml(item.description || "");

  return (
    <div className="group relative overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-lg transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_25px_80px_-15px_rgba(37,99,235,0.35)]">

      {/* Spotlight Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/5 to-cyan-400/10 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

      {/* Shine Effect */}
      <div className="absolute inset-0 z-20 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 transition-transform duration-1000 group-hover:translate-x-[120%]" />

      {/* Image */}
      <div className="relative overflow-hidden">
        <Img
          src={item.image}
          alt={item.title}
          ratio="aspect-[4/3]"
          className="transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Badge */}
        <div className="absolute top-4 left-4 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-blue-700 shadow-lg">
          GFETSC
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-6">
        <h3 className="mb-3 line-clamp-2 text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-blue-600">
          {item.title}
        </h3>

        {!expanded ? (
          <p className="line-clamp-3 text-sm leading-relaxed text-slate-600">
            {plainText}
          </p>
        ) : (
          <div
            className="
              prose
              prose-sm
              max-w-none
              text-slate-700

              [&_ul]:list-disc
              [&_ul]:pl-6
              [&_ul]:my-3

              [&_ol]:list-decimal
              [&_ol]:pl-6
              [&_ol]:my-3

              [&_li]:mb-1

              [&_h1]:text-2xl
              [&_h1]:font-bold

              [&_h2]:text-xl
              [&_h2]:font-bold

              [&_h3]:text-lg
              [&_h3]:font-bold

              [&_strong]:font-bold
              [&_a]:text-blue-600
              [&_a]:underline
            "
            dangerouslySetInnerHTML={{
              __html: item.description || "",
            }}
          />
        )}

        {plainText.length > 120 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 transition-all duration-300 hover:bg-blue-600 hover:text-white hover:gap-3"
          >
            {expanded ? "Show Less" : "Read More"}
            <span>→</span>
          </button>
        )}

        {/* Bottom Accent */}
        <div className="mt-5 h-[3px] w-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-500 group-hover:w-24" />
      </div>
    </div>
  );
}

/* ---------- Loading skeleton for a card grid ---------- */
function CardGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="border border-gray-200 bg-white overflow-hidden">
          <div className="aspect-[4/3] w-full animate-pulse bg-gray-100" />
          <div className="p-5">
            <div className="mb-3 h-4 w-2/3 animate-pulse bg-gray-100" />
            <div className="mb-2 h-3 w-full animate-pulse bg-gray-100" />
            <div className="h-3 w-5/6 animate-pulse bg-gray-100" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============ GFETSC SECTION (no day filtering) ============ */
export default function GfetscSection() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchItems = async () => {
      try {
        const res = await getAllGfetsc();
        const list = Array.isArray(res) ? res : res?.data || [];
        if (isMounted) {
          setItems(Array.isArray(list) ? list : [list]);
          setError(false);
        }
      } catch (err) {
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchItems();
    return () => {
      isMounted = false;
    };
  }, []);

  if (error) {
    return (
      <p className="max-w-6xl mx-auto px-6 py-14 text-center text-sm text-gray-500">
        Couldn't load GFETSC updates right now. Please refresh the page.
      </p>
    );
  }

  return (
    <section className="bg-gray-50 border-y border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <Chapter n="01" label="GFETSC" title="GFETSC Highlights" blueLabel />

        {loading && <CardGridSkeleton />}

        {!loading && items.length === 0 && (
          <p className="text-sm text-gray-400">No GFETSC updates yet.</p>
        )}

        {!loading && items.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((s) => (
              <GfetscCard key={s._id} item={s} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}