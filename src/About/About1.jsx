
import React from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  Calendar,
} from "lucide-react";

import {
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

const About1 = () => {
  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fadeUp { animation: fadeUp 1s cubic-bezier(.2,.7,.2,1) both; }

        @keyframes drawLine {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .drawLine { animation: drawLine 1.4s ease both; transform-origin: left; }

        @keyframes floatY {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(-8px); }
        }
        .floatY { animation: floatY 7s ease-in-out infinite; }

        .contact-card {
          transition: all .4s ease;
        }
        .contact-card:hover {
          transform: translateY(-4px);
          border-color: #4B67D1;
          box-shadow: 0 20px 40px rgba(75,103,209,0.12);
        }

        @media (prefers-reduced-motion: reduce) {
          .fadeUp, .drawLine, .floatY { animation: none !important; }
        }
      `}</style>

      {/* Decorative background */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 select-none text-[12rem] font-bold leading-none tracking-tighter text-[#4B67D1]/[0.04] sm:text-[18rem] lg:text-[22rem]"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        02
      </div>
      <div className="pointer-events-none absolute -top-32 left-1/3 h-96 w-96 rounded-full bg-[#4B67D1]/8 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -right-20 h-80 w-80 rounded-full bg-[#4B67D1]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">

        {/* ===== Chapter label ===== */}
        <div className="fadeUp mb-14 flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-[#4B67D1]">
            <span className="drawLine h-px w-10 bg-[#4B67D1]" />
            Office of The President · 02
            <span className="drawLine h-px w-10 bg-[#4B67D1]" />
          </span>

          <h2
            className="mt-6 text-3xl font-medium leading-[1.1] tracking-tight text-[#44536C] sm:text-4xl md:text-5xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Executive <em className="italic font-light text-[#4B67D1]">Contact.</em>
          </h2>
        </div>

        {/* ===== Executive Card ===== */}
        <div className="fadeUp relative border border-[#44536C]/10 bg-white shadow-[0_30px_80px_rgba(68,83,108,0.08)]">

          {/* Blue accent corners */}
          <div className="absolute -top-1 -left-1 h-16 w-16 border-t-2 border-l-2 border-[#4B67D1]" />
          <div className="absolute -bottom-1 -right-1 h-16 w-16 border-b-2 border-r-2 border-[#4B67D1]" />

          <div className="grid grid-cols-1 gap-0 lg:grid-cols-12">

            {/* ---- LEFT: Portrait ---- */}
            <div className="relative lg:col-span-5">
              <div className="relative h-[420px] w-full overflow-hidden lg:h-full lg:min-h-[560px]">
                <img
                  src="https://img1.wsimg.com/isteam/ip/b6c56996-d063-4e20-930c-1d8a40821864/1000231116.jpg/:/cr=t:8.15%25,l:0%25,w:100%25,h:60.15%25/rs=w:800,h:602,cg:true"
                  alt="Monalisa Alfonso"
                  className="h-full w-full object-cover transition-transform duration-[6000ms] hover:scale-105"
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#44536C]/50 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/20" />

                {/* Floating role badge */}
                <div className="floatY absolute right-4 top-4 border border-white/30 bg-white/90 px-4 py-2 backdrop-blur">
                  <span
                    className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#4B67D1]"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Private Secretariat
                  </span>
                </div>

                {/* Bottom name plate */}
                <div className="absolute inset-x-4 bottom-4 border border-white/30 bg-white/95 p-4 backdrop-blur">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#4B67D1]">
                    Additional Private Secretary
                  </span>
                  <p
                    className="mt-1 text-xl leading-tight text-[#44536C]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Monalisa Alfonso
                  </p>
                </div>
              </div>
            </div>

            {/* ---- RIGHT: Details ---- */}
            <div className="lg:col-span-7 p-8 md:p-12 lg:p-14">

              <span className="text-[11px] uppercase tracking-[0.35em] text-[#4B67D1]">
                To The President, WLC
              </span>

              <h3
                className="mt-4 text-3xl font-medium leading-[1.15] tracking-tight text-[#44536C] sm:text-4xl md:text-[2.5rem]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Monalisa Alfonso, <br className="hidden sm:block" />
                <em className="italic font-light text-[#4B67D1]">
                  Additional Private Secretary
                </em>{" "}
                to The President, WLC
              </h3>

              <div className="mt-6 flex items-center gap-4">
                <span className="drawLine h-px w-14 bg-[#4B67D1]" />
                <p
                  className="text-[11px] uppercase tracking-[0.35em] text-[#44536C]/70"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Direct Line · Official Correspondence
                </p>
              </div>

              <p
                className="mt-6 max-w-xl text-base leading-[1.9] text-[#44536C]/85"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                For scheduling, official inquiries, and correspondence with the
                Office of the President, kindly use the contact channels below.
              </p>

              {/* Contact cards */}
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">

                <a
                  href="tel:+265993865001"
                  className="contact-card group flex items-start gap-4 border border-[#44536C]/15 p-5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#4B67D1]/10 text-[#4B67D1] transition group-hover:bg-[#4B67D1] group-hover:text-white">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span
                      className="text-[10px] uppercase tracking-[0.3em] text-[#4B67D1]"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Direct Contact
                    </span>
                    <p
                      className="mt-1 text-base font-medium text-[#44536C]"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      +265 993865001
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:secretariat@worldleadersconsortium.com"
                  className="contact-card group flex items-start gap-4 border border-[#44536C]/15 p-5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#4B67D1]/10 text-[#4B67D1] transition group-hover:bg-[#4B67D1] group-hover:text-white">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span
                      className="text-[10px] uppercase tracking-[0.3em] text-[#4B67D1]"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Official Email
                    </span>
                    <p
                      className="mt-1 break-all text-sm font-medium text-[#44536C]"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      secretariat@worldleadersconsortium.com
                    </p>
                  </div>
                </a>

                <div className="contact-card group flex items-start gap-4 border border-[#44536C]/15 p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#4B67D1]/10 text-[#4B67D1] transition group-hover:bg-[#4B67D1] group-hover:text-white">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span
                      className="text-[10px] uppercase tracking-[0.3em] text-[#4B67D1]"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Office
                    </span>
                    <p
                      className="mt-1 text-sm font-medium text-[#44536C]"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Kingston · United Kingdom
                    </p>
                  </div>
                </div>

                <div className="contact-card group flex items-start gap-4 border border-[#44536C]/15 p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#4B67D1]/10 text-[#4B67D1] transition group-hover:bg-[#4B67D1] group-hover:text-white">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <span
                      className="text-[10px] uppercase tracking-[0.3em] text-[#4B67D1]"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Availability
                    </span>
                    <p
                      className="mt-1 text-sm font-medium text-[#44536C]"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Mon — Fri · 09:00 to 17:00
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer row */}
              <div className="mt-10 flex flex-col items-start gap-6 border-t border-[#44536C]/15 pt-8 sm:flex-row sm:items-center sm:justify-between">

                {/* Social row */}
                <div className="flex items-center gap-3">
                  <span
                    className="text-[10px] uppercase tracking-[0.3em] text-[#44536C]/60"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Connect
                  </span>
                  <span className="h-px w-8 bg-[#44536C]/20" />
                  {[FaLinkedinIn, FaXTwitter, Mail].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="flex h-9 w-9 items-center justify-center border border-[#44536C]/20 text-[#44536C] transition-all hover:-translate-y-1 hover:border-[#4B67D1] hover:bg-[#4B67D1] hover:text-white"
                    >
                      <Icon size={14} />
                    </a>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  to="/contact-us"
                  className="group inline-flex items-center gap-3 bg-[#4B67D1] px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-white transition-all hover:bg-[#44536C]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Schedule A Meeting
                  <ArrowUpRight
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About1;