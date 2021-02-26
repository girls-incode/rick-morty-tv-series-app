import axios from 'axios';
import store from '../state/store';

export const apiOptions: any = {
    // baseURL: process.env.REACT_APP_BASE_URL,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
};

const apiClient = axios.create(apiOptions);

export function setAuthToken(token: string) {
    if (token) {
        apiClient.defaults.headers['Authorization'] = `Bearer ${token}`;
    } else {
        delete apiClient.defaults.headers['Authorization'];
    }
}

export default apiClient;