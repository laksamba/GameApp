// frontend/src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users';

const register = (username, password) => {
    return axios.post(`${API_URL}/register`, { username, password,email });
};

const login = (username, password) => {
    return axios.post(`${API_URL}/login`, { username, password });
};

export default {
    register,
    login
};
