import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./state";
import { loadNamespace } from "./actions";

const slice = createSlice({
  name: 'layout',
  initialState: initialState,
  reducers: {
    openModal: (state) => {
      state.namespace_modal.open = true;
    },
    setSelect: (state, { payload }: PayloadAction<string>) => {
      state.namespace_modal.select = payload;
    },
    deSelect: (state) => {
      delete state.namespace_modal.select;
    },
    closeModal: (state) => {
      state.namespace_modal.open = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(loadNamespace.fulfilled, (state, { payload }) => {
      state.namespace_modal.list = payload!
    })
  }
})

export const { reducer, actions } = slice;
export default reducer;