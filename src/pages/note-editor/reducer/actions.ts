import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import File from "../../../model/file";
import { Note } from "../../../model/note";
import { patternToObject } from "../../../render";
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

export const pickerPhotoSelect = (state:State,action:PayloadAction<File>) => {
  state.picker.photo = {
    ...state.picker.photo,
    select:action.payload
  }
}

export const pickerPhotoCaption = (state:State,action:PayloadAction<string>)=>{
  state.picker.photo = {
    ...state.picker.photo,
    caption:action.payload
  }
}

export const changeContent = (state:State,action:PayloadAction<string>)=>{
  state.raw = action.payload;
  state.note.content = patternToObject(action.payload);
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

export const setModalPhoto = (state:State,action:PayloadAction<boolean>)=>{
  state.picker.photo.open = action.payload;
}

export const setEditable = (state:State,action:PayloadAction<string>) => {
  state.edit = action.payload
}

export const reset = (state:State) => {
  state.note = {
    ...initialState.note,
  }
  state.raw = '';
  delete state.edit;
}

export const resetCat = (state:State) => {
  delete state.note.category;
}
