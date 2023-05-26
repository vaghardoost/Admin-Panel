import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResult } from "../../../model/api";
import { loadPhotoList, removePhoto } from "./actions";
import State, { initialState } from "./state";

const slice = createSlice({
  name: 'file/photo',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadPhotoList.fulfilled, loadPhotoListState);
    builder.addCase(removePhoto.fulfilled, removeState);
  },
})

const removeState = (state: State) => {
  state.modal.delete = false;
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
  state.list = result;
}


const { reducer } = slice;
export default reducer;
