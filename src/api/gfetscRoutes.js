import axiosInstance from "./axiosInstance";

// Create Gfetsc
export const createGfetsc= async (formData) => {
  try {
    const response = await axiosInstance.post(
      "/api/gfetsc",
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
export const getAllGfetsc = async () => {
  try {
    const response = await axiosInstance.get("/api/gfetsc");
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get Gfetsc By Id
export const getGfetscById = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/api/gfetsc/${id}`
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Update Gfetsc
export const updateGfetsc = async (id, formData) => {
  try {
    const response = await axiosInstance.put(
      `/api/gfetsc/${id}`,
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

// Delete Gfetsc
export const deleteGfetsc = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/api/gfetsc/${id}`
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};