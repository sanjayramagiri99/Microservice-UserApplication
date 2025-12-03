import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getUserService = () => {
  return {
    getAllUsers: async () => {
      const response = await apiClient.get('/users');
      return response.data;
    },

    getUserById: async (id) => {
      const response = await apiClient.get(`/users/${id}`);
      return response.data;
    },

    createUser: async (userData) => {
      const response = await apiClient.post('/users', userData);
      return response.data;
    },

    updateUser: async (id, userData) => {
      const response = await apiClient.put(`/users/${id}`, userData);
      return response.data;
    },

    deleteUser: async (id) => {
      await apiClient.delete(`/users/${id}`);
    },
  };
};

