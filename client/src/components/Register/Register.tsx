import React, { useEffect, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message";
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { registerUser, userSelector } from '../../state/userSlice';
import Nav from './../Nav/Nav';
interface IFormInputs {
    name: string
    email: string
    password: string
}

function Register() {
    const { loading, loggedin, error } = useSelector(userSelector);
    const { register, errors, handleSubmit } = useForm<IFormInputs>();
    const { addToast } = useToasts();
    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = (data: IFormInputs) => {
        dispatch(registerUser(data));
    }

    useEffect(() => {
        if (error) {
            addToast(error, { appearance: 'error' });
        }
        else {
            if (loggedin && !loading) {
                history.push('/');
            }
        }
    }, [error]);

    function displayError(message: string) {
        return <p className='text-blue'>{message}</p>
    }

    return (
        <Fragment>
            <Nav />
            <main className='container justify-center'>
                <section className='auth'>
                    <h2 className='mb-2'>Register</h2>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        method='POST'>
                        <div>
                            <label htmlFor='name'>Name</label>
                            <div className='form-control'>
                                <input
                                    id='name'
                                    name='name'
                                    type='text'
                                    ref={register({
                                        required: true,
                                        maxLength: {
                                            value: 15,
                                            message: 'This input exceed max length'
                                        }
                                    })}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="name"
                                    render={({ message }) => displayError(message)}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor='email'>Email</label>
                            <div className='form-control'>
                                <input
                                    id='email'
                                    name='email'
                                    ref={register({
                                        required: true,
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/i,
                                            message: 'Email format is wrong'
                                        }
                                    })}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="email"
                                    render={({ message }) => displayError(message)}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor='password'>Password</label>
                            <div className='form-control'>
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
                                render={({ message }) => displayError(message)}
                            />
                        </div>
                        <div className='d-grid'>
                            <button type="submit">
                                Register
                        </button>
                            <div className='mt-1 text-blue'>
                                Have an account ? <Link to="login">Login</Link>
                            </div>
                        </div>
                    </form>
                </section>
            </main>
        </Fragment>
    )
}

export default Register

