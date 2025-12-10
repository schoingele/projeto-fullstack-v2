import axios from "axios";

const baseURL = "http://localhost:3000";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use((config) => {
  // Token auth temporarily disabled for local testing.
  // If you want to enable authentication, uncomment the lines below.
  // const token = localStorage.getItem("token");
  // if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

export default api;
