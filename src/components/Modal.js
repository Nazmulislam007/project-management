import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { useAddTeamsMutation } from '../features/team/teamApi';
import useColorGen from '../hooks/useColorGen';

/* eslint-disable jsx-a11y/no-static-element-interactions */
export default function Modal({ open, setOpen }) {
    const colorGenerator = useColorGen();
    const { user } = useSelector((state) => state.auth) || {};
    const [addTeams, { data }] = useAddTeamsMutation();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    function reset() {
        setName('');
        setDescription('');
    }

    useEffect(() => {
        if (data) {
            setOpen(false);
            reset();
        }
    }, [data, setOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const { color, bgColor } = colorGenerator();
        addTeams({
            name,
            description,
            color,
            bgColor,
            stage: 'backlog',
            owner: user.email,
            users: [user],
            timestamp: new Date().getTime()
        });
    };

    return (
        open && (
            <>
                <div
                    onClick={() => setOpen(false)}
                    className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
                />
                <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Send message
                    </h2>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="to" className="sr-only">
                                    Team
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Team Name"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="sr-only">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    type="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Description"
                                />
                            </div>
                        </div>

                        {/* {errorMsg && <Error message={errorMsg} />} */}

                        <div>
                            <button
                                type="submit"
                                className={` group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500`}
                            >
                                Create Team
                            </button>
                        </div>
                    </form>
                </div>
            </>
        )
    );
}
