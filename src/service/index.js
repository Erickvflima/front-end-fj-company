/* eslint-disable no-undef */
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_END_POINT,
  timeout: 40000,
});

export default api;
