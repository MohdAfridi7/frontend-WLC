
import axiosInstance from "./axiosInstance";

// =========================
// Create Blog
// =========================
export const createBlog = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/api/wlc-blog",
      data
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};


// =========================
// Get All Blogs
// =========================
export const getAllBlogs = async () => {
  try {
    const response = await axiosInstance.get(
      "/api/wlc-blog"
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};


// =========================
// Get Recent Blogs
// =========================
export const getRecentBlogs = async () => {
  try {
    const response = await axiosInstance.get(
      "/api/wlc-blog/recent"
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};


// =========================
// Get Blog By ID
// =========================
export const getBlogById = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/api/wlc-blog/${id}`
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};


// =========================
// Get Blog By Slug
// =========================
export const getBlogBySlug = async (slug) => {
  try {
    const response = await axiosInstance.get(
      `/api/wlc-blog/slug/${slug}`
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};


// =========================
// Get Related Blogs
// =========================
export const getRelatedBlogs = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/api/wlc-blog/related/${id}`
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};


// =========================
// Update Blog
// =========================
export const updateBlog = async (id, data) => {
  try {
    const response = await axiosInstance.put(
      `/api/wlc-blog/${id}`,
      data
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};


// =========================
// Delete Blog
// =========================
export const deleteBlog = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/api/wlc-blog/${id}`
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

