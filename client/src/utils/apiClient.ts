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

// apiClient.interceptors.request.use(
//     config => {
//         const userState = store.getState().user;
//         if (userState.accessToken) {
//             config.headers['Authorization'] = 'Bearer ' + userState.accessToken;
//         }
//         console.log(config.headers);
//         return config;
//     },
//     error => {
//         Promise.reject(error);
//     }
// );

export default apiClient;