import React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useAddTeamMateMutation } from '../../features/team/teamApi';

export default function User({ user, setPopup, team }) {
    const { user: loggedInUser } = useSelector((state) => state.auth) || {};
    const { email: loggedInEmail } = loggedInUser || {};
    const { id, name, email } = user || {};
    const [addTeamMate] = useAddTeamMateMutation();

    const handleAddMate = () => {
        const participantUsers = team.users.map((participantUser) => participantUser);

        const existingEmail = participantUsers.find(
            (participantuser) => participantuser.email === email
        );

        const participant = participantUsers.findIndex((p) => p.email === loggedInEmail);

        if (existingEmail?.email) {
            toast('User Already Exist', { type: 'error' });
        } else if (participant !== -1) {
            addTeamMate({
                id: team?.id,
                user,
                data: {
                    ...team,
                    users: [...participantUsers, user]
                }
            });
            setPopup(false);
            toast('Success added', { type: 'success' });
        } else {
            toast('Only Team member can add memeber');
        }
    };

    return (
        <div
            key={id}
            onClick={handleAddMate}
            role="button"
            tabIndex="0"
            className="rounded-md p-2 border border-gray-300 hover:bg-gray-100 flex items-center cursor-pointer"
        >
            <img
                className="rounded-full w-12 h-12"
                src={`https://avatars.dicebear.com/api/adventurer/${name}.svg`}
                alt="avatar"
            />
            <div className="text-gray-900 ml-3 mb-1">{email}</div>
        </div>
    );
}
