import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites } from './../../state/userSlice';
import Nav from '../Nav/Nav';

function CharacterDetails({ location }) {
    const params = useParams();
    let history = useHistory();
    const dispatch = useDispatch();
    const { data, isfav, email } = location;
    const { id, name, status, species, gender, image } = data;

    function handleFav(isfav: boolean, data: any) {
        console.log({ data, email });

        if (isfav) {
            dispatch(removeFromFavorites({ data, email }))
        } else {
            dispatch(addToFavorites({ data, email }))
        }
    }

    return (
        <>
            <Nav />
            <main className='container'>
                <button onClick={() => history.goBack()}>Back</button>
                <img src={image} width='300' alt={name} />
                <h2>
                    {name}
                </h2>
                <div><span className={status.toLowerCase()}></span>{status} - {species}</div>
                <div>{gender}</div>
                <div>{data.location.name}</div>
                {JSON.stringify(isfav)}
                <span className={isfav ? 'heart-fill' : 'heart-empty'} onClick={() => handleFav(isfav, data)}></span>
                {/* {JSON.stringify(data)} */}
            </main>
        </>
    )
}

export default CharacterDetails
