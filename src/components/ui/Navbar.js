import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { userLoggedOut } from '../../features/auth/authSlice';
import Search from './Search';

export default function Navbar({ search }) {
    const { user } = useSelector((state) => state.auth);
    const { name } = user || {};
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    const handleLogOut = () => {
        dispatch(userLoggedOut());
        localStorage.clear();
    };

    const style = ({ isActive }) => ({
        color: isActive ? '#4355d4' : 'gray'
    });

    return (
        <div className="flex items-center flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75">
            <Link to="/">
                <img src={logo} className="h-10 w-10" alt="learnwithsumit" />
            </Link>
            {search && <Search />}
            <div className="ml-10">
                <NavLink to="/teams" style={style} className="mx-2 text-sm font-semibold">
                    Team
                </NavLink>
                <NavLink to="/projects" style={style} className="mx-2 text-sm font-semibold">
                    Projects
                </NavLink>
            </div>
            <button
                type="button"
                onClick={() => setShow((prev) => !prev)}
                className="flex relative items-center justify-center w-8 h-8 ml-auto cursor-pointer"
            >
                <img
                    className="rounded-full"
                    src={`https://avatars.dicebear.com/api/adventurer/${name}.svg`}
                    alt="avatar"
                />
                <div
                    className={`${
                        show ? '' : 'hidden'
                    } z-10 absolute right-[-20px] top-10 w-32 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700`}
                >
                    <div
                        role="button"
                        tabIndex="0"
                        className="py-1 text-sm text-gray-700 dark:text-gray-200"
                        onClick={handleLogOut}
                    >
                        <div className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            Log out
                        </div>
                    </div>
                </div>
            </button>
        </div>
    );
}
