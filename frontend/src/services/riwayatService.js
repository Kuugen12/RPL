import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('❌ Token not found in localStorage');
    return {};
  }
  return { Authorization: `Bearer ${token}` };
};

const getByUserId = (userId) => {
  return axios.get(`${API_URL}/api/users/${userId}/riwayat`, {
    headers: getAuthHeader()
  });
};

const service = {
  getByUserId
};

export default service;
