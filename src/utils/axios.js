import axios from "axios";
axios.interceptors.request.use((config) => {
  console.log("Request URL:", config.url);
  console.log("Request Data:", config.data);
  return config;
});

axios.interceptors.response.use((response) => {
  console.log("Response Status:", response.status);
  console.log("Response Data:", response.data);
  return response;
}, (error) => {
  console.error("Axios Error:", error);
  return Promise.reject(error);
});

export default axios;
