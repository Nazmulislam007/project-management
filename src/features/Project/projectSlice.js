import { createSlice } from '@reduxjs/toolkit';

const projectSlice = createSlice({
    name: 'project',
    initialState: { input: '' },
    reducers: {
        seachInput: (state, action) => {
            state.input = action.payload;
        }
    }
});

export const { seachInput } = projectSlice.actions;
export default projectSlice.reducer;
