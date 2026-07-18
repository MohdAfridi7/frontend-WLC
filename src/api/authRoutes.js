import axiosInstance from "./axiosInstance";


// 🔐 LOGIN
export const loginAdmin = async (data) => {
  try {
    const response = await axiosInstance.post("/api/admin/login", data);

    // ✅ token save (important)
    localStorage.setItem("token", response.data.token);

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};


// 📩 FORGOT PASSWORD → SEND OTP
export const sendOtp = async (data) => {
  try {
    const response = await axiosInstance.post("/api/admin/forgot-password", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};


// 🔐 VERIFY OTP
export const verifyOtp = async (data) => {
  try {
    const response = await axiosInstance.post("/api/admin/verify-otp", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};


// 🔄 RESET PASSWORD
export const resetPassword = async (data) => {
  try {
    const response = await axiosInstance.post("/api/admin/reset-password", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};


// 📧 CHANGE EMAIL (Protected)
export const changeEmail = async (data) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.post(
      "/api/admin/change-email",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};


// ✅ VERIFY EMAIL CHANGE (Protected)
export const verifyEmail = async (data) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.post(
      "/api/admin/verify-email",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};