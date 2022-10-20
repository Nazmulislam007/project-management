import React from 'react';
import { useSelector } from 'react-redux';
import { useGetTeamsQuery } from '../../features/team/teamApi';
import Team from './Team';

export default function TeamWraper() {
    const { user } = useSelector((state) => state.auth) || {};
    const { email } = user || {};
    const { data: teams, isLoading, isError } = useGetTeamsQuery(email);

    let content;
    if (isLoading) content = <div>Loading...</div>;
    if (!isLoading && isError) content = <div>There is an error</div>;
    if (!isLoading && !isError && teams?.length === 0) content = <div>No Team Founded</div>;
    if (!isLoading && !isError && teams?.length > 0)
        content = [...teams]
            .sort((a, b) => b.timestamp - a.timestamp)
            .map((team) => <Team key={team.id} team={team} />);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-10 mt-4 gap-6 overflow-auto">
            {content}
        </div>
    );
}
