import { useEffect, useState } from "react";
import { getAllSummits } from "../api/summitsRoutes";
// ^ update this import path to wherever getAllSummits lives

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
const Eyebrow = ({ children, color = "text-blue-700" }) => (
  <div className="flex items-center gap-3 mb-4">
    <span className={`h-[2px] w-8 bg-blue-700`} />
    <span className={`text-[11px] font-semibold uppercase tracking-[3px] ${color}`}>{children}</span>
  </div>
);

const H2 = ({ children, className = "" }) => (
  <h2 className={`font-serif font-semibold text-gray-800 text-2xl md:text-3xl leading-tight ${className}`}>
    {children}
  </h2>
);

const H3 = ({ children }) => (
  <h3 className="font-serif font-semibold text-gray-800 text-lg leading-snug">
    {children}
  </h3>
);

const Para = ({ children, className = "" }) => (
  <p className={`text-[15px] leading-[1.75] text-gray-600 font-serif ${className}`}>
    {children}
  </p>
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

// Normalizes the "day" field regardless of whether the API sends 1 / "1" / "Day 1"
function normalizeDay(day) {
  if (day === 1 || day === "1") return 1;
  if (day === 2 || day === "2") return 2;
  const match = String(day || "").match(/(\d)/);
  return match ? Number(match[1]) : null;
}

function stripHtml(html = "") {
  const div = document.createElement("div");
  div.innerHTML = html;
  return (div.textContent || div.innerText || "").trim();
}

/* ---------- Summit card ---------- */
function SummitCard({ summit }) {
  const [expanded, setExpanded] = useState(false);

  const plainText = stripHtml(summit.description || "");

  return (
    <div className="group relative overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-lg transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_25px_80px_-15px_rgba(37,99,235,0.35)]">

      {/* Spotlight Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/5 to-cyan-400/10 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

      {/* Shine Effect */}
      <div className="absolute inset-0 z-20 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 transition-transform duration-1000 group-hover:translate-x-[120%]" />

      {/* Image */}
      <div className="relative overflow-hidden">
        <Img
          src={summit.image}
          alt={summit.title}
          ratio="aspect-[4/3]"
          className="transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Badge */}
        <div className="absolute top-4 left-4 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-blue-700 shadow-lg">
          W50 Summit
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-6">
        <h3 className="mb-3 line-clamp-2 text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-blue-600">
          {summit.title}
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
              __html: summit.description || "",
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

/* ============ MAIN ============ */
export default function FirstSummit() {
  const [summits, setSummits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchSummits = async () => {
      try {
        const res = await getAllSummits();
        const list = Array.isArray(res) ? res : res?.data || [];
        if (isMounted) {
          setSummits(Array.isArray(list) ? list : [list]);
          setError(false);
        }
      } catch (err) {
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchSummits();
    return () => {
      isMounted = false;
    };
  }, []);

  const day1 = summits.filter((s) => normalizeDay(s.day) === 1);
  const day2 = summits.filter((s) => normalizeDay(s.day) === 2);
  const noDay = summits.filter((s) => normalizeDay(s.day) !== 1 && normalizeDay(s.day) !== 2);

  return (
    <div className="bg-white text-gray-700">
      {/* ── MASTHEAD ── */}
      <header className="max-w-6xl mx-auto px-6 pt-14 pb-10 border-b border-gray-200">
        <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[3px] text-gray-500 mb-8">
          <span>World Leaders Consortium · Press Release</span>
          <span className="hidden sm:inline text-blue-700">Vol. 01 · 2025 Edition</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <h1
            className="font-black uppercase leading-[1.05] tracking-tight text-blue-700 text-3xl md:text-5xl lg:text-6xl max-w-4xl"
            style={{ fontFamily: "'Arial Black', Arial, sans-serif" }}
          >
            WLC Announces Successful <br className="hidden md:block" />
            Inaugural W50 Summit in New&nbsp;Delhi
          </h1>

         
        </div>

        

       
      </header>

      {error && (
        <p className="max-w-6xl mx-auto px-6 py-14 text-center text-sm text-gray-500">
          Couldn't load summit updates right now. Please refresh the page.
        </p>
      )}

      {!error && (
        <>
          {/* ── DAY 1 ── */}
          <section className="bg-gray-50 border-y border-gray-200">
            <div className="max-w-6xl mx-auto px-6 py-14">
              <Chapter n="01" label="Day One" title="Highlights from Day One" blueLabel />

              {loading && <CardGridSkeleton />}

              {!loading && day1.length === 0 && (
                <p className="text-sm text-gray-400">No Day 1 updates yet.</p>
              )}

              {!loading && day1.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {day1.map((s) => (
                    <SummitCard key={s._id} summit={s} />
                  ))}
                </div>
              )}
            </div>
          </section>

         

          {/* ── DAY 2 ── */}
          <section className="max-w-6xl mx-auto px-6 py-14">
            <Eyebrow>Highlights</Eyebrow>
            <H2 className="mb-8">Highlights from Day Two</H2>

            {loading && <CardGridSkeleton />}

            {!loading && day2.length === 0 && (
              <p className="text-sm text-gray-400">No Day 2 updates yet.</p>
            )}

            {!loading && day2.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {day2.map((s) => (
                  <SummitCard key={s._id} summit={s} />
                ))}
              </div>
            )}
          </section>

          {/* ── UNASSIGNED (only shown if some entries have no day set) ── */}
          {!loading && noDay.length > 0 && (
            <section className="bg-gray-50 border-t border-gray-200">
              <div className="max-w-6xl mx-auto px-6 py-14">
                <Eyebrow>More</Eyebrow>
                <H2 className="mb-8">More from the Summit</H2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {noDay.map((s) => (
                    <SummitCard key={s._id} summit={s} />
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* ── FOOTER STRIP ── */}
      <footer className="max-w-6xl mx-auto px-6 py-10 border-t border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="text-[11px] uppercase tracking-[3px] text-gray-500 font-semibold">
            World Leaders Consortium · WLC
          </div>
          <div className="font-serif font-semibold text-gray-800">
            W50 Global Summit · New Delhi · <span className="text-blue-700">2025 Edition</span>
          </div>
          <div className="text-[11px] uppercase tracking-[3px] text-gray-500 font-semibold">
            Next Edition — 2026
          </div>
        </div>
      </footer>
    </div>
  );
}