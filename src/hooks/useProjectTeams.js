import React from 'react';
import Project from '../components/Projects/ProjectTeams/Project';
import { useGetProjectTeamsQuery } from '../features/Project/projectApi';

export default function useProjectTeams(type) {
    const { data: allTeams, isLoading, isError } = useGetProjectTeamsQuery(type);

    const teamLength = allTeams?.length;

    let content;
    if (isLoading) content = <div>Loading...</div>;
    if (!isLoading && isError) content = <div>There is an error</div>;
    if (!isLoading && !isError && allTeams?.length === 0) content = <div>No Team Founded</div>;
    if (!isLoading && !isError && allTeams?.length > 0)
        content = [...allTeams]
            .sort((a, b) => b.timestamp - a.timestamp)
            .map((team) => <Project key={team.id} team={team} />);

    return { content, teamLength };
}
