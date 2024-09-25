import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "https://srikvstech-yaj97.ondigitalocean.app", // Set your base URL here
});

export default api;
