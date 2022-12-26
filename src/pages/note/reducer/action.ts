import { createAsyncThunk } from "@reduxjs/toolkit";
import { categoryList, getNoteList, getNote, removeNote } from "./api";
import { Filter } from "./state";

export const getNoteAction = createAsyncThunk('notes/get',async (id:string) => {
  return await getNote(id);
})

export const queryAction = createAsyncThunk('notes/query',async (filter:Filter)=> {
  return await getNoteList();
})

export const categoryListAction = createAsyncThunk('notes/category',async()=>{
  return await categoryList();
})

export const removeNoteAction = createAsyncThunk('notes/remove',async(id:string)=>{
  return await removeNote(id);
})
