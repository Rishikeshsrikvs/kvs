import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'https://srikvstech.onrender.com' // Set your base URL here
});

export default api;
