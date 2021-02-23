import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser, userSelector } from '../../state/userSlice';
import useToken from '../../utils/Token';

function Characters() {
    const { accessToken, loggedin, loading, name, email } = useSelector(userSelector);
    // const accessToken = useToken();

    // useEffect(() => {
    //     console.log('Characters loggedin', loggedin);
    //     if (loggedin) {
    //         console.log('chars:', name, email);
    //     }
    // }, [accessToken]);
    
    return (
        <>
            <h2>Characters...</h2>
            {loggedin === true && (
                <div>
                    <h1>List of chars</h1>
                    <p>{name}</p>
                    <p>{email}</p>
                </div>
            )}
        </>
    )
}

export default Characters
