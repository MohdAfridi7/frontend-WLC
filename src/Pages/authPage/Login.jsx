import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { loginAdmin } from "../../api/authRoutes";
import logo from "../../assets/logo.png";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields required");
      return;
    }

    try {
      setLoading(true);

      // ✅ API CALL
      const res = await loginAdmin({ email, password });

      // ✅ TOKEN SAVE
      if (res.token) {
        localStorage.setItem("token", res.token);
      }

      // ✅ OPTIONAL: user data save
      localStorage.setItem("user", JSON.stringify({
        email,
        role: "admin"
      }));

      toast.success(res.msg || "Login successful");

      // ✅ REDIRECT
      navigate("/Dashboard");

    } catch (err) {
      toast.error(err.msg || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 px-4">

      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl 
        p-6 md:p-8 w-full max-w-xs md:max-w-sm border border-gray-200"
      >

        {/* Logo */}
        <div className="flex items-center gap-3 mb-5">
        <img src={logo} alt="Logo" className="w-35" />
        </div>

        <h2 className="text-xl font-bold mb-1">
          Welcome back 
        </h2>

        <p className="text-gray-500 mb-5 text-sm">
          Sign in to continue your dashboard
        </p>

        <form className="space-y-4" onSubmit={handleLogin}>

          <div>
            <label className="text-xs text-gray-500">EMAIL</label>
            <input
              type="email"
              placeholder="doctor@hospital.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 
              focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800 
              transition text-sm shadow-sm"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500">PASSWORD</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 
              focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800 
              transition text-sm shadow-sm"
            />
          </div>

          <div className="flex justify-end items-center text-xs">
        

            <Link
              to="/forgot-password"
              className="text-blue-700 font-medium hover:underline"
            >
              Forgot password ?
            </Link>
          </div>

          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.02 }}
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-800 to-blue-950 
            text-white py-2 rounded-lg shadow-lg 
            hover:shadow-xl transition text-sm"
          >
            {loading ? "Signing in..." : "Sign In →"}
          </motion.button>
        </form>

       

      </motion.div>
    </div>
  );
}