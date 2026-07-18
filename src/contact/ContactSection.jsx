import { useState } from "react";
import { ChevronDown, MapPin, Phone, Mail, Clock, ArrowRight, X, Send, Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { createContact } from "../api/contactRoutes";
// ^ update this import path to wherever createContact lives

/* ============ INLINE SLIDE CONTACT FORM ============ */
function SlideContactForm({ open, setOpen }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    organization: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    setSubmitting(true);
    const toastId = toast.loading("Sending your message...");
    try {
      await createContact(form);
      toast.success("Message sent successfully!", { id: toastId });
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setOpen(false);
        setForm({ fullName: "", email: "", phone: "", country: "", organization: "", message: "" });
      }, 1600);
    } catch (err) {
      toast.error(err?.message || "Failed to send message. Please try again.", { id: toastId });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className={`absolute inset-0 bg-white z-20 transition-transform duration-500 ease-out ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="relative h-full w-full grid md:grid-cols-12">
        {/* Left brand strip */}
        <div className="hidden md:flex md:col-span-4 flex-col justify-between p-8 bg-[#0B1020] text-white relative overflow-hidden">
          <div
            className="absolute -top-24 -left-16 h-64 w-64 rounded-full blur-3xl opacity-40"
            style={{ background: "#4567E6" }}
          />
          <div className="relative">
            <div className="text-[11px] uppercase tracking-[3px] text-white/60">Get in Touch</div>
            <h3 className="mt-4 font-serif text-3xl leading-tight">
              Your <span style={{ color: "#4567E6" }}>voice</span> matters.
            </h3>
            <p className="mt-4 text-sm text-white/70 leading-relaxed">
              We read every note. A member of the Consortium will respond within one business day.
            </p>
          </div>
          <div className="relative text-[11px] uppercase tracking-[3px] text-white/60">
            World Leaders Consortium
          </div>
        </div>

        {/* Right form area */}
        <div className="md:col-span-8 p-6 md:p-10 flex flex-col overflow-y-auto">
          <div className="flex items-center justify-between">
            <div className="text-[11px] uppercase tracking-[3px] text-blue-700 font-semibold">Contact Form</div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close form"
              className="h-9 w-9 flex items-center justify-center border border-gray-300 hover:border-blue-700 hover:text-blue-700 text-gray-500 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {sent ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-10">
              <div className="h-14 w-14 border-2 border-blue-700 flex items-center justify-center text-blue-700 mb-4">
                <Send size={20} />
              </div>
              <div className="font-serif text-2xl text-gray-800">Message sent</div>
              <p className="text-sm text-gray-500 mt-2 max-w-sm">Thank you — we'll get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-6 flex-1 flex flex-col">
              <div className="grid lg:grid-cols-2 gap-x-8 gap-y-5">
                {/* Left column — short fields */}
                <div className="space-y-5">
                  <label className="block">
                    <span className="text-[11px] uppercase tracking-[3px] text-gray-500 font-semibold">Full Name</span>
                    <input
                      required
                      value={form.fullName}
                      onChange={update("fullName")}
                      disabled={submitting}
                      className="mt-2 w-full border-b border-gray-300 focus:border-blue-700 outline-none py-2 text-gray-800 bg-transparent disabled:opacity-60"
                      placeholder="Your name"
                    />
                  </label>

                  <label className="block">
                    <span className="text-[11px] uppercase tracking-[3px] text-gray-500 font-semibold">Email</span>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={update("email")}
                      disabled={submitting}
                      className="mt-2 w-full border-b border-gray-300 focus:border-blue-700 outline-none py-2 text-gray-800 bg-transparent disabled:opacity-60"
                      placeholder="you@email.com"
                    />
                  </label>

                  <label className="block">
                    <span className="text-[11px] uppercase tracking-[3px] text-gray-500 font-semibold">Phone (optional)</span>
                    <input
                      value={form.phone}
                      onChange={update("phone")}
                      disabled={submitting}
                      className="mt-2 w-full border-b border-gray-300 focus:border-blue-700 outline-none py-2 text-gray-800 bg-transparent disabled:opacity-60"
                      placeholder="+44 …"
                    />
                  </label>

                  <label className="block">
                    <span className="text-[11px] uppercase tracking-[3px] text-gray-500 font-semibold">Country</span>
                    <input
                      value={form.country}
                      onChange={update("country")}
                      disabled={submitting}
                      className="mt-2 w-full border-b border-gray-300 focus:border-blue-700 outline-none py-2 text-gray-800 bg-transparent disabled:opacity-60"
                      placeholder="Your country"
                    />
                  </label>

                  <label className="block">
                    <span className="text-[11px] uppercase tracking-[3px] text-gray-500 font-semibold">Organization (optional)</span>
                    <input
                      value={form.organization}
                      onChange={update("organization")}
                      disabled={submitting}
                      className="mt-2 w-full border-b border-gray-300 focus:border-blue-700 outline-none py-2 text-gray-800 bg-transparent disabled:opacity-60"
                      placeholder="Company / institution"
                    />
                  </label>
                </div>

                {/* Right column — message */}
                <label className="block flex flex-col">
                  <span className="text-[11px] uppercase tracking-[3px] text-gray-500 font-semibold">Message</span>
                  <textarea
                    required
                    value={form.message}
                    onChange={update("message")}
                    disabled={submitting}
                    className="mt-2 w-full min-h-[220px] lg:min-h-0 lg:h-full border-b border-gray-300 focus:border-blue-700 outline-none py-2 text-gray-800 bg-transparent resize-none flex-1 disabled:opacity-60"
                    placeholder="Tell us how we can help…"
                  />
                </label>
              </div>

              <p className="mt-8 text-xs text-gray-500 leading-6 text-center lg:text-left">
                This site is protected by reCAPTCHA and the Google{" "}
                <span className="text-blue-700 cursor-pointer hover:underline">Privacy Policy</span> and{" "}
                <span className="text-blue-700 cursor-pointer hover:underline">Terms of Service</span> apply.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="group inline-flex items-center justify-between gap-6 px-6 py-4 text-xs uppercase tracking-[3px] font-semibold text-white transition-colors disabled:opacity-70"
                  style={{ background: "#4567E6" }}
                  onMouseEnter={(e) => !submitting && (e.currentTarget.style.background = "#1E2A8A")}
                  onMouseLeave={(e) => !submitting && (e.currentTarget.style.background = "#4567E6")}
                >
                  <span>{submitting ? "Sending..." : "Send Message"}</span>
                  {submitting ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  disabled={submitting}
                  className="px-6 py-4 text-xs uppercase tracking-[3px] font-semibold text-gray-700 border border-gray-300 hover:border-gray-800 transition-colors disabled:opacity-60"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============ MAIN CONTACT SECTION ============ */
export default function ContactSection() {
  const [openForm, setOpenForm] = useState(false);

  const hours = [
    ["Mon", "09:00 – 17:00"],
    ["Tue", "09:00 – 17:00"],
    ["Wed", "09:00 – 17:00"],
    ["Thu", "09:00 – 17:00"],
    ["Fri", "09:00 – 17:00"],
    ["Sat", "Closed"],
    ["Sun", "Closed"],
  ];

  return (
    <section
      className="relative py-16 lg:py-24 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://img1.wsimg.com/isteam/getty/674124214/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:1600,m')",
      }}
    >
      <Toaster position="top-right" toastOptions={{ duration: 3500 }} />

      {/* Gradient overlay */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(11,16,32,0.55), rgba(11,16,32,0.75))" }} />

      {/* Top strip label */}
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-6 text-white/90">
          <span className="h-[2px] w-10 bg-white" />
          <span className="text-[11px] font-semibold uppercase tracking-[3px]">Get in Touch</span>
          <span className="h-[2px] w-6" style={{ background: "#4567E6" }} />
          <span className="text-[11px] font-semibold uppercase tracking-[3px]" style={{ color: "#4567E6" }}>
            Kington · UK
          </span>
        </div>

        <div className="relative bg-white shadow-2xl overflow-hidden">
          {/* colored corner accents */}
          <span className="absolute top-0 left-0 h-1 w-32" style={{ background: "#4567E6" }} />
          <span className="absolute top-0 right-0 h-1 w-16 bg-gray-900" />
          <span className="absolute bottom-0 right-0 h-1 w-32" style={{ background: "#4567E6" }} />

          {/* Slide Form (inline component) */}
          <SlideContactForm open={openForm} setOpen={setOpenForm} />

          {/* Main content */}
          <div
            className={`transition-opacity duration-500 ${
              openForm ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <div className="grid md:grid-cols-12">
              {/* LEFT: brand + heading */}
              <div className="md:col-span-5 relative p-8 lg:p-12 border-b md:border-b-0 md:border-r border-gray-200 overflow-hidden">
                <div className="absolute -top-24 -right-16 h-56 w-56 rounded-full blur-3xl opacity-30" style={{ background: "#4567E6" }} />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="h-[2px] w-8" style={{ background: "#4567E6" }} />
                    <span className="text-[11px] font-semibold uppercase tracking-[3px]" style={{ color: "#4567E6" }}>
                      WLC · Est. 2025
                    </span>
                  </div>

                  <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 leading-[1.05]">
                    World Leaders <br />
                    <span style={{ color: "#4567E6" }}>Consortium</span>
                  </h2>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {["Collaborative", "Visionary", "Global"].map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-semibold uppercase tracking-[3px] px-3 py-1.5 border"
                        style={{ borderColor: "#4567E6", color: "#4567E6" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <p className="mt-8 text-[15px] leading-relaxed text-gray-600 font-serif max-w-md">
                    A global platform uniting leaders, diplomats, and innovators to advance
                    sustainable progress. We'd love to hear from you.
                  </p>

                  {/* Live status pill */}
                  <div className="mt-8 inline-flex items-center gap-3 border border-gray-200 px-4 py-2.5">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "#16a34a" }} />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: "#16a34a" }} />
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-[3px] text-gray-700">
                      Open Today
                    </span>
                    <span className="text-sm font-serif font-semibold" style={{ color: "#4567E6" }}>
                      09:00 – 17:00
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT: info grid */}
              <div className="md:col-span-7 p-8 lg:p-12">
                {/* Contact cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="border border-gray-200 p-5 group transition-colors hover:border-blue-700">
                    <div className="h-9 w-9 flex items-center justify-center border" style={{ borderColor: "#4567E6", color: "#4567E6" }}>
                      <MapPin size={16} />
                    </div>
                    <div className="mt-4 text-[11px] font-semibold uppercase tracking-[3px] text-gray-500">Address</div>
                    <div className="mt-1 font-serif text-gray-800 text-[15px] leading-snug">
                      61 Bridge Street<br />Kington HR5 3DJ, UK
                    </div>
                  </div>

                  <div className="border border-gray-200 p-5 group transition-colors hover:border-blue-700">
                    <div className="h-9 w-9 flex items-center justify-center border" style={{ borderColor: "#4567E6", color: "#4567E6" }}>
                      <Phone size={16} />
                    </div>
                    <div className="mt-4 text-[11px] font-semibold uppercase tracking-[3px] text-gray-500">Phone</div>
                    <a
                      href="tel:+447436387718"
                      className="mt-1 block font-serif text-[15px]"
                      style={{ color: "#4567E6" }}
                    >
                      +44 7436 387718
                    </a>
                  </div>

                  <div className="border border-gray-200 p-5 group transition-colors hover:border-blue-700">
                    <div className="h-9 w-9 flex items-center justify-center border" style={{ borderColor: "#4567E6", color: "#4567E6" }}>
                      <Mail size={16} />
                    </div>
                    <div className="mt-4 text-[11px] font-semibold uppercase tracking-[3px] text-gray-500">Email</div>
                    <a
                      href="mailto:info@worldleadersconsortium.com"
                      className="mt-1 block font-serif text-[13px] break-all"
                      style={{ color: "#4567E6" }}
                    >
                      info@worldleadersconsortium.com
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Clock size={16} style={{ color: "#4567E6" }} />
                      <h3 className="font-serif font-semibold text-gray-900 text-xl md:text-2xl">Hours</h3>
                    </div>
                    <button
                      className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[3px] text-gray-500 hover:text-blue-700 transition-colors"
                      onClick={() => {}}
                    >
                      Weekly <ChevronDown size={14} />
                    </button>
                  </div>

                  <div className="border border-gray-200 divide-y divide-gray-200">
                    {hours.map(([day, time], i) => {
                      const isToday = i === new Date().getDay() - 1 || (new Date().getDay() === 0 && i === 6);
                      return (
                        <div
                          key={day}
                          className={`flex items-center justify-between px-4 py-3 text-sm ${isToday ? "bg-blue-50" : ""}`}
                        >
                          <div className="flex items-center gap-3">
                            {isToday && <span className="h-2 w-2" style={{ background: "#4567E6" }} />}
                            <span className={`font-serif ${isToday ? "text-gray-900 font-semibold" : "text-gray-700"}`}>
                              {day}
                            </span>
                          </div>
                          <span
                            className={`font-serif tabular-nums ${
                              time === "Closed" ? "text-gray-400" : isToday ? "text-blue-700 font-semibold" : "text-gray-700"
                            }`}
                          >
                            {time}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-8 border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[3px] text-gray-500">
                      Your Voice Matters
                    </div>
                    <div className="mt-1 font-serif text-gray-800 text-lg">
                      Share your message with us.
                    </div>
                  </div>
                  <button
                    onClick={() => setOpenForm(true)}
                    className="group inline-flex items-center justify-between gap-6 px-6 py-4 text-xs uppercase tracking-[3px] font-semibold text-white transition-colors w-full sm:w-auto"
                    style={{ background: "#4567E6" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#1E2A8A")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#4567E6")}
                  >
                    <span>Get in Touch</span>
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom meta strip */}
        <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-white/70">
          <div className="text-[11px] font-semibold uppercase tracking-[3px]">
            World Leaders Consortium · Global Chapter
          </div>
          <div className="text-[11px] font-semibold uppercase tracking-[3px]">
            Collaborative · Visionary · Global
          </div>
        </div>
      </div>
    </section>
  );
}