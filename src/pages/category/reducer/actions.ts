import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiResult } from "../../../model/api";
import { Category } from "../../../model/category";
import * as api from "./api"


export const loadCatList = createAsyncThunk(
  'category/load',
  async ():Promise<ApiResult<Category[]>> => await api.loadCategory()
)

export const addCat = createAsyncThunk(
  'category/add',
  async (data:Category):Promise<ApiResult<Category[]>> => {
      await api.addCategory(data);
      return await api.loadCategory();
  }
)

export const deleteCat = createAsyncThunk(
  'category/delete',
  async (id:string):Promise<ApiResult<Category[]>>=>{
      await api.deleteCategory(id);
      return await api.loadCategory();
  }
)

export const updateCat = createAsyncThunk(
  'category/update',
  async (data:{id:string,category:Category}):Promise<ApiResult<Category[]>>=>{
      await api.updateCategory(data.id,data.category);
      return await api.loadCategory();
  }
)

export const loadPhoto = createAsyncThunk('note-add/load/photo',async()=>{
  return await api.loadPhotoList();
});