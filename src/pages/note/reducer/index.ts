import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./state";
import { getNoteList, categoryList, removeNoteAction } from "./actions"

const slice = createSlice({
    name: 'notes',
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getNoteList.fulfilled, (state, { payload }) => {
            state.note = payload.payload.payload!;
        });
        builder.addCase(categoryList.fulfilled, (state, payload) => {
            state.category = payload.payload.payload!;
        });
        builder.addCase(removeNoteAction.fulfilled, (state, { payload }) => {
            state.note = payload.payload.payload!;
        });
    },
})


export const { actions, reducer } = slice;
export default reducer;
