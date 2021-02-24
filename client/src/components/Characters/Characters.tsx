import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { characterSelector, getCharacters } from '../../state/characterSlice';
import { registerUser, userSelector, logoutUser } from '../../state/userSlice';
import './styles.scss';

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
        dispatch(logoutUser())
    }

    return (
        <>
            <h2>Characters...</h2>
            {loggedin && (
                <>
                    {data.loading && (<div>Loading.....</div>)}
                    {!data.loading && data.characters && (
                        <>
                        <button onClick={handleLogut}>Logout</button>
                            <ul className='list'>
                                {data.characters.map((char: any) => (
                                    <li key={char.id}>
                                <h2>{char.name}</h2>
                                <div>{char.status}</div>
                                <div>{char.species}</div>
                                <div>{char.gender}</div>
                                    </li>
                            ))}
                            </ul>
                        </>
                    )}
                </>
            )}
        </>
    )
}

export default Characters
