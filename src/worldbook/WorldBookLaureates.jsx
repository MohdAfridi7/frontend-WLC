
import React from "react";
import img from '../../public/image/ha16.webp'

const C = {
  brand: "#4567E6",
  brandDeep: "#1E2A8A",
  gold: "#C8A24B",
  emerald: "#0F766E",
  coral: "#E86A5C",
  ink: "#0B1020",
  muted: "#4B5563",
  line: "#E5E7EB",
};

const WorldBookLaureates = () => {
  const excellenceFields = [
    { t: "Leadership & Governance", c: C.brand },
    { t: "Education & Pedagogical Innovation", c: C.emerald },
    { t: "Social Impact & Humanitarian Work", c: C.coral },
    { t: "Peacebuilding & Global Diplomacy", c: C.brand },
    { t: "Science, Research & Innovation", c: C.gold },
    { t: "Entrepreneurship & Business Leadership", c: C.brandDeep },
    { t: "Climate Action & Environmental Sustainability", c: C.emerald },
    { t: "Technology, AI & Digital Transformation", c: C.brand },
    { t: "Youth Empowerment & Community Leadership", c: C.coral },
    { t: "Women’s Leadership & Gender Equality", c: C.gold },
    { t: "Culture, Arts & Creative Influence", c: C.brandDeep },
    { t: "Public Health & Medical Innovation", c: C.emerald },
    { t: "Economic Development & Policy Reform", c: C.brand },
  ];

  const featured = [
    "Heads of State and Government Visionaries",
    "UN Officials, Diplomats & Peace Envoys",
    "Entrepreneurs, Innovators & Impact Investors",
    "Educators, Scientists & Researchers",
    "Youth Leaders & Women Pioneers",
    "Artists, Authors & Humanitarian Leaders",
  ];

  const benefits = [
    "Featured in the annual published volume of the World Book of Laureates",
    "Honored with WLC Lifetime Membership",
    "Invited to participate in leadership forums, roundtables, and mentorship programs",
    "Granted access to the exclusive WLC Laureate Circle — a global leadership and impact network",
  ];

  const legacy = [
    { t: "Champion inclusive leadership and global cooperation", c: C.brand },
    { t: "Drive transformational initiatives aligned with the UN Sustainable Development Goals (SDGs)", c: C.emerald },
    { t: "Inspire new generations through thought leadership, innovation, and ethics", c: C.gold },
    { t: "Represent the spirit of human resilience, purpose-driven action, and cross-border collaboration", c: C.coral },
  ];

  const Eyebrow = ({ num, children, color = C.brand }) => (
    <div className="flex items-center gap-4 mb-6">
      <span className="text-[11px] tracking-[6px] uppercase font-normal tabular-nums" style={{ color }}>{num}</span>
      <span className="h-px w-10" style={{ background: color }} />
      <span className="text-[11px] tracking-[6px] uppercase font-normal" style={{ color: C.ink }}>{children}</span>
    </div>
  );

  const Heading = ({ children, className = "" }) => (
    <h3 className={`text-3xl md:text-4xl font-light leading-[1.15] tracking-tight ${className}`} style={{ color: C.ink }}>
      {children}
    </h3>
  );

  const CornerMark = ({ pos = "tl", color = C.brand }) => {
    const map = {
      tl: "top-0 left-0 border-t border-l",
      tr: "top-0 right-0 border-t border-r",
      bl: "bottom-0 left-0 border-b border-l",
      br: "bottom-0 right-0 border-b border-r",
    };
    return <span aria-hidden className={`absolute h-5 w-5 ${map[pos]}`} style={{ borderColor: color }} />;
  };

  return (
    <section className="relative isolate overflow-hidden" style={{ background: "#FFFDF9", color: C.ink }}>
      {/* BACKGROUND TEXTURE */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg className="absolute inset-0 h-full w-full opacity-[0.35]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="wbl-grid" width="56" height="56" patternUnits="userSpaceOnUse">
              <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#0B1020" strokeOpacity="0.06" strokeWidth="1" />
            </pattern>
            <radialGradient id="wbl-fade" cx="50%" cy="0%" r="80%">
              <stop offset="0%" stopColor="#FFFDF9" stopOpacity="0" />
              <stop offset="100%" stopColor="#FFFDF9" stopOpacity="1" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#wbl-grid)" />
          <rect width="100%" height="100%" fill="url(#wbl-fade)" />
        </svg>
        <svg className="absolute inset-0 h-full w-full mix-blend-multiply opacity-[0.09]" xmlns="http://www.w3.org/2000/svg">
          <filter id="wbl-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#wbl-noise)" />
        </svg>
        <div className="absolute -top-40 -left-32 h-[520px] w-[520px] blur-3xl opacity-40" style={{ background: `radial-gradient(closest-side, ${C.brand}, transparent)` }} />
        <div className="absolute top-[20%] -right-40 h-[520px] w-[520px] blur-3xl opacity-30" style={{ background: `radial-gradient(closest-side, ${C.gold}, transparent)` }} />
        <div className="absolute top-[55%] -left-40 h-[520px] w-[520px] blur-3xl opacity-25" style={{ background: `radial-gradient(closest-side, ${C.emerald}, transparent)` }} />
        <div className="absolute bottom-[8%] right-[10%] h-[420px] w-[420px] blur-3xl opacity-25" style={{ background: `radial-gradient(closest-side, ${C.coral}, transparent)` }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 py-20 lg:py-28">
        {/* HERO */}
        <div className="relative">
          <div className="flex items-center gap-4 mb-8 flex-wrap">
            <span className="h-px w-14" style={{ background: C.brand }} />
            <span className="text-[11px] tracking-[6px] uppercase font-normal" style={{ color: C.brand }}>WLC · 2025 Edition</span>
            <span className="h-px w-8" style={{ background: C.gold }} />
            <span className="text-[11px] tracking-[6px] uppercase font-normal" style={{ color: C.gold }}>Global Compendium</span>
          </div>

          <h1 className="font-thin leading-[1.02] tracking-tight text-[40px] sm:text-6xl md:text-7xl lg:text-[92px]" style={{ color: C.ink }}>
            Welcome to the{" "}
            <span className="relative inline-block" style={{ color: C.brand, fontWeight: 300 }}>
              World Book
              <span className="absolute left-0 -bottom-2 h-[2px] w-full" style={{ background: `linear-gradient(90deg, ${C.brand}, ${C.gold})` }} />
            </span>{" "}
            <br className="hidden md:block" />
            of{" "}
            <em className="not-italic font-light" style={{ background: `linear-gradient(90deg, ${C.gold}, ${C.coral})`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
              Laureates
            </em>
          </h1>

          <p className="mt-8 max-w-3xl text-lg md:text-xl font-light leading-relaxed" style={{ color: C.muted }}>
            The WLC World Book of Laureates is a prestigious global compendium that celebrates exceptional leaders,
            changemakers, and innovators who have made extraordinary contributions to society, humanity, and
            sustainable global progress.
          </p>
          <p className="mt-5 max-w-3xl text-base md:text-lg font-light leading-relaxed" style={{ color: C.muted }}>
            Launched under the banner of the World Leaders Consortium (WLC), this signature initiative recognizes
            individuals from around the world whose work in leadership, innovation, education, diplomacy,
            entrepreneurship, sustainability, peacebuilding, and social impact has created lasting change and global influence.
          </p>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 border-t border-b" style={{ borderColor: C.line }}>
            {[["Est.", "2025", C.brand],["Fields", "13", C.gold],["Chapters", "Global", C.emerald],["Volume", "Annual", C.coral]].map(([k, v, col]) => (
              <div key={k} className="py-6 px-4 border-r last:border-r-0 relative" style={{ borderColor: C.line }}>
                <span className="absolute left-0 top-0 h-full w-[3px]" style={{ background: col }} />
                <div className="text-[10px] tracking-[4px] uppercase pl-3" style={{ color: C.muted }}>{k}</div>
                <div className="mt-2 text-2xl md:text-3xl font-light pl-3" style={{ color: C.ink }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* IMAGE + INTRO */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mt-24">
          <div className="lg:col-span-7 relative">
            <div className="absolute -top-4 -left-4 w-24 h-24" style={{ background: C.gold }} />
            <div className="absolute -bottom-4 -right-4 w-32 h-32" style={{ background: C.brand }} />
            <div className="relative">
              <img
                src={img}
                alt="World Book of Laureates"
                className="w-full h-[420px] md:h-[540px] object-cover relative z-10"
              />
              <div className="absolute inset-0 z-10 pointer-events-none">
                <CornerMark pos="tl" color={C.gold} />
                <CornerMark pos="tr" color={C.gold} />
                <CornerMark pos="bl" color={C.gold} />
                <CornerMark pos="br" color={C.gold} />
              </div>
              <div className="absolute z-20 left-6 bottom-6 bg-white/95 backdrop-blur px-5 py-3 border-l-2 shadow-lg" style={{ borderColor: C.brand }}>
                <div className="text-[10px] tracking-[4px] uppercase" style={{ color: C.brand }}>Signature Initiative</div>
                <div className="text-sm font-light mt-1" style={{ color: C.ink }}>World Leaders Consortium</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-center">
            <Eyebrow num="01" color={C.brand}>Introduction</Eyebrow>
            <Heading>
              Honoring visionaries.{" "}
              <span style={{ color: C.brand }}>Celebrating excellence.</span>{" "}
              <span style={{ color: C.gold }}>Inspiring generations.</span>
            </Heading>
            <p className="mt-6 text-base md:text-lg font-light leading-relaxed" style={{ color: C.muted }}>
              The World Book of Laureates is more than a publication — it is a historic archive of inspiration,
              a platform for recognizing those who lead with courage and integrity, and a tool for empowering the
              next generation of leaders through the legacy of today’s changemakers.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {[["Leadership", C.brand], ["Innovation", C.gold], ["Diplomacy", C.emerald], ["Impact", C.coral], ["Legacy", C.brandDeep]].map(([t, col]) => (
                <span key={t} className="text-[11px] tracking-[3px] uppercase font-normal px-3 py-2 border" style={{ borderColor: col, color: col }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* TWO COLUMN */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 mt-28">
          {/* LEFT */}
          <div>
            <div>
              <Eyebrow num="02" color={C.emerald}>A Global Legacy of Impact</Eyebrow>
              <Heading>The Book honors those who lead with purpose.</Heading>
              <p className="mt-4 text-base font-light leading-relaxed" style={{ color: C.muted }}>The World Book of Laureates honors those who:</p>
              <ul className="mt-8">
                {legacy.map((item, i) => (
                  <li key={i} className="group grid grid-cols-[auto_1fr] items-start gap-5 py-5 border-t" style={{ borderColor: C.line }}>
                    <span className="mt-[9px] inline-block h-[10px] w-[10px] shrink-0 transition-transform duration-300 group-hover:scale-125" style={{ background: item.c }} />
                    <span className="text-[15px] md:text-base font-light leading-relaxed" style={{ color: C.ink }}>{item.t}</span>
                  </li>
                ))}
                <li className="border-t" style={{ borderColor: C.line }} />
              </ul>
            </div>

            <div className="mt-24">
              <Eyebrow num="03" color={C.gold}>Awarded Fields of Excellence</Eyebrow>
              <Heading>Thirteen fields. One unifying pursuit — <span style={{ color: C.brand }}>impact</span>.</Heading>
              <p className="mt-6 text-base font-light leading-relaxed" style={{ color: C.muted }}>The WLC World Book of Laureates recognizes excellence in the following fields:</p>
              <div className="mt-10 grid sm:grid-cols-2 gap-3">
                {excellenceFields.map((f, i) => (
                  <div key={i} className="group relative flex items-start gap-4 p-4 border transition-all duration-300 hover:-translate-y-0.5" style={{ borderColor: C.line, background: "#fff" }}>
                    <span className="absolute left-0 top-0 h-full w-[3px] transition-all duration-300 group-hover:w-[6px]" style={{ background: f.c }} />
                    <span className="text-xs font-normal tracking-[3px] tabular-nums pt-1" style={{ color: f.c }}>{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[14px] font-light leading-snug" style={{ color: C.ink }}>{f.t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <div>
              <Eyebrow num="04" color={C.coral}>Who Can Be Featured?</Eyebrow>
              <Heading>Leaders who redefine what’s <span style={{ color: C.coral }}>possible</span>.</Heading>

              <div className="relative mt-10">
                <div className="absolute -top-3 -left-3 w-16 h-16" style={{ background: C.coral }} />
                <div className="absolute -bottom-3 -right-3 w-24 h-24" style={{ background: C.brand }} />
                <div className="relative aspect-video overflow-hidden bg-black z-10">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/eg0CZv4TlqE"
                    title="World Book of Laureates"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>

              <p className="mt-10 text-sm tracking-[4px] uppercase font-normal" style={{ color: C.brand }}>
                The WLC World Book of Laureates includes
              </p>

              <ul className="mt-6">
                {featured.map((item, i) => {
                  const cols = [C.brand, C.gold, C.emerald, C.coral, C.brandDeep, C.brand];
                  return (
                    <li key={i} className="group grid grid-cols-[auto_1fr] items-start gap-5 py-4 border-t" style={{ borderColor: C.line }}>
                      <span className="mt-[9px] inline-block h-[8px] w-[8px] shrink-0 transition-transform duration-300 group-hover:scale-150" style={{ background: cols[i] }} />
                      <span className="text-[15px] md:text-base font-light leading-relaxed" style={{ color: C.ink }}>{item}</span>
                    </li>
                  );
                })}
                <li className="border-t" style={{ borderColor: C.line }} />
              </ul>
            </div>

            <div className="mt-24">
              <Eyebrow num="05" color={C.brandDeep}>Recognition Benefits</Eyebrow>
              <Heading>What every <span style={{ color: C.gold }}>Laureate</span> receives.</Heading>
              <p className="mt-4 text-base font-light leading-relaxed" style={{ color: C.muted }}>Laureates are:</p>

              <ul className="mt-8">
                {benefits.map((b, i) => {
                  const cols = [C.brand, C.gold, C.emerald, C.coral];
                  return (
                    <li key={i} className="group grid grid-cols-[auto_1fr] items-start gap-6 py-6 border-t" style={{ borderColor: C.line }}>
                      <div
                        className="h-11 w-11 flex items-center justify-center border font-light text-sm transition-colors"
                        style={{ borderColor: cols[i], color: cols[i] }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = cols[i]; e.currentTarget.style.color = "#fff"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = cols[i]; }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <p className="text-[15px] md:text-base font-light leading-relaxed pt-2" style={{ color: C.ink }}>{b}</p>
                    </li>
                  );
                })}
                <li className="border-t" style={{ borderColor: C.line }} />
              </ul>
            </div>
          </div>
        </div>

        {/* TRIBUTE PANEL */}
        <div className="relative mt-28 overflow-hidden border" style={{ borderColor: C.ink, background: C.ink, color: "#fff" }}>
          <svg aria-hidden className="absolute inset-0 h-full w-full opacity-[0.12]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="wbl-grid-dark" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#ffffff" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#wbl-grid-dark)" />
          </svg>
          <div className="absolute -top-40 -right-32 h-[420px] w-[420px] blur-3xl opacity-40" style={{ background: `radial-gradient(closest-side, ${C.brand}, transparent)` }} />
          <div className="absolute -bottom-40 -left-20 h-[420px] w-[420px] blur-3xl opacity-30" style={{ background: `radial-gradient(closest-side, ${C.gold}, transparent)` }} />
          <span className="absolute top-0 left-0 h-1 w-32" style={{ background: C.brand }} />
          <span className="absolute top-0 left-32 h-1 w-16" style={{ background: C.gold }} />
          <span className="absolute top-0 left-48 h-1 w-10" style={{ background: C.coral }} />

          <div className="relative p-8 md:p-14">
            <div className="grid lg:grid-cols-12 gap-10 items-end">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-4 mb-6">
                  <span className="h-px w-14" style={{ background: C.gold }} />
                  <span className="text-[11px] tracking-[6px] uppercase font-normal" style={{ color: C.gold }}>06 · A Tribute to Timeless Impact</span>
                </div>
                <h3 className="text-3xl md:text-5xl font-thin leading-[1.1] tracking-tight">
                  A historic archive of inspiration —{" "}
                  <span style={{ background: `linear-gradient(90deg, ${C.brand}, ${C.gold}, ${C.coral})`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                    courage, integrity, legacy.
                  </span>
                </h3>
                <p className="mt-6 text-base md:text-lg font-light leading-relaxed text-white/70 max-w-2xl">
                  The WLC World Book of Laureates is more than a publication — it is a historic archive of inspiration,
                  a platform for recognizing those who lead with courage and integrity, and a tool for empowering the
                  next generation of leaders through the legacy of today’s changemakers.
                </p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <div className="text-[10px] tracking-[4px] uppercase text-white/60">Volume</div>
                <div className="text-6xl md:text-7xl font-thin mt-2" style={{ background: `linear-gradient(180deg, #fff, ${C.gold})`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>2025</div>
              </div>
            </div>
          </div>
        </div>

        {/* NOMINATIONS */}
        <div className="mt-28 relative">
          <div className="absolute -left-4 top-0 h-full w-1 hidden lg:block" style={{ background: `linear-gradient(180deg, ${C.brand}, ${C.gold}, ${C.coral})` }} />
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <Eyebrow num="07" color={C.coral}>Nominations Now Open</Eyebrow>
              <h3 className="text-4xl md:text-5xl font-thin leading-[1.1] tracking-tight" style={{ color: C.ink }}>
                Know someone who’s redefining <span style={{ color: C.brand }}>leadership</span> and <span style={{ color: C.gold }}>impact</span> in their field?
              </h3>
              <p className="mt-6 text-base md:text-lg font-light leading-relaxed max-w-2xl" style={{ color: C.muted }}>
                Nominate them for the WLC World Book of Laureates — 2025 Edition. Recognize the visionaries whose work will shape the decades ahead.
              </p>
            </div>
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:justify-end gap-4">
              <a
                href="#nominate"
                className="group inline-flex items-center justify-between gap-6 px-7 py-5 text-sm tracking-[3px] uppercase font-normal transition-colors"
                style={{ background: C.brand, color: "#fff" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = C.brandDeep)}
                onMouseLeave={(e) => (e.currentTarget.style.background = C.brand)}
              >
                <span>Nominate a Laureate</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#learn"
                className="group inline-flex items-center justify-between gap-6 px-7 py-5 text-sm tracking-[3px] uppercase font-normal border transition-colors"
                style={{ borderColor: C.gold, color: C.ink, background: "#fff" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = C.gold; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = C.ink; }}
              >
                <span>Learn More</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t flex flex-col md:flex-row items-start md:items-center justify-between gap-4" style={{ borderColor: C.line }}>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2" style={{ background: C.brand }} />
            <span className="h-2 w-2" style={{ background: C.gold }} />
            <span className="h-2 w-2" style={{ background: C.emerald }} />
            <span className="h-2 w-2" style={{ background: C.coral }} />
            <span className="ml-3 text-[11px] tracking-[4px] uppercase" style={{ color: C.muted }}>World Leaders Consortium · WLC</span>
          </div>
          <div className="text-[11px] tracking-[4px] uppercase" style={{ color: C.muted }}>World Book of Laureates — 2025 Edition</div>
        </div>
      </div>
    </section>
  );
};

export default WorldBookLaureates;