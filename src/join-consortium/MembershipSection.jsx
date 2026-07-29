import React from "react";
import { Link } from "react-router-dom";
import img from '../../public/image/ha11.webp'

/* Recurring signature mark — a seal/emblem motif that ties the whole
   section together, echoing the credential a global body issues its members. */
const Seal = ({ className = "" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor">
    <circle cx="50" cy="50" r="47" strokeWidth="1" />
    <circle cx="50" cy="50" r="39" strokeWidth="0.5" strokeDasharray="2 3" />
    <circle cx="50" cy="50" r="30" strokeWidth="1" />
    <text x="50" y="47" textAnchor="middle" fontSize="11" fontFamily="'IBM Plex Mono', monospace" fill="currentColor" stroke="none" letterSpacing="3">WLC</text>
    <text x="50" y="59" textAnchor="middle" fontSize="4.5" fontFamily="'IBM Plex Mono', monospace" fill="currentColor" stroke="none" letterSpacing="3">CONSORTIUM</text>
  </svg>
);

const tiers = [
  {
    code: "TRACK 01",
    title: "Founding Member",
    who: "Visionary leaders, institutions, and changemakers aligned with WLC's mission.",
    perks: [
      "Lifetime recognition as a Founding Member",
      "Priority speaking roles at global summits and panels",
      "Involvement in strategic decision-making",
      "Recognition in all key WLC publications and media",
      "Exclusive Founders’ Retreat invitation annually",
    ],
    featured: true,
  },
  {
    code: "TRACK 02",
    title: "Institutional Member",
    who: "Universities, think tanks, non-profits, government agencies, and corporate bodies.",
    perks: [
      "Representation in global dialogues and forums",
      "Collaboration on research and advocacy initiatives",
      "Joint branding opportunities and co-hosted events",
      "Access to international policy networks",
    ],
  },
  {
    code: "TRACK 03",
    title: "Global Ambassador",
    who: "International diplomats, development experts, business leaders, and social influencers.",
    perks: [
      "Represent WLC in your country or sector",
      "Participate in exclusive ambassadorial forums",
      "Lead regional awareness and outreach initiatives",
      "Personalized profile featured on global platform",
    ],
  },
  {
    code: "TRACK 04",
    title: "Youth Fellow",
    who: "Emerging leaders aged 18–30 from diverse disciplines.",
    perks: [
      "3–6 month leadership mentorship program",
      "Access to global summits and innovation camps",
      "Participation in global youth delegation",
      "Certificate and letter of recommendation",
    ],
  },
  {
    code: "TRACK 05",
    title: "Honorary Patron",
    who: "Eminent personalities recognized for their lifelong contributions to humanity, peace, education, or leadership.",
    perks: [
      "Special acknowledgment on global platform",
      "Lifetime honorary membership status",
      "Invitation to major ceremonial events",
      "Advisory role to guide WLC’s mission",
    ],
    wide: true,
  },
];

const MembershipSection = () => {
  return (
    <section className="relative overflow-hidden bg-white py-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500&family=IBM+Plex+Mono:wght@400;500&display=swap');
        .f-display { font-family: 'Fraunces', serif; }
        .f-body { font-family: 'Inter', sans-serif; }
        .f-mono { font-family: 'IBM Plex Mono', monospace; }
      `}</style>

      {/* Faint dot-network backdrop — a nod to allied nations, not decoration for its own sake */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] bg-[size:26px_26px] opacity-[0.12]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-[#4F6EF7]/40 to-transparent" />

      <div className="f-body mx-auto w-[92%] max-w-7xl">

        {/* ================= MAIN HEADER ================= */}
        <div className="relative mx-auto max-w-4xl text-center">
          <Seal className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 text-[#4F6EF7]/[0.05]" />

          

          <h1 className="f-display mt-7 text-5xl leading-[1.08] tracking-tight text-slate-900 md:text-6xl lg:text-[4.5rem]">
            WLC: Leading Change,
            <span className="block italic font-normal text-[#4F6EF7] mt-1">
              Shaping Futures
            </span>
          </h1>

          <div className="mx-auto mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-14 bg-slate-300" />
            <span className="f-mono text-[10px] uppercase tracking-[0.3em] text-slate-400">§ Charter of Membership</span>
            <span className="h-px w-14 bg-slate-300" />
          </div>
        </div>

        {/* ================= OVERVIEW ROW ================= */}
        <div className="mt-24 grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left — image, framed like a credential photograph */}
          <div className="lg:col-span-5">
            <div className="relative border border-slate-200 bg-white p-3 shadow-[0_20px_50px_-25px_rgba(15,23,42,0.35)]">
              <div className="absolute -top-3 -left-3 h-6 w-6 border-t border-l border-[#4F6EF7]" />
              <div className="absolute -bottom-3 -right-3 h-6 w-6 border-b border-r border-[#4F6EF7]" />
              <img
                src={img}
                alt="WLC Membership Showcase"
                className="h-auto w-full object-cover"
              />
              <div className="flex items-center justify-between border-t border-slate-100 px-1 pt-3">
                <span className="f-mono text-[10px] uppercase tracking-widest text-slate-400">W50 Global Summit</span>
                <Seal className="h-6 w-6 text-slate-300" />
              </div>
            </div>
          </div>

          {/* Right — overview copy + application tiles */}
          <div className="lg:col-span-7">
            <h2 className="f-display text-3xl text-slate-900 sm:text-4xl">
              Leading Change, Shaping Futures
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-500 font-light">
              Become part of a transformative global platform that unites leaders, changemakers,
              institutions, and emerging voices to shape a better future for all. The World Leaders
              Consortium (WLC) welcomes individuals and organizations from diverse backgrounds to
              collaborate, contribute, and lead on the global stage.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                { code: "FORM / 01", label: "Institutional Membership", url: "https://www.pdffiller.com/en/editor/2081754096?flat_pdf_quality=high&mode=link_to_fill&requestHash=7d8dbb3f9ae0ecd110704164a47c491b09702a55f7f7d51df3dcd69e4a7acd81&lang=en&et=l2f&projectId=2081754096#1dd55cae94b2494f92fa443bd4e14b5a" },
                { code: "FORM / 02", label: "Individual Membership", url: "https://www.pdffiller.com/en/editor/2081754184?flat_pdf_quality=high&mode=link_to_fill&requestHash=14efc7e7504e5681a445f1c789a1867eaf681bf5315f121ee6ab5bc295637446&lang=en&et=l2f&projectId=2081754184#d05fee22878a4ad3856129bd6e4d6a2a" },
              ].map((doc, idx) => (
                <a
                  key={idx}
                  href={doc.url}
                  className="group flex items-center justify-between border border-slate-200 bg-white px-5 py-4 transition-colors hover:border-[#4F6EF7]"
                >
                  <div>
                    <span className="f-mono block text-[10px] uppercase tracking-widest text-[#4F6EF7]">{doc.code}</span>
                    <span className="mt-1 block text-sm text-slate-700">{doc.label}</span>
                  </div>
                  <svg className="h-4 w-4 shrink-0 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-[#4F6EF7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ================= MEMBERSHIP TIERS GRID ================= */}
        <div className="mt-28 border-t border-slate-200 pt-16">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="f-mono text-[11px] uppercase tracking-[0.3em] text-[#4F6EF7]">§02 — Tracks</span>
              <h3 className="f-display mt-2 text-4xl text-slate-900">Membership Tiers</h3>
            </div>
            <p className="max-w-sm text-sm font-light leading-relaxed text-slate-500">
              Carefully structured entry tracks for individuals, institutional networks, and lifetime advisors.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tiers.map((tier, idx) => (
              <div
                key={idx}
                className={`relative flex flex-col justify-between border p-7 transition-colors ${
                  tier.featured
                    ? "border-[#4F6EF7] bg-[#4F6EF7]/[0.03]"
                    : "border-slate-200 bg-white hover:border-[#4F6EF7]/50"
                } ${tier.wide ? "lg:col-span-2" : ""}`}
              >
                {tier.featured && (
                  <Seal className="absolute right-6 top-6 h-9 w-9 text-[#4F6EF7]" />
                )}

                <div>
                  <span className="f-mono text-[10px] uppercase tracking-widest text-slate-400">{tier.code}</span>
                  <h4 className="f-display mt-2 text-2xl text-slate-900">{tier.title}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-slate-500 font-light">
                    <span className="text-slate-700">Who can apply — </span>
                    {tier.who}
                  </p>
                </div>

                <div className="my-6 h-px bg-slate-100" />

                <div className={tier.wide ? "grid gap-x-8 gap-y-3 sm:grid-cols-2" : "space-y-3"}>
                  <span className="f-mono col-span-2 mb-1 block text-[10px] uppercase tracking-[0.25em] text-[#4F6EF7]">Privileges</span>
                  {tier.perks.map((perk, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-3 text-sm text-slate-600">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#4F6EF7]" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Core Join Button — styled like an official stamp */}
          <div className="mt-14 flex justify-center">
            <Link to="/become-member">
              <button className="group relative flex cursor-pointer items-center gap-3 border-2 border-[#4F6EF7] bg-[#4F6EF7] px-12 py-4 text-white transition-colors hover:bg-white hover:text-[#4F6EF7]">
                <span className="f-mono text-xs uppercase tracking-[0.3em]">Join Now</span>
                <Seal className="h-5 w-5" />
              </button>
            </Link>
          </div>
        </div>

        {/* ================= GLOBAL COUNCILS BLOCK ================= */}
        <div className="mt-28 grid items-center gap-12 border-t border-slate-200 pt-16 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <span className="f-mono text-[11px] uppercase tracking-[0.3em] text-[#4F6EF7]">§03 — Councils</span>
            <h3 className="f-display mt-2 text-4xl text-slate-900 md:text-5xl">
              WLC Global Councils
            </h3>
            <p className="f-mono mt-2 text-xs uppercase tracking-[0.2em] text-slate-400">
              Empowering action through expertise & collaboration
            </p>

            <div className="mt-6 space-y-4 text-base font-light leading-relaxed text-slate-500">
              <p>
                The World Leaders Consortium (WLC) has established Global Councils to address critical
                global challenges through collaboration and innovation. Comprising experts, policymakers,
                entrepreneurs, and thought leaders from 70+ countries, these councils act as think-tanks
                and action groups.
              </p>
              <p>
                Each council focuses on key areas such as diplomacy, climate action, education, gender
                equality, health, entrepreneurship, and digital transformation. By fostering strategic
                solutions, influencing policies, and empowering communities, WLC councils drive meaningful
                impact.
              </p>
              <p className="border-l-2 border-[#4F6EF7] pl-4 text-lg font-normal text-slate-800">
                Join as a Chairperson, Member, Youth Delegate, or Advisor. Participate in summits,
                roundtables, and reports. Together, we create a better world.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative overflow-hidden border border-slate-800 bg-slate-950 p-9 text-white">
              <Seal className="pointer-events-none absolute -bottom-10 -right-10 h-56 w-56 text-white/[0.06]" />

              <span className="f-mono relative z-10 text-[11px] uppercase tracking-[0.3em] text-[#4F6EF7]">70+ Allied Nations</span>
              <h4 className="f-display relative z-10 mt-3 text-3xl">Ready to lead global solutions?</h4>
              <p className="relative z-10 mt-4 text-sm font-light leading-relaxed text-slate-400">
                Collaborate directly alongside international ministries, macro-economists, policy directors,
                and sustainable development executives.
              </p>

              <Link to="/global-councils" className="relative z-10 mt-8 block">
                <button className="f-mono w-full cursor-pointer border border-white/20 bg-white py-3.5 text-xs uppercase tracking-[0.25em] text-slate-900 transition-colors hover:bg-[#4F6EF7] hover:text-white">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default MembershipSection;