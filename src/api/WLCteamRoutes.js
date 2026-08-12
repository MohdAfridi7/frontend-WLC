import axiosInstance from "./axiosInstance";

// Create Team Member
export const createTeamMember = async (formData) => {
  try {
    const response = await axiosInstance.post(
      "/api/wlc-team",
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

// Get All Team Members
export const getAllTeamMembers = async () => {
  try {
    const response = await axiosInstance.get("/api/wlc-team");
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get Team Member By Id
export const getTeamMemberById = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/api/wlc-team/${id}`
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Update Team Member
export const updateTeamMember = async (id, formData) => {
  try {
    const response = await axiosInstance.put(
      `/api/wlc-team/${id}`,
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

// Delete Team Member
export const deleteTeamMember = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/api/wlc-team/${id}`
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};