import axiosInstance from "./axiosInstance";

export const getDashboardOverview = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.get(
      "/api/dashboard/overview",
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