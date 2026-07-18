import React, { useEffect, useState, memo } from "react";
import { Play, Sparkles, ArrowUpRight, X, Calendar } from "lucide-react";
import { FaYoutube } from "react-icons/fa";
import { getAllVideos } from "../api/videoRoutes";
// ^ update this import path to wherever getAllVideos lives

const SUBSCRIBE_URL = "https://www.youtube.com/@worldleadersconsortium";

// Pull a YouTube video id out of watch/short/embed style links
function extractYoutubeId(url = "") {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{6,})/
  );
  return match ? match[1] : "";
}

// The design expects an array of paragraphs; the API gives one HTML "content" field.
// Only look at DIRECT children that are block elements — walking all descendants
// (querySelectorAll) double-counts nested tags like <div><p>text</p></div> and
// produces duplicate paragraphs. <br> tags are converted to real line breaks first
// so single-block content separated by <br> still splits into separate paragraphs.


// Skeleton shown in place of a card while data is loading — mirrors the real card's shape
const SkeletonUpdateCard = () => (
  <div className="relative bg-white ring-1 ring-black/5 shadow-md overflow-hidden">
    <div className="aspect-video w-full bg-slate-200 animate-pulse" />
    <div className="p-6">
      <div className="h-4 w-3/4 bg-slate-200 rounded mb-3 animate-pulse" />
      <div className="h-3 w-1/2 bg-slate-200 rounded mb-4 animate-pulse" />
      <div className="h-3 w-full bg-slate-200 rounded mb-2 animate-pulse" />
      <div className="h-3 w-5/6 bg-slate-200 rounded animate-pulse" />
    </div>
  </div>
);

