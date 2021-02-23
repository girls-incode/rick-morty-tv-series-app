import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message";
import { useSelector, useDispatch } from 'react-redux';
// import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import { loginUser, clearState, userSelector } from '../../state/userSlice';

interface IFormInputs {
    email: string
    password: string
}

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { register, errors, handleSubmit } = useForm<IFormInputs>();
    const { loggedin, loading, error, name, email } = useSelector(userSelector);

    const onSubmit = (data: any) => {
        console.log(data);
        dispatch(loginUser(data));
    };

    useEffect(() => {
        if (error) {
            console.log(error);
            // toast.error(errorMessage);
        } else {
            if (loggedin && !loading) {
                console.log('finished', name, email);
                history.push('/');
            }
        }
        // dispatch(clearState());
    }, [loggedin]);

    return (
        <div>
            <h2>
                Sign in to your account
            </h2>
            <div>
                <form
                    className=""
                    onSubmit={handleSubmit(onSubmit)}
                    method="POST">
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
                        <label htmlFor='password'>
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
                        <button type="submit" className="">
                            {loading ? (
                                'Loading...'
                            ) : null}
                            Sign in
                        </button>
                    </div>
                </form>
                <div>
                    Or <Link to="register">Register</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
