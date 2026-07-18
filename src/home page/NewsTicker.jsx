const newsItems = [
  "Saudi Oil Leadership Faces Major Global Market Stability Test After Sudden UAE Exit",
  "Saudi Oil Leadership Faces Major Global Market Stability Test After Sudden UAE Exit",
  "Saudi Oil Leadership Faces Major Global Market Stability Test After Sudden UAE Exit",
  "Saudi Oil Leadership Faces Major Global Market Stability Test After Sudden UAE Exit",
  "Saudi Oil Leadership Faces Major Global Market Stability Test After Sudden UAE Exit",
  "Saudi Oil Leadership Faces Major Global Market Stability Test After Sudden UAE Exit",
];

export default function NewsTicker() {
  return (
    <section className="w-full bg-[#f7f7f7] border-y border-gray-200 overflow-hidden">
      <div className="h-[30px] md:h-[30px] flex items-center pt-10 pb-10">

        <div className="relative flex-1 overflow-hidden ">
          <div className="ticker-track">

            {[...newsItems, ...newsItems].map((item, index) => (
              <span
                key={index}
                className="
                  inline-flex
                  items-center
                  mx-12
                  text-[#2849A4]
                  text-2xl
                  md:text-4xl
                  font-bold
                  uppercase
                  tracking-[4px]
                  whitespace-nowrap
                "
              >
                {item}
              </span>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}