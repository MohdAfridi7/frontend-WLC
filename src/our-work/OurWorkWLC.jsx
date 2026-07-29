import React, { useEffect } from "react";
import img from '../../public/image/ha7.webp'
import img1 from '../../public/image/ha8.webp'
import img2 from '../../public/image/ha9.webp'
import img3 from '../../public/image/ha10.webp'


const OurWorkWLC = () => {
  // Inject premium editorial fonts dynamically (Cormorant Garamond & Plus Jakarta Sans)
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const serifFont = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
  const sansFont = { fontFamily: "'Plus Jakarta Sans', sans-serif" };

  return (
    <section 
      className="bg-[#f3f3f3] py-28 sm:py-36 relative overflow-hidden"
      style={sansFont}
    >
      {/* Editorial Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

      <div className="w-[90%] max-w-[1200px] mx-auto space-y-16 sm:space-y-20 relative">

        {/* ================= EDITORIAL HERO HEADER ================= */}
        <div className="text-center space-y-6 max-w-4xl mx-auto pb-12 border-b border-gray-200">
         
          <h2 
            className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-gray-900 leading-none"
            style={serifFont}
          >
            Our Work <br />
            <span className="text-[#4169e1] italic font-medium font-serif">World Leaders Consortium</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto uppercase tracking-widest font-medium">
            Bridging Nations, Empowering Generations, Aligning Agendas
          </p>
        </div>


        {/* ================= ROW 1: MISSION OVERVIEW ================= */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Column 1: Image Frame */}
          <div className="lg:col-span-6 relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-[#4169e1]/30 pointer-events-none rounded-tl-xl" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-[#4169e1]/30 pointer-events-none rounded-br-xl" />
            <div className="overflow-hidden rounded-2xl bg-white p-4 shadow-xl border border-gray-100 transition-transform duration-500 hover:scale-[1.01]">
              <img
                src={img}
                alt="Our Work"
                className="w-full h-[360px] sm:h-[450px] object-cover rounded-xl filter saturate-[0.9]"
              />
            </div>
          </div>

          {/* Column 2: Text Description */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#4169e1]">
                Consortium Manifesto
              </span>
              <h3 
                className="text-4xl sm:text-5xl font-normal text-gray-900 tracking-tight"
                style={serifFont}
              >
                Our Work
              </h3>
            </div>

            <div className="space-y-6 text-gray-700 text-lg leading-[2.1] font-light">
              <p className="text-gray-900 font-normal">
                At the World Leaders Consortium (WLC), we focus on building an
                inclusive and forward-looking global platform that brings together
                leaders, innovators, policymakers, and visionaries to address
                some of the most pressing challenges of our time.
              </p>
              
              <div className="relative p-6 sm:p-8 bg-white border border-gray-100 rounded-2xl shadow-sm">
                <span className="text-5xl font-serif text-[#4169e1]/20 absolute top-2 left-4 font-black">“</span>
                <p className="text-gray-600 font-light italic leading-relaxed pl-4">
                  Our work spans across five key verticals designed to maximize
                  global cooperation, policy impact, and leadership transformation.
                </p>
              </div>
            </div>
          </div>
        </div>


        {/* ================= ROW 2: GLOBAL SUMMIT & DIALOGUE ================= */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Column 1: Text Description */}
          <div className="lg:col-span-6 space-y-8 text-left order-2 lg:order-1">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#4169e1]">
                Vertical 01 / Diplomacy
              </span>
              <h3 
                className="text-4xl sm:text-5xl font-normal text-gray-900 tracking-tight"
                style={serifFont}
              >
                Global Summit & Dialogue
              </h3>
            </div>

            <p className="text-gray-700 text-lg leading-[2] font-light">
              WLC hosts high-impact international summits, leadership forums,
              and policy roundtables that unite changemakers, diplomats,
              entrepreneurs, scholars, and government officials.
            </p>

            {/* Premium Highlight Card List */}
            <div className="space-y-4 pt-4 border-t border-gray-200">
              {[
                "Strengthened diplomatic and multilateral relations",
                "Collaborative frameworks for sustainable development",
                "Policy proposals and leadership declarations"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="mt-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#4169e1]/10 text-[#4169e1] flex-shrink-0">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-base sm:text-lg text-gray-800 font-medium leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Image Frame */}
          <div className="lg:col-span-6 order-1 lg:order-2 relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-[#4169e1]/30 pointer-events-none rounded-tl-xl" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-[#4169e1]/30 pointer-events-none rounded-br-xl" />
            <div className="overflow-hidden rounded-2xl bg-white p-4 shadow-xl border border-gray-100 transition-transform duration-500 hover:scale-[1.01]">
              <img
                src={img1}
                alt="Global Summit"
                className="w-full h-[360px] sm:h-[450px] object-cover rounded-xl filter saturate-[0.9]"
              />
            </div>
          </div>
        </div>


        {/* ================= ROW 3: WHAT WE DO & LEADERSHIP ================= */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          {/* Column 1: Image Frame */}
          <div className="lg:col-span-6 relative flex flex-col justify-center">
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-[#4169e1]/30 pointer-events-none rounded-tl-xl" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-[#4169e1]/30 pointer-events-none rounded-br-xl" />
            <div className="overflow-hidden rounded-2xl bg-white p-4 shadow-xl border border-gray-100 transition-transform duration-500 hover:scale-[1.01] h-full">
              <img
                src={img2}
                alt="Youth Leadership"
                className="w-full h-full min-h-[360px] lg:min-h-[550px] object-cover rounded-xl filter saturate-[0.9]"
              />
            </div>
          </div>

          {/* Column 2: Text Description Blocks */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-12 text-left">
            
            {/* Block 1: What We Do */}
            <div className="space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#4169e1]">
                  Action Plan
                </span>
                <h3 
                  className="text-3xl sm:text-4xl font-normal text-gray-900 tracking-tight"
                  style={serifFont}
                >
                  What We Do
                </h3>
              </div>

              <div className="space-y-4">
                {[
                  "Organize global forum across 70 countries",
                  "Engage international thought leaders on UN SDG roadmap",
                  "Bridge collaborations for technology, education, investment and governance"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-[#4169e1] flex-shrink-0" />
                    <p className="text-base sm:text-lg text-gray-700 font-light leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Block 2: Youth & Women Leadership */}
            <div className="pt-10 border-t border-gray-200 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#4169e1]">
                  Vertical 02 / Empowerment
                </span>
                <h4 
                  className="text-2xl sm:text-3xl font-normal text-gray-900 tracking-tight"
                  style={serifFont}
                >
                  Youth & Women Leadership Programs
                </h4>
              </div>

              <p className="text-gray-700 text-lg leading-[2] font-light">
                WLC champions inclusive leadership by designing fellowships,
                mentoring programs, and internships that elevate young
                changemakers and women leaders.
              </p>

              {/* Tag Badges Container */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {[
                  "Global Internship Program",
                  "Women Changemakers Fellowship",
                  "Youth Ambassadors Network",
                  "Capacity Building Bootcamps"
                ].map((tag, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white border border-gray-200 px-4 py-3 rounded-xl shadow-xs hover:border-[#4169e1]/20 transition-all duration-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#4169e1]" />
                    <span className="text-xs sm:text-sm font-semibold text-gray-800 tracking-tight">
                      {tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>


        {/* ================= ROW 4: GLOBAL SDG ACTION SERIES ================= */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Column 1: Text Description */}
          <div className="lg:col-span-7 space-y-8 text-left order-2 lg:order-1">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#4169e1]">
                Vertical 03 / Future Focus
              </span>
              <h3 
                className="text-4xl sm:text-5xl font-normal text-gray-900 tracking-tight"
                style={serifFont}
              >
                Global SDG Action Series
              </h3>
            </div>

            <div className="space-y-6 text-gray-700 text-lg leading-[2.1] font-light">
              <p>
                This visionary initiative aligns with the United Nations
                Sustainable Development Goals (SDGs) to foster a sustainable
                and equitable world.
              </p>
              <p>
                Through international summits, policy discussions, and
                collaborative engagements, the WLC Global SDG Action Series
                unites leaders, innovators and changemakers.
              </p>
            </div>

            {/* Manifesto Quote Box */}
            <div className="relative p-8 bg-white border border-gray-200 rounded-2xl shadow-xs overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#4169e1]/5 rounded-full blur-2xl" />
              <div className="space-y-2 relative z-10">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#4169e1] block">
                  Mandate Declaration
                </span>
                <p 
                  className="text-2xl sm:text-3xl font-light text-slate-800 italic leading-relaxed"
                  style={serifFont}
                >
                  &ldquo;Together, we achieve the SDGs and transform our world.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Image Frame */}
          <div className="lg:col-span-5 order-1 lg:order-2 relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-[#4169e1]/30 pointer-events-none rounded-tl-xl" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-[#4169e1]/30 pointer-events-none rounded-br-xl" />
            <div className="overflow-hidden rounded-2xl bg-white p-6 sm:p-8 shadow-xl border border-gray-100 transition-transform duration-500 hover:scale-[1.01]">
              <img
                src={img3}
                alt="SDG Goals"
                className="w-full h-[320px] sm:h-[400px] object-contain rounded-xl"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default OurWorkWLC;