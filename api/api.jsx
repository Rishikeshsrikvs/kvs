// // src/api/api.js

// import axios from 'axios';

// // Base URL for the API
// const BASE_URL = 'https://srikvs.onrender.com/'; // Adjust to your API base URL
// console.log(BASE_URL);

// // Create an Axios instance with default settings
// const api = axios.create({
//     baseURL: BASE_URL,
//     // timeout: 10000, // Adjust timeout if needed
//     // headers: {
//     //     'Content-Type': 'application/json',
//     //     // Add any common headers if needed
//     // },
// });

// // Request interceptor to add token or modify request if needed
// api.interceptors.request.use(
//     config => {
//         // Add Authorization header if needed
//         // const token = localStorage.getItem('token'); // Example for JWT token
//         // if (token) {
//         //     config.headers['Authorization'] = `Bearer ${token}`;
//         // }
//         return config;
//     },
//     error => Promise.reject(error)
// );

// // Response interceptor to handle errors or modify responses if needed
// api.interceptors.response.use(
//     response => response,
//     error => {
//         // Handle errors globally
//         console.error('API error:', error);
//         return Promise.reject(error);
//     }
// );

// export default api;
