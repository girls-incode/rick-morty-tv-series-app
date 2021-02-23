import React, { useEffect, useState } from 'react';
import apiClient from './apiClient';
import { decodeToken } from './auth';
import { updateUser } from '../state/userSlice';
import { useDispatch } from 'react-redux';

function useToken(accessToken: string) {
    const dispatch = useDispatch();
    let [loading, setLoading] = useState<boolean>(true);

    const getToken = async () => {
        try {
            const res = await apiClient.post('/refresh-token');
            const { data } = res;

            const token: string = data.accessToken;
            const decoded: any = decodeToken(token);
            const expires = decoded.exp;
            dispatch(updateUser(data));
            setLoading(false);

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
        console.log(accessToken);

        if (!accessToken) {
            getToken()
        }
    }, []);

    return loading
}

export default useToken
