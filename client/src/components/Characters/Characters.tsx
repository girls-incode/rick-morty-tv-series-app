import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { characterSelector, getCharacters } from '../../state/characterSlice';
import { registerUser, userSelector, logout } from '../../state/userSlice';

function Characters() {
    const data = useSelector(characterSelector);
    const { accessToken, loggedin } = useSelector(userSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        if (accessToken) {
            dispatch(getCharacters())
        }
    }, []);

    const handleLogut = () => {
        dispatch(logout())
    }

    return (
        <>
            <h2>Characters...</h2>
            <button onClick={handleLogut}>Logout</button>
            { loggedin && data.loading && <div>loading...</div>}
            { loggedin && data.characters && data.characters.map((char: any) => (
                <div key={char.id}>
                    <h2>{char.name}</h2>
                    <div>{char.status}</div>
                    <div>{char.species}</div>
                    <div>{char.gender}</div>
                </div>
            ))}
        </>
    )
}

export default Characters
