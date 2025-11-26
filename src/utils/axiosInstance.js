import axios from "axios";
import { BASE_URL } from "./apiPath";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor (Runs before every API call)
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors globally
    if (error.response) {
      if (error.status === 401)
        // Redirect to login page
        window.location.href = "/";
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout, Please try again");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
