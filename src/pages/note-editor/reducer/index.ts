import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResult } from "../../../model/api";
import { Category } from "../../../model/category";
import { Note } from "../../../model/note";
import { initialState, State } from "./state";
import * as action from "./actions";
import File from "../../../model/file";

const slice = createSlice({
    name: 'note-add',
    initialState: initialState,
    reducers: {
        changePage: action.changePage,
        changeTitle: action.changeTitle,
        setTag: action.setTag,
        setButtonLoad: action.setButtonLoad,
        setCategorySelected: action.setCategorySelected,
        modalSave: action.modalSave,
        modalSaveStatus: action.modalSaveStatus,
        modalLoad: action.modalLoad,
        modalLoadSelect: action.modalLoadSelect,
        setNote: action.setNote,
        alertModal: action.alertModal,
        setEditable: action.setEditable,
        reset: action.reset,
        resetCat: action.resetCat,
        addSection: action.addSection,
        updateSection: action.updateSection,
        moveSection: action.moveSection,
        removeSection: action.removeSection,
        quick: action.quick,
        resetQuick: action.resetQuick,
    },
    extraReducers(builder) {
        builder.addCase(action.loadCategoryList.fulfilled, loadCategoryListState);
        builder.addCase(action.loadPhoto.fulfilled, loadPhotoState);
        builder.addCase(action.addNote.fulfilled, addNoteState);
        builder.addCase(action.loadNote.fulfilled, loadNoteState);
        builder.addCase(action.update.fulfilled, updateNoteState);
    },
});

const updateNoteState = (state: State, action: PayloadAction<ApiResult<Note>>) => {
    const { success } = action.payload;

    state.picker.alert = {
        message: (success) ? 'تغییرات با موفقیت ذخیره شد' : '',
        open: true,
        status: 'black',
        title: 'ویرایش نوشته',
    }
}

const loadNoteState = (state: State, action: PayloadAction<ApiResult<Note>>) => {
    const { success, payload } = action.payload;
    if (!success) {
        state.picker.alert = {
            message: 'نوشته ای با این شناسه یافت نمیشود',
            open: true,
            status: 'red',
            title: 'بازنویسی نوشته'
        }
        return;
    }
    state.note = payload!;
}

const addNoteState = (state: State, action: PayloadAction<ApiResult<Note>>) => {
    const { success } = action.payload;
    if (success) {
        state.picker.alert = {
            message: 'نوشته با موفقیت در سرور ذخیره شد',
            open: true,
            status: 'black',
            title: 'انتشار نوشته'
        }
        state = initialState;
    } else {
        state.picker.alert = {
            message: 'خطایی رخ داد',
            open: true,
            status: 'red',
            title: 'انتشار نوشته'
        }
    }
}

const loadPhotoState = (state: State, action: PayloadAction<ApiResult<File[]>>) => {
    const { payload, success } = action.payload;
    if (success) {
        state.photoList = payload!
    }
}

const loadCategoryListState = (state: State, action: PayloadAction<ApiResult<Category[]>>) => {
    const { success, payload } = action.payload;
    if (success) {
        state.category = {
            list: payload!,
            buttonStatus: "normal"
        }
    }
}


export const { reducer, actions } = slice;
export default reducer;
