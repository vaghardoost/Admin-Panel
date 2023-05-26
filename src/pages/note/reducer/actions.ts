import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./api";

export const getNoteList = createAsyncThunk('notes/list',async () => {
  return await api.getNoteList();
})

export const getNoteAction = createAsyncThunk('notes/get',async (id:string) => {
  return await api.getNote(id);
})

export const categoryList = createAsyncThunk('notes/category',async()=>{
  return await api.categoryList();
})

export const removeNoteAction = createAsyncThunk('notes/remove',async(id:string)=>{
  return await api.removeNote(id);
})

export const refreshServer = createAsyncThunk('notes/refresh', async () => api.refreshServer())