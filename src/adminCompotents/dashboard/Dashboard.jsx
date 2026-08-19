import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import Sidebar from './Sidebar';
import MobileSidebar from './MobileSidebar';
import { AnimatePresence } from 'framer-motion';
import { FiMenu } from 'react-icons/fi';
import WLCAdminBlogs from './dashboardSection/WLCblogTab/AdminBlogs';
import AdminBlogs from './dashboardSection/blogTab/AdminBlogs';
import ViewContact from './dashboardSection/contactTab/ViewContact';  
import Applications from './ApplicationsPage';
import ChapterAmbassadors from './Chapterambassadorpage';
import OurTeam from './TeamPages';
import WLCChapterAmbassadors from './WLCChapterambassadorpage';
import WLCOurTeam from './WLCTeamPages';
import GlobalUpdates from './GlobalUpdates';
import GlobalSummits from './Summitpage';
import ChangeEmail from './dashboardSection/changeEmailTab/ChnageEmail';
import GfetscPage from './GfetscPage';
// ^ update this import path to wherever GfetscPage.jsx lives

function Dashboard() {
const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

if (!token || !user || user.role !== "admin") {
  return <Navigate to="/login" replace />;
}

const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeContent, setActiveContent] = useState(() => {
    // Retrieve active content from sessionStorage or default to 'Home'
    return sessionStorage.getItem('activeContent') || 'Overview';
  });

  useEffect(() => {
    // Save active content to sessionStorage whenever it changes
    sessionStorage.setItem('activeContent', activeContent);
  }, [activeContent]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  sessionStorage.clear();

  setIsMobileMenuOpen(false);

  navigate("/", { replace: true });
};

  const handleMenuClick = (label) => {
    setActiveContent(label);
    setIsMobileMenuOpen(false); // Close mobile menu on click
  };

  // Render content based on activeContent
  const renderContent = () => {
    switch (activeContent) {
      case 'Applications':
        return <Applications onNavigate={handleMenuClick} />;
        case 'Chapter Ambassadors':
        return <ChapterAmbassadors/>;
          case 'Our Team':
        return <OurTeam/>;
      case 'Advisory Chapter Ambassadors':
        return <WLCChapterAmbassadors/>;
          case 'Advisory Our Team':
        return <WLCOurTeam/>;
         case 'Global Summits':
        return <GlobalSummits/>;
           case 'Global Updates':
        return <GlobalUpdates/>;
        case 'GFETSC':
        return <GfetscPage/>;
         case 'Advisory Blogs':
        return <WLCAdminBlogs/>;
        case 'Blogs':
        return <AdminBlogs/>;
      case 'Contacts Data':
        return <ViewContact/>;
        case 'Change Email':
        return <ChangeEmail/>;
      default:
        return <Applications onNavigate={handleMenuClick} />; // Fallback to Home
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 flex-shrink-0">
        <Sidebar
          onMenuClick={handleMenuClick}
          onLogout={handleLogout}
          activeContent={activeContent}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">{renderContent()}</div>

      {/* Mobile Hamburger */}
      {!isMobileMenuOpen &&
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          onClick={toggleMobileMenu}
          className="p-2 bg-[#fd0225] text-white rounded-md shadow-lg hover:bg-[#fd0225]/90 transition"
        >
          <FiMenu size={24} />
        </button>
      </div>
}
      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileSidebar
            onMenuClick={handleMenuClick}
            onLogout={handleLogout}
            activeContent={activeContent}
            closeMenu={toggleMobileMenu}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Dashboard;