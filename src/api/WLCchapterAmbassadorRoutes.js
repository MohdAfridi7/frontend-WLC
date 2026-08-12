import axiosInstance from "./axiosInstance";

// Create Chapter Ambassador
export const createChapterAmbassador = async (formData) => {
  try {
    const response = await axiosInstance.post(
      "/api/wlc-chapter-ambassador",
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

// Get All Chapter Ambassadors
export const getAllChapterAmbassadors = async () => {
  try {
    const response = await axiosInstance.get(
      "/api/wlc-chapter-ambassador"
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get Chapter Ambassador By Id
export const getChapterAmbassadorById = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/api/wlc-chapter-ambassador/${id}`
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Update Chapter Ambassador
export const updateChapterAmbassador = async (
  id,
  formData
) => {
  try {
    const response = await axiosInstance.put(
      `/api/wlc-chapter-ambassador/${id}`,
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

// Delete Chapter Ambassador
export const deleteChapterAmbassador = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/api/wlc-chapter-ambassador/${id}`
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};