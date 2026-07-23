import React, { useState } from "react";
import img from '/image/img-1.png';
import img1 from '/image/img-2.png';
import img2 from '/image/img-3.png';
import img3 from '/image/img-4.png';
import img4 from '/image/img-5.png';
import img5 from '/image/img-6.png';
import img6 from '/image/img-7.png';

/* Same signature seal used across the WLC membership section, so this
   carousel reads as part of one continuous system rather than a bolt-on. */
const Seal = ({ className = "" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor">
    <circle cx="50" cy="50" r="47" strokeWidth="1" />
    <circle cx="50" cy="50" r="39" strokeWidth="0.5" strokeDasharray="2 3" />
    <circle cx="50" cy="50" r="30" strokeWidth="1" />
    <text x="50" y="47" textAnchor="middle" fontSize="11" fontFamily="'IBM Plex Mono', monospace" fill="currentColor" stroke="none" letterSpacing="3">WLC</text>
    <text x="50" y="59" textAnchor="middle" fontSize="4.5" fontFamily="'IBM Plex Mono', monospace" fill="currentColor" stroke="none" letterSpacing="3">CONSORTIUM</text>
  </svg>
);

const MembershipStructure = () => {
  const [current, setCurrent] = useState(0);

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
];

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <section className="relative overflow-hidden bg-white py-24">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500&family=IBM+Plex+Mono:wght@400;500&display=swap');
        .f-display { font-family: 'Fraunces', serif; }
        .f-body { font-family: 'Inter', sans-serif; }
        .f-mono { font-family: 'IBM Plex Mono', monospace; }
      `}</style>

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] bg-[size:26px_26px] opacity-[0.12]" />

      <div className="f-body mx-auto w-[92%] max-w-5xl">

        {/* ================= HEADER ================= */}
        <div className="text-center">
          <span className="f-mono text-[11px] uppercase tracking-[0.3em] text-[#4F6EF7]">§04 — Structure</span>
          <h2 className="f-display mt-3 text-4xl text-slate-900 md:text-5xl">
            WLC Membership Structure
          </h2>
          <div className="mx-auto mt-6 flex items-center justify-center gap-3">
            <span className="h-px w-14 bg-slate-300" />
            <span className="f-mono text-[10px] uppercase tracking-[0.3em] text-slate-400">Institutional / Individual</span>
            <span className="h-px w-14 bg-slate-300" />
          </div>
        </div>

        {/* ================= SLIDE FRAME ================= */}
        <div className="mt-14 flex justify-center">
          <div className="relative w-full max-w-2xl border border-slate-200 bg-white p-3 shadow-[0_20px_50px_-25px_rgba(15,23,42,0.35)]">
            <div className="absolute -top-3 -left-3 h-6 w-6 border-t border-l border-[#4F6EF7]" />
            <div className="absolute -bottom-3 -right-3 h-6 w-6 border-b border-r border-[#4F6EF7]" />

            <img
              src={slides[current].image}
              alt={`Membership ${current + 1}`}
              className="h-auto w-full object-cover"
            />

            <div className="flex items-center justify-between border-t border-slate-100 px-1 pt-3">
              <span className="f-mono text-[10px] uppercase tracking-widest text-slate-400">
                Plate {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </span>
              <Seal className="h-6 w-6 text-slate-300" />
            </div>
          </div>
        </div>

        {/* ================= PROGRESS DOTS ================= */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1 transition-all ${
                idx === current ? "w-8 bg-[#4F6EF7]" : "w-2.5 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>

        {/* ================= NAVIGATION + DOWNLOAD ================= */}
        <div className="mt-10 flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="flex h-11 w-11 items-center justify-center border border-slate-200 text-slate-500 transition-colors hover:border-[#4F6EF7] hover:text-[#4F6EF7]"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <span className="f-mono text-sm text-slate-400">
              {String(current + 1).padStart(2, "0")} — {String(slides.length).padStart(2, "0")}
            </span>

            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="flex h-11 w-11 items-center justify-center border border-slate-200 text-slate-500 transition-colors hover:border-[#4F6EF7] hover:text-[#4F6EF7]"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <a
  href={slides[current].pdf}
  target="_blank"
  rel="noopener noreferrer"
  download
  className="group flex items-center gap-3 border border-slate-200 bg-white px-5 py-3 transition-colors hover:border-[#4F6EF7]"
>
            <div>
              <span className="f-mono block text-[10px] uppercase tracking-widest text-[#4F6EF7]">Document</span>
              <span className="mt-0.5 block text-sm text-slate-700">Download Membership PDF</span>
            </div>
            <svg className="h-4 w-4 shrink-0 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-[#4F6EF7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
};

export default MembershipStructure;