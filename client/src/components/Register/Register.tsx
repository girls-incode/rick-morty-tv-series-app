import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message";
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser, userSelector } from '../../state/userSlice';
interface IFormInputs {
    name: string
    email: string
    password: string
}

function Register() {
    const { accessToken, email, loading, loggedin, error } = useSelector(userSelector);
    const { register, errors, handleSubmit } = useForm<IFormInputs>();
    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = (data: IFormInputs) => {
        dispatch(registerUser(data));
    }

    // useEffect(() => {
    //     if (error) {
    //         console.log(error);
    //         // toast.error(errorMessage);
    //     } else {
    //         if (accessToken && !loading) {
    //             // history.push('/');
    //         }
    //     }
    // }, [accessToken])

    if (loading) return (<p>loading...</p>);

    return (
        <div>
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
                        <ErrorMessage
                            errors={errors}
                            name="name"
                            render={({ message }) => <p>{message}</p>}
                        />
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
                            // type='email'
                            ref={register({
                                required: 'Email is required',
                                // pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/i,
                                    message: 'Email format is wrong'
                                } 
                            })}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="email"
                            render={({ message }) => <p>{message}</p>}
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
                            ref={register({
                                required: true,
                                minLength: {
                                    value: 6,
                                    message: 'Password should have minimum 6 characters'
                                }
                            })}
                        />
                    </div>
                    <ErrorMessage
                        errors={errors}
                        name="password"
                        render={({ message }) => <p>{message}</p>}
                    />
                </div>
                <div>
                    {loading ? (
                        'Loading...'
                    ) : <button type='submit'>Register</button>}
                </div>
                <div> Or <Link to='login'>Login</Link></div>
            </form>
        </div>
    )
}

export default Register

