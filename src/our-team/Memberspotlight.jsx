import React, { useEffect, useState, useCallback, memo } from "react";
import { Quote, MapPin, Sparkles } from "lucide-react";
import { getAllChapterAmbassadors } from "../api/chapterAmbassadorRoutes";
// ^ update this import path to wherever getAllChapterAmbassadors lives

// Skeleton shown in place of a card while data is loading — mirrors the real card's shape
const SkeletonMemberCard = ({ index }) => {
  const isReversed = index % 2 === 1;
  return (
    <div
      className={`relative grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
        isReversed ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div className="relative flex justify-center lg:justify-start">
        <div className="w-full max-w-[520px] h-[380px] md:h-[500px] bg-white/60 animate-pulse" />
      </div>
      <div className="relative bg-white/50 p-8 md:p-10 animate-pulse">
        <div className="h-4 w-3/4 bg-slate-200 rounded mb-3" />
        <div className="h-4 w-full bg-slate-200 rounded mb-3" />
        <div className="h-4 w-5/6 bg-slate-200 rounded mb-7" />
        <div className="h-5 w-40 bg-slate-200 rounded mb-2" />
        <div className="h-4 w-32 bg-slate-200 rounded" />
      </div>
    </div>
  );
};

export default function MemberSpotlight() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchMembers = async () => {
      try {
        const res = await getAllChapterAmbassadors();
        const list = Array.isArray(res) ? res : res?.data || [];
        if (isMounted) {
          setMembers(Array.isArray(list) ? list : [list]);
          setError(false);
        }
      } catch (err) {
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchMembers();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="relative bg-[#F5F7FF] py-20 md:py-28 overflow-hidden">
      {/* ===== TEXTURED BACKGROUND ===== */}
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.25] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#4D6AE8 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      {/* Diagonal lines */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #1A1F36 0, #1A1F36 1px, transparent 1px, transparent 14px)",
        }}
      />
      {/* Grainy noise */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.4] mix-blend-overlay pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noiseMS">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseMS)" opacity="0.35" />
      </svg>
      {/* Ambient glows */}
      <div className="pointer-events-none absolute top-10 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#4D6AE8]/15 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#4D6AE8]/10 to-transparent blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-5">
        {/* ===== SECTION HEADING ===== */}
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-[0.25em] text-[#4D6AE8] uppercase mb-5 bg-white/70 backdrop-blur-sm px-5 py-2 ring-1 ring-[#4D6AE8]/15 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Member Spotlight
            <Sparkles className="w-3.5 h-3.5" />
          </span>
          <h2 className="text-[#1A1F36] text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wide leading-tight">
            Meet Our{" "}
            <span className="relative inline-block text-[#4D6AE8]">
              Visionary Leaders
              <svg
                className="absolute left-0 -bottom-2 w-full h-3"
                viewBox="0 0 400 12"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 9C80 2 320 2 398 9"
                  stroke="#4D6AE8"
                  strokeWidth="4"
                  fill="none"
                  opacity="0.35"
                />
              </svg>
            </span>
          </h2>
        </div>

        {/* ===== MEMBER CARDS ===== */}
        {loading && (
          <div className="space-y-16 md:space-y-24">
            {Array.from({ length: 2 }).map((_, i) => (
              <SkeletonMemberCard key={i} index={i} />
            ))}
          </div>
        )}

        {!loading && error && (
          <p className="text-center text-[#1A1F36]/60 text-sm">
            Couldn't load members right now. Please refresh the page.
          </p>
        )}

        {!loading && !error && members.length === 0 && (
          <p className="text-center text-[#1A1F36]/60 text-sm">No members to show yet.</p>
        )}

        {!loading && !error && members.length > 0 && (
          <div className="space-y-16 md:space-y-24">
            {members.map((m, i) => (
              <MemberCard key={m._id || m.id || i} member={m} index={i} total={members.length} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

const MemberCard = memo(function MemberCard({ member, index, total }) {
  const isReversed = index % 2 === 1;

  // API fields → design fields (kept in one place so the JSX below never changes)
  const image = member.profileImage || member.image;
  const flagImg = member.flagImage || member.flagImg;
  const quote = member.description || member.quote;
  const title = member.designation || member.title;

  return (
    <div
      className={`relative grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
        isReversed ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* ===== IMAGE BLOCK ===== */}
      <div className="relative flex justify-center lg:justify-start">
        {/* Offset accent frame */}
        <div
          className={`absolute -inset-4 border-2 border-[#4D6AE8]/30 -z-10 ${
            isReversed ? "translate-x-4 translate-y-4" : "-translate-x-4 translate-y-4"
          }`}
        />
        {/* Corner brackets */}
        <div className="absolute -top-3 -left-3 w-10 h-10 border-t-4 border-l-4 border-[#4D6AE8] z-10" />
        <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-4 border-r-4 border-[#4D6AE8] z-10" />

       <div className="relative w-full max-w-[1000px] overflow-hidden shadow-2xl ring-1 ring-black/10 group">
          <img
            src={image}
            alt={member.name}
            loading="lazy"
            decoding="async"
            className="w-full h-[380px] md:h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F36]/70 via-[#1A1F36]/10 to-transparent" />
          {/* Diagonal stripe overlay */}
          <div
            className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, transparent 0, transparent 3px, rgba(255,255,255,0.05) 3px, rgba(255,255,255,0.05) 4px)",
            }}
          />

          {/* Number badge */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 flex items-center gap-2 shadow-md">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#4D6AE8] uppercase">
              0{index + 1} / 0{total}
            </span>
          </div>

          {/* Flag badge (bottom left) */}
         {/* Flag badge (bottom left) — sirf tab dikhega jab flag image ho */}
{flagImg ? (
  <div className="absolute bottom-4 left-4 flex items-center gap-3 bg-white/95 backdrop-blur-sm px-3 py-2 shadow-lg">
    <div className="w-10 h-7 overflow-hidden ring-1 ring-black/10">
      <img
        src={flagImg}
        alt={member.country + " flag"}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover"
      />
    </div>
    <div className="flex items-center gap-1 text-[#1A1F36]">
      <MapPin className="w-3.5 h-3.5 text-[#4D6AE8]" />
      <span className="text-xs font-bold uppercase tracking-wider">
        {member.country}
      </span>
    </div>
  </div>
) : member.country ? (
  <div className="absolute bottom-4 left-4 flex items-center gap-1 text-[#1A1F36] bg-white/95 backdrop-blur-sm px-3 py-2 shadow-lg">
    <MapPin className="w-3.5 h-3.5 text-[#4D6AE8]" />
    <span className="text-xs font-bold uppercase tracking-wider">
      {member.country}
    </span>
  </div>
) : null}
        </div>
      </div>

      {/* ===== CONTENT BLOCK ===== */}
      <div className="relative">
        {/* Giant quote mark decoration */}
        <Quote
          className="absolute -top-8 -left-2 w-24 h-24 text-[#4D6AE8]/10"
          strokeWidth={1.5}
        />

        <div className="relative bg-white/70 backdrop-blur-sm p-8 md:p-10 ring-1 ring-black/5 shadow-xl border-l-4 border-[#4D6AE8]">
          {/* Inner subtle pattern */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(#4D6AE8 1px, transparent 1px)",
              backgroundSize: "14px 14px",
            }}
          />

          <div className="relative">
            {/* Small quote icon */}
            <div className="w-12 h-12 bg-[#4D6AE8] flex items-center justify-center mb-5 shadow-md shadow-[#4D6AE8]/30">
              <Quote className="w-6 h-6 text-white" fill="white" />
            </div>

            {/* Quote text */}
            <p className="text-[#4D6AE8] font-bold uppercase tracking-wide text-sm md:text-base leading-relaxed mb-7">
              {quote}
            </p>

            {/* Divider with accent */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-1 bg-[#4D6AE8]" />
              <div className="w-2 h-1 bg-[#4D6AE8]/40" />
              <div className="w-1 h-1 bg-[#4D6AE8]/20" />
            </div>

            {/* Name and title */}
            <h3 className="text-[#1A1F36] text-xl md:text-2xl font-bold mb-1">
              {member.name}
            </h3>
            <p className="text-gray-600 text-sm md:text-base">{title}</p>
          </div>
        </div>

        {/* Index number - large watermark */}
        <div
          className={`hidden lg:block absolute ${
            isReversed ? "-right-6" : "-left-6"
          } -bottom-8 text-[120px] font-black text-[#4D6AE8]/8 leading-none pointer-events-none select-none -z-10`}
        >
          0{index + 1}
        </div>
      </div>
    </div>
  );
});