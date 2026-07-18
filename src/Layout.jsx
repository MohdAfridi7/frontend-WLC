import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import TopAnnouncementBar from "./component/TopAnnouncementBar";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";

const Layout = () => {
  const location = useLocation();

  const hideLayoutRoutes = [
    "/login",
    "/forgot-password",
    "/dashboard",
    "/admin-dashboard",
    "/Dashboard"
  ];

  const hideLayout = hideLayoutRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <>
     {!hideLayout && <TopAnnouncementBar  />}
      {!hideLayout && <Navbar />}

      <main className="mx-auto min-h-[calc(100vh-170px)]">
        <Outlet />
      </main>

      {!hideLayout && <Footer />}
    </>
  );
};

export default Layout;