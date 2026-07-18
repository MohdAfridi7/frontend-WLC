import { X } from "lucide-react";

export default function SlideContactForm({ open, setOpen }) {
  return (
    <div
      className={`absolute inset-0 z-50 bg-white transition-all duration-700 ease-in-out transform ${
        open
          ? "translate-x-0 opacity-100"
          : "-translate-x-full opacity-0 pointer-events-none"
      }`}
    >
      {/* Close Button */}

      <button
        onClick={() => setOpen(false)}
        className="absolute top-5 right-5 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
      >
        <X size={22} />
      </button>

      <div className="h-full overflow-y-auto">

        <div className="max-w-5xl mx-auto px-6 lg:px-12 py-8">

          <h2 className="text-center text-3xl lg:text-4xl font-semibold text-gray-900">
            Your Voice Matters
          </h2>

          <p className="text-center text-gray-500 mt-2 mb-8">
            We'd love to hear from you.
          </p>

          <form className="grid lg:grid-cols-2 gap-6">

            {/* Left */}

            <div className="space-y-5">

              <input
                type="text"
                placeholder="Full Name"
                className="w-full h-12 px-4 rounded bg-gray-100 border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full h-12 px-4 rounded bg-gray-100 border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none"
              />

              <input
                type="text"
                placeholder="Phone Number"
                className="w-full h-12 px-4 rounded bg-gray-100 border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none"
              />

              <input
                type="text"
                placeholder="Country"
                className="w-full h-12 px-4 rounded bg-gray-100 border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none"
              />

              <input
                type="text"
                placeholder="Organization"
                className="w-full h-12 px-4 rounded bg-gray-100 border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none"
              />

            </div>

            {/* Right */}

            <div>

              <textarea
                rows="10"
                placeholder="Write your message..."
                className="w-full h-full min-h-[280px] p-4 rounded bg-gray-100 border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none resize-none"
              ></textarea>

            </div>

          </form>

          {/* Footer */}

          <div className="mt-8">

            <p className="text-center text-sm text-gray-500 leading-6">
              This site is protected by reCAPTCHA and the Google
              <span className="text-blue-600 cursor-pointer">
                {" "}Privacy Policy{" "}
              </span>
              and
              <span className="text-blue-600 cursor-pointer">
                {" "}Terms of Service
              </span>
              apply.
            </p>

            <div className="flex justify-center mt-8">

              <button
                type="submit"
                className="bg-[#4567E6] hover:bg-blue-700 text-white px-10 py-3 rounded uppercase tracking-[2px] transition duration-300 hover:scale-105"
              >
                Send Message
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}