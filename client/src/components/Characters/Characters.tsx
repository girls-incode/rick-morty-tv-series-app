import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { characterSelector, getCharacters } from '../../state/characterSlice';
import { registerUser, userSelector, logoutUser } from '../../state/userSlice';
import './styles.scss';
import Character from './Character';
import Nav from '../Nav/Nav';

function Characters() {
    const data = useSelector(characterSelector);
    const { accessToken, loggedin, favorites, email } = useSelector(userSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        if (accessToken) {
            dispatch(getCharacters())
        }
    }, []);

    function isFavorite(list: Array<any>, id: string): boolean {
        return list.some((item: any) => item.id === id)
    }

    return (
        <>
            <Nav />
            <main className='container'>
            <h2>Characters...</h2>
            {loggedin && (
                <>
                    {data.loading && (<div>Loading.....</div>)}
                    {!data.loading && data.characters && (
                            <>
                            <ul className='list'>
                                    {data.characters.map((char: any) => {
                                        return <Character
                                            key={char.id}
                                            data={char}
                                            email={email}
                                            isfav={isFavorite(favorites, char.id)} />
                                    })}
                            </ul>
                        </>
                    )}
                </>
                )}
            </main>
        </>
    )
}

export default Characters
