import axiosInstance from "./axiosInstance";

// Create Contact
export const createContact = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/api/contact/create",
      data
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get All Contacts
export const getAllContacts = async () => {
  try {
    const response = await axiosInstance.get(
      "/api/contact/all"
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get Single Contact
export const getContactById = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/api/contact/${id}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Delete Contact
export const deleteContact = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/api/contact/delete/${id}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};