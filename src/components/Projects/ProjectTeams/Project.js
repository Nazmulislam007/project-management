import moment from 'moment';
import React from 'react';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useDeleteTeamMutation } from '../../../features/team/teamApi';
import { type_backlog } from '../../../utils/type';

export default function Project({ team }) {
    const { input } = useSelector((state) => state.input);
    const { user: loggedInUser } = useSelector((state) => state.auth) || {};
    const { id, name, description, color, bgColor, timestamp, users, owner, stage } = team || {};
    const [deleteTeam] = useDeleteTeamMutation();

    const [{ isDragging }, drag] = useDrag(() => ({
        type: stage,
        item: team,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }));

    const ownerUser = users.find((user) => user?.email === owner);

    const handleDelete = () => {
        if (owner === loggedInUser.email) {
            deleteTeam({ id, email: loggedInUser.email });
            toast('delete successful', { type: 'success' });
        } else {
            toast('Only owner can delete team', { type: 'error' });
        }
    };

    const style = {
        color,
        backgroundColor: bgColor
    };

    return (
        <div
            className={`${
                isDragging ? 'opacity-50' : ''
            } relative cursor-move flex flex-col items-start ${
                input &&
                (description.toLowerCase().includes(input.toLowerCase())
                    ? 'border-2 border-red-500'
                    : 'border-2 border-transparent')
            } p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100`}
            draggable="true"
            ref={drag}
        >
            {stage === type_backlog && (
                <button
                    onClick={handleDelete}
                    type="button"
                    className="absolute top-0 right-0 items-center justify-center hidden w-3 h-3 mt-4 mr-5 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex"
                >
                    <svg
                        width="30"
                        height="30"
                        viewBox="0 0 45 51"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            id="Vector"
                            d="M35.125 9.18V9.68H35.625H43.125C43.8471 9.68 44.5 10.3272 44.5 11.22V13.26C44.5 13.2639 44.4996 13.2672 44.4991 13.27H40.9922H40.5134L40.4927 13.7483L39.0454 47.0896L39.0454 47.0898C38.9615 49.0404 37.5005 50.5 35.8008 50.5H9.19922C7.50541 50.5 6.03847 49.0341 5.95461 47.0897L5.95461 47.0896L4.50734 13.7483L4.48658 13.27H4.00781H0.500951C0.50038 13.2672 0.5 13.2639 0.5 13.26V11.22C0.5 10.3272 1.1529 9.68 1.875 9.68H9.375H9.875V9.18V4.08C9.875 2.06523 11.3716 0.5 13.125 0.5H31.875C33.6284 0.5 35.125 2.06523 35.125 4.08V9.18ZM31.4062 9.68H31.9062V9.18V4.59V4.09H31.4062H13.5938H13.0938V4.59V9.18V9.68H13.5938H31.4062Z"
                            fill="rgb(239 68 68 / 80%)"
                            stroke="rgb(239 68 68 / 80%)"
                        />
                    </svg>
                </button>
            )}
            <span
                style={style}
                className="flex items-center h-6 px-3 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full"
            >
                {name}
            </span>
            <h4 className="mt-3 text-sm font-medium">{description}</h4>
            <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
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
                    <img
                        className="w-6 h-6 rounded-full"
                        src={`https://avatars.dicebear.com/api/adventurer/${ownerUser?.name}.svg`}
                        alt="random"
                    />
                </div>
            </div>
        </div>
    );
}
