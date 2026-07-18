import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How can individuals join WLC?",
    answer:
      "Individuals can join by applying for membership through the WLC website. Membership tiers include Youth Fellow, Youth Ambassador, Chapter Head, Honorary Patron, and other leadership roles, each with specific eligibility criteria.",
  },
  {
    question: "Is there a fee to join the consortium?",
    answer:
      "Each membership tier may have different contribution models. The Youth Fellow and Honorary Patron memberships are free but require a rigorous selection process.",
  },
  {
    question: "Can institutions partner with WLC on their existing programs?",
    answer:
      "Yes, institutional members can propose co-branded initiatives aligned with WLC’s global mission.",
  },
  {
    question: "What is the duration of membership?",
    answer:
      "Most memberships are annual, with options for renewal. Founding Membership is a one-time lifetime recognition.",
  },
  {
    question: "What countries can join?",
    answer:
      "WLC is open to individuals and organizations worldwide. We are currently building alliances in over 70+ countries.",
  },
  {
    question: "Is there an age limit for Youth Fellows?",
    answer:
      "Yes, applicants must be between 18 and 30 years of age.",
  },
  {
    question: "Will members receive a certificate or letter?",
    answer:
      "Yes, each active member receives an official certificate and digital badge. Youth Fellows also receive letters of recommendation post-internship.",
  },
  {
    question: "What is the purpose of WLC?",
    answer:
      "The World Leaders Consortium aims to unite global leaders, policymakers, educators, and social activists to address pressing challenges through dialogue, collaboration, and action.",
  },
  {
    question: "Can members propose their own initiatives?",
    answer:
      "Yes, members can propose initiatives that align with WLC's mission and focus areas, such as youth empowerment, sustainable development, and education.",
  },
  {
    question: "Are there networking opportunities for members?",
    answer:
      "Absolutely. WLC organizes forums, conferences, and workshops globally to facilitate networking, collaboration, and idea exchange among members.",
  },
  {
    question: "What support does WLC provide to its Chapter Ambassadors?",
    answer:
      "Chapter Ambassadors receive guidance, resources, and a platform to implement impactful programs in their respective regions, along with opportunities to engage in global dialogues.",
  },
];

/* Same signature seal used across the WLC page, kept small here so the
   accordion still reads primarily as content, not decoration. */
const Seal = ({ className = "" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor">
    <circle cx="50" cy="50" r="47" strokeWidth="1" />
    <circle cx="50" cy="50" r="39" strokeWidth="0.5" strokeDasharray="2 3" />
    <circle cx="50" cy="50" r="30" strokeWidth="1" />
    <text x="50" y="47" textAnchor="middle" fontSize="11" fontFamily="'IBM Plex Mono', monospace" fill="currentColor" stroke="none" letterSpacing="3">WLC</text>
    <text x="50" y="59" textAnchor="middle" fontSize="4.5" fontFamily="'IBM Plex Mono', monospace" fill="currentColor" stroke="none" letterSpacing="3">CONSORTIUM</text>
  </svg>
);

export default function Faqs() {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-28">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500&family=IBM+Plex+Mono:wght@400;500&display=swap');
        .f-display { font-family: 'Fraunces', serif; }
        .f-body { font-family: 'Inter', sans-serif; }
        .f-mono { font-family: 'IBM Plex Mono', monospace; }
      `}</style>

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] bg-[size:26px_26px] opacity-[0.12]" />
      <Seal className="pointer-events-none absolute -right-24 top-10 -z-10 h-[360px] w-[360px] text-[#4567E6]/[0.05]" />

      <div className="f-body mx-auto max-w-4xl px-6">

        {/* Heading */}
        <div className="text-center">
          <span className="f-mono text-[11px] uppercase tracking-[0.3em] text-[#4567E6]">§07 — FAQ</span>
          <h2 className="f-display mt-3 text-4xl text-slate-900 md:text-5xl">
            Frequently Asked Questions
          </h2>
          <div className="mx-auto mt-6 flex items-center justify-center gap-3">
            <span className="h-px w-14 bg-slate-300" />
            <span className="f-mono text-[10px] uppercase tracking-[0.3em] text-slate-400">{faqs.length} Questions Answered</span>
            <span className="h-px w-14 bg-slate-300" />
          </div>

          <p className="mt-6 text-sm font-light leading-relaxed text-slate-500">
            For any query related to membership, feel free to reach us at{" "}
            <a
              href="mailto:info@worldleadersconsortium.com"
              className="f-mono border-b border-[#4567E6]/40 text-[#4567E6] hover:border-[#4567E6]"
            >
              info@worldleadersconsortium.com
            </a>
          </p>
        </div>

        {/* Accordion */}
        <div className="mt-16 border-t border-slate-200">
          {faqs.map((faq, index) => {
            const isOpen = open === index;
            return (
              <div key={index} className="border-b border-slate-200">
                <button
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="flex w-full items-start justify-between gap-6 py-6 text-left"
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`f-mono mt-1 text-xs tracking-widest transition-colors ${
                        isOpen ? "text-[#4567E6]" : "text-slate-300"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3
                      className={`f-display text-lg transition-colors md:text-xl ${
                        isOpen ? "text-[#4567E6]" : "text-slate-900"
                      }`}
                    >
                      {faq.question}
                    </h3>
                  </div>

                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center border transition-colors ${
                      isOpen ? "border-[#4567E6] text-[#4567E6]" : "border-slate-200 text-slate-400"
                    }`}
                  >
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 pl-9 text-sm font-light leading-relaxed text-slate-500 md:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}