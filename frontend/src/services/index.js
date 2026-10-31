import axios from "axios";

const API_URL = "http://localhost:8082/api/tasks";

export const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createTask = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

export const updateTask = async (id, formData) => {
  const response = await axios.put(`${API_URL}/${id}`, formData);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};