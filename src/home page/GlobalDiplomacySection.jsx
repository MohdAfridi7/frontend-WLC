

import React from "react";

const diplomacy = [
  { heading: "Diplomacy in a Rapidly Changing World", body: "As global challenges intensify, diplomacy remains central to fostering cooperation and mediating conflicts. Recent developments highlight its critical role in shaping political and social dynamics." },
  { heading: "Strengthening Geneva’s Role", body: "Switzerland will invest CHF 269 million (USD 329 million) from 2026-2029 to reinforce Geneva as a leading centre for international diplomacy, supporting over 40 global organisations and underscoring its commitment to multilateral governance." },
  { heading: "Mediating Iran-Israel Tensions", body: "European foreign ministers met in Geneva to address rising Iran-Israel tensions, urging limits on Iran’s nuclear and missile programmes and a halt to hostilities. Iran signalled conditional openness to talks, but no breakthroughs emerged as U.S. military action looms." },
  { heading: "Hungary’s Rhetoric and Diplomacy", body: "Ahead of the 2026 elections, Prime Minister Viktor Orbán has stepped up anti-Ukraine and anti-EU rhetoric, straining ties and illustrating how domestic politics can reshape foreign policy." },
  { heading: "India-Croatia Cooperation", body: "In Zagreb, Indian Prime Minister Narendra Modi and Croatian Prime Minister Andrej Plenković reaffirmed that disputes should be resolved through dialogue, highlighting their shared commitment to peaceful conflict resolution." },
];

const security = [
  { heading: "Global Security in a Shifting Landscape", body: "As the global security environment grows more complex, governments and international organisations are grappling with cyber-intrusions, regional conflicts and terror threats that transcend borders. Recent events across key regions underscore the urgency of collective action to safeguard stability and resilience." },
  { heading: "Escalating Cyber Risks", body: "A surge in AI-enabled cyberattacks is challenging traditional defence systems. State-linked actors such as China’s “Salt Typhoon” have reportedly targeted more than 60 organisations in over 80 countries, focusing on telecom and government networks. This trend signals an era of highly automated, persistent cyber campaigns that demand faster detection and coordinated responses." },
  { heading: "NATO’s Eastern Flank on Alert", body: "Europe faces heightened tensions after Russia launched its largest drone incursion into Polish airspace to date. NATO has responded by strengthening air defences through its “Eastern Sentry” mission, reflecting a renewed focus on collective deterrence along the alliance’s eastern border." },
  { heading: "Middle East Flashpoints", body: "The Israeli airstrike on Hamas leadership in Qatar has triggered an emergency Arab-Islamic summit in Doha. As regional powers debate next steps, the incident illustrates how conflicts can spill across borders and draw in new actors, making diplomacy and security coordination even more critical." },
 ];

const toRoman = (n) => ["I","II","III","IV","V","VI","VII","VIII","IX","X"][n] || n + 1;

const Article = ({ items, prefix }) => (
  <div className="flex flex-col">
    {items.map((item, i) => (
      <article
        key={i}
        data-testid={`${prefix}-item-${i}`}
        className="gu-fade-up relative py-7 sm:py-8 border-b border-[#0a0e28]/10 last:border-b-0"
        style={{ animationDelay: `${0.1 + i * 0.06}s` }}
      >
        <div className="flex items-baseline gap-4 sm:gap-5">
          <span className="gu-headline text-[#4B67D1] text-2xl sm:text-3xl leading-none w-10 sm:w-12 shrink-0">{toRoman(i)}</span>
          <div className="flex-1">
            <h3 className="gu-headline text-[#0a0e28] text-xl sm:text-[22px] md:text-[24px] leading-[1.2] mb-3 sm:mb-4">{item.heading}</h3>
            <p className="gu-sans text-[#0a0e28]/65 text-[14px] sm:text-[15px] font-light leading-[1.9]">{item.body}</p>
          </div>
        </div>
      </article>
    ))}
  </div>
);

