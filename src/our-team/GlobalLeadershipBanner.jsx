import React from "react";

const GlobalLeadershipBanner = () => {
  return (
    <section
      className="relative w-full h-[180px] sm:h-[220px] md:h-[280px] lg:h-[340px] overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2070&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/45"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <h1 className="text-white text-center uppercase font-bold tracking-wider leading-tight
                       text-2xl sm:text-4xl md:text-5xl lg:text-6xl">
          WLC- Global Leadership
        </h1>
      </div>
    </section>
  );
};

export default GlobalLeadershipBanner;