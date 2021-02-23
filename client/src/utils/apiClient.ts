import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_AUTH_URL + '/api/v1/users',
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

export default apiClient;