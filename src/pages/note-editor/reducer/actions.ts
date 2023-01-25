import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Caption, Code, Frame, Note, Photo, Title } from "../../../model/note";
import * as api from "./api";
import { initialState, State } from "./state";

export const loadCategoryList = createAsyncThunk('note-update/catlist',async ()=>{
  return await api.loadCategory();
});

export const loadNote = createAsyncThunk('note-update/load',async(id:string)=>{
  return await api.loadNote(id);
});

export const addNote = createAsyncThunk('note-update/add',async(note:Note)=>{
  return await api.saveNote(note);
});

export const update = createAsyncThunk('note-update/update',async(note:Note)=>{
  return api.updateNote(note);
})

export const loadPhoto = createAsyncThunk('note-update/load/photo',async()=>{
  return await api.loadPhotoList();
});

// -----------------------------------------------------------------------

export const alertModal = (state:State,action:PayloadAction<{open:boolean,title?:string,message?:string}>) => {
  const {message,open,title} = action.payload;
  state.picker.alert = (open)
    ? { message:message!,title:title!,open:open,status:'black'}
    : initialState.picker.alert 
}

export const changePage = (state:State,action:PayloadAction<'edit'|'code'|'view'>)=>{
  state.page = action.payload;
}

export const changeTitle = (state:State,action:PayloadAction<string>)=>{
  state.note.title = action.payload;
}

export const setTag = (state:State,action:PayloadAction<string[]>)=>{
  state.note.tag = action.payload;
}

export const setButtonLoad = (state:State)=>{
  state.category.buttonStatus = "loading";
}

export const setCategorySelected = (state:State,action:PayloadAction<string>)=>{
  state.note.category = action.payload;
}

export const modalSave = (state:State,action:PayloadAction<boolean>)=>{
  state.draft.save = {
      modal:action.payload,
      status:'normal'
  }
}

export const modalSaveStatus = (state:State,action:PayloadAction<'validation'|'duplicate'>)=>{
  state.draft.save.status = action.payload;
}

export const modalLoad = (state:State,action:PayloadAction<boolean>)=>{
  state.draft.load = {
      modal:action.payload,
      status:undefined
  }
}

export const modalLoadSelect = (state:State,action:PayloadAction<string>)=>{
  state.draft.load.status = action.payload;
}

export const setNote = (state:State,action:PayloadAction<Note>)=>{
  state.note = action.payload; 
}

export const setEditable = (state:State,action:PayloadAction<string>) => {
  state.edit = action.payload
}

export const reset = (state:State) => {
  state.note = {
    ...initialState.note,
  }
  delete state.edit;
}

export const resetCat = (state:State) => {
  delete state.note.category;
}

export const addSection = (state:State,action:PayloadAction<Caption|Photo|Frame|Title|Code>) => {
  state.note.content!.push(action.payload);
}

export const updateSection = (state:State,action:PayloadAction<{index:number,section:Caption|Photo|Frame|Title|Code}>) => {
  const {index,section} = action.payload;
  state.note.content![index] = section;
}

export const moveSection = (state:State,action:PayloadAction<{index:number,dest:'up'|'down'}>) => {
  const { dest,index } = action.payload;
  const { content } = state.note;
  const i = (dest === 'up') ? -1 : 1;
  
  const sabad = content![index + i];
  content![index + i] = content![index];
  content![index] = sabad;
}

export const removeSection = (state:State,action:PayloadAction<{index:number}>) => {
  const { index } = action.payload;
  const { content } = state.note;
  content!.splice(index,1);
}
