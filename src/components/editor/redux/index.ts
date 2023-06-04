import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./state"
import { Environment, SectionType } from "../../../model/note";

const slice = createSlice({
  initialState: initialState,
  name: 'editor',
  reducers: {
    seteditSectionId: (state, { payload: id }: PayloadAction<string>) => {
      state.editSectionId = id
    },
    deleteSection: (state, { payload: id }: PayloadAction<number>) => {
      state.content!.splice(id, 1);
      delete state.editSectionId
    },
    moveSectionDown: (state, { payload: index }: PayloadAction<number>) => {
      const { content } = state;
      const sabad = content![index + 1];
      content![index + 1] = content![index];
      content![index] = sabad;
    },
    moveSectionUp: (state, { payload: index }: PayloadAction<number>) => {
      const { content } = state;
      const sabad = content![index - 1];
      content![index - 1] = content![index];
      content![index] = sabad;
    },
    closeEditSection: (state) => {
      delete state.editSectionId;
    },
    addSection: (state, action: PayloadAction<SectionType>) => {
      state.content.push(action.payload);
      state.editSectionId = action.payload.id;
    },
    updateSection: (state, action: PayloadAction<{ index: number, section: SectionType }>) => {
      const { index, section } = action.payload;
      state.content![index] = section;
    },
    setContent: (state, action: PayloadAction<SectionType[]>) => {
      state.content = action.payload;
    },
    setPhotoList: (state, action: PayloadAction<string[]>) => {
      state.data.photoList = action.payload;
    },
    setDisableSections: (state, action: PayloadAction<string[]>) => {
      state.disableSection = action.payload;
    },
    reset: (state) => {
      state.content = [];
      state.disableSection = [];
      delete state.env;
      delete state.editSectionId;
    },
  }
})

export const reducer = slice.reducer;
export const actions = slice.actions;

export const store = configureStore({ reducer: reducer })
export const dispatch = store.dispatch
