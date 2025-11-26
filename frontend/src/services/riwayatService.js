import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const getByUserId = (id) => axios.get(`${API}/api/riwayat/${id}`);

export default { getByUserId };