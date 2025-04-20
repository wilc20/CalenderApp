import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7026/api', // correct API base URL
    withCredentials: true                  // send cookies (if needed)
});

export default api;