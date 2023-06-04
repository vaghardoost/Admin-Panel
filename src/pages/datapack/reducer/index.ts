import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./state";
import { deleteDatapackAction, loadListAction } from "./actions";

const slice = createSlice({
  name: 'datapack',
  initialState: initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    }
  },
  extraReducers(builder) {
    builder.addCase(loadListAction.fulfilled, (state, { payload }) => {
      state.list = payload ?? [];
    })
    builder.addCase(deleteDatapackAction.fulfilled, (state, { payload }) => {
      state.list = payload!;
      state.loading = false;
    })
  },
})

export const { reducer, actions } = slice;
export default reducer;