export default function GlobalUpdate1() {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchVideos = async () => {
      try {
        const res = await getAllVideos();
        const list = Array.isArray(res) ? res : res?.data || [];
        if (isMounted) {
          setUpdates(Array.isArray(list) ? list : [list]);
          setError(false);
        }
      } catch (err) {
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchVideos();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="relative bg-[#F5F7FF] py-20 md:py-28 overflow-hidden">
      {/* ===== TEXTURED BACKGROUND ===== */}
      <div
        className="absolute inset-0 opacity-[0.25] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#4D6AE8 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #1A1F36 0, #1A1F36 1px, transparent 1px, transparent 14px)",
        }}
      />
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.4] mix-blend-overlay pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noiseGU">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseGU)" opacity="0.35" />
      </svg>
      <div className="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#4D6AE8]/15 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[420px] h-[420px] bg-gradient-to-tr from-[#4D6AE8]/10 to-transparent blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-5">
        {/* ===== HEADING ===== */}
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-[0.25em] text-[#4D6AE8] uppercase mb-5 bg-white/70 backdrop-blur-sm px-5 py-2  ring-1 ring-[#4D6AE8]/15 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            News & Highlights
            <Sparkles className="w-3.5 h-3.5" />
          </span>
          <h2 className="text-[#1A1F36] text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wide leading-tight">
            WLC's{" "}
            <span className="relative inline-block text-[#4D6AE8]">
              Global Updates
              <svg
                className="absolute left-0 -bottom-2 w-full h-3"
                viewBox="0 0 400 12"
                preserveAspectRatio="none"
              >
                <path d="M2 9C80 2 320 2 398 9" stroke="#4D6AE8" strokeWidth="4" fill="none" opacity="0.35" />
              </svg>
            </span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto mt-6">
            Voices from world leaders, live speeches, defining moments — curated by the World Leaders Consortium.
          </p>

          {/* Live pill */}
          <div className="mt-6 inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-1.5 ring-1 ring-red-500/20 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#1A1F36]">
              {loading ? "Loading" : updates.length} Latest Broadcasts
            </span>
          </div>
        </div>

        {/* ===== GRID ===== */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonUpdateCard key={i} />
            ))}
          </div>
        )}

        {!loading && error && (
          <p className="text-center text-[#1A1F36]/60 text-sm">
            Couldn't load updates right now. Please refresh the page.
          </p>
        )}

        {!loading && !error && updates.length === 0 && (
          <p className="text-center text-[#1A1F36]/60 text-sm">No updates to show yet.</p>
        )}

        {!loading && !error && updates.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {updates.map((u, idx) => (
              <UpdateCard
                key={u._id || u.id || idx}
                update={u}
                index={idx}
                isExpanded={expandedId === (u._id || u.id)}
                onExpand={() =>
                  setExpandedId(expandedId === (u._id || u.id) ? null : u._id || u.id)
                }
                onPlay={() => setActiveVideo(u)}
              />
            ))}
          </div>
        )}

        {/* ===== SUBSCRIBE CTA ===== */}
        <div className="mt-20 relative bg-gradient-to-br from-[#1A1F36] to-[#2a3560] p-10 md:p-14 overflow-hidden">
          {/* CTA texture */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(#4D6AE8 1.5px, transparent 1.5px)",
              backgroundSize: "20px 20px",
            }}
          />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent 0, transparent 10px, rgba(77,106,232,0.1) 10px, rgba(77,106,232,0.1) 11px)",
            }}
          />

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-[#4D6AE8] text-xs font-bold tracking-[0.25em] uppercase mb-3">
                <FaYoutube className="w-4 h-4" />
                YouTube Channel
              </div>
              <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">
                Never miss a world-shaping moment
              </h3>
              <p className="text-gray-300 text-sm md:text-base">
                Subscribe for exclusive interviews, keynotes, and global broadcasts.
              </p>
            </div>
            <a
              href={SUBSCRIBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-[#4D6AE8] hover:bg-[#3d57d1] text-white font-bold tracking-[0.2em] px-8 py-4 shadow-lg shadow-[#4D6AE8]/30 hover:shadow-xl hover:shadow-[#4D6AE8]/50 hover:-translate-y-0.5 transition-all whitespace-nowrap"
            >
              SUBSCRIBE NOW
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>

      {/* ===== VIDEO MODAL ===== */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-[#1A1F36] shadow-2xl ring-1 ring-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-12 right-0 text-white hover:text-[#4D6AE8] transition-colors flex items-center gap-2 text-sm"
            >
              Close <X className="w-5 h-5" />
            </button>
            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${extractYoutubeId(
                  activeVideo.youtubeLink
                )}?autoplay=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-5 border-t border-white/10">
              <p className="text-white font-semibold">{activeVideo.title}</p>
              <p className="text-gray-400 text-xs mt-1">World Leaders Consortium</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ===== CARD ===== */
const UpdateCard = memo(function UpdateCard({ update, index, isExpanded, onExpand, onPlay }) {
  const youtubeId = extractYoutubeId(update.youtubeLink);
const hasContent = !!update.content;

  return (
    <article className="group relative bg-white ring-1 ring-black/5 shadow-md hover:shadow-2xl hover:shadow-[#4D6AE8]/15 transition-all duration-500 hover:-translate-y-1 overflow-hidden flex flex-col">
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#4D6AE8] z-20" />

      {/* ===== VIDEO THUMB ===== */}
      <button
        onClick={onPlay}
        className="relative block w-full aspect-video overflow-hidden group/thumb"
      >
        <img
          src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
          alt={update.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover/thumb:scale-110"
        />

        {/* Dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />

        {/* Diagonal stripes */}
        <div
          className="absolute inset-0 opacity-25 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, transparent 0, transparent 3px, rgba(255,255,255,0.08) 3px, rgba(255,255,255,0.08) 4px)",
          }}
        />

        {/* Episode number */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 shadow">
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#4D6AE8] uppercase">
            EP {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Channel badge */}
        <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/60 backdrop-blur-sm pl-1 pr-3 py-1 rounded-full">
          <div className="w-7 h-7 rounded-full bg-[#4D6AE8] flex items-center justify-center text-[10px] font-bold text-white">
            WLC
          </div>
          <div className="text-white text-left leading-tight">
            <p className="text-[10px] font-semibold truncate max-w-[110px]">{update.title}</p>
            <p className="text-[9px] opacity-75">World Leaders</p>
          </div>
        </div>

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-2xl shadow-red-600/50 transition-transform duration-300 group-hover/thumb:scale-110">
            <div className="absolute inset-0 rounded-full bg-red-600 animate-ping opacity-30"></div>
            <Play className="w-7 h-7 text-white fill-white ml-1 relative z-10" />
          </div>
        </div>

        {/* Watch on YouTube */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm px-2.5 py-1 text-white text-[10px] font-medium">
          <FaYoutube className="w-3.5 h-3.5 text-red-500" fill="currentColor" />
          <span className="tracking-wide">Watch on YouTube</span>
        </div>
      </button>

      {/* ===== TEXT CONTENT ===== */}
      <div className="relative p-6 flex flex-col flex-1">
        {/* Meta */}
        <div className="flex items-center gap-3 text-[10px] text-gray-500 uppercase tracking-[0.2em] font-semibold mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-[#4D6AE8]" />
            Featured
          </span>
          <span className="w-1 h-1 bg-[#4D6AE8] rounded-full" />
          <span>Global</span>
        </div>

        {/* Card title */}
        <h3 className="text-[#1A1F36] text-lg font-bold leading-snug mb-3">{update.title}</h3>

        {/* Divider */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-0.5 bg-[#4D6AE8]" />
          <div className="flex-1 h-px bg-[#4D6AE8]/20" />
        </div>

        {/* Sub-heading */}
        <h4 className="text-[#4D6AE8] text-sm font-bold uppercase tracking-wide mb-3 leading-snug">
          {update.shortDescription}
        </h4>

        {/* Paragraphs */}
     {/* Content */}
<div
  className={`prose prose-sm max-w-none text-gray-600 text-sm leading-relaxed flex-1 overflow-hidden
  [&_ul]:list-disc [&_ul]:pl-5
  [&_ol]:list-decimal [&_ol]:pl-5
  [&_h2]:text-base [&_h2]:font-bold
  ${isExpanded ? "" : "max-h-[120px]"}`}
  dangerouslySetInnerHTML={{
    __html: update.content || "",
  }}
/>

        {/* Expand / Collapse */}
        {hasContent && (
          <button
            onClick={onExpand}
            className="inline-flex items-center gap-1.5 mt-5 text-[#4D6AE8] text-xs font-bold uppercase tracking-[0.15em] hover:gap-2.5 transition-all self-start"
          >
            {isExpanded ? "Show Less" : "Read Full Story"}
            <ArrowUpRight
              className={`w-3.5 h-3.5 transition-transform ${isExpanded ? "rotate-90" : ""}`}
            />
          </button>
        )}
      </div>
    </article>
  );
});