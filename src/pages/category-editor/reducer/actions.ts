import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { initialState, State } from "./state"
import * as api from './api';
import { Category } from "../../../model/category";

export const reset = (state: State) => {
  state.category = { ...initialState.category }
  state.dialog = { ...initialState.dialog }
  delete state.ediable;
}

export const setParent = (state: State, action: PayloadAction<string>) => {
  state.category.parent = action.payload;
}

export const dialog = (state: State, action: PayloadAction<{ title: string, message: string }>) => {
  state.dialog = {
    ...action.payload,
    open: true
  }
}

export const dialogClose = (state: State) => {
  state.dialog.open = false;
}

export const setEditable = (state: State, action: PayloadAction<string>) => {
  state.ediable = action.payload;
}

export const setAvatar = (state: State, action: PayloadAction<string>) => {
  const { category } = state;
  state.category = {
    ...category,
    avatar: action.payload
  }
}

export const setNoAvatar = (state: State, action: PayloadAction<string>) => {
  const { category } = state;
  delete state.category.avatar;
}

export const setColor = (state: State, action: PayloadAction<string>) => {
  const { category } = state;
  state.category = {
    ...category,
    color: action.payload
  }
}

export const setDesc = (state: State, action: PayloadAction<string>) => {
  const { category } = state;
  state.category = {
    ...category,
    description: action.payload
  }
}

export const setNoColor = (state: State) => {
  const { category } = state;
  delete category.color;
}

export const setLabel = (state: State, action: PayloadAction<string>) => {
  const { category } = state;
  category.label = action.payload;
}

// ------------------------------------------------------------------------------------- 

export const loadPhoto = createAsyncThunk('category-editor/load-photo', async () => {
  return api.loadPhoto();
});

export const loadCategory = createAsyncThunk('category-editor/load', async (id: string) => {
  return api.loadCategory(id);
});

export const addCategory = createAsyncThunk('category-editor/add', async (category: Category) => {
  return api.addCategory(category)
});

export const editCategory = createAsyncThunk('category-editor/edit', async (args: { id: string, category: Category }) => {
  return api.updateCategory(args.id, args.category)
})

