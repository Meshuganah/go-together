import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';

const Login = (props) => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN_USER);

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await login({
                variables: { ...formState },
            });

            Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
        }

        // clear form values
        setFormState({
            email: '',
            password: '',
        });
    };

    return (
        <main className="">
            <div className="login-singup-container">
                <img
                    src={require('../assets/go-together-banner.jpg')}
                    alt='Concert'
                    className='login-singup-img'
                >
                </img>
                <div className="login-signup">
                    <h4 className="">Login</h4>
                    <div className="">
                        <form onSubmit={handleFormSubmit}>
                            <input
                                className="form-input"
                                placeholder="Your email"
                                name="email"
                                type="email"
                                id="email"
                                value={formState.email}
                                onChange={handleChange}
                            />
                            <input
                                className="form-input mx-3"
                                placeholder="******"
                                name="password"
                                type="password"
                                id="password"
                                value={formState.password}
                                onChange={handleChange}
                            />
                            <button className="btn btn-secondary" type="submit">
                                Submit
                            </button>
                        </form>

                        {error && <div>Login failed</div>}

                        <Link to='/signup' className='fs-5 fw-bold border-bottom'>Signup</Link>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Login;
