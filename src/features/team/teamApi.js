/* eslint-disable eqeqeq */

import socket from '../../utils/socket';
import apiSlice from '../api/apiSlice';

const teamApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTeams: builder.query({
            query: (email) => `/teams?q=${email}`,

            async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
                try {
                    await cacheDataLoaded;
                    socket.on('teams', (data) => {
                        // When a team member who is not the team leader adds a new member, the cache is also updated.
                        updateCachedData((draft) => {
                            const team = draft.find((t) => t.id == data?.data?.id);
                            if (team?.id) {
                                team?.users.push(data.data.users[data.data.users.length - 1]);
                            }
                        });
                    });
                } catch (err) {
                    console.log(err);
                }

                await cacheEntryRemoved;
                socket.close();
            }
        }),

        addTeams: builder.mutation({
            query: (data) => ({
                method: 'POST',
                url: '/teams',
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const result = await (await queryFulfilled).data;

                if (result) {
                    dispatch(
                        apiSlice.util.updateQueryData('getTeams', result.owner, (draft) => {
                            draft.push(result);
                        })
                    );
                    dispatch(
                        apiSlice.util.updateQueryData('getProjectTeams', result.stage, (draft) => {
                            draft.push(result);
                        })
                    );
                }
            }
        }),
        addTeamMate: builder.mutation({
            query: ({ id, data }) => ({
                method: 'PATCH',
                url: `/teams/${id}`,
                body: data
            })
            // async onQueryStarted(arg, { queryFulfilled, dispatch }) {
            //     const result = await (await queryFulfilled).data;

            //     if (result) {
            //         dispatch(
            //             apiSlice.util.updateQueryData('getTeams', result.owner, (draft) => {
            //                 const prevData = draft.find((team) => team.id == arg.id);
            //                 prevData?.users.push(arg.user);
            //             })
            //         );
            //     }
            // }
        }),
        deleteTeam: builder.mutation({
            query: ({ id }) => ({
                method: 'DELETE',
                url: `/teams/${id}`
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                await (
                    await queryFulfilled
                ).data;

                dispatch(
                    apiSlice.util.updateQueryData('getTeams', arg?.email, (draft) =>
                        draft?.filter((team) => team.id !== arg?.id)
                    )
                );
                dispatch(
                    apiSlice.util.updateQueryData('getProjectTeams', 'backlog', (draft) =>
                        draft?.filter((team) => team.id !== arg?.id)
                    )
                );
            }
        })
    })
});

export const {
    useAddTeamsMutation,
    useGetTeamsQuery,
    useDeleteTeamMutation,
    useAddTeamMateMutation
} = teamApi;
