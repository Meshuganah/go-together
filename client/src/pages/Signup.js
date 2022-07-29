import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';

const Signup = () => {
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [addUser, { error }] = useMutation(ADD_USER);

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
            const { data } = await addUser({
                variables: { ...formState },
            });

            Auth.login(data.addUser.token);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <main className="">
            <div className='login-singup-container'>
                <img
                    src={require('../assets/go-together-banner.jpg')}
                    alt='Concert'
                    className='login-singup-img'
                >
                </img>
                <div className="login-signup">
                    <h4 className="">Sign Up</h4>
                    <div className="">
                        <form onSubmit={handleFormSubmit}>
                            <input
                                className="form-input mx-2"
                                placeholder="Your username"
                                name="username"
                                type="username"
                                id="username"
                                value={formState.username}
                                onChange={handleChange}
                            />
                            <input
                                className="form-input mx-2"
                                placeholder="Your email"
                                name="email"
                                type="email"
                                id="email"
                                value={formState.email}
                                onChange={handleChange}
                            />
                            <input
                                className="form-input mx-2"
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

                        {error && <div>Signup failed</div>}
                        <Link to='/login' className='fs-5 fw-bold border-bottom'>Login</Link>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Signup;
