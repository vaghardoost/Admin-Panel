import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResult } from "../../../model/api";
import { Category } from "../../../model/category";
import { Note, SectionType } from "../../../model/note";
import { initialState, State } from "./state";
import * as action from "./actions";

const slice = createSlice({
  name: 'note-add',
  initialState: initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.note.title = action.payload;
    },
    pushTag: (state, action: PayloadAction<string>) => {
      const { tag } = state.note;
      if (!tag.includes(action.payload)) tag.push(action.payload);
    },
    pullTag: (state, action: PayloadAction<string>) => {
      const { tag } = state.note;
      const index = tag.indexOf(action.payload);
      if (index > -1) tag.splice(index, 1)
    },
    setCategorySelected: (state, action: PayloadAction<string>) => {
      state.note.category = action.payload;
    },
    drawerDraft: (state, action: PayloadAction<boolean>) => {
      state.draft = action.payload;
    },
    drawerCategory: (state, action: PayloadAction<boolean>) => {
      state.category.open = action.payload;
    },
    drawerPhoto: (state, action: PayloadAction<boolean>) => {
      state.photo.open = action.payload;
    },
    setContent: (state, action: PayloadAction<SectionType[]>) => {
      state.note.content = action.payload;
    },
    setEditable: (state, action: PayloadAction<string>) => {
      state.edit = action.payload
    },
    reset: (state) => {
      state.note = { ...initialState.note };
      delete state.edit;
    },
    resetCategory: (state) => {
      delete state.note.category;
    },
    setNotePhoto: (state, action: PayloadAction<string>) => {
      state.note.photo = action.payload;
    },
    resetNotePhoto: (state) => {
      delete state.note.photo;
    },
    loadingState: (state) => {
      state.pageState = { loading: true };
    }
  },

  extraReducers(builder) {
    builder.addCase(action.loadCategoryList.fulfilled, loadCategoryListState);
    builder.addCase(action.loadPhoto.fulfilled, loadPhotoListState);
    builder.addCase(action.saveNote.fulfilled, saveNoteState);
    builder.addCase(action.loadNote.fulfilled, loadNoteState);
    builder.addCase(action.update.fulfilled, updateNoteState);
  },
});

const updateNoteState = (state: State, action: PayloadAction<ApiResult<Note>>) => {
  const { success, payload } = action.payload;
  if (success) {
    state.pageState = {}
    state.edit = payload?.id;
  }
}

const loadNoteState = (state: State, action: PayloadAction<ApiResult<Note>>) => {
  const { success, payload } = action.payload;
  state.note = payload!;
}

const saveNoteState = (state: State, action: PayloadAction<ApiResult<Note>>) => {
  const { success, payload } = action.payload;
  if (success) {
    state.pageState = {}
    state.edit = payload?.id;
  }
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
