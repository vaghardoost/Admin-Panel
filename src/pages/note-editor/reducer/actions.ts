import { createAsyncThunk } from "@reduxjs/toolkit";
import { Note } from "../../../model/note";
import * as api from "./api";

export const loadCategoryList = createAsyncThunk('note-update/catlist', async () => {
  return await api.loadCategory();
});

export const loadNote = createAsyncThunk('note-update/load', async (id: string) => {
  return await api.loadNote(id);
});

export const saveNote = createAsyncThunk('note-update/add', async (note: Note) => {
  return await api.saveNote(note);
});

export const update = createAsyncThunk('note-update/update', async (note: Note) => {
  return api.updateNote(note);
})

export const loadPhoto = createAsyncThunk('note-update/load/photo', async () => {
  return await api.loadPhotoList();
});
