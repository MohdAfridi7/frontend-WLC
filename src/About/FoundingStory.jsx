import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Globe2,
  Compass,
  Sparkles,
  Users,
  Leaf,
  Lightbulb,
  Target,
  Eye,
} from "lucide-react";

const FoundingStory = () => {
  const pillars = [
    {
      icon: Users,
      title: "Leadership",
      desc: "Empowering impactful, ethical, and inclusive leaders across generations.",
    },
    {
      icon: Globe2,
      title: "Collaboration",
      desc: "Creating a global community for dialogue, partnership, and solution-building.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      desc: "Driving progress through cutting-edge ideas in policy, technology, health, and education.",
    },
    {
      icon: Leaf,
      title: "Sustainability",
      desc: "Promoting environmental stewardship, equitable growth, and responsible development aligned with the SDGs.",
    },
  ];

  const missionPoints = [
    "To drive awareness and action for the UN SDGs on a global scale.",
    "To enable world leaders to collectively address global issues through diplomacy, innovation, and collaboration.",
    "To foster youth and women leadership while building South-South and North-South bridges.",
    "To create an ecosystem of global mentoring, sustainable partnerships, and shared growth.",
  ];

  return (
    <section className="relative overflow-hidden bg-[#090909] text-white py-20 md:py-28">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fadeUp { animation: fadeUp 1s cubic-bezier(.2,.7,.2,1) both; }

        @keyframes floatY {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(-10px); }
        }
        .floatY { animation: floatY 7s ease-in-out infinite; }

        @keyframes drawLine {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .drawLine { animation: drawLine 1.4s ease both; transform-origin: left; }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .shimmerText {
          background: linear-gradient(90deg,#4B67D1 0%,#B6C1FF 50%,#4B67D1 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shimmer 6s linear infinite;
        }

        .card-glow {
          position: relative;
          overflow: hidden;
          transition: all .5s ease;
        }
        .card-glow::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at var(--x,50%) var(--y,50%),
            rgba(75,103,209,.18), transparent 50%);
          opacity: 0;
          transition: opacity .3s ease;
        }
        .card-glow:hover::before { opacity: 1; }
        .card-glow:hover {
          border-color: rgba(75,103,209,.7);
          transform: translateY(-4px);
        }

        @media (prefers-reduced-motion: reduce) {
          .fadeUp,.floatY,.drawLine,.shimmerText { animation: none !important; }
        }
      `}</style>

      {/* ===== Decorative backdrop ===== */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-1/3 select-none text-[16rem] font-bold leading-none tracking-tighter text-white/[0.03] sm:text-[22rem] lg:text-[30rem]"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        WLC
      </div>
      <div className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-[#4B67D1]/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-40 -right-20 h-96 w-96 rounded-full bg-[#4B67D1]/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(75,103,209,0.08),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">

        {/* ===== Hero Image with overlay card ===== */}
        <div className="fadeUp relative mb-20 overflow-hidden rounded-none">
          <div className="relative aspect-[21/9] w-full overflow-hidden">
            <img
              src="https://img1.wsimg.com/isteam/getty/179243711/:/cr=t:0.48%25,l:6.63%25,w:87.44%25,h:87.44%25/rs=w:2480,cg:true,m"
              alt="World Flags"
              className="h-full w-full object-cover transition-transform duration-[6000ms] hover:scale-105"
            />
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#090909]/60 via-transparent to-transparent" />

            {/* Overlay text */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
              <span className="text-[11px] uppercase tracking-[0.4em] text-[#B6C1FF]">
                Chapter 01 · Founding Story
              </span>
              <h2
                className="mt-4 max-w-3xl text-3xl font-medium leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Who We Are — <em className="italic font-light shimmerText">A Global Consortium.</em>
              </h2>
            </div>

            {/* Floating stat card */}
            <div className="floatY absolute right-4 top-4 hidden border border-white/15 bg-black/50 p-5 backdrop-blur-xl md:block">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#B6C1FF]">
                Global Reach
              </span>
              <p
                className="mt-2 text-3xl font-medium"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                70+
              </p>
              <p className="text-[11px] uppercase tracking-[0.25em] text-white/70">
                Countries · Since 2025
              </p>
            </div>
          </div>
        </div>

        {/* ===== Section Intro ===== */}
        <div className="mb-16 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="fadeUp lg:col-span-5 lg:sticky lg:top-24 lg:h-fit">
            <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-[#B6C1FF]">
              <span className="drawLine h-px w-10 bg-[#4B67D1]" />
              Welcome to WLC
            </span>
            <h3
              className="mt-6 text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              A powerful belief that <em className="italic font-light text-[#4B67D1]">visionary leadership</em> can shape the world.
            </h3>
            <p className="mt-6 text-base leading-relaxed text-gray-400">
              Uniting transformative leaders from diverse spheres — public,
              business, education, social development, and innovation.
            </p>

            <div className="mt-8 flex items-center gap-6 border-t border-white/10 pt-6">
              <div>
                <p
                  className="text-3xl font-medium"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  UK
                </p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/50">
                  Kingston HQ
                </p>
              </div>
              <span className="h-10 w-px bg-white/15" />
              <div>
                <p
                  className="text-3xl font-medium"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  70+
                </p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/50">
                  Countries
                </p>
              </div>
              <span className="h-10 w-px bg-white/15" />
              <div>
                <p
                  className="text-3xl font-medium"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  ∞
                </p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/50">
                  Impact
                </p>
              </div>
            </div>
          </div>

          {/* Right — Story paragraphs */}
          <div className="fadeUp lg:col-span-7 space-y-8" style={{ animationDelay: "0.15s" }}>
            {[
              "The World Leaders Consortium (WLC) was founded with a powerful belief that visionary leadership and inclusive collaboration across nations can address the greatest challenges of our time. WLC was conceived as a platform to unite transformative leaders from diverse spheres—public, business, education, social development, and innovation.",
              "The World Leaders Consortium is a prestigious nonprofit organization, proudly headquartered in Kingston, UK. Backed by a global network of partners and changemakers spanning over 70 countries, it serves as a powerful platform for international collaboration, leadership, and impact.",
              "Through global summits, leadership forums, policy dialogues, youth engagement initiatives, and strategic partnerships, WLC empowers leaders to collaborate beyond borders and create sustainable solutions for a rapidly evolving world.",
              "Our mission is to bridge nations, cultures, and generations by fostering meaningful dialogue, innovation, and action. We believe that collective leadership is the key to addressing global challenges and building a more inclusive and prosperous future.",
            ].map((p, i) => (
              <div key={i} className="group relative pl-6">
                <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-[#4B67D1] transition-all group-hover:h-8 group-hover:bg-[#B6C1FF]" />
                <p className="text-base leading-8 text-gray-300">{p}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ===== Vision & Mission ===== */}
        <div className="mt-24 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Vision Card */}
          <div className="fadeUp card-glow border border-white/10 bg-white/[0.02] p-8 md:p-10">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center bg-[#4B67D1]/15 text-[#B6C1FF]">
                <Eye size={22} />
              </div>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#B6C1FF]">
                01 · Vision
              </span>
            </div>
            <h4
              className="mt-6 text-2xl leading-snug sm:text-3xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              To become the world's most inclusive and influential platform for leadership dialogue.
            </h4>
            <p className="mt-5 text-base leading-8 text-gray-400">
              Empowering nations, communities, and future generations to
              achieve the United Nations Sustainable Development Goals through
              global cooperation and innovation.
            </p>
          </div>

          {/* Mission Card */}
          <div
            className="fadeUp card-glow border border-white/10 bg-white/[0.02] p-8 md:p-10"
            style={{ animationDelay: "0.15s" }}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center bg-[#4B67D1]/15 text-[#B6C1FF]">
                <Target size={22} />
              </div>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#B6C1FF]">
                02 · Mission
              </span>
            </div>
            <h4
              className="mt-6 text-2xl leading-snug"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              What we set out to do.
            </h4>
            <ul className="mt-5 space-y-4">
              {missionPoints.map((point, i) => (
                <li key={i} className="flex gap-4">
                  <span className="mt-2 h-px w-6 shrink-0 bg-[#4B67D1]" />
                  <span className="text-sm leading-7 text-gray-300 md:text-base">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ===== Pillars Grid ===== */}
        <div className="mt-24">
          <div className="fadeUp mb-12 flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-[#B6C1FF]">
              <span className="h-px w-10 bg-[#4B67D1]" />
              Our Pillars
              <span className="h-px w-10 bg-[#4B67D1]" />
            </span>
            <h3
              className="mt-6 max-w-3xl text-3xl font-medium leading-tight tracking-tight sm:text-5xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              The four principles that guide <em className="italic font-light text-[#4B67D1]">everything we do.</em>
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="fadeUp card-glow group relative border border-white/10 bg-white/[0.02] p-8 transition"
                  style={{ animationDelay: `${i * 0.1}s` }}
                  onMouseMove={(e) => {
                    const r = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
                    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
                  }}
                >
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                    0{i + 1}
                  </span>
                  <div className="mt-6 flex h-12 w-12 items-center justify-center bg-[#4B67D1]/15 text-[#B6C1FF] transition-all group-hover:bg-[#4B67D1] group-hover:text-white">
                    <Icon size={22} />
                  </div>
                  <h5
                    className="mt-6 text-2xl leading-tight"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {p.title}
                  </h5>
                  <p className="mt-3 text-sm leading-7 text-gray-400">
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ===== CTA Block ===== */}
        <div className="fadeUp mt-24 flex flex-col items-center justify-between gap-8 border border-white/10 bg-gradient-to-br from-[#4B67D1]/15 via-white/[0.02] to-[#4B67D1]/10 p-10 text-center md:flex-row md:text-left">
          <div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#B6C1FF]">
              Become a Part of Global Network
            </span>
            <h4
              className="mt-4 max-w-xl text-3xl font-medium leading-tight sm:text-4xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Ready to shape the <em className="italic font-light text-[#4B67D1]">future of leadership?</em>
            </h4>
          </div>

          <Link
            to="/become-member"
            className="group inline-flex items-center gap-3 bg-[#4B67D1] px-10 py-5 text-xs font-semibold uppercase tracking-[0.3em] text-white transition-all hover:bg-white hover:text-[#090909]"
          >
            Join Now
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FoundingStory;