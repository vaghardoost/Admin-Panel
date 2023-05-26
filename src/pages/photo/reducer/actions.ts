import { createAsyncThunk } from "@reduxjs/toolkit";
import { loadList, remove } from "./api";

export const loadPhotoList = createAsyncThunk('photo/load',async ()=>{
  return await loadList();
});

export const removePhoto = createAsyncThunk('photo/remove',async (id:string) => {
  return await remove(id);
})
