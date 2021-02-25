import React, { useEffect, useState, Fragment } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites, userSelector } from './../../state/userSlice';
import { getCharacter, characterSelector } from './../../state/characterSlice';
import { useToasts } from 'react-toast-notifications';
import Nav from '../Nav/Nav';
import Loader from './../Loader/Loader';

function CharacterDetails({ location }) {
    const { loading, error, email, favorites } = useSelector(userSelector);
    const { character }: any = useSelector(characterSelector);
    const [charInfo, setCharInfo] = useState(location);
    const { data, isfav } = charInfo;
    const { addToast } = useToasts();
    const params = useParams();
    const id = parseInt(params.id);
    let history = useHistory();
    const dispatch = useDispatch();

    function handleFav(isfav: boolean) {
        const { data } = charInfo;

        if (isfav) {
            setCharInfo({ data, isfav: false })
            dispatch(removeFromFavorites({ data, email }));
            addToast('Character removed from favorites', { appearance: 'success' });
        } else {
            setCharInfo({ data, isfav: true })
            dispatch(addToFavorites({ data, email }));
            addToast('Character added to favorites', { appearance: 'success' });
        }
    }

    useEffect(() => {
        if (Object.keys(character).includes('id')) {
            if (character.id === id) {
                let exists = false;
                if (favorites.some((item: any) => item.id === character.id)) {
                    exists = true
                }
                setCharInfo({ data: character, isfav: exists })
            }
        }
    }, [character]);

    useEffect(() => {
        if (!charInfo.isfav) {
            dispatch(getCharacter(id))
        }
    }, []);

    return (
        <Fragment>
            <Nav />
            {loading && <Loader />}
            <main className='container'>
                <button className='back' onClick={() => history.goBack()}>Back</button>
                {Object.keys(charInfo).includes('data') && (
                    <section className='character'>
                        <header className='d-flex'>
                            <img src={charInfo.data.image} width='300' alt={charInfo.data.name} />
                            <div className='character-summary'>
                                <h2>{charInfo.data.name}</h2>
                                <div><span className={charInfo.data.status.toLowerCase()}></span>{charInfo.data.status} - {charInfo.species}</div>
                                <div className='text-blue'>{charInfo.data.gender}</div>
                                <div className='text-blue'>Origin: {charInfo.data.origin.name}</div>
                                <div className='text-blue'>Location: {charInfo.data.location.name}</div>
                                <span className={charInfo.isfav ? 'heart-fill' : 'heart-empty'}
                                    onClick={() => handleFav(charInfo.isfav)}></span>
                            </div>
                        </header>
                        <div className='episodes'>
                            <h3>Episodes</h3>
                            <ul>
                                {charInfo.data.episode.map((episode: string, i: number) => (
                                    <li className='episode' key={i}>
                                        <a href={episode} target='_blank' rel='noreferrer'>Episode No.{i}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                )}
            </main>
        </Fragment>
    )
}

export default CharacterDetails
