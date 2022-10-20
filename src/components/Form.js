import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLoginMutation } from '../features/auth/authApi';

export default function Form() {
    const [login, { data, error, isSuccess }] = useLoginMutation();
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState('');
    const [input, setInput] = useState({
        email: 'test@test.com',
        password: '1234'
    });
    const { email, password } = input || {};

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    useEffect(() => {
        if (error?.data) {
            setErrorMsg(error.data);
        }

        if (data?.accessToken && data?.user) {
            navigate('/teams', { replace: true });
        }
    }, [data, error, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        login({
            email,
            password
        });
    };

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
                <div>
                    <label htmlFor="email-address" className="sr-only">
                        Email address
                    </label>
                    <input
                        id="email-address"
                        name="email"
                        type="email"
                        value={email}
                        onChange={handleChange}
                        autoComplete="email"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                        placeholder="Email address"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="sr-only">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={handleChange}
                        autoComplete="current-password"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                        placeholder="Password"
                    />
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                >
                    Sign in
                </button>
            </div>
            {isSuccess && (
                <div className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-green-800 bg-green-300">
                    Login SuccessFul
                </div>
            )}
            {errorMsg && (
                <div className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-red-800 bg-red-300">
                    {errorMsg}
                </div>
            )}
        </form>
    );
}
