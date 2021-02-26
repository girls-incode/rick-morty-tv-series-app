import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector, logoutUser } from '../../state/userSlice';
import './styles.scss';

function Nav(props) {
    const { loggedin } = useSelector(userSelector);
    const dispatch = useDispatch();

    const handleLogut = () => {
        dispatch(logoutUser())
    }

    return (
        <header className='header'>
            <h1 className='text-cener'>Rick & Morty TV Series</h1>
            {loggedin && <button onClick={handleLogut}>Logout</button>}
        </header>
    )
}

export default Nav

