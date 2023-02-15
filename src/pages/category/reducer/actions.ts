import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiResult } from "../../../model/api";
import { Category } from "../../../model/category";
import * as api from "./api"


export const loadCatList = createAsyncThunk(
  'category/load',
  async (): Promise<ApiResult<Category[]>> => await api.loadCategory()
)


export const deleteCat = createAsyncThunk(
  'category/delete',
  async (id: string): Promise<ApiResult<Category[]>> => {
    await api.deleteCategory(id);
    return await api.loadCategory();
  }
)

export const refreshServer = createAsyncThunk('category/refresh', async () => api.refreshServer())