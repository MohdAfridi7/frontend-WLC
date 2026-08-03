import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
} from "lucide-react";

import {
  FaLinkedinIn,
  FaXTwitter,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa6";

const exploreLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about-us" },
  { name: "Our Work", path: "/our-work" },
  { name: "Our Team", path: "/our-team" },
  { name: "Contact Us", path: "/contact-us" },
];

const programLinks = [
  { name: "Join The Consortium", path: "/join-consortium" },
  { name: "Become A Member", path: "/become-member" },
  { name: "Global Dialogue", path: "/global-dialogue" },
  { name: "Global Councils", path: "/global-councils" },
  { name: "WLC GIP", path: "/wlc-gip" },
  { name: "W50 Global Summit", path: "/w50-global-summit" },
  
];

const resourceLinks = [
  { name: "News & Media", path: "/news-media" },
  { name: "Global Updates", path: "/global-updates" },
  { name: "World Book Of Laureates", path: "/world-book-laureates" },
  { name: "GFETSC", path: "/gfetsc" },
  { name: "FAQs", path: "/faqs" },
  { name: "Disclaimer", path: "/disclaimer" },
  { name: "Terms & Policy", path: "/terms-policy" },
];

const Footer = () => {
  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#2849A4] via-[#4969D8] to-[#2849A4] text-white">
      <style>{`
        @keyframes gradientFlow {
          0%, 100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }
        .gradient-border {
          background: linear-gradient(90deg, #B6C1FF, #ffffff, #B6C1FF, #ffffff);
          background-size: 300% 100%;
          animation: gradientFlow 6s ease infinite;
        }

        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
        .floatY { animation: floatY 8s ease-in-out infinite; }

        .footer-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: color .3s ease, transform .3s ease;
        }
        .footer-link::before {
          content: "";
          width: 0;
          height: 1px;
          background: #fff;
          transition: width .35s ease;
        }
        .footer-link:hover { color: #fff; transform: translateX(4px); }
        .footer-link:hover::before { width: 18px; }

        @media (prefers-reduced-motion: reduce) {
          .gradient-border, .floatY { animation: none; }
        }
      `}</style>

      {/* Animated top border */}
      <div className="gradient-border h-[3px] w-full" />

      {/* Decorative giant background text */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -right-6 select-none text-[14rem] font-bold leading-none tracking-tighter text-white/[0.05] sm:text-[20rem] lg:text-[26rem]"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        WLC
      </div>

      {/* Soft blue glow */}
      <div className="pointer-events-none absolute -top-32 left-1/4 h-80 w-80 rounded-full bg-[#B6C1FF]/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/3 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-20 md:px-10 lg:pt-24">

        {/* ===== TOP: Brand + Newsletter ===== */}
        <div className="grid grid-cols-1 gap-12 border-b border-white/15 pb-14 lg:grid-cols-12 lg:gap-16">

          {/* Brand block */}
          <div className="lg:col-span-7">
            <span className="text-[11px] uppercase tracking-[0.4em] text-[#B6C1FF]">
              Global Forum · Est. 2025
            </span>
            <h2
              className="mt-5 text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              World Leaders <br />
              <em className="font-light italic text-[#B6C1FF]">Consortium.</em>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/80">
              Bringing together global leaders, innovators and visionaries to
              shape the conversations that define tomorrow.
            </p>

            {/* Contact rows */}
            <div className="mt-8 grid max-w-lg grid-cols-1 gap-4 sm:grid-cols-2">
              <a
                href="tel:8340581166"
                className="group flex items-start gap-3 border border-white/15 bg-white/5 p-4 transition hover:border-white/40 hover:bg-white/10"
              >
                <Phone size={18} className="mt-1 text-[#B6C1FF]" />
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.3em] text-white/60">
                    Call Us
                  </span>
                  <span className="block text-sm font-medium">8340581166</span>
                </div>
              </a>
              <a
                href="mailto:info@worldleadersconsortium.com"
                className="group flex items-start gap-3 border border-white/15 bg-white/5 p-4 transition hover:border-white/40 hover:bg-white/10"
              >
                <Mail size={18} className="mt-1 text-[#B6C1FF]" />
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.3em] text-white/60">
                    Email
                  </span>
                  <span className="block break-all text-sm font-medium">
                    info@worldleadersconsortium.com
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Newsletter card */}
          <div className="lg:col-span-5">
            <div className="floatY relative border border-white/15 bg-white/10 p-8 backdrop-blur-xl">
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#B6C1FF]">
                Stay Connected
              </span>
              <h3
                className="mt-4 text-2xl leading-snug sm:text-3xl"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Get global updates from the Consortium.
              </h3>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-6 flex flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none transition focus:border-white focus:bg-white/10"
                />
                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2 bg-white px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#2849A4] transition hover:bg-[#B6C1FF]"
                >
                  Subscribe
                  <ArrowUpRight
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </button>
              </form>

              <p className="mt-4 text-[11px] uppercase tracking-[0.25em] text-white/50">
                No spam · unsubscribe anytime
              </p>
            </div>
          </div>
        </div>

        {/* ===== MIDDLE: Link Columns ===== */}
        <div className="grid grid-cols-1 gap-12 border-b border-white/15 py-14 sm:grid-cols-2 lg:grid-cols-3">

          <div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#B6C1FF]">
              Explore
            </span>
            <ul className="mt-6 space-y-4">
              {exploreLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="footer-link text-[13px] uppercase tracking-[2px] text-white/85"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#B6C1FF]">
              Programs
            </span>
            <ul className="mt-6 space-y-4">
              {programLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="footer-link text-[13px] uppercase tracking-[2px] text-white/85"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#B6C1FF]">
              Resources
            </span>
            <ul className="mt-6 space-y-4">
              {resourceLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="footer-link text-[13px] uppercase tracking-[2px] text-white/85"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ===== Socials row ===== */}
        <div className="flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
          <span className="text-[11px] uppercase tracking-[0.35em] text-white/70">
            Follow the Consortium
          </span>
          <div className="flex items-center gap-3">
            {[
  { Icon: FaLinkedinIn, href: "#" },
  { Icon: FaXTwitter, href: "#" },
  { Icon: FaInstagram, href: "#" },
  { Icon: FaFacebookF, href: "#" },
  { Icon: FaYoutube, href: "#" },
].map(({ Icon, href }, i) => (
  <a
    key={i}
    href={href}
    className="flex h-10 w-10 items-center justify-center border border-white/20 text-white/80 transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white hover:text-[#2849A4]"
  >
    <Icon size={16} />
  </a>
))}
          </div>
        </div>

        {/* ===== Legal bar ===== */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/15 py-8 text-center sm:flex-row sm:text-left">
          <p className="text-[12px] uppercase tracking-[0.25em] text-white/70">
            © 2025 World Leaders Consortium · All Rights Reserved.
          </p>

          <p className="text-[12px] uppercase tracking-[0.25em] text-white/70">
            Managed by{" "}
            <span className="font-semibold text-white">
              Rumarix Consortium Foundation
            </span>
          </p>

          <button
            onClick={scrollTop}
            className="group inline-flex items-center gap-2 border border-white/30 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-white/85 transition hover:border-white hover:bg-white hover:text-[#2849A4]"
          >
            Top
            <ArrowUp
              size={14}
              className="transition-transform group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;