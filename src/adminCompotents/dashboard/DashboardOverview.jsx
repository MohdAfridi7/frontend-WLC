import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Mail,
  Search,
  ArrowRight,
  User,
  Calendar,
  MessageSquare,
  RotateCw,
  Inbox,
  FileX,
} from "lucide-react";
import { getDashboardOverview } from "../../api/dashboardRoutes";

// ============ COUNT-UP HOOK ============
function useCountUp(end, duration = 900, start = false) {
  const [count, setCount] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!start) return;
    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // ease-out cubic for a satisfying deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) frameRef.current = requestAnimationFrame(step);
    };

    frameRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameRef.current);
  }, [end, duration, start]);

  return count;
}

const AnimatedNumber = ({ value, start }) => {
  const count = useCountUp(value, 900, start);
  return <>{count.toLocaleString()}</>;
};

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

// ============ MOTION VARIANTS ============
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function DashboardOverview({ onNavigate }) {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async (isRefresh = false) => {
    try {
      isRefresh ? setRefreshing(true) : setLoading(true);
      const res = await getDashboardOverview();
      setDashboardData(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const stats = [
    {
      label: "Total Blogs",
      value: dashboardData?.stats?.totalBlogs || 0,
      icon: FileText,
      target: "Blogs",
      color: "from-blue-500 to-blue-600",
      bg: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      label: "Total Contacts",
      value: dashboardData?.stats?.totalContacts || 0,
      icon: Mail,
      target: "Contacts Data",
      color: "from-emerald-500 to-emerald-600",
      bg: "bg-emerald-50",
      text: "text-emerald-600",
    },
    {
      label: "SEO Pages",
      value: dashboardData?.stats?.totalSeoPages || 0,
      icon: Search,
      target: "Seo Manage",
      color: "from-violet-500 to-violet-600",
      bg: "bg-violet-50",
      text: "text-violet-600",
    },
  ];

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  // ============ LOADING SKELETON ============
  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="h-4 w-32 bg-gray-100 rounded mb-2 animate-pulse" />
        <div className="h-8 w-48 bg-gray-100 rounded mb-8 animate-pulse" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-8">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl border border-gray-100 animate-pulse"
            >
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-gray-100" />
                <div className="w-7 h-7 rounded-full bg-gray-100" />
              </div>
              <div className="h-3 w-20 bg-gray-100 rounded mt-5" />
              <div className="h-8 w-16 bg-gray-100 rounded mt-2" />
              <div className="h-[3px] w-full bg-gray-100 rounded-full mt-5" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100">
              <div className="h-5 w-32 bg-gray-100 rounded mb-5 animate-pulse" />
              {[...Array(3)].map((_, j) => (
                <div key={j} className="flex items-center gap-3 py-3 animate-pulse">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3.5 w-2/3 bg-gray-100 rounded" />
                    <div className="h-3 w-1/2 bg-gray-100 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* HEADER */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-sm text-gray-400 mb-1">{getGreeting()} · {today}</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Dashboard
          </h1>
        </div>

        <button
          onClick={() => fetchDashboard(true)}
          disabled={refreshing}
          className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-800 bg-white border border-gray-200 hover:border-gray-300 rounded-lg px-3 py-2 transition-colors disabled:opacity-50 flex-shrink-0"
        >
          <RotateCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>

      {/* STATS CARDS */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-8"
      >
        {stats.map(({ label, value, icon: Icon, target, color, bg, text }) => (
          <motion.button
            key={label}
            variants={cardVariants}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate(target)}
            className="group relative text-left overflow-hidden bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:border-transparent transition-shadow duration-300"
          >
            {/* Decorative glow orb, appears on hover */}
            <div
              className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${color} opacity-0 group-hover:opacity-[0.07] blur-2xl transition-opacity duration-500`}
            />

            {/* Top row: icon + arrow */}
            <div className="relative flex items-center justify-between">
              <div
                className={`relative p-3 rounded-xl ${bg} ring-1 ring-inset ring-black/[0.03] group-hover:scale-105 transition-transform duration-300`}
              >
                <Icon className={`w-5 h-5 ${text}`} strokeWidth={2.25} />
              </div>

              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-50 group-hover:bg-gray-100 transition-colors">
                <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-0.5 transition-all duration-300" />
              </div>
            </div>

            {/* Label + animated value */}
            <div className="relative mt-5">
              <h3 className="text-[13px] font-medium text-gray-400 uppercase tracking-wide">
                {label}
              </h3>
              <p className="text-3xl sm:text-[2.25rem] font-bold text-gray-900 mt-1.5 tracking-tight tabular-nums">
                <AnimatedNumber value={value} start={!loading} />
              </p>
            </div>

            {/* Bottom accent line, animates wider on hover */}
            <div className="relative mt-5 h-[3px] w-full bg-gray-50 rounded-full overflow-hidden">
              <div
                className={`h-full w-10 group-hover:w-full bg-gradient-to-r ${color} rounded-full transition-all duration-500 ease-out`}
              />
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* RECENT DATA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">

        {/* Recent Blogs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.15 }}
          className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Recent Blogs
            </h2>
            <button
              onClick={() => onNavigate("Blogs")}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
            >
              See more
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {dashboardData?.recentBlogs?.length ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="divide-y divide-gray-100"
            >
              {dashboardData.recentBlogs.map((blog) => (
                <motion.button
                  key={blog._id}
                  variants={cardVariants}
                  onClick={() => onNavigate("Blogs")}
                  className="w-full text-left py-3 flex items-center gap-3 hover:bg-gray-50 -mx-2 px-2 rounded-lg transition-colors"
                >
                  <img
                    src={blog.image?.url}
                    alt={blog.title}
                    className="w-12 h-12 rounded-lg object-cover flex-shrink-0 bg-gray-100"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-medium text-gray-800 truncate">
                      {blog.title}
                    </h4>

                    <div className="flex items-center justify-between gap-3 mt-1">
                      <p className="text-sm text-gray-500 truncate flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                        {blog.author}
                      </p>
                      <p className="text-sm text-gray-500 whitespace-nowrap flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                        {blog.date
                          ? new Date(blog.date).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 gap-2 text-center">
              <FileX className="w-8 h-8 text-gray-300" />
              <p className="text-sm text-gray-400">No blogs yet</p>
            </div>
          )}
        </motion.div>

        {/* Recent Contacts */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.22 }}
          className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Recent Contacts
            </h2>
            <button
              onClick={() => onNavigate("Contacts Data")}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
            >
              See more
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {dashboardData?.recentContacts?.length ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="divide-y divide-gray-100"
            >
              {dashboardData.recentContacts.map((contact) => (
                <motion.button
                  key={contact._id}
                  variants={cardVariants}
                  onClick={() => onNavigate("Contacts Data")}
                  className="w-full text-left py-3 block hover:bg-gray-50 -mx-2 px-2 rounded-lg transition-colors"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="font-medium text-gray-800 truncate flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                      {contact.fullName}
                    </h4>
                    <p className="text-sm text-gray-500 whitespace-nowrap flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                      {contact.createdAt
                        ? new Date(contact.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "N/A"}
                    </p>
                  </div>

                  <p className="text-sm text-gray-500 truncate flex items-center gap-1.5 mt-1.5">
                    <Mail className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    {contact.email}
                  </p>

                  <p className="text-sm text-gray-400 truncate flex items-center gap-1.5 mt-1">
                    <MessageSquare className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    {contact.message?.slice(0, 50)}
                    {contact.message?.length > 50 ? "..." : ""}
                  </p>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 gap-2 text-center">
              <Inbox className="w-8 h-8 text-gray-300" />
              <p className="text-sm text-gray-400">No contacts yet</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}