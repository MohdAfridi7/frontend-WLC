
import React, { useState, useEffect, useCallback } from "react";
import img from "/image/img-8.png";
import img1 from "/image/img-9.png";
import img2 from "/image/img-10.png";
import img3 from "/image/img-11.png";
import img4 from "/image/img-12.png";
import img5 from "/image/img-13.png";
import img6 from "/image/img-14.png";
import img7 from "/image/img-15.png";
import img8 from "/image/img-16.png";
import img9 from "/image/img-17.png";
import img10 from "/image/img-18.png";
import img11 from "/image/img-19.png";
import img12 from "/image/img-20.png";
import img13 from "/image/img-21.png";
import img14 from "/image/img-22.png";
import img15 from "/image/img-23.png";

/**
 * WLC GIP Brochure — Premium Edition
 * -----------------------------------
 * • Same content, images & #4F6EF7 accent preserved
 * • Premium magazine-style brochure viewer
 * • Keyboard navigation (←/→) + thumbnail rail + progress bar
 * • Single-file component (Tailwind required)
 */

const ACCENT = "#4F6EF7";

const WlcStats = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // for slide transition
  const [fullscreen, setFullscreen] = useState(false);

  const pdfUrl =
  "https://img1.wsimg.com/blobby/go/b6c56996-d063-4e20-930c-1d8a40821864/Membership%20Drive_20260510_115051_0000.pdf";
  const slides = [
  { image: img, pdf: pdfUrl },
  { image: img1, pdf: pdfUrl },
  { image: img2, pdf: pdfUrl },
  { image: img3, pdf: pdfUrl },
  { image: img4, pdf: pdfUrl },
  { image: img5, pdf: pdfUrl },
  { image: img6, pdf: pdfUrl },
  { image: img7, pdf: pdfUrl },
  { image: img8, pdf: pdfUrl },
  { image: img9, pdf: pdfUrl },
  { image: img10, pdf: pdfUrl },
  { image: img11, pdf: pdfUrl },
  { image: img12, pdf: pdfUrl },
  { image: img13, pdf: pdfUrl },
  { image: img14, pdf: pdfUrl },
  { image: img15, pdf: pdfUrl },
];
  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  const goTo = (idx) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "Escape") setFullscreen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [nextSlide, prevSlide]);

  const progress = ((current + 1) / slides.length) * 100;

  return (
    <section
      data-testid="wlc-brochure-section"
      className="relative overflow-hidden bg-gradient-to-b from-[#efefef] via-[#f4f6ff] to-[#efefef] py-20 md:py-28"
    >
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-32 h-96 w-96 rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, #4F6EF7 0%, transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-32 h-[30rem] w-[30rem] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #4F6EF7 0%, transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(#4F6EF7 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5">
        {/* Eyebrow */}
        <div
          data-testid="eyebrow-badge"
          className="mx-auto mb-6 flex w-fit items-center gap-2  border border-[#4F6EF7]/25 bg-white/80 px-4 py-1.5 shadow-sm backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#4F6EF7]" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#4F6EF7]">
            Official Program Brochure
          </span>
        </div>

        {/* Heading */}
        <h2
          data-testid="brochure-heading"
          className="animate-[fadeUp_0.9s_ease-out_both] text-center font-extrabold text-4xl md:text-5xl uppercase tracking-wide mb-4"
          style={{
            background: `linear-gradient(90deg, ${ACCENT} 0%, #7A93FF 50%, ${ACCENT} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          WLC GIP Brochure
        </h2>

        {/* Tagline */}
        <div className="text-center animate-[fadeUp_1s_ease-out_both]">
          <div className="mx-auto mb-6 flex w-fit items-center justify-center gap-4 text-2xl md:text-3xl font-light tracking-wide text-gray-800">
            <span className="font-medium">Empower</span>
            <span className="h-1 w-1 rounded-full bg-[#4F6EF7]" />
            <span className="font-medium">Inspire</span>
            <span className="h-1 w-1 rounded-full bg-[#4F6EF7]" />
            <span className="font-medium">Lead</span>
          </div>

          {/* Download PDF pill */}
          <a
            data-testid="download-pdf-btn"
            href={slides[current].pdf}
  target="_blank"
  rel="noopener noreferrer"
  download
            className="group inline-flex items-center gap-3 rounded-full border border-[#4F6EF7]/25 bg-white px-6 py-3 text-[#4F6EF7] font-semibold shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#4F6EF7]/60 hover:shadow-[0_15px_35px_-15px_rgba(79,110,247,0.55)]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4F6EF7]/10 transition-colors duration-300 group-hover:bg-[#4F6EF7] group-hover:text-white">
              ↓
            </span>
            <span>Download PDF</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>

        {/* Brochure Viewer */}
        <div className="relative mt-14 mx-auto max-w-6xl">
          {/* Outer glow */}
          <div
            aria-hidden="true"
            className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#4F6EF7]/30 via-[#4F6EF7]/10 to-transparent opacity-60 blur-3xl"
          />

          {/* Frame */}
          <div className="relative overflow-hidden bg-white p-3 md:p-4 shadow-[0_30px_80px_-20px_rgba(79,110,247,0.4)] ring-1 ring-black/5">
            {/* Toolbar */}
            <div className="mb-3 flex items-center justify-between bg-gradient-to-r from-[#4F6EF7]/8 via-[#4F6EF7]/5 to-transparent px-4 py-2.5">
              <div className="flex items-center gap-2">
                
                <span className="ml-3 text-xs font-semibold uppercase tracking-widest text-[#4F6EF7]/80">
                  Page {current + 1} of {slides.length}
                </span>
              </div>
              <button
                onClick={() => setFullscreen(true)}
                className=" border border-[#4F6EF7]/20 bg-white/80 px-3 py-1 text-xs font-semibold text-[#4F6EF7] transition-all duration-300 hover:bg-[#4F6EF7] hover:text-white"
                data-testid="fullscreen-btn"
              >
                ⤢ Fullscreen
              </button>
            </div>

            {/* Image stage */}
            <div className="relative overflow-hidden  bg-[#0b0f1a]">
              <div
                key={current}
                className={`relative ${
                  direction === 1
                    ? "animate-[slideInRight_0.6s_ease-out_both]"
                    : "animate-[slideInLeft_0.6s_ease-out_both]"
                }`}
              >
                <img
                  src={slides[current].image}
                  alt={`Brochure Page ${current + 1}`}
                  className="w-full mx-auto object-contain max-h-[75vh] cursor-zoom-in"
                  onClick={() => setFullscreen(true)}
                />
              </div>

              {/* Prev / Next floating buttons */}
              <button
                onClick={prevSlide}
                data-testid="prev-slide-btn"
                aria-label="Previous"
                className="group absolute left-3 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-all duration-300 hover:bg-[#4F6EF7] hover:scale-110"
              >
                <span className="text-xl transition-transform duration-300 group-hover:-translate-x-0.5">
                  ‹
                </span>
              </button>
              <button
                onClick={nextSlide}
                data-testid="next-slide-btn"
                aria-label="Next"
                className="group absolute right-3 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-all duration-300 hover:bg-[#4F6EF7] hover:scale-110"
              >
                <span className="text-xl transition-transform duration-300 group-hover:translate-x-0.5">
                  ›
                </span>
              </button>

              {/* Bottom badge */}
              <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2  border border-white/25 bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4F6EF7]" />
                WLC · GIP Brochure
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#4F6EF7] to-[#7A93FF] transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Controls */}
            <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={prevSlide}
                data-testid="prev-btn-bottom"
                className="group inline-flex items-center gap-2 border border-[#4F6EF7]/25 bg-white px-5 py-2.5 text-[#4F6EF7] font-medium transition-all duration-300 hover:-translate-y-0.5 hover:border-[#4F6EF7]/60 hover:shadow-[0_10px_25px_-12px_rgba(79,110,247,0.55)]"
              >
                <span className="transition-transform duration-300 group-hover:-translate-x-1">
                  ←
                </span>
                Previous
              </button>

              <div className="flex items-center gap-3">
                <span className="font-mono text-2xl font-bold text-[#4F6EF7]">
                  {String(current + 1).padStart(2, "0")}
                </span>
                <span className="text-gray-400">/</span>
                <span className="font-mono text-lg text-gray-500">
                  {String(slides.length).padStart(2, "0")}
                </span>
              </div>

              <button
                onClick={nextSlide}
                data-testid="next-btn-bottom"
                className="group inline-flex items-center gap-2  bg-[#4F6EF7] px-5 py-2.5 text-white font-medium shadow-[0_10px_25px_-10px_rgba(79,110,247,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_30px_-8px_rgba(79,110,247,0.75)]"
              >
                Next
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </div>

          {/* Thumbnail rail */}
          <div
            data-testid="thumbnail-rail"
            className="mt-10 -mx-1 flex gap-3 overflow-x-auto px-1 py-2 scrollbar-hide"
            style={{ scrollbarWidth: "thin" }}
          >
            {slides.map((s, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                data-testid={`thumb-${i}`}
                className={`relative flex-shrink-0 overflow-hidden border-2 transition-all duration-300 ${
                  i === current
                    ? "border-[#4F6EF7] shadow-[0_10px_25px_-10px_rgba(79,110,247,0.6)] scale-105"
                    : "border-transparent opacity-60 hover:opacity-100 hover:border-[#4F6EF7]/40"
                }`}
                aria-label={`Go to page ${i + 1}`}
              >
                <img
                  src={s.image}
                  alt={`thumb ${i + 1}`}
                  className="h-16 w-24 object-cover"
                />
                <span
                  className={`absolute bottom-0 left-0 right-0 py-0.5 text-center text-[10px] font-bold ${
                    i === current
                      ? "bg-[#4F6EF7] text-white"
                      : "bg-black/50 text-white"
                  }`}
                >
                  {i + 1}
                </span>
              </button>
            ))}
          </div>

          
        </div>
      </div>

      {/* Fullscreen Modal */}
      {fullscreen && (
        <div
          data-testid="fullscreen-modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-[fadeIn_0.3s_ease-out_both]"
          onClick={() => setFullscreen(false)}
        >
          <button
            onClick={() => setFullscreen(false)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white text-xl backdrop-blur-md transition-all duration-300 hover:bg-[#4F6EF7]"
            aria-label="Close fullscreen"
          >
            ✕
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white text-2xl backdrop-blur-md transition-all duration-300 hover:bg-[#4F6EF7]"
          >
            ‹
          </button>
          <img
            src={slides[current].image}
            alt={`Fullscreen page ${current + 1}`}
            className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white text-2xl backdrop-blur-md transition-all duration-300 hover:bg-[#4F6EF7]"
          >
            ›
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-mono text-white backdrop-blur-md">
            {current + 1} / {slides.length}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeUp {
          0%   { opacity: 0; transform: translateY(18px); }
          100% { opacity: 1; transform: translateY(0);    }
        }
        @keyframes fadeIn {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes slideInRight {
          0%   { opacity: 0; transform: translateX(40px); }
          100% { opacity: 1; transform: translateX(0);    }
        }
        @keyframes slideInLeft {
          0%   { opacity: 0; transform: translateX(-40px); }
          100% { opacity: 1; transform: translateX(0);     }
        }
        .scrollbar-hide::-webkit-scrollbar { height: 6px; }
        .scrollbar-hide::-webkit-scrollbar-thumb { background: #4F6EF755; border-radius: 3px; }
        .scrollbar-hide::-webkit-scrollbar-track { background: transparent; }
      `}</style>
    </section>
  );
};

export default WlcStats;