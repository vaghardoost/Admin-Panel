import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import File from "../../../model/file";
import { Note } from "../../../model/note";
import { patternToObject } from "../../../render";
import { loadCategory, loadNote as apiLoadNote, saveNote as apiSaveNote,loadList } from "./api";
import { initialState, State } from "./state";

export const loadCategoryList = createAsyncThunk('note-add/catlist',async ()=>{
  return await loadCategory();
});

export const loadNote = createAsyncThunk('note-add/load',async(id:string)=>{
  return await apiLoadNote(id);
});

export const addNote = createAsyncThunk('note-add/add',async(note:Note)=>{
  return await apiSaveNote(note);
});

export const loadPhoto = createAsyncThunk('note-add/load/photo',async()=>{
  return await loadList();
});

// -----------------------------------------------------------------------

export const closeAlertModal = (state:State) => {
  state.picker.alert = initialState.picker.alert
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
