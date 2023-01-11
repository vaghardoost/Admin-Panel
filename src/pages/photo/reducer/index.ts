import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResult } from "../../../model/api";
import { downloadPhoto, loadPhotoList, removePhoto } from "./actions";
import State, { initialState } from "./state";
import { saveModalAction, deleteModalAction, deSelectAction } from "./actions"

const slice = createSlice({
  name:'file/photo',
  initialState:initialState,
  reducers:{
    modalSave:saveModalAction,
    modalDelete:deleteModalAction,
    deSelect:deSelectAction
  },
  extraReducers(builder) {
    builder.addCase(loadPhotoList.fulfilled,loadPhotoListState);
    builder.addCase(downloadPhoto.fulfilled,downloadState);
    builder.addCase(removePhoto.fulfilled,removeState);
  },
})

const removeState = (state:State) => {
  state.modal.delete = false;
}

const loadPhotoListState = (state:State,action:PayloadAction<ApiResult<any[]>>)=>{
  const { payload } = action.payload;
  const list:string[] = [];
  for (const item of payload!) {
    list.push(item.id);
  }
  state.list = list;
}

const downloadState = (state:State,action:PayloadAction<{id:string,content:string}>) => {
  state.select = action.payload;
}

const { reducer,actions } = slice;
export default reducer;
export const { modalDelete, modalSave, deSelect } = actions;
