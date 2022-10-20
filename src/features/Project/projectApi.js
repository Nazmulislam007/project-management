/* eslint-disable eqeqeq */
import apiSlice from '../api/apiSlice';

const projectApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProjectTeams: builder.query({
            query: (stage) => `/teams?stage_like=${stage}`
        }),
        editProjectTeams: builder.mutation({
            query: ({ id, data }) => ({
                method: 'PATCH',
                url: `/teams/${id}`,
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const updateCache = dispatch(
                    apiSlice.util.updateQueryData('getProjectTeams', arg?.prevStage, (draft) => {
                        const index = draft.findIndex((item) => item.id === arg.id);
                        draft.splice(index, 1);
                    })
                );

                try {
                    const result = await (await queryFulfilled).data;
                    if (result) {
                        dispatch(
                            apiSlice.util.updateQueryData(
                                'getProjectTeams',
                                result.stage,
                                (draft) => {
                                    draft.push(result);
                                }
                            )
                        );
                    }
                } catch (err) {
                    updateCache.undo();
                }
            }
        })
    })
});

export const { useGetProjectTeamsQuery, useEditProjectTeamsMutation } = projectApi;
