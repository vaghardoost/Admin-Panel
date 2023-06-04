import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./api"

export const loadListAction = createAsyncThunk('datapack/list', async () => {
  return api.loadList();
})

export const deleteDatapackAction = createAsyncThunk('datapack/delete', async (id:string) => {
  return api.deleteDatapack(id);
})
