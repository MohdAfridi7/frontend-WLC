import React, { useEffect, useState, memo } from "react";
import { MapPin, Quote } from "lucide-react";
import { getAllTeamMembers } from "../api/teamRoutes";
// ^ update this import path to wherever getAllTeamMembers lives

// Skeleton shown in place of a card while data is loading — mirrors the real card's shape
const SkeletonMemberCard = () => (
  <div className="relative bg-white ring-1 ring-black/5 shadow-md overflow-hidden">
    <div className="h-[300px] w-full bg-slate-200 animate-pulse" />
    <div className="p-6 md:p-7">
      <div className="h-4 w-2/3 bg-slate-200 rounded mb-4 animate-pulse" />
      <div className="h-3 w-full bg-slate-200 rounded mb-2 animate-pulse" />
      <div className="h-3 w-5/6 bg-slate-200 rounded animate-pulse" />
    </div>
  </div>
);

export default function MemberGrid() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchMembers = async () => {
      try {
        const res = await getAllTeamMembers();
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
        <filter id="noiseMG">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseMG)" opacity="0.35" />
      </svg>
      {/* Ambient glows */}
      <div className="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#4D6AE8]/15 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[420px] h-[420px] bg-gradient-to-tr from-[#4D6AE8]/10 to-transparent blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-5">
        {/* ===== HEADING ===== */}


        {/* ===== MEMBER GRID ===== */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonMemberCard key={i} />
            ))}
          </div>
        )}

        {!loading && error && (
          <p className="text-center text-[#1A1F36]/60 text-sm">
            Couldn't load team members right now. Please refresh the page.
          </p>
        )}

        {!loading && !error && members.length === 0 && (
          <p className="text-center text-[#1A1F36]/60 text-sm">No team members to show yet.</p>
        )}

        {!loading && !error && members.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {members.map((m, i) => (
              <MemberCard key={m._id || m.id || i} member={m} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

const MemberCard = memo(function MemberCard({ member, index }) {
  // API fields → design fields (kept in one place so the JSX below never changes)
  const image = member.profileImage || member.image;
  const flagImg = member.flagImage || member.flagImg;
  const title = member.designation || member.title;
  const bio = member.description || member.bio;

  const firstName = member.name.split(" ")[0];
  const restBio = bio.replace(firstName, "").trim();

  return (
    <div className="group relative bg-white ring-1 ring-black/5 shadow-md hover:shadow-2xl hover:shadow-[#4D6AE8]/15 transition-all duration-500 hover:-translate-y-1 overflow-hidden">
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#4D6AE8] z-20" />

      {/* ===== IMAGE BLOCK ===== */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={member.name}
          loading="lazy"
          decoding="async"
          className="w-full h-[300px] object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F36]/85 via-[#1A1F36]/20 to-transparent" />

        {/* Diagonal stripe texture */}
        <div
          className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, transparent 0, transparent 3px, rgba(255,255,255,0.06) 3px, rgba(255,255,255,0.06) 4px)",
          }}
        />

        {/* Number badge (top-left) */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-2.5 py-1 shadow">
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#4D6AE8] uppercase">
            0{index + 1}
          </span>
        </div>

        {/* Flag badge (top-right) */}
       
 x
        {/* Name overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-center gap-2 text-white/90 text-[10px] font-semibold tracking-[0.2em] uppercase mb-2">
            <MapPin className="w-3 h-3 text-[#4D6AE8]" strokeWidth={2.5} />
            WLC Member
          </div>
          <h3 className="text-white text-xl font-bold leading-tight drop-shadow-md">
            {member.name}
          </h3>
        </div> 
      </div>

      {/* ===== CONTENT BLOCK ===== */}
      <div className="relative p-6 md:p-7">
        {/* subtle dot pattern inside card */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(#4D6AE8 1px, transparent 1px)",
            backgroundSize: "14px 14px",
          }}
        />

        <div className="relative">
          {/* Title pill */}
          <div className="inline-flex items-start gap-2 mb-4">
            <div className="w-1 h-full min-h-[36px] bg-[#4D6AE8] shrink-0 mt-0.5" />
            <p className="text-[#1A1F36] text-sm font-semibold leading-snug">
              {title}
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-0.5 bg-[#4D6AE8]" />
            <Quote className="w-3.5 h-3.5 text-[#4D6AE8]" />
            <div className="flex-1 h-px bg-[#4D6AE8]/20" />
          </div>

          {/* Bio */}
          <p className="text-gray-600 text-sm leading-relaxed">
            <span className="font-bold text-[#1A1F36]">{firstName} </span>
            {restBio}
          </p>
        </div>

        {/* Watermark id */}
        <span className="absolute bottom-2 right-3 text-[70px] font-black text-[#4D6AE8]/[0.05] leading-none pointer-events-none select-none">
          0{index + 1}
        </span>
      </div>
    </div>
  );
});