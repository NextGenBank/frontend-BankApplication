import axios from "axios";
import { getAuthToken } from "./auth";
import { API_BASE_URL } from "../config";

// Set base URL for all API requests
axios.defaults.baseURL = API_BASE_URL;

// Add request interceptor to automatically add Authorization header
axios.interceptors.request.use((config) => {
  // Get token on each request to ensure we always have the latest
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // Make sure URL starts with the base URL for API calls
  if (config.url && config.url.startsWith('/api') && !config.url.startsWith(API_BASE_URL)) {
    config.url = API_BASE_URL + config.url;
  }
  
  console.log("Request URL:", config.url);
  console.log("Request Headers:", config.headers);
  console.log("Request Data:", config.data);
  return config;
});

axios.interceptors.response.use((response) => {
  console.log("Response Status:", response.status);
  console.log("Response Data:", response.data);
  return response;
}, (error) => {
  console.error("Axios Error:", error);
  
  // Handle auth errors (like token expiration)
  if (error.response && error.response.status === 401) {
    console.log("Authentication error detected, redirecting to login");
    localStorage.removeItem("token");
    // Avoid circular imports by using window.location
    window.location.href = "/auth";
  }
  
  return Promise.reject(error);
});

export default axios;
