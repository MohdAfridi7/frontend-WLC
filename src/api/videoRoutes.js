import axiosInstance from "./axiosInstance";

// Create Video
export const createVideo = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/api/videos",
      data
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get All Videos
export const getAllVideos = async () => {
  try {
    const response = await axiosInstance.get("/api/videos");
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get Single Video
export const getVideoById = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/api/videos/${id}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Update Video
export const updateVideo = async (id, data) => {
  try {
    const response = await axiosInstance.put(
      `/api/videos/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Delete Video
export const deleteVideo = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/api/videos/${id}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};