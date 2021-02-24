import React, { useEffect, useState } from 'react';
import { decodeToken } from './auth';
import { updateUser, logoutUser } from '../state/userSlice';
import { useDispatch } from 'react-redux';
import apiClient, { setAuthToken } from './apiClient';
// import axios from 'axios';

function useToken(accessToken: string) {
    const dispatch = useDispatch();
    let [loading, setLoading] = useState<boolean>(false);
    const url = process.env.REACT_APP_AUTH_URL;

    const getToken = async () => {
        setLoading(true);
        try {
            const res = await apiClient.post(url + '/refresh-token');
            const { data } = res;

            const token: string = data.accessToken;
            // const decoded: any = decodeToken(token);
            // const expires = decoded.exp;
            setAuthToken(token);
            dispatch(updateUser(data));
            setLoading(false);

            // setTimeout(() => {
            //   refreshToken()
            // }, (expires * 1000) - 500)
        }
        catch (err) {
            console.log(err);
            dispatch(logoutUser());
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!accessToken) {
            getToken()
        }
    }, []);

    return loading
}

export default useToken
