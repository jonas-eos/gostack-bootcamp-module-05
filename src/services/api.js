import axios from 'axios';

/**
 * Github base API URI
 */
const api = axios.create({
  baseURL: 'https://api.github.com',
});

export default api;
