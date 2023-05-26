import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResult } from "../../../model/api";
import { loginAction } from "./actions";
import { LoginApiResult } from "./api";
import { initialState, State } from "./state";

const slice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {
        loading: (state: State) => {
            state.status = "loading";
        },
        changeStatus: (state: State, action: PayloadAction<boolean>) => {
            state.status = (action.payload) ? "success" : "normal";
        }
    },
    extraReducers(builder) {
        builder.addCase(loginAction.fulfilled, loginActionState);
    },
})

export const loginActionState = (state: State, action: PayloadAction<ApiResult<LoginApiResult>>) => {
    const { success, payload } = action.payload;
    if (success) {
        state.status = "success";
        sessionStorage.setItem('token', payload!.token);
        sessionStorage.setItem('file-token', payload!.fileToken);
    } else {
        state.status = "error";
        state.message = action.payload.message;
    }
}

const { reducer, actions } = slice;
export default reducer;
export const { loading, changeStatus } = actions;
