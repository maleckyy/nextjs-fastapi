import { API_BASE_URL } from "@/env/API_URL";
import axios from "axios";
import { useAuthStore } from "@/store/authStore";

const getBaseUrl = () => {
  return API_BASE_URL
};
const excludedPaths = ['/auth/token', '/user/create'];

export const api = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token
    if (token && !excludedPaths.includes(config.url || '')) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
