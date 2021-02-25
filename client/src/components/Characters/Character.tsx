import React from 'react';
import { Link } from 'react-router-dom';

function Character({ data, isfav, email }: any) {
    const { id, location, name, status, species, gender, image } = data;

    return (
        <li>
            <img src={image} width='300' alt={name} />
            <article className='character-summary'>
                <div className='d-grid d-col character-header'>
                    <h2>
                        <Link to={{
                            pathname: `/character/${id}`,
                            data,
                            isfav,
                            email
                        }}>{name}</Link>
                    </h2>
                    <span className={isfav ? 'heart-fill' : ''}></span>
                </div>
                <div><span className={status.toLowerCase()}></span>{status} - {species}</div>
                <div>{gender}</div>
                <div>{location.name}</div>
            </article>
        </li>
    )
}

export default Character
