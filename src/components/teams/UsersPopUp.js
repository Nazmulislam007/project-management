/* eslint-disable jsx-a11y/no-static-element-interactions */

import { useSelector } from 'react-redux';
import { useGetAllUserQuery } from '../../features/users/usersApi';
import Error from '../ui/Error';
import User from './User';

export default function UsersPopUp({ popup, setPopup, team }) {
    const { user: loggedInUser } = useSelector((state) => state.auth) || {};
    const { id } = loggedInUser || {};
    const { data: users, isLoading, isError, error } = useGetAllUserQuery(id);

    let content;
    if (isLoading) content = <div>Loading...</div>;
    if (!isLoading && isError) content = <div>There is an error</div>;
    if (!isLoading && !isError && users?.length === 0) content = <div>No User Founded</div>;
    if (!isLoading && !isError && users?.length > 0)
        content = users.map((user) => (
            <User key={user.id} user={user} setPopup={setPopup} team={team} />
        ));

    return (
        popup && (
            <>
                <div
                    onClick={() => setPopup(false)}
                    className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
                />
                <div className="rounded w-[400px] lg:w-[600px] space-y-4 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Add Teammate
                    </h2>
                    {content}
                    {error && <Error message={error.data} />}
                </div>
            </>
        )
    );
}
