import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userSelector } from '../state/userSlice';
import useToken from './Token';

export const PublicRoute = ({ component: Component, ...rest }) => {
    let { accessToken } = useSelector(userSelector);
    const loading: boolean = useToken(accessToken);

    return (<Route
        {...rest}
        render={(props) => (accessToken === '' && !loading ? <Component {...props} /> : loading ? <p>loading...</p> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />)}
    />
    )
};