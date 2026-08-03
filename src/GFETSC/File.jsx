import React, { forwardRef, useRef, useState } from "react";
import HTMLFlipFile from "react-pageflip";

import img from "/image/img-29.png";
import img1 from "/image/img-30.png";
import img2 from "/image/img-31.png";
import img3 from "/image/img-32.png";



const Seal = ({ className = "" }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    stroke="currentColor"
  >
    <circle cx="50" cy="50" r="47" strokeWidth="1" />
    <circle
      cx="50"
      cy="50"
      r="39"
      strokeWidth="0.5"
      strokeDasharray="2 3"
    />
    <circle cx="50" cy="50" r="30" strokeWidth="1" />

    <text
      x="50"
      y="47"
      textAnchor="middle"
      fontSize="11"
      fontFamily="'IBM Plex Mono', monospace"
      fill="currentColor"
      stroke="none"
      letterSpacing="3"
    >
      WLC
    </text>

    <text
      x="50"
      y="59"
      textAnchor="middle"
      fontSize="4.5"
      fontFamily="'IBM Plex Mono', monospace"
      fill="currentColor"
      stroke="none"
      letterSpacing="3"
    >
      CONSORTIUM
    </text>
  </svg>
);

const Page = forwardRef(({ image, number }, ref) => {
  return (
    <div
      ref={ref}
      className="overflow-hidden border border-slate-200 bg-white"
    >
      <div className="flex h-full w-full flex-col bg-white p-1.5 sm:p-2">
        <div className="min-h-0 flex-1 overflow-hidden">
          <img
            src={image}
            alt={`Membership page ${number}`}
            draggable="false"
            className="h-full w-full select-none object-contain"
          />
        </div>

        <div className="shrink-0 border-t border-slate-100 py-1.5 text-center sm:py-2">
          <span className="f-mono text-[8px] uppercase tracking-widest text-slate-400 sm:text-[9px]">
            Page {String(number).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
});

Page.displayName = "Page";

const File = () => {
  const [current, setCurrent] = useState(0);
  const FileRef = useRef(null);

  const pdfUrl =
    "https://img1.wsimg.com/blobby/go/b6c56996-d063-4e20-930c-1d8a40821864/About~GFETSC.pdf";

  const slides = [
    { image: img, pdf: pdfUrl },
    { image: img1, pdf: pdfUrl },
    { image: img2, pdf: pdfUrl },
    { image: img3, pdf: pdfUrl },
    
   
  ];

  const nextSlide = () => {
    FileRef.current?.pageFlip()?.flipNext();
  };

  const prevSlide = () => {
    FileRef.current?.pageFlip()?.flipPrev();
  };

  const goToPage = (index) => {
    FileRef.current?.pageFlip()?.flip(index);
  };

  return (
    <section className="relative overflow-hidden bg-white py-14 sm:py-16 lg:py-24">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .f-display {
          font-family: 'Fraunces', serif;
        }

        .f-body {
          font-family: 'Inter', sans-serif;
        }

        .f-mono {
          font-family: 'IBM Plex Mono', monospace;
        }

        .membership-File {
          margin: 0 auto !important;
        }
      `}</style>

      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] bg-[size:26px_26px] opacity-[0.12]" />

      <div className="f-body mx-auto w-[94%] max-w-6xl">

        {/* ================= HEADER ================= */}

        <div className="mx-auto max-w-3xl text-center">
          <span className="f-mono text-[9px] uppercase tracking-[0.25em] text-[#4F6EF7] sm:text-[11px] sm:tracking-[0.3em]">
            §04 — Structure
          </span>

          <h2 className="f-display mt-3 text-3xl leading-tight text-slate-900 sm:text-4xl md:text-5xl">
            WLC Membership Structure
          </h2>

          <div className="mx-auto mt-5 flex items-center justify-center gap-2 sm:mt-6 sm:gap-3">
            <span className="h-px w-8 bg-slate-300 sm:w-14" />

            <span className="f-mono text-[8px] uppercase tracking-[0.2em] text-slate-400 sm:text-[10px] sm:tracking-[0.3em]">
              Institutional / Individual
            </span>

            <span className="h-px w-8 bg-slate-300 sm:w-14" />
          </div>
        </div>

        {/* ================= File ================= */}

        <div className="relative mx-auto mt-10 w-full sm:mt-12 lg:mt-14">

          {/* File area */}
          <div className="relative mx-auto flex w-full items-center justify-center">

            {/* LEFT ARROW - DESKTOP */}
            <button
              type="button"
              onClick={prevSlide}
              disabled={current === 0}
              aria-label="Previous page"
              className="
                absolute left-0 z-30
                hidden h-12 w-12
                items-center justify-center
                rounded-full border border-slate-200
                bg-white text-slate-600 shadow-lg
                transition-all
                hover:border-[#4F6EF7]
                hover:text-[#4F6EF7]
                disabled:cursor-not-allowed
                disabled:opacity-30
                lg:flex
              "
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* FLIP File CONTAINER */}
            <div
              className="
                relative flex
                w-full
                max-w-[340px]
                justify-center
                sm:max-w-[420px]
                md:max-w-[760px]
                lg:max-w-[820px]
              "
            >

              {/* Bottom File shadow */}
              <div
                className="
                  pointer-events-none
                  absolute bottom-1 left-1/2
                  h-8 w-[85%]
                  -translate-x-1/2 translate-y-3
                  rounded-[50%]
                  bg-slate-900/10
                  blur-xl
                "
              />

              <HTMLFlipFile
                ref={FileRef}

                /* Base page ratio */
                width={400}
                height={550}

                /* Important for responsiveness */
                size="stretch"

                minWidth={250}
                maxWidth={400}

                minHeight={344}
                maxHeight={550}

                /* Desktop = File, mobile = single page */
                usePortrait={true}

                showCover={false}

                drawShadow={true}
                maxShadowOpacity={0.45}

                flippingTime={850}

                startZIndex={10}

                autoSize={true}

                mobileScrollSupport={true}

                useMouseEvents={true}

                swipeDistance={20}

                clickEventForward={true}

                onFlip={(e) => setCurrent(e.data)}

                className="membership-File"
              >
                {slides.map((slide, index) => (
                  <Page
                    key={index}
                    image={slide.image}
                    number={index + 1}
                  />
                ))}
              </HTMLFlipFile>
            </div>

            {/* RIGHT ARROW - DESKTOP */}
            <button
              type="button"
              onClick={nextSlide}
              disabled={current >= slides.length - 1}
              aria-label="Next page"
              className="
                absolute right-0 z-30
                hidden h-12 w-12
                items-center justify-center
                rounded-full border border-slate-200
                bg-white text-slate-600 shadow-lg
                transition-all
                hover:border-[#4F6EF7]
                hover:text-[#4F6EF7]
                disabled:cursor-not-allowed
                disabled:opacity-30
                lg:flex
              "
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

          </div>

          {/* ================= MOBILE / TABLET ARROWS ================= */}

          <div className="mt-6 flex items-center justify-center gap-5 lg:hidden">

            <button
              type="button"
              onClick={prevSlide}
              disabled={current === 0}
              aria-label="Previous page"
              className="
                flex h-11 w-11
                items-center justify-center
                rounded-full border border-slate-200
                bg-white text-slate-600
                shadow-sm transition-all
                active:scale-95
                disabled:cursor-not-allowed
                disabled:opacity-30
              "
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Page counter */}
            <span className="f-mono min-w-[80px] text-center text-xs text-slate-400">
              {String(current + 1).padStart(2, "0")}
              {" / "}
              {String(slides.length).padStart(2, "0")}
            </span>

            <button
              type="button"
              onClick={nextSlide}
              disabled={current >= slides.length - 1}
              aria-label="Next page"
              className="
                flex h-11 w-11
                items-center justify-center
                rounded-full border border-slate-200
                bg-white text-slate-600
                shadow-sm transition-all
                active:scale-95
                disabled:cursor-not-allowed
                disabled:opacity-30
              "
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

          </div>

        </div>

        {/* ================= PROGRESS ================= */}

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:mt-8">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => goToPage(idx)}
              aria-label={`Go to page ${idx + 1}`}
              className={`h-1 rounded-full transition-all duration-300 ${
                idx === current
                  ? "w-8 bg-[#4F6EF7]"
                  : "w-2.5 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>

        {/* ================= BOTTOM ================= */}

        <div
          className="
            mx-auto mt-8 flex
            max-w-4xl
            flex-col items-center
            gap-5
            border-t border-slate-100
            pt-7
            sm:mt-10
            sm:flex-row
            sm:justify-between
          "
        >

          {/* Desktop counter */}
          <div className="hidden items-center gap-3 sm:flex">
            <Seal className="h-7 w-7 text-slate-300" />

            <span className="f-mono text-xs text-slate-400">
              PAGE {String(current + 1).padStart(2, "0")}
              {" — "}
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>

          {/* Download */}
          <a
            href={slides[current]?.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group flex w-full
              items-center justify-between
              gap-4 border border-slate-200
              bg-white px-5 py-3
              transition-all
              hover:border-[#4F6EF7]
              sm:w-auto
            "
          >
            <div>
              <span className="f-mono block text-[9px] uppercase tracking-widest text-[#4F6EF7] sm:text-[10px]">
                Document
              </span>

              <span className="mt-0.5 block text-xs text-slate-700 sm:text-sm">
                Download Membership PDF
              </span>
            </div>

            <svg
              className="
                h-4 w-4 shrink-0
                text-slate-300
                transition-all
                group-hover:translate-y-0.5
                group-hover:text-[#4F6EF7]
              "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16"
              />
            </svg>
          </a>

        </div>

      </div>
    </section>
  );
};

export default File;