/* eslint-disable jsx-a11y/no-static-element-interactions */
import moment from 'moment';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useDeleteTeamMutation } from '../../features/team/teamApi';
import UsersPopUp from './UsersPopUp';

export default function Team({ team }) {
    const [popup, setPopup] = useState(false);
    const { user } = useSelector((state) => state.auth) || {};
    const [show, setShow] = useState(false);
    const [deleteTeam] = useDeleteTeamMutation();
    const { id, name, description, color, bgColor, timestamp, owner, users } = team || {};

    const style = {
        color,
        backgroundColor: bgColor
    };

    const handleTeamMate = () => {
        setPopup(true);
        setShow(false);
    };

    const handleDelete = () => {
        if (owner === user.email) {
            deleteTeam({ id, email: user.email });
            setShow(false);
            toast('delete successful', { type: 'success' });
        } else {
            setShow(false);
            toast('Only owner can delete team', { type: 'error' });
        }
    };

    return (
        <>
            <UsersPopUp popup={popup} setPopup={setPopup} team={team} />
            <div
                className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
                draggable="true"
            >
                <button
                    type="button"
                    onClick={() => setShow((prev) => !prev)}
                    className="absolute top-0 right-0 items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex"
                >
                    <svg
                        className="w-4 h-4 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                </button>
                <div className={`absolute ${show ? '' : 'hidden'} right-1 top-9`}>
                    <div className="flex flex-col py-1 bg-gray-500 items-start text-white">
                        <button
                            className="py-1 px-4 text-xs bg-gray-500 hover:bg-gray-600"
                            type="button"
                            onClick={handleTeamMate}
                        >
                            Add Teammate
                        </button>
                        <button
                            className="py-1 px-4 text-xs w-full bg-gray-500 hover:bg-gray-600"
                            type="button"
                            onClick={handleDelete}
                        >
                            Delete Team
                        </button>
                    </div>
                </div>
                <span
                    style={style}
                    className="flex items-center h-6 px-3 text-xs font-semibold rounded-full"
                >
                    {name}
                </span>
                <h4 className="mt-3 text-sm font-medium">{description}</h4>
                <div className="flex mt-auto items-center w-full  text-xs font-medium text-gray-400">
                    <div className="flex items-center">
                        <svg
                            className="w-4 h-4 text-gray-300 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span className="ml-1 leading-none">{moment(timestamp).format('ll')}</span>
                    </div>
                    <div className="flex ml-auto">
                        {users.map((us) => (
                            <img
                                key={us.id}
                                className={`w-6 h-6 rounded-full ${
                                    us.email === owner ? 'bg-gray-400' : ''
                                }`}
                                src={`https://avatars.dicebear.com/api/adventurer/${us.name}.svg`}
                                alt="random"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
