import React from 'react';
import { Link } from 'react-router-dom';

function Character({ data, isfav, email }: any) {
    const { id, location, name, status, species, gender, image } = data;

    return (
        <li>
            <img src={image} width='300' alt={name} />
            <h2>
                <Link to={{
                    pathname: `/character/${id}`,
                    data,
                    isfav,
                    email
                }}>{name}</Link>
            </h2>
            <div><span className={status.toLowerCase()}></span>{status} - {species}</div>
            <div>{gender}</div>
            <div>{location.name}</div>
            <div><span className={isfav ? 'heart-fill' : ''}></span></div>
        </li>
    )
}

export default Character
