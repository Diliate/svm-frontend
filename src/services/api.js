import axios from "axios";
import toast from "react-hot-toast";
import https from "https";

// Create an Axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // e.g., "https://localhost:5000/api"
  withCredentials: true, // Include cookies in requests
  // Conditionally use an https agent to ignore SSL errors in development
  httpsAgent: new https.Agent({
    rejectUnauthorized: false, // Ignore SSL in dev only
  }),
});

// Optional: Request Interceptor (if needed)
api.interceptors.request.use(
  (config) => {
    // You can perform actions before the request is sent
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Response Interceptor for Global Error Handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle Unauthorized Access Globally
      toast.error("Session expired. Please log in again.");
      // Optionally, redirect to login page
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
