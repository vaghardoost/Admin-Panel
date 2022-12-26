import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { loadList, download, remove } from "./api";
import State from "./state";

export const loadPhotoList = createAsyncThunk('photo/load',async ()=>{
  return await loadList();
});

export const downloadPhoto = createAsyncThunk('photo/download',async (id:string) => {
  return await download(id);
});

export const removePhoto = createAsyncThunk('photo/remove',async (id:string) => {
  return await remove(id);
})

export const saveModalAction = (state:State,action:PayloadAction<boolean>)=>{
  state.modal.save = action.payload;
}

export const deleteModalAction = (state:State,action:PayloadAction<boolean>)=>{
  state.modal.delete = action.payload;
}


export const deSelectAction = (state:State) => {
  state.select = undefined;
}