import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector, logoutUser } from '../../state/userSlice';

function Nav(props) {
    const { accessToken, loggedin } = useSelector(userSelector);
    const dispatch = useDispatch();

    const handleLogut = () => {
        dispatch(logoutUser())
    }

    return (
        <header className='header'>
            <h1>Rick and Morty Characters</h1>
            {loggedin && <button onClick={handleLogut}>Logout</button>}
        </header>
    )
}

export default Nav

