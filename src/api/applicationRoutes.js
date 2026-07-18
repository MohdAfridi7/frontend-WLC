import axiosInstance from "./axiosInstance";

// Submit Job Application (Public)
export const submitApplication = async (formData) => {
  try {
    const response = await axiosInstance.post(
      "/api/application/apply",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get All Applications (Protected)
export const getAllApplications = async () => {
  try {
    const response = await axiosInstance.get(
      "/api/application/all"
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get Application By Id (Protected)
export const getApplicationById = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/api/application/${id}`
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Delete Application (Protected)
export const deleteApplication = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/api/application/${id}`
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};