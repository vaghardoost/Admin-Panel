import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./api";
import { Filter } from "./state";

export const getNoteAction = createAsyncThunk('notes/get',async (id:string) => {
  return await api.getNote(id);
})

export const queryAction = createAsyncThunk('notes/query',async (filter:Filter)=> {
  return await api.getNoteList();
})

export const categoryListAction = createAsyncThunk('notes/category',async()=>{
  return await api.categoryList();
})

export const removeNoteAction = createAsyncThunk('notes/remove',async(id:string)=>{
  return await api.removeNote(id);
})

export const refreshServer = createAsyncThunk('notes/refresh', async () => api.refreshServer())