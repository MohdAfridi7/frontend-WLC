import React from "react";
import img from '../../public/image/ha17.webp'

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
              src={img}
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