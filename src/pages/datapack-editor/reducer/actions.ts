import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./api";
import { Environment, SectionType } from "../../../model/note";

export const loadPhotoAction = createAsyncThunk('datapack-editor/photos', async () => {
  return api.loadPhotoList();
})

export const saveDatapackAction = createAsyncThunk('datapack-editor/save', async (data: { title: string, content: SectionType[], env: Environment }) => {
  return api.saveDatapack(data);
})

export const loadDatapackAction = createAsyncThunk('datapack-editor/load', async (id: string) => {
  return api.loadDatapack(id);
})

export const updateDatapackAction = createAsyncThunk('datapack-editor/update', async (data: { id: string, title: string, content: SectionType[], env: Environment }) => {
  return api.updateDatapack(data);
})

export const setIndexDatapackId = createAsyncThunk('datapack-editor/IndexDatapack', async (id: string) => {
  return api.setIndexDatapackId(id);
})