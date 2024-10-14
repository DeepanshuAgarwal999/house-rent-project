import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 10 * 60 * 1000,
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = cookies.get("user")?.token;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    const { contentType } = config.headers;

    if (contentType) {
      config.headers["Content-Type"] = contentType;
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
