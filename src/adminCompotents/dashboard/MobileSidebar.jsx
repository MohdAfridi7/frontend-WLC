import React from 'react';
import { motion } from 'framer-motion';
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
  { label: "Overview", icon: FiHome },
  { label: "Applications", icon: FiClipboard },
  { label: "Chapter Ambassadors", icon: FiUsers },
  { label: "Our Team", icon: FiUsers },
  { label: "Global Summits", icon: FiGlobe },
  { label: "Global Updates", icon: FiGlobe },
  { label: "Blogs", icon: FiBookOpen },
  { label: "Contacts Data", icon: FiMail },
  { label: "Change Email", icon: FiMail },
];

function MobileSidebar({ onMenuClick, onLogout, activeContent, closeMenu }) {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 120 }}
      className="fixed top-0 right-0 h-full w-64 
      bg-gradient-to-b from-white to-[#f7f7ff] 
      p-4 flex flex-col z-50 shadow-2xl"
    >

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <img className='h-10' src={logo} alt="" />
        <button onClick={closeMenu}>
          <FiX size={22} />
        </button>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-2">

          {menuItems.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => onMenuClick(item.label)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300
                ${
                  activeContent === item.label
                    ? "bg-gradient-to-r from-[#f5b83d] to-[#ffcf6e] text-black shadow"
                    : "text-gray-700 hover:bg-[#f5b83d]/10 hover:text-[#f5b83d]"
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
        className="flex items-center gap-3 mt-auto px-4 py-3 rounded-xl 
        bg-gradient-to-r from-[#6c4cf1] to-[#8b6cff] 
        text-white text-sm font-medium transition"
      >
        <FiLogOut size={18} />
        Logout
      </button>

    </motion.div>
  );
}

export default MobileSidebar;