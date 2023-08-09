import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from './api';

export const loadPhotoAction = createAsyncThunk('setting/load-photo', async () => {
  return api.loadList();
})

export const loadNamespaceAction = createAsyncThunk('setting/load', async () => {
  return api.load();
})

export const updateNamespace = createAsyncThunk('setting/update', async (data: any) => {
  return api.update(data);
})