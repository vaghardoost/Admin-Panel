import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResult } from "../../../model/api";
import { Category } from "../../../model/category";
import { Note } from "../../../model/note";
import { initialState, State } from "./state";
import * as action from "./actions";

const slice = createSlice({
  name: 'note-add',
  initialState: initialState,
  reducers: {
    changeTitle: action.changeTitle,
    pushTag: action.pushTag,
    pullTag: action.pullTag,
    setCategorySelected: action.setCategorySelected,
    modalSave: action.modalSave,
    modalSaveStatus: action.modalSaveStatus,
    modalLoad: action.modalLoad,
    modalLoadSelect: action.modalLoadSelect,
    drawerCategory:action.drawerCategory,
    drawerPhoto:action.drawerPhoto,
    setNote: action.setNote,
    setEditable: action.setEditable,
    reset: action.reset,
    resetCategory: action.resetCategory,
    addSection: action.addSection,
    updateSection: action.updateSection,
    moveSection: action.moveSection,
    removeSection: action.removeSection,
    setNotePhoto: action.setNotePhoto,
    resetNotePhoto: action.resetNotePhoto,
    quick: action.quick,
    resetQuick: action.resetQuick,

  },
  extraReducers(builder) {
    builder.addCase(action.loadCategoryList.fulfilled, loadCategoryListState);
    builder.addCase(action.loadPhoto.fulfilled, loadPhotoListState);
    builder.addCase(action.addNote.fulfilled, addNoteState);
    builder.addCase(action.loadNote.fulfilled, loadNoteState);
    builder.addCase(action.update.fulfilled, updateNoteState);
  },
});

const updateNoteState = (state: State, action: PayloadAction<ApiResult<Note>>) => {
  const { success } = action.payload;
}

const loadNoteState = (state: State, action: PayloadAction<ApiResult<Note>>) => {
  const { success, payload } = action.payload;
  state.note = payload!;
}

const addNoteState = (state: State, action: PayloadAction<ApiResult<Note>>) => {
  const { success } = action.payload;
}

const loadPhotoListState = (state: State, action: PayloadAction<ApiResult<any>>) => {
  const result = [];
  const { files } = action.payload.payload!;
  for (const file of files) {
    if (!file.startsWith('demo')) {
      result.push(file);
    }
  }
  result.reverse();
  state.photo.list = result;
}

const loadCategoryListState = (state: State, action: PayloadAction<ApiResult<Category[]>>) => {
  const { success, payload } = action.payload;
  state.category.list = payload!;
}


export const { reducer, actions } = slice;
export default reducer;
