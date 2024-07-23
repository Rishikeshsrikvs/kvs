import axios from 'axios';
const API_URL = 'http://localhost:3500/';
export const login = async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}users`, credentials);
      return response.data; // Return user data or token
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };