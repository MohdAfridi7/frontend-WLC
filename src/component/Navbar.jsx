
import { NavLink, Link } from "react-router-dom";
import { ChevronDown, Menu, X, ArrowUpRight, Globe, Mail } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import logo from "../../public/WLC Logo/Main.png";

const leftLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
];

const rightLinks = [
  { name: "Our Work", path: "/our-work" },
];

const moreItems = [
  { name: "Join The Consortium", path: "/join-consortium" },
  { name: "News & Media", path: "/news-media" },
    { name: "WLC Global Blogs", path: "/wlc-blogs" },
  { name: "Become A Member", path: "/become-member" },
  { name: "Our Team", path: "/our-team" },
  { name: "Permanent-Members", path: "/permanent-members" },
 { name: "Advisory Council", path: "/advisory-council" },

  { name: "Global Updates", path: "/global-updates" },
  { name: "Global Dialogue", path: "/global-dialogue" },
  { name: "Global Councils", path: "/global-councils" },
  { name: "WLC GIP", path: "/wlc-gip" },
  { name: "World Book Of Laureates", path: "/world-book-laureates" },
  { name: "FAQs", path: "/faqs" },
  { name: "Contact Us", path: "/contact-us" },
  
  { name: "W50 Global Summit", path: "/w50-global-summit" },
];

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDropdownOpen(true);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setDropdownOpen(false), 250);
  };

  const linkBase =
    "relative uppercase tracking-[2.5px] text-[13px] font-medium transition-colors duration-300";

  return (
    <>
      <style>{`
        @keyframes underline {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .nav-underline::after {
          content: "";
          position: absolute;
          left: 0; right: 0; bottom: -8px;
          height: 2px;
          background: linear-gradient(90deg, #2849A4, #6C8BFF);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform .35s ease;
        }
        .nav-underline:hover::after { transform: scaleX(1); }
        .nav-underline.active::after { transform: scaleX(1); }

        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .mega-item { animation: fadeSlide .4s ease both; }

        @keyframes drawerLink {
          from { opacity: 0; transform: translateX(-20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .drawer-link { animation: drawerLink .5s ease both; }

        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #2849A4; border-radius: 4px;
        }
      `}</style>

      

      {/* =============== MAIN HEADER =============== */}
      <header
        className={`sticky top-0 z-50 border-t-4 border-[#4D67C7] transition-all duration-500 ${
          scrolled
            ? "bg-white/85 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
            : "bg-white"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-5 lg:px-10">
          <div className="flex items-center justify-between h-[90px] lg:h-[110px]">

            {/* Left Nav */}
            <nav className="hidden lg:flex items-center gap-10 flex-1">
              {leftLinks.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `${linkBase} nav-underline ${
                      isActive ? "text-[#2849A4] active" : "text-neutral-900 hover:text-[#2849A4]"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
              {rightLinks.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `${linkBase} nav-underline ${
                      isActive ? "text-[#2849A4] active" : "text-neutral-900 hover:text-[#2849A4]"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>

            {/* Center Logo */}
            <NavLink to="/" className="lg:flex-shrink-0 lg:mx-12">
              <img
                src={logo}
                alt="logo"
                className="w-[90px] lg:w-[130px] transition-transform duration-500 hover:scale-105"
              />
            </NavLink>

            {/* Right Nav + CTA */}
            <nav className="hidden lg:flex items-center justify-end gap-10 flex-1">
              {/* Mega Dropdown */}
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`flex items-center gap-2 ${linkBase} ${
                    dropdownOpen ? "text-[#2849A4]" : "text-neutral-900 hover:text-[#2849A4]"
                  }`}
                >
                  More
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Mega Menu */}
                <div
                  className={`absolute right-0 top-full pt-4 z-50 transition-all duration-300 ${
                    dropdownOpen
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible translate-y-3"
                  }`}
                >
                  <div className="flex w-[760px] overflow-hidden border border-neutral-200 bg-white shadow-[0_30px_80px_rgba(13,27,66,0.18)]">
                    {/* Left accent panel */}
                    <div className="w-[230px] bg-[#0D1B42] p-7 text-white flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.35em] text-[#6C8BFF]">
                          Explore
                        </span>
                        <h4
                          className="mt-4 text-2xl leading-tight"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          Discover every chapter of the Global Forum.
                        </h4>
                      </div>
                      <Link
                        to="/become-member"
                        className="group mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-white"
                      >
                        Become A Member
                        <ArrowUpRight
                          size={14}
                          className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                      </Link>
                    </div>

                    {/* Right grid */}
                    <div className="grid flex-1 grid-cols-2 max-h-[440px] overflow-y-auto custom-scrollbar">
                      {moreItems.map((item, i) => (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          onClick={() => setDropdownOpen(false)}
                          style={{ animationDelay: `${i * 30}ms` }}
                          className={({ isActive }) =>
                            `mega-item group flex items-start gap-3 border-b border-neutral-100 px-5 py-4 transition-all ${
                              isActive
                                ? "bg-blue-50/60 text-[#2849A4]"
                                : "text-[#0D1B42] hover:bg-neutral-50 hover:text-[#2849A4]"
                            }`
                          }
                        >
                          <span className="text-[10px] font-medium text-neutral-400 group-hover:text-[#2849A4]">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="text-[13px] uppercase tracking-[1.5px] leading-snug">
                            {item.name}
                          </span>
                          <ArrowUpRight
                            size={14}
                            className="ml-auto opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <Link
                to="/become-member"
                className="group inline-flex items-center gap-2 bg-[#0D1B42] px-6 py-3 text-[11px] font-medium uppercase tracking-[0.3em] text-white transition-all hover:bg-[#2849A4]"
              >
                Join Now
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden flex items-center justify-center h-11 w-11 border border-neutral-300 hover:bg-[#0D1B42] hover:text-white transition-colors"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* =============== MOBILE OVERLAY =============== */}
      <div
        className={`fixed inset-0 bg-black/70 z-[998] transition-all duration-300 ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* =============== MOBILE DRAWER =============== */}
      <aside
        className={`fixed top-0 right-0 h-screen w-[88%] max-w-[440px] z-[999] transition-transform duration-500 overflow-y-auto custom-scrollbar
          bg-gradient-to-br from-[#0D1B42] via-[#10204D] to-[#0D1B42] text-white
          ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-7 pt-7 pb-5 border-b border-white/10">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#6C8BFF]">
            Menu
          </span>
          <button
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center h-10 w-10 border border-white/15 hover:bg-white/10 transition"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Primary Links */}
        <div className="px-7 pt-6">
          {[...leftLinks, ...rightLinks].map((item, i) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              onClick={() => setMobileOpen(false)}
              style={{ animationDelay: `${i * 60}ms` }}
              className={({ isActive }) =>
                `drawer-link flex items-center justify-between py-5 border-b border-white/10 text-[20px] font-medium transition-all
                ${isActive ? "text-[#B6C1FF]" : "text-white hover:text-[#B6C1FF]"}`
              }
            >
              <span style={{ fontFamily: "'Playfair Display', serif" }}>
                {item.name}
              </span>
              <ArrowUpRight size={18} className="opacity-60" />
            </NavLink>
          ))}
        </div>

        {/* Secondary (More) Section */}
        <div className="px-7 pt-8">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#6C8BFF]">
            Explore More
          </span>
          <div className="mt-4">
            {moreItems.map((item, i) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                style={{ animationDelay: `${(i + 3) * 50}ms` }}
                className={({ isActive }) =>
                  `drawer-link flex items-center justify-between py-4 border-b border-white/10 text-[15px] uppercase tracking-[2px] transition-all
                  ${isActive ? "text-[#B6C1FF]" : "text-white/90 hover:text-[#B6C1FF]"}`
                }
              >
                <span className="flex items-center gap-3">
                  <span className="text-[10px] text-white/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.name}
                </span>
                <ArrowUpRight size={14} className="opacity-50" />
              </NavLink>
            ))}
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="px-7 pt-10 pb-12">
          <Link
            to="/become-member"
            onClick={() => setMobileOpen(false)}
            className="group flex items-center justify-between bg-white px-6 py-4 text-[11px] uppercase tracking-[0.3em] text-[#0D1B42] hover:bg-[#B6C1FF] transition"
          >
            Become A Member
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>

          <div className="mt-8 flex items-center gap-5 text-[11px] uppercase tracking-[0.3em] text-white/60">
            <a href="#" className="hover:text-white transition">Linkedin</a>
            <span className="h-3 w-px bg-white/20" />
            <a href="#" className="hover:text-white transition">Twitter</a>
            <span className="h-3 w-px bg-white/20" />
            <a href="#" className="hover:text-white transition">Instagram</a>
          </div>

          <p className="mt-8 text-[10px] uppercase tracking-[0.3em] text-white/40">
            © 2026 · Global Forum
          </p>
        </div>
      </aside>
    </>
  );
}