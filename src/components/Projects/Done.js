import React from 'react';
import useDragDrop from '../../hooks/useDragDrop';
import useProjectTeams from '../../hooks/useProjectTeams';
import { type_done } from '../../utils/type';

export default function Done() {
    const { content, teamLength } = useProjectTeams(type_done);
    const { drop, isOver } = useDragDrop(type_done);

    return (
        <div
            ref={drop}
            className={`flex flex-col flex-shrink-0 ${
                isOver ? 'bg-white/20 backdrop-blur-sm' : ''
            } w-72`}
        >
            <div className="flex items-center flex-shrink-0 h-10 px-2">
                <span className="block text-sm font-semibold">Done</span>
                <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
                    {teamLength}
                </span>
            </div>
            <div className="flex flex-col pb-2 overflow-auto">{content}</div>
        </div>
    );
}
