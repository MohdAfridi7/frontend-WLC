import axiosInstance from "./axiosInstance";

// Create Summit
export const createSummit = async (formData) => {
  try {
    const response = await axiosInstance.post(
      "/api/summits",
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

// Get All Summits
export const getAllSummits = async () => {
  try {
    const response = await axiosInstance.get("/api/summits");
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get Summit By Id
export const getSummitById = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/api/summits/${id}`
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Update Summit
export const updateSummit = async (id, formData) => {
  try {
    const response = await axiosInstance.put(
      `/api/summits/${id}`,
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

// Delete Summit
export const deleteSummit = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/api/summits/${id}`
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};