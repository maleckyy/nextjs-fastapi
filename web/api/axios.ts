import { API_BASE_URL } from "@/env/API_URL";
import { useAuthStore } from "@/store/authStore";
import axios from "axios";

const getBaseUrl = () => {
  return API_BASE_URL
};
const excludedPaths = ['/user/create', '/auth/login'];

export const api = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

api.interceptors.request.use(
  async (config) => {
    const token = useAuthStore.getState().token

    if (token && !excludedPaths.includes(config.url || '')) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