const GlobalUpdatesContent = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#fafbff] py-16 sm:py-20 md:py-24 lg:py-18">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');

        @keyframes gu-fade-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes gu-frame-in { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
        @keyframes gu-line-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }

        .gu-fade-up  { animation: gu-fade-up 0.8s cubic-bezier(.2,.7,.2,1) both; }
        .gu-frame-in { animation: gu-frame-in 1s cubic-bezier(.2,.7,.2,1) both; }
        .gu-line     { transform-origin: left; animation: gu-line-grow 1.1s 0.3s cubic-bezier(.2,.7,.2,1) both; }

        .gu-d1 { animation-delay: 0.08s; }
        .gu-d2 { animation-delay: 0.18s; }
        .gu-d3 { animation-delay: 0.28s; }

        .gu-headline { font-family: 'Cormorant Garamond', serif; font-weight: 500; letter-spacing: -0.012em; line-height: 1.05; }
        .gu-italic   { font-family: 'Cormorant Garamond', serif; font-style: italic; font-weight: 400; }
        .gu-sans     { font-family: 'Inter', sans-serif; }

        .gu-image-frame::before {
          content: ""; position: absolute; inset: -10px;
          border: 1px solid rgba(75,103,209,0.28);
          pointer-events: none; z-index: 0;
        }
        @media (min-width: 768px) { .gu-image-frame::before { inset: -16px; } }

        @media (prefers-reduced-motion: reduce) {
          .gu-fade-up, .gu-frame-in, .gu-line {
            animation: none !important; opacity: 1 !important; transform: none !important;
          }
        }
      `}</style>

      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#4B67D1 1px, transparent 1px), linear-gradient(90deg, #4B67D1 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at center, black 35%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 35%, transparent 75%)",
        }}
      />

      <div
        aria-hidden="true"
        className="hidden lg:block absolute top-6 right-8 gu-headline text-[#4B67D1]/[0.06] select-none pointer-events-none"
        style={{ fontSize: "200px", lineHeight: 1 }}
      >
        Briefing
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Masthead */}
        <header className="mb-12 sm:mb-16 md:mb-20">
          <div className="gu-fade-up gu-d1 flex items-center gap-3 sm:gap-4 mb-6">
            <span className="block w-8 sm:w-10 h-px bg-[#4B67D1]" />
            <span className="gu-sans text-[10px] md:text-[11px] font-medium tracking-[0.35em] sm:tracking-[0.4em] uppercase text-[#4B67D1]">
              The Global Briefing
            </span>
            <span className="hidden sm:block flex-1 h-px bg-[#0a0e28]/10" />
            <span className="hidden md:block gu-sans text-[10px] tracking-[0.3em] uppercase text-[#0a0e28]/40 whitespace-nowrap">
              Vol. 01 · Updates
            </span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <h1
              data-testid="gu-masthead"
              className="gu-headline text-[#0a0e28] lg:col-span-8"
              style={{ fontSize: "clamp(40px, 5.6vw, 84px)" }}
            >
              Latest in Global{" "}
              <span className="gu-italic text-[#4B67D1]">Diplomacy &amp; Security.</span>
            </h1>

            <p className="gu-sans text-[#0a0e28]/60 text-[14px] sm:text-[15px] font-light leading-[1.9] lg:col-span-4 max-w-md">
              A curated digest of the most consequential developments shaping international relations, multilateral governance and global security.
            </p>
          </div>
        </header>

        {/* Hero image */}
        <div className="relative gu-image-frame gu-frame-in gu-d2 mb-16 sm:mb-20 md:mb-24">
          <div aria-hidden="true" className="absolute -bottom-3 -right-3 sm:-bottom-5 sm:-right-5 md:-bottom-6 md:-right-6 w-full h-full bg-[#4B67D1]/10" />
          <div className="relative overflow-hidden">
            <img
              src="https://img1.wsimg.com/isteam/ip/b6c56996-d063-4e20-930c-1d8a40821864/1000147760.jpg/:/cr=t:0%25,l:7.82%25,w:84.36%25,h:84.36%25/rs=w:776,cg:true,m"
              alt="Global Diplomacy"
              data-testid="gu-hero-image"
              className="w-full h-[260px] sm:h-[360px] md:h-[460px] lg:h-[540px] object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(10,14,40,0) 55%, rgba(10,14,40,0.45) 100%)" }} />
            <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7 md:bottom-9 md:left-9 z-10 max-w-md text-white">
              <span className="gu-sans text-[10px] sm:text-[11px] tracking-[0.35em] uppercase font-light block mb-2">
                Cover &nbsp;·&nbsp; Multilateral Governance
              </span>
              <h2 className="gu-italic text-2xl sm:text-3xl md:text-4xl leading-tight">
                Diplomacy &amp; security in a multipolar age.
              </h2>
            </div>
          </div>
        </div>

        {/* Two-column briefing */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20">
          <section data-testid="gu-diplomacy">
            <div className="gu-fade-up gu-d2 flex items-baseline gap-4 mb-3">
              <span className="gu-sans text-[10px] tracking-[0.35em] uppercase text-[#0a0e28]/40">Section 01</span>
              <span className="flex-1 h-px bg-[#0a0e28]/10" />
            </div>
            <h2
              data-testid="gu-diplomacy-title"
              className="gu-headline text-[#0a0e28] gu-fade-up gu-d3"
              style={{ fontSize: "clamp(28px, 3.2vw, 44px)" }}
            >
              Latest Developments in{" "}
              <span className="gu-italic text-[#4B67D1]">Global Diplomacy</span>
            </h2>
            <div className="mt-5 mb-2 h-px bg-[#0a0e28]/10 gu-fade-up gu-d3">
              <div className="h-px w-16 bg-[#4B67D1] gu-line" />
            </div>
            <Article items={diplomacy} prefix="gu-dip" />
          </section>

          <section
            data-testid="gu-security"
            className="lg:border-l lg:border-[#0a0e28]/10 lg:pl-16 xl:pl-20"
          >
            <div className="gu-fade-up gu-d2 flex items-baseline gap-4 mb-3">
              <span className="gu-sans text-[10px] tracking-[0.35em] uppercase text-[#0a0e28]/40">Section 02</span>
              <span className="flex-1 h-px bg-[#0a0e28]/10" />
            </div>
            <h2
              data-testid="gu-security-title"
              className="gu-headline text-[#0a0e28] gu-fade-up gu-d3"
              style={{ fontSize: "clamp(28px, 3.2vw, 44px)" }}
            >
              Highlights on{" "}
              <span className="gu-italic text-[#4B67D1]">Global Security</span>
            </h2>
            <div className="mt-5 mb-2 h-px bg-[#0a0e28]/10 gu-fade-up gu-d3">
              <div className="h-px w-16 bg-[#4B67D1] gu-line" />
            </div>
            <Article items={security} prefix="gu-sec" />
          </section>
        </div>

        {/* Closing editorial line */}
        <div className="mt-16 sm:mt-20 md:mt-24 pt-10 border-t border-[#0a0e28]/10 grid md:grid-cols-12 gap-6 items-center">
          <p className="gu-italic text-[#0a0e28] text-xl sm:text-2xl md:text-3xl leading-snug md:col-span-9">
            “In an interconnected world, stability is no longer a national project — it is a shared responsibility.”
          </p>
          <div className="md:col-span-3 flex md:justify-end">
            <div className="flex items-center gap-3">
              <span className="block w-10 h-px bg-[#4B67D1]" />
              <span className="gu-sans text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-[#0a0e28]/50">
                Editorial Note
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalUpdatesContent;