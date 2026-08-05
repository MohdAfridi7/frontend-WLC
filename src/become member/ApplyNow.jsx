import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  Paperclip,
  Send,
  Loader2,
  User,
  Phone,
  Mail,
  Building2,
  Briefcase,
  Globe,
  MessageSquare,
} from "lucide-react";
import { submitApplication } from "../api/applicationRoutes";
// ^ update this import path to wherever submitApplication lives

const inputBase =
  "peer w-full bg-transparent border-0 border-b-2 border-gray-200 pt-6 pb-2 px-1 outline-none text-sm text-gray-800 placeholder-transparent focus:border-[#4F6EF7] transition-colors duration-300";

const labelBase =
  "absolute left-1 top-2 text-xs text-gray-500 transition-all duration-300 peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#4F6EF7] pointer-events-none";

// Defined outside ApplyNow so it isn't recreated (and remounted) on every keystroke
const FloatingInput = ({ id, type = "text", label, icon: Icon, required, value, onChange, disabled }) => (
  <div className="relative group">
    <div className="flex items-end gap-3">
      <Icon
        size={18}
        className="mb-3 text-gray-400 group-focus-within:text-[#4F6EF7] transition-colors duration-300"
      />
      <div className="relative flex-1">
        <input
          id={id}
          type={type}
          placeholder={label}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={inputBase}
        />
        <label htmlFor={id} className={labelBase}>
          {label} {required && <span className="text-[#4F6EF7]">*</span>}
        </label>
      </div>
    </div>
  </div>
);

const ApplyNow = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    organisation: "",
    designation: "",
    country: "",
    message: "",
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileCount, setFileCount] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

const handleFileChange = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (!allowedTypes.includes(file.type)) {
    toast.error("Only PDF, DOC and DOCX files are allowed");
    e.target.value = "";
    return;
  }

  const maxSize = 5 * 1024 * 1024; // 5MB

  if (file.size > maxSize) {
    toast.error("Resume size must be less than 5MB");
    e.target.value = "";
    return;
  }

  setResumeFile(file);
  setFileName(file.name);
  setFileCount(1);
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.email || !form.organisation || !form.country) {
      toast.error("Please fill all required fields.");
      return;
    }

    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => payload.append(key, value));
    if (resumeFile) payload.append("resume", resumeFile);

    setSubmitting(true);
    const toastId = toast.loading("Submitting your application...");
    try {
      await submitApplication(payload);
      toast.success("Application submitted successfully!", { id: toastId });
      setForm({
        name: "",
        phone: "",
        email: "",
        organisation: "",
        designation: "",
        country: "",
        message: "",
      });
      setResumeFile(null);
      setFileName("");
      setFileCount(0);
      e.target.reset();
    } catch (err) {
      toast.error(err?.message || "Failed to submit application. Please try again.", {
        id: toastId,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      <Toaster position="top-right" toastOptions={{ duration: 3500 }} />

      {/* Decorative blurred blobs */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#4F6EF7]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-5 relative z-10">
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs tracking-[0.3em] text-[#4F6EF7] font-semibold uppercase mb-3">
            Join Our Team
          </span>
          <h2 className="text-4xl md:text-5xl font-light text-gray-900">
            Apply <span className="text-[#4F6EF7] font-semibold">Now</span>
          </h2>
          <div className="w-16 h-1 bg-[#4F6EF7] mx-auto mt-5 rounded-full"></div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-blue-100/50 border border-gray-100 p-8 md:p-14">
          <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-x-14 gap-y-8">
            {/* Left Side */}
            <div className="space-y-8">
              <FloatingInput id="name" label="Name" icon={User} required value={form.name} onChange={handleChange} disabled={submitting} />
              <FloatingInput id="phone" type="tel" label="Phone" icon={Phone} required value={form.phone} onChange={handleChange} disabled={submitting} />
              <FloatingInput id="email" type="email" label="Email" icon={Mail} required value={form.email} onChange={handleChange} disabled={submitting} />
              <FloatingInput id="organisation" label="Organisation" icon={Building2} required value={form.organisation} onChange={handleChange} disabled={submitting} />
              <FloatingInput id="designation" label="Designation" icon={Briefcase} value={form.designation} onChange={handleChange} disabled={submitting} />
            </div>

            {/* Right Side */}
            <div className="space-y-8 flex flex-col">
              <FloatingInput id="country" label="Country" icon={Globe} required value={form.country} onChange={handleChange} disabled={submitting} />

              {/* Message */}
              <div className="relative group flex-1">
                <div className="flex items-start gap-3 h-full">
                  <MessageSquare
                    size={18}
                    className="mt-6 text-gray-400 group-focus-within:text-[#4F6EF7] transition-colors duration-300"
                  />
                  <div className="relative flex-1 h-full">
                    <textarea
                      id="message"
                      rows="6"
                      placeholder="Message"
                      value={form.message}
                      onChange={handleChange}
                      disabled={submitting}
                      className={`${inputBase} resize-none`}
                    ></textarea>
                    <label htmlFor="message" className={labelBase}>
                      Message
                    </label>
                  </div>
                </div>
              </div>

              {/* Upload */}
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-5 hover:border-[#4F6EF7] hover:bg-blue-50/40 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <label className="flex items-center gap-2 text-[#4F6EF7] cursor-pointer text-sm font-medium">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Paperclip size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span>Attach Resume</span>
                      <span className="text-xs text-gray-500 font-normal">
                        {fileName ? fileName : "PDF, DOC, DOCX up to 5MB"}
                      </span>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      disabled={submitting}
                    />
                  </label>

                  <p className="text-gray-500 text-xs bg-gray-100 px-3 py-1.5 rounded-full whitespace-nowrap">
                    Attachments ({fileCount})
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="lg:col-span-2 mt-4 pt-8 border-t border-gray-100">
              {/* Captcha */}
          

              {/* Button */}
              <div className="flex justify-center mt-8">
                <button
                  type="submit"
                  disabled={submitting}
                  className="group relative bg-[#4F6EF7] hover:bg-blue-700 text-white px-12 md:px-14 py-4 text-sm tracking-[0.25em] transition-all duration-300 shadow-lg shadow-blue-300/50 hover:shadow-xl hover:shadow-blue-400/60 hover:-translate-y-0.5 flex items-center gap-3 disabled:opacity-60 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      SUBMITTING
                      <Loader2 size={16} className="animate-spin" />
                    </>
                  ) : (
                    <>
                      SUBMIT APPLICATION
                      <Send
                        size={16}
                        className="group-hover:translate-x-1 transition-transform duration-300"
                      />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ApplyNow;