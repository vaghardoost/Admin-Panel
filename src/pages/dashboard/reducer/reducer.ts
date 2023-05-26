import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./state";

const slice = createSlice({
    name: 'dashboard',
    initialState: initialState,
    reducers: {}
})

const {reducer,actions} = slice;
export default reducer;
