import React from 'react';
import TeamHeader from '../components/teams/TeamHeader';
import TeamWraper from '../components/teams/TeamWrapper';
import Navbar from '../components/ui/Navbar';

export default function Teams() {
    return (
        <>
            <Navbar search={false} />
            <TeamHeader />
            <TeamWraper />
        </>
    );
}
