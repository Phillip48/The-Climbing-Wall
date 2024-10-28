import axios from 'axios'
import { jwtDecode } from 'jwt-decode';

const API_URL = '/api/user/'

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + 'register', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'signin', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user');
  window.location.assign('/login');
}
// Check if the token is expired
const isTokenExpired = (token) => {
  // Decode the token to get its expiration time that was set by the server
  const decoded = jwtDecode(token);
  // If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
  if (decoded.exp < Date.now() / 1000) {
    localStorage.removeItem('user');
    return true;
  }
  // If token hasn't passed its expiration time, return `false`
  return false;
}

const authService = {
  register,
  logout,
  login,
  isTokenExpired
}

export default authService
