import { useState } from "react";
import img from '../../src/assets/pa-1.webp'
import img1 from '../../src/assets/pa-2.webp'
import img2 from '../../src/assets/pa-3.webp'
import img3 from '../../src/assets/pa-4.webp'
import img4 from '../../src/assets/pa-5.webp'
import img5 from '../../src/assets/pa-6.webp'


/* ---------- FIXED / STATIC DATA (backend hata diya) ---------- */
/* Yahan apna data edit kar sakte ho - title, image, description */
/* image field me apni actual photo ka path/URL daal dena */
const GFETSC_DATA = [
  {
    _id: "1",
    title: "Dritan Abazović, 7th Prime Minister, Republic of Montenegro",
    image: img,
    description:
      "<p>Dritan Abazović is a Montenegrin politician known for his commitment to democratic governance, anti-corruption reforms, and regional cooperation. He served as the Prime Minister of Montenegro from 2022 to 2023. As the leader of the URA movement, he has advocated for transparency, the rule of law, and European integration. Abazović has played an important role in strengthening dialogue and promoting political stability in the Western Balkans. He is widely recognized for encouraging international collaboration and sustainable development initiatives. His leadership continues to contribute to discussions on governance, security, and Montenegro's economic future.</p>",
  },
  {
    _id: "2",
    title: "Chiril Gaburici, 10th Prime Minister, Republic of Moldova",
    image: img1,
    description:
      "<p>Chiril Gaburici is a Moldovan businessman and former Prime Minister of Moldova. He served as Prime Minister in 2015, focusing on economic reforms and improving public administration. Before entering politics, he built a successful career in the telecommunications and business sectors. Gaburici has been a strong advocate for innovation, entrepreneurship, and sustainable economic development. He has also supported initiatives that strengthen international cooperation and investment opportunities. His experience in both the public and private sectors has made him a respected voice on leadership, business, and economic policy.</p>",
  },
  {
    _id: "3",
    title: "Ameenah Gurib-Fakim, 06th President, Republic of Mauritius",
    image: img2,
    description:
      "<p>Ameenah Gurib-Fakim is a distinguished scientist and former President of Mauritius. She served as the President of Mauritius from 2015 to 2018 and became the country's first female President. An internationally respected biodiversity expert, she has authored numerous scientific publications on medicinal plants and natural products. Dr. Gurib-Fakim is a strong advocate for science, innovation, education, and sustainable development. She actively promotes women's leadership and youth empowerment on global platforms. Her contributions continue to inspire efforts toward sustainable growth, scientific excellence, and international cooperation.</p>",
  },
  {
    _id: "4",
    title: "Paolo Rondelli, Former President, Republic of San Marino",
    image: img3,
    description:
      "<p>Paolo Rondelli is a Sammarinese politician, diplomat, and academic. He served as one of the Captains Regent of San Marino from April to October 2022, becoming the country's first openly LGBTQ head of state. Rondelli has represented San Marino in various international diplomatic roles, including at the United States. He is a strong advocate for human rights, inclusion, and international cooperation. His work has focused on diplomacy, education, and strengthening global partnerships. Paolo Rondelli is widely respected for his commitment to democratic values, equality, and public service.</p>",
  },
  {
    _id: "5",
    title: "Dr Joseph Muscat, 13th Prime Minister, Republic of Malta",
    image: img4,
    description:
      "<p>Joseph Muscat is a Maltese politician who served as the Prime Minister of Malta from 2013 to 2020. During his tenure, he oversaw a period of strong economic growth and significant policy reforms. His government introduced measures in areas such as economic development, civil rights, and public administration. After leaving office, Muscat has continued to participate in international discussions on governance, leadership, and economic policy. He remains a well-known public figure in Malta and internationally. His political career has had a lasting impact on Malta's modern political and economic landscape.</p>",
  },
  {
    _id: "6",
    title: "Igor Lukšić, 04th Prime Minister, Republic of Montenegro",
    image: img5,
    description:
      "<p>Igor Lukšić is a Montenegrin economist, diplomat, and former Prime Minister of Montenegro. He served as Prime Minister from 2010 to 2012 and later as the country's Minister of Foreign Affairs. Lukšić played a key role in advancing Montenegro's European and Euro-Atlantic integration. He has been a strong advocate for regional cooperation, economic development, and international diplomacy. Following his public service, he has contributed to global discussions through international organizations and think tanks. His expertise spans governance, foreign policy, and sustainable development.</p>",
  },
];

