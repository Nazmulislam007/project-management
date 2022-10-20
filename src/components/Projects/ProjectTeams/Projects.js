import React from 'react';
import Backlog from '../Backlog';
import Blocked from '../Blocked';
import Doing from '../Doing';
import Done from '../Done';
import Ready from '../Ready';
import Review from '../Review';

export default function Projects() {
    return (
        <>
            <Backlog />
            <Ready />
            <Doing />
            <Review />
            <Blocked />
            <Done />
        </>
    );
}
