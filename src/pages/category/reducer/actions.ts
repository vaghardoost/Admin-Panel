import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiResult } from "../../../model/api";
import { Category } from "../../../model/category";
import * as api from "./api"

export const loadCategory = createAsyncThunk(
  'category/load',
  async (id: string) => await api.loadCategory(id)
)

export const loadCatList = createAsyncThunk(
  'category/loadList',
  async (): Promise<ApiResult<Category[]>> => await api.loadCategoryList()
)


export const deleteCat = createAsyncThunk(
  'category/delete',
  async (id: string): Promise<ApiResult<Category[]>> => {
    await api.deleteCategory(id);
    return await api.loadCategoryList();
  }
)

export const refreshServer = createAsyncThunk('category/refresh', async () => api.refreshServer())