import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { characterSelector, getCharacters } from '../../state/characterSlice';
import { userSelector } from '../../state/userSlice';
import './styles.scss';
import Character from './Character';
import Nav from '../Nav/Nav';
import Loader from './../Loader/Loader';

function Characters() {
    const data = useSelector(characterSelector);
    const { accessToken, loggedin, favorites, email, error } = useSelector(userSelector);
    const { addToast } = useToasts();
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('loadddd 1..');
        if (accessToken) {
            dispatch(getCharacters())
        }
    }, []);

    useEffect(() => {
        console.log('loadddd....');
    });

    useEffect(() => {
        const err = error || data.error;
        if (err) {
            addToast(err, { appearance: 'error' });
        }
    }, [error, data.error]);

    function isFavorite(list: Array<any>, id: string): boolean {
        return list.some((item: any) => item.id === id)
    }

    return (
        <Fragment>
            <Nav />
            <main className='container'>
                {loggedin && (
                    <>
                        {data.loading && <Loader />}
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
        </Fragment>
    )
}

export default Characters