/* ---------- Image with fallback ---------- */
function Img({ src, alt, className = "", ratio = "aspect-[4/3]" }) {
  const [err, setErr] = useState(false);
  if (!src || err) {
    return (
      <div className={`w-full ${ratio} bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 text-xs uppercase tracking-widest ${className}`}>
        {alt || "No Image"}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className={`w-full ${ratio} object-cover block ${className}`}
      onError={() => setErr(true)}
    />
  );
}

/* ---------- Reusable bits ---------- */
const H2 = ({ children, className = "" }) => (
  <h2 className={`font-serif font-semibold text-gray-800 text-2xl md:text-3xl leading-tight ${className}`}>
    {children}
  </h2>
);

const Chapter = ({ n, label, title, blueLabel = false }) => (
  <div className="mb-10">
    <div className="flex items-baseline gap-4 mb-2">
      <span className="font-serif text-blue-700 text-3xl md:text-4xl font-semibold tabular-nums">
        {n}
      </span>
      <span className={`text-[11px] font-semibold uppercase tracking-[3px] ${blueLabel ? "text-blue-700" : "text-gray-500"}`}>
        {label}
      </span>
    </div>
    <H2>{title}</H2>
    <div className="mt-3 h-[3px] w-16 bg-blue-700" />
  </div>
);

function stripHtml(html = "") {
  const div = document.createElement("div");
  div.innerHTML = html;
  return (div.textContent || div.innerText || "").trim();
}

/* ---------- GFETSC card ---------- */
function GfetscCard({ item }) {
  const [expanded, setExpanded] = useState(false);

  const plainText = stripHtml(item.description || "");

  return (
    <div className="group relative overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-lg transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_25px_80px_-15px_rgba(37,99,235,0.35)]">

      {/* Spotlight Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/5 to-cyan-400/10 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

      {/* Shine Effect */}
      <div className="absolute inset-0 z-20 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 transition-transform duration-1000 group-hover:translate-x-[120%]" />

      {/* Image */}
      <div className="relative overflow-hidden">
        <Img
          src={item.image}
          alt={item.title}
          ratio="aspect-[4/3]"
          className="transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      
      </div>

      {/* Content */}
      <div className="relative z-10 p-6">
        <h3 className="mb-3 line-clamp-2 text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-blue-600">
          {item.title}
        </h3>

        {!expanded ? (
          <p className="line-clamp-3 text-sm leading-relaxed text-slate-600">
            {plainText}
          </p>
        ) : (
          <div
            className="
              prose
              prose-sm
              max-w-none
              text-slate-700

              [&_ul]:list-disc
              [&_ul]:pl-6
              [&_ul]:my-3

              [&_ol]:list-decimal
              [&_ol]:pl-6
              [&_ol]:my-3

              [&_li]:mb-1

              [&_h1]:text-2xl
              [&_h1]:font-bold

              [&_h2]:text-xl
              [&_h2]:font-bold

              [&_h3]:text-lg
              [&_h3]:font-bold

              [&_strong]:font-bold
              [&_a]:text-blue-600
              [&_a]:underline
            "
            dangerouslySetInnerHTML={{
              __html: item.description || "",
            }}
          />
        )}

        {plainText.length > 120 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 transition-all duration-300 hover:bg-blue-600 hover:text-white hover:gap-3"
          >
            {expanded ? "Show Less" : "Read More"}
            <span>→</span>
          </button>
        )}

        {/* Bottom Accent */}
        <div className="mt-5 h-[3px] w-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-500 group-hover:w-24" />
      </div>
    </div>
  );
}

/* ============ GFETSC SECTION (static data, no backend call) ============ */
export default function Permanent() {
  const items = GFETSC_DATA;

  return (
    <section className="bg-gray-50 border-y border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <Chapter title="WLC Permanent Members" blueLabel />

        {items.length === 0 && (
          <p className="text-sm text-gray-400">No GFETSC updates yet.</p>
        )}

        {items.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((s) => (
              <GfetscCard key={s._id} item={s} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}