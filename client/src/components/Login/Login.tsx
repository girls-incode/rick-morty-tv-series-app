import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message";
import { useToasts } from 'react-toast-notifications';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loginUser, userSelector } from '../../state/userSlice';
import Nav from './../Nav/Nav';
interface IFormInputs {
    email: string
    password: string
}

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { register, errors, handleSubmit } = useForm<IFormInputs>();
    const { loggedin, loading, error } = useSelector(userSelector);
    const { addToast } = useToasts();

    const onSubmit = async (data: any) => {
        dispatch(loginUser(data));
    };

    function displayError(message: string) {
        return <p className='text-blue'>{message}</p>
    }

    useEffect(() => {
        console.log('loginerr:', error);
        if (error) {
            addToast(error, { appearance: 'error' });
        }
        // else {
        //     if (loggedin && !loading) {
        //         history.push('/');
        //     }
        // }
    }, [error]);

    return (
        <Fragment>
            <Nav />
            <main className='container justify-center'>
                <section className='auth'>
                    <h2 className='mb-2'>Sign in</h2>
                    <form
                        autoComplete='on'
                        onSubmit={handleSubmit(onSubmit)}
                        method="POST">
                        <div className='form-control'>
                            <label htmlFor='email'>Email</label>
                            <div>
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
                                Sign in
                        </button>
                            <div className='mt-1 text-blue'>
                                No account ? <Link to="register">Register</Link>
                            </div>
                        </div>
                    </form>
                </section>
            </main>
        </Fragment>
    );
};

export default Login;
