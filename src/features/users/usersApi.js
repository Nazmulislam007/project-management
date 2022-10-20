import apiSlice from '../api/apiSlice';

const usersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllUser: builder.query({
            query: (id) => `/users?id_ne=${id}`
        })
    })
});

export const { useGetAllUserQuery } = usersApi;
