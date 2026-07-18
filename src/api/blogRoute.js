import axios from "axios";
import axiosInstance from "./axiosInstance";

export const postBlogs = async (blogsData) => {
  try {
    const response = await axiosInstance.post("/api/blog/create", blogsData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateBlogs = async ({ id, data }) => {
  try {
    const response = await axiosInstance.put(`/api/blog/update/${id}`, data); // Remove manual Content-Type
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getBlogsData = async () => {
  try {
    const response = await axiosInstance.get("/api/blog/all");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCardsBlogsData = async () => {
  try {
    const response = await axiosInstance.get("/api/blog/cards");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBlogById = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/api/blog/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteBlogs = async (id, deleteBlogsData) => {
  try {
    const response = await axiosInstance.delete(
      `/api/blog/delete/${id}`,
      deleteBlogsData
    );
  } catch (error) {
    throw error;
  }
};