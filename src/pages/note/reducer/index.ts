import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResult } from "../../../model/api";
import { Category } from "../../../model/category";
import { Note } from "../../../model/note";
import { categoryListAction, getNoteAction, queryAction, removeNoteAction, refreshServer } from "./action";
import { Filter, initialState, State } from "./state";

const slice = createSlice({
    name: 'notes',
    initialState: initialState,
    reducers: {
        setFilter: (state: State, action: PayloadAction<Filter>) => {
            state.filter = action.payload;
        },
        cleanFilter: (state: State) => {
            state.filter = {}
        },
        closeModal: (state: State) => {
            state.select.status = 'close'
        },
        removeModal: (state: State, action: PayloadAction<{ id: string, open: boolean }>) => {
            state.remove = action.payload
        },
        modalMessageClose: (state: State) => {
            state.message.show = false;
        },
    },
    extraReducers(builder) {
        builder.addCase(queryAction.fulfilled, queryState);
        builder.addCase(categoryListAction.fulfilled, categoryListState);
        builder.addCase(getNoteAction.fulfilled, getNoteState);
        builder.addCase(removeNoteAction.fulfilled, removeNoteState)
        builder.addCase(refreshServer.fulfilled, refreshServerState)
    },
})

const refreshServerState = (state: State) => {
    state.message = {
        show: true,
        title: "رفع اشکال سرور",
        content: "درخواست رفع اشکال سرور انجام شد."
    }
};

const removeNoteState = (state: State, action: PayloadAction<ApiResult<any>>) => {
    if (action.payload.success) {
        state.remove.open = false;
    }
}

const getNoteState = (state: State, action: PayloadAction<ApiResult<Note>>) => {
    const { payload } = action.payload;
    state.select.note = payload
    state.select.status = 'showing'
}

const queryState = (state: State, action: PayloadAction<ApiResult<Note[]>>) => {
    state.note = action.payload.payload!;
}

const categoryListState = (state: State, action: PayloadAction<ApiResult<Category[]>>) => {
    const { success, payload } = action.payload;
    if (success) {
        state.categoryList = payload!;
    }
}

export const { actions, reducer } = slice;
export default reducer;
