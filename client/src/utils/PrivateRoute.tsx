import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userSelector } from '../state/userSlice';
import useToken from './Token';

export const PrivateRoute = ({ component: Component, ...rest }) => {
    let { accessToken } = useSelector(userSelector);
    const loading = useToken(accessToken);

    return (<Route
        {...rest}
        render={(props) => (accessToken ? <Component {...props} /> : loading ? <p>loading...</p> : <Redirect to={{ pathname: '/login' }} />)}
    />
    )
};