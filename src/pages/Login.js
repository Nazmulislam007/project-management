import React from 'react';
import logo from '../assets/images/logo.png';
import Form from '../components/Form';

export default function Login() {
    return (
        <div className="grid place-items-center h-screen bg-[#F9FAFB]">
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <img className="mx-auto h-12 w-auto" src={logo} alt="Learn with sumit" />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>
                    <Form />
                    <div className="shadow-md shadow-blue-200 p-3">
                        <p>Available User:</p>
                        <ul className="ml-2">
                            <li>1. test@test.com</li>
                            <li>2. test1@test.com</li>
                            <li>3. test2@test.com</li>
                            <li>4. test3@test.com</li>
                        </ul>
                        <p>Password: 1234</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
