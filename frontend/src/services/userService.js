import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const getAll = () => axios.get(`${API}/api/users`);
const deleteUser = (id) => axios.delete(`${API}/api/users/${id}`);

export default { getAll, deleteUser };