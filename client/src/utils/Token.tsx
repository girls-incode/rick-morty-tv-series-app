import React, { useEffect, useState } from 'react';
import { decodeToken } from './auth';
import { updateUser } from '../state/userSlice';
import { useDispatch } from 'react-redux';
import apiClient, { setAuthToken } from './apiClient';

function useToken(accessToken: string) {
    const dispatch = useDispatch();
    let [loading, setLoading] = useState<boolean>(true);
    const url = process.env.REACT_APP_AUTH_URL;

    const getToken = async () => {
        try {
            const res = await apiClient.post(url + '/refresh-token');
            const { data } = res;
            
            const token: string = data.accessToken;

            setAuthToken(token);
            dispatch(updateUser(data));
            setLoading(false);
            
            // const decoded: any = decodeToken(token);
            // const expires = decoded.exp;
            // setTimeout(() => {
            //   refreshToken()
            // }, (expires * 1000) - 500)
        }
        catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    useEffect(() => {
        const setheaders = localStorage.getItem('atoken');
        if (setheaders && !accessToken) {
            getToken()
        }
        else {
            setLoading(false);
        }
    }, []);

    return loading
}

export default useToken
