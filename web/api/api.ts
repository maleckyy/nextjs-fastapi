import { API_BASE_URL } from "@/env/API_URL";
// import { useAuthStore } from "@/store/authStore";
import axios from "axios";

const getBaseUrl = () => {
  return API_BASE_URL
};

export const api = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

const excludedPaths = ['/auth/token', '/user/create'];

api.interceptors.request.use(
  (config) => {
    // przebudowac authy na context zeby miec hooki
    const token = localStorage.getItem('token');
    if (token && !excludedPaths.includes(config.url || '')) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
