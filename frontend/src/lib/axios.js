import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api",  
  withCredentials: true,
});
