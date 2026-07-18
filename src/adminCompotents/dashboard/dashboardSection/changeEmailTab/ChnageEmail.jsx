import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import {
  Mail,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { changeEmail, verifyEmail } from "../../../../api/authRoutes";

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

const ChangeEmail = () => {
  const [step, setStep] = useState(1); // 1: email, 2: otp, 3: success
  const [newEmail, setNewEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const inputStyle =
    "w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800 transition text-sm shadow-sm";

  // 📧 SEND OTP
  const handleSendOtp = async (e) => {
    e?.preventDefault();

    const trimmedEmail = newEmail.trim();

    if (!trimmedEmail) {
      toast.error("Email required");
      return;
    }
    if (!isValidEmail(trimmedEmail)) {
      toast.error("Enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      await changeEmail({ newEmail: trimmedEmail });

      toast.success("OTP sent");
      setStep(2);
      setOtp(["", "", "", "", "", ""]);
      setTimer(30);
      setCanResend(false);
    } catch (err) {
      toast.error(err.msg || err.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  // ⏳ TIMER
  useEffect(() => {
    let interval;

    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    if (timer === 0) setCanResend(true);

    return () => clearInterval(interval);
  }, [step, timer]);

  // 🎯 AUTO-FOCUS FIRST OTP BOX
  useEffect(() => {
    if (step === 2) {
      const t = setTimeout(() => document.getElementById("otp-0")?.focus(), 150);
      return () => clearTimeout(t);
    }
  }, [step]);

  // 🔢 OTP INPUT CHANGE
  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  // 📋 OTP PASTE SUPPORT
  const handleOtpPaste = (e, index) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6 - index);
    if (!pasted) return;

    const newOtp = [...otp];
    pasted.split("").forEach((char, i) => {
      if (index + i < 6) newOtp[index + i] = char;
    });
    setOtp(newOtp);

    const nextIndex = Math.min(index + pasted.length, 5);
    document.getElementById(`otp-${nextIndex}`)?.focus();
  };

  // 🔙 BACKSPACE FIX
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];

      if (otp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        newOtp[index - 1] = "";
        setOtp(newOtp);
        document.getElementById(`otp-${index - 1}`)?.focus();
      }
    }
  };

  // 🔐 VERIFY OTP
  const handleVerify = async (e) => {
    e?.preventDefault();

    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      toast.error("Enter valid OTP");
      return;
    }

    try {
      setLoading(true);
      await verifyEmail({ otp: enteredOtp });

      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        user.email = newEmail;
        localStorage.setItem("user", JSON.stringify(user));
      }

      setStep(3);
    } catch (err) {
      toast.error(err.msg || err.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleDone = () => {
    setStep(1);
    setNewEmail("");
    setOtp(["", "", "", "", "", ""]);
  };

  const handleBack = () => {
    setStep(1);
    setOtp(["", "", "", "", "", ""]);
  };

  const stepAnimation = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
    transition: { duration: 0.35 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 px-4">
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl p-6 md:p-8 w-full max-w-xs md:max-w-sm border border-gray-200"
      >
        {/* PROGRESS DOTS */}
        {step !== 3 && (
          <div className="flex items-center justify-center gap-1.5 mb-5">
            <div
              className={`h-1.5 rounded-full transition-all duration-300 ${
                step >= 1 ? "w-6 bg-blue-800" : "w-1.5 bg-gray-200"
              }`}
            />
            <div
              className={`h-1.5 rounded-full transition-all duration-300 ${
                step >= 2 ? "w-6 bg-blue-800" : "w-1.5 bg-gray-200"
              }`}
            />
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* STEP 1 */}
          {step === 1 && (
            <motion.form key="step1" {...stepAnimation} onSubmit={handleSendOtp} className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Mail size={16} className="text-blue-700" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Change Email</h2>
              </div>

              <div>
                <label className="text-xs text-gray-500 font-medium">NEW EMAIL</label>
                <input
                  type="email"
                  value={newEmail}
                  placeholder="Enter new email"
                  onChange={(e) => setNewEmail(e.target.value)}
                  autoFocus
                  className={inputStyle}
                />
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.01 }}
                whileTap={{ scale: loading ? 1 : 0.97 }}
                className="w-full bg-gradient-to-r from-blue-800 to-blue-950 text-white py-2.5 rounded-lg shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 text-sm font-medium"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    Send OTP <ArrowRight size={15} />
                  </>
                )}
              </motion.button>
            </motion.form>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <motion.form key="step2" {...stepAnimation} onSubmit={handleVerify} className="space-y-5">
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <ShieldCheck size={18} className="text-blue-700" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Verify OTP</h2>
              </div>

              <p className="text-center text-sm text-gray-500">
                OTP sent to <span className="font-semibold text-gray-700">{newEmail}</span>
              </p>

              {/* OTP BOXES */}
              <div className="flex justify-center gap-2 sm:gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={(e) => handleOtpPaste(e, index)}
                    className="w-10 h-10 sm:w-12 sm:h-12 text-center border border-gray-300 rounded-xl text-base sm:text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-800 transition-shadow"
                  />
                ))}
              </div>

              {/* 🔁 RESEND */}
              <div className="text-center text-sm mt-4">
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={loading}
                    className="text-blue-700 font-semibold hover:text-blue-900 disabled:opacity-50 transition-colors"
                  >
                    Resend OTP
                  </button>
                ) : (
                  <span className="text-gray-500">
                    Resend in <span className="text-blue-700 font-semibold tabular-nums">{timer}s</span>
                  </span>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={loading}
                  className="w-1/2 border py-2.5 rounded-lg text-sm hover:bg-gray-100 disabled:opacity-50 transition-colors flex items-center justify-center gap-1.5"
                >
                  <ArrowLeft size={14} /> Back
                </button>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.01 }}
                  whileTap={{ scale: loading ? 1 : 0.97 }}
                  className="w-1/2 bg-gradient-to-r from-blue-800 to-blue-950 text-white py-2.5 rounded-lg shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 text-sm font-medium"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : "Verify"}
                </motion.button>
              </div>
            </motion.form>
          )}

          {/* STEP 3 — SUCCESS */}
          {step === 3 && (
            <motion.div key="step3" {...stepAnimation} className="text-center space-y-4 py-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto"
              >
                <CheckCircle2 size={32} className="text-emerald-600" />
              </motion.div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">Email Updated</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Your account email is now{" "}
                  <span className="font-semibold text-gray-700">{newEmail}</span>
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleDone}
                className="w-full bg-gradient-to-r from-blue-800 to-blue-950 text-white py-2.5 rounded-lg shadow-lg text-sm font-medium"
              >
                Done
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ChangeEmail;