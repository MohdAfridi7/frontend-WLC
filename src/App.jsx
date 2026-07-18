import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./Layout";

import ScrollToTop from "./component/ScrollToTop";
import Home from "./Pages/Home";
import OurWork from "./Pages/OurWork";
import JoinConsortium from "./Pages/JoinConsortium";
import NewsMedia from "./Pages/NewsMedia";
import BecomeMember from "./Pages/BecomeMember";
import OurTeam from "./Pages/OurTeam";
import GlobalUpdates from "./Pages/GlobalUpdates";
import GlobalDialogue from "./Pages/GlobalDialogue";
import GlobalCouncils from "./Pages/GlobalCouncils";
import WLCGIP from "./Pages/WLCGIP";
import WorldBook from "./Pages/WorldBook";
import Faqs from "./Pages/Faqs";
import Contact from "./Pages/Contact";
import W50Summit from "./Pages/W50Summit";
import AboutUs from "./Pages/AboutUs";


import Login from "./Pages/authPage/Login";
import ForgotPassword from "./Pages/authPage/ForgotPassword";
import Dashboard from "./adminCompotents/dashboard/Dashboard";


function App() {
  return (
    <>
      <ScrollToTop />
<ToastContainer position="top-right" autoClose={3000} />

      <Routes>
         <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/our-work" element={<OurWork/>} />
        <Route path="/join-consortium" element={<JoinConsortium/>} />
        <Route path="/news-media" element={<NewsMedia/>} />
        <Route path="/become-member" element={<BecomeMember/>} />
        <Route path="/our-team" element={<OurTeam/>} />
        <Route path="/global-updates" element={<GlobalUpdates/>} />
        <Route path="/global-dialogue" element={<GlobalDialogue/>} />
        <Route path="/global-councils" element={<GlobalCouncils/>} />
        <Route path="/wlc-gip" element={<WLCGIP/>} />
        <Route path="/world-book-laureates" element={<WorldBook/>} />
        <Route path="/faqs" element={<Faqs/>} />
        <Route path="/contact-us" element={<Contact/>} />
        <Route path="/w50-global-summit" element={<W50Summit/>} />

        <Route path="/login" element={<Login />} />
{/* <Route path="/verify-otp" element={<VerifyOtp />} /> */}
<Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Route>
      </Routes>

    </>
  );
}

export default App;