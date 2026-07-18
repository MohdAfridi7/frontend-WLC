import React from "react";

const BookShowcase = () => {
  return (
    <section className="bg-[#1b1b1b] min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full px-6">

        <div className="grid lg:grid-cols-2 items-center">

          {/* Left Side Empty */}

          <div className="hidden lg:block"></div>

          {/* Right Side */}

          <div className="flex justify-center lg:justify-end">
            <img
              src="https://img1.wsimg.com/isteam/ip/b6c56996-d063-4e20-930c-1d8a40821864/1000164119.jpg/:/cr=t:5.65%25,l:0.02%25,w:99.96%25,h:89.19%25/rs=w:2560,h:3413"
              alt="World Book of Laureates"
              className="w-full max-w-[520px] object-contain"
            />
          </div>

        </div>

      </div>
    </section>
  );
};

export default BookShowcase;