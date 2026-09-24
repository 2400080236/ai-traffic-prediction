import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getHealth = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    throw new Error('Backend unavailable. Please start the FastAPI server.');
  }
};

export const getModelInfo = async () => {
  try {
    const response = await api.get('/model-info');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch model information.');
  }
};

export const predictTraffic = async (data) => {
  try {
    const response = await api.post('/predict', data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.detail) {
      // Return FastAPI validation error if present
      throw new Error(JSON.stringify(error.response.data.detail));
    }
    throw new Error('Prediction failed. Please try again.');
  }
};

export default api;
