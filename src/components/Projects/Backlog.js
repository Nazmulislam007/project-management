/* eslint-disable camelcase */
import React, { useState } from 'react';
import useDragDrop from '../../hooks/useDragDrop';
import useProjectTeams from '../../hooks/useProjectTeams';
import { type_backlog } from '../../utils/type';
import Modal from '../Modal';

export default function Backlog() {
    const { content, teamLength } = useProjectTeams(type_backlog);
    const { drop, isOver } = useDragDrop(type_backlog);
    const [open, setOpen] = useState(false);

    return (
        <div
            ref={drop}
            className={`flex flex-col flex-shrink-0 ${
                isOver ? 'bg-white/20 backdrop-blur-sm' : ''
            } w-72`}
        >
            <Modal open={open} setOpen={setOpen} />
            <div className="flex items-center flex-shrink-0 h-10 px-2">
                <span className="block text-sm font-semibold">Backlog</span>
                <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
                    {teamLength}
                </span>
                <button
                    type="button"
                    onClick={() => setOpen((prev) => !prev)}
                    className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                    </svg>
                </button>
            </div>
            <div className="flex flex-col pb-2 overflow-auto">{content}</div>
        </div>
    );
}
