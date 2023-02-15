import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResult } from "../../../model/api";
import { Category } from "../../../model/category";
import { deleteCat, loadCatList, refreshServer } from "./actions";
import { initialState, State } from "./state";

const slice = createSlice({
  name: 'category',
  initialState: initialState,
  reducers: {
    select: (state: State, action: PayloadAction<Category>) => {
      state.select = action.payload;
    },
    modalDelete: (state: State, action: PayloadAction<boolean>) => {
      state.modal.delete.show = action.payload;
    },
    modalMessageClose: (state:State) => {
      state.modal.message.show = false;
    },
    reset: (state: State) => {
      delete state.select;
    },
  },
  extraReducers(builder) {
    builder.addCase(loadCatList.fulfilled, (state: State, action: PayloadAction<ApiResult<Category[]>>) => {
      const { success, payload } = action.payload;
      if (success) {
        state.list = payload!;
      }
    });
    builder.addCase(deleteCat.fulfilled, (state: State, action: PayloadAction<ApiResult<any>>) => {
      const { success, payload } = action.payload;
      if (success) {
        state.list = payload!;
      }
    });
    builder.addCase(refreshServer.fulfilled, (state: State) => {      
      state.modal.message = {
        show: true,
        title: "رفع اشکال سرور",
        content: "درخواست رفع اشکال سرور انجام شد."
      }
    });
  },
});



export const { reducer, actions } = slice;
export default reducer;