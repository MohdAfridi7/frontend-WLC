const offices = [
  {
    country: "Srilanka",
    code: "LK",
    address: ["117, Lake Road, Batticaloa,", "Srilanka 30000"],
  },
  {
    country: "Malta",
    code: "MT",
    address: ["Villa D'Este, M.Agius Street, Madliena", "Malta SWQ1511"],
  },
  {
    country: "India",
    code: "IN",
    address: ["A356, Amrapali Leisure Valley", "Noida, U.P 201310"],
  },
  {
    country: "Cyprus",
    code: "CY",
    address: ["Persea 14", "4044 Germasogia", "Limassol, Cyprus"],
  },
  {
    country: "Nigeria",
    code: "NG",
    address: ["10A, Shofola Street", "Ojodu Estate, Berger", "Ikeja, Lagos State", "Nigeria"],
  },
  {
    country: "Ghana",
    code: "GH",
    address: ["Angola Street", "GA-046-3539", "Accra Ghana"],
  },
  {
    country: "Zimbabwe",
    code: "ZW",
    address: ["4 Duxbury Avenue", "Bradfield, Bulawayo", "Zimbabwe"],
  },
  {
    country: "Malaysia",
    code: "MY",
    address: ["PT 1248, Jalan KK 8/3", "Bandar Baru Kubang Kerian", "16150 Kota Bharu", "Kelantan, Malaysia"],
  },
  {
    country: "Kenya",
    code: "KE",
    address: ["Alex Wesonga", "Kenyatta University", "P.O. Box 43844 - 00100", "Nairobi, Kenya"],
  },
  {
    country: "South Africa",
    code: "ZA",
    address: ["21 Alba Bouwer Crescent", "Overbaakens", "Gqeberha, South Africa - 6065"],
  },
  {
    country: "Nepal",
    code: "NP",
    address: ["Kalanki", "Kathmandu, Bagmati State", "Nepal - 44600"],
  },
];

/* Same signature seal used across the WLC page — small use here, on hover,
   so each office card feels stamped rather than just listed. */
const Seal = ({ className = "" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor">
    <circle cx="50" cy="50" r="47" strokeWidth="1" />
    <circle cx="50" cy="50" r="39" strokeWidth="0.5" strokeDasharray="2 3" />
    <circle cx="50" cy="50" r="30" strokeWidth="1" />
    <text x="50" y="47" textAnchor="middle" fontSize="11" fontFamily="'IBM Plex Mono', monospace" fill="currentColor" stroke="none" letterSpacing="3">WLC</text>
    <text x="50" y="59" textAnchor="middle" fontSize="4.5" fontFamily="'IBM Plex Mono', monospace" fill="currentColor" stroke="none" letterSpacing="3">CONSORTIUM</text>
  </svg>
);

export default function RegionalOffices() {
  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-28">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500&family=IBM+Plex+Mono:wght@400;500&display=swap');
        .f-display { font-family: 'Fraunces', serif; }
        .f-body { font-family: 'Inter', sans-serif; }
        .f-mono { font-family: 'IBM Plex Mono', monospace; }
      `}</style>

      {/* Faint dot-network backdrop, consistent with the rest of the page */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] bg-[size:26px_26px] opacity-[0.12]" />

      <div className="f-body mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="text-center">
          <span className="f-mono text-[11px] uppercase tracking-[0.3em] text-[#4567E6]">§06 — Global Presence</span>
          <h2 className="f-display mt-3 text-4xl text-slate-900 md:text-5xl">
            Regional Offices
          </h2>
          <div className="mx-auto mt-6 flex items-center justify-center gap-3">
            <span className="h-px w-14 bg-slate-300" />
            <span className="f-mono text-[10px] uppercase tracking-[0.3em] text-slate-400">{offices.length} Chapters Worldwide</span>
            <span className="h-px w-14 bg-slate-300" />
          </div>
        </div>

        {/* Grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {offices.map((office, index) => (
            <div
              key={index}
              className="group relative flex flex-col border border-slate-200 bg-white p-7 transition-colors hover:border-[#4567E6]"
            >
              <Seal className="pointer-events-none absolute right-5 top-5 h-8 w-8 text-[#4567E6] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <span className="f-mono text-[10px] uppercase tracking-widest text-slate-400">
                Office / {String(index + 1).padStart(2, "0")}
              </span>

              <div className="mt-3 flex items-baseline gap-2.5">
                <h3 className="f-display text-2xl text-slate-900">{office.country}</h3>
                <span className="f-mono border border-slate-200 px-1.5 py-0.5 text-[11px] tracking-wider text-[#4567E6]">
                  {office.code}
                </span>
              </div>

              <div className="mt-4 h-px w-10 bg-[#4567E6]/40" />

              <div className="mt-4 space-y-1">
                {office.address.map((line, i) => (
                  <p key={i} className="text-sm font-light leading-relaxed text-slate-500">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}