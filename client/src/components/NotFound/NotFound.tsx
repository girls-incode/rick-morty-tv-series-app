import React from 'react';
import { useHistory } from 'react-router-dom';

function NotFound() {
    let history = useHistory();

    return (
        <main className='container justify-center'>
            <section className='auth'>
            <h1>Not Found</h1>
                <button onClick={() => history.goBack()}>Back</button>
            </section>
        </main>
    )
}

export default NotFound
