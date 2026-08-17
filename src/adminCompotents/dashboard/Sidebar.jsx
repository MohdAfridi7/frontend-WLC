import React from 'react';
import {
  FiHome,
  FiClipboard,
  FiUsers,
  FiGlobe,
  FiBookOpen,
  FiMail,
  FiLogOut,
} from "react-icons/fi";
import logo from "../../assets/logo.png";

const menuItems = [
  { label: "Applications", icon: FiClipboard },
  { label: "Chapter Ambassadors", icon: FiUsers },
  { label: "Our Team", icon: FiUsers },
    { label: "Advisory Chapter Ambassadors", icon: FiUsers },
  { label: "Advisory Our Team", icon: FiUsers },
  { label: "Global Summits", icon: FiGlobe },
  { label: "Global Updates", icon: FiGlobe },
  { label: "GFETSC", icon: FiGlobe },
  { label: "Advisory Blogs", icon: FiBookOpen },
  { label: "Blogs", icon: FiBookOpen },
  { label: "Contacts Data", icon: FiMail },
  { label: "Change Email", icon: FiMail },
];

function Sidebar({ onMenuClick, onLogout, activeContent }) {
  return (
    <div className="fixed top-0 left-0 h-full w-64 
      bg-gradient-to-b from-white to-[#f7f7ff] 
      text-gray-800 p-4 flex flex-col 
      border-r border-gray-100 shadow-xl">

      {/* Logo */}
      <div className="mb-6 flex justify-center">
        <img className='h-12' src={logo} alt="" />
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-2">

          {menuItems.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => onMenuClick(item.label)}
                className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300
                ${
                  activeContent === item.label
                    ? "bg-gradient-to-r from-[#f5b83d] to-[#ffcf6e] text-black shadow-md"
                    : "hover:bg-[#f5b83d]/10 hover:text-[#f5b83d]"
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Logout */}
      <button
        onClick={onLogout}
        className="flex items-center gap-3 mt-6 px-4 py-3 rounded-xl 
        bg-gradient-to-r from-[#6c4cf1] to-[#8b6cff] 
        text-white text-sm font-medium hover:scale-[1.02] transition"
      >
        <FiLogOut size={18} />
        Logout
      </button>

    </div>
  );
}

export default Sidebar;