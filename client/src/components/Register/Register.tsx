import React from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser, userSelector } from '../../state/userSlice';

interface IFormInputs {
    name: string
    email: string
    password: string
}

function Register() {
    const { name, email, loading, error } = useSelector(userSelector);
    const { register, errors, handleSubmit } = useForm<IFormInputs>();
    const dispatch = useDispatch();

    const onSubmit = (data: IFormInputs) => {
        console.log(JSON.stringify(data));
        // dispatch(registerUser(data));
    }

    return (
        <>
            <h1>Register</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                method='POST'>
                <div>
                    <label htmlFor='name'>
                        Name
                    </label>
                    <div>
                        <input
                            id='name'
                            name='name'
                            type='text'
                            ref={register({
                                required: 'Name is required',
                                maxLength: {
                                    value: 15,
                                    message: 'This input exceed maxLength'
                                }
                            })}
                        // required
                        />
                        {errors.name && 'name is required'}
                    </div>
                </div>
                <div>
                    <label htmlFor='email'>
                        Email address
                    </label>
                    <div>
                        <input
                            id='email'
                            name='email'
                            type='email'
                            ref={register({
                                pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
                            })}
                            required
                        />
                    </div>
                </div>
                <div>
                    <label
                        htmlFor='password'>
                        Password
                    </label>
                    <div>
                        <input
                            id='password'
                            name='password'
                            type='password'
                            ref={register({ required: true })}
                            required
                        />
                    </div>
                </div>
                <div>
                    {loading ? (
                        'Loading...'
                    ) : <button type='submit'>Register</button>}
                </div>
                <div> Or <Link to='register'>Login</Link></div>
            </form>
        </>
    )
}

export default Register

