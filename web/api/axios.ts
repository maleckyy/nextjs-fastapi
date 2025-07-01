import { API_BASE_URL } from "@/env/API_URL";
import axios from "axios";
import { useAuthStore } from "@/store/authStore";

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
    const token = useAuthStore.getState().token
    console.log(token)
    if (token && !excludedPaths.includes(config.url || '')) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
