import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Projects from '../components/Projects/ProjectTeams/Projects';
import Navbar from '../components/ui/Navbar';

export default function ProjectTeams() {
    return (
        <>
            <Navbar search />
            <div className="px-10 mt-6">
                <h1 className="text-2xl font-bold">Project Board</h1>
            </div>
            <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">
                <DndProvider backend={HTML5Backend}>
                    <Projects />
                </DndProvider>
                <div className="flex-shrink-0 w-6" />
            </div>
        </>
    );
}
