import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Helper untuk mendapatkan token dari localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('❌ Token not found in localStorage');
    return {};
  }
  return { Authorization: `Bearer ${token}` };
};

const getAll = () => {
  console.log('📡 Calling GET /api/users with token:', localStorage.getItem('token')?.substring(0, 20) + '...');
  return axios.get(`${API_URL}/api/users`, {
    headers: getAuthHeader()
  });
};

const deleteUser = (id) => {
  return axios.delete(`${API_URL}/api/users/${id}`, {
    headers: getAuthHeader()
  });
};

const service = {
  getAll,
  deleteUser
};

export default service;
