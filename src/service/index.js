/* eslint-disable no-undef */
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_END_POINT,
  timeout: 40000,
});
const token = localStorage.getItem('token');

if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default api;
