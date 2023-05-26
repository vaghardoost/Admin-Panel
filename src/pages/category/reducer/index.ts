import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteCat, loadCategory, loadCatList } from "./actions";
import { initialState, State } from "./state";

const slice = createSlice({
  name: 'category',
  initialState: initialState,
  reducers: {
    reset: (state: State) => {
      delete state.select;
    },
    loading: (state: State, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    }
  },
  extraReducers(builder) {
    builder.addCase(loadCatList.fulfilled, (state, action) => {
      const { success, payload } = action.payload;
      if (success) {
        state.list = payload!;
      }
    });

    builder.addCase(deleteCat.fulfilled, (state, action) => {
      const { success, payload } = action.payload;
      if (success) {
        state.list = payload!;
      }
    });

    builder.addCase(loadCategory.fulfilled, (state, action) => {
      const { success, payload } = action.payload;
      if (success) {
        state.select = payload!;
      }
      state.loading = false;
    })
  },
});



export const { reducer, actions } = slice;
export default reducer;