import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser, userSelector } from '../../state/userSlice';

function Characters() {
    const data = useSelector(userSelector);

    return (
        <div>
            {JSON.stringify(data)}
        </div>
    )
}

export default Characters
