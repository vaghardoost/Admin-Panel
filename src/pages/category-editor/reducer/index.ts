import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState, State } from "./state";
import * as action from "./actions";
import { ApiResult } from "../../../model/api";
import File from "../../../model/file";
import { Category } from "../../../model/category";

const slice = createSlice({
  initialState: initialState,
  name: 'categoryEditor',
  reducers: {
    setTitle: action.setLabel,
    setColor: action.setColor,
    setNoColor: action.setNoColor,
    setDesc: action.setDesc,
    setAvatar: action.setAvatar,
    setNoAvatar: action.setNoAvatar,
    setEditable: action.setEditable,
    dialog: action.dialog,
    dialogClose: action.dialogClose,
    setParent: action.setParent,
    reset: action.reset,
  },
  extraReducers(builder) {
    builder.addCase(action.loadPhoto.fulfilled, loadPhotoState);
    builder.addCase(action.loadCategory.fulfilled, loadCategoryState);
    builder.addCase(action.addCategory.fulfilled, addCategoryState);
    builder.addCase(action.editCategory.fulfilled, editCategoryState);
  },
});

const loadPhotoState = (state: State, action: PayloadAction<ApiResult<File[]>>) => {
  const { payload } = action.payload;
  const list: string[] = [];
  for (const item of payload!) {
    list.push(item.id);
  }
  state.list = list;
}

const loadCategoryState = (state: State, action: PayloadAction<ApiResult<Category>>) => {
  const { payload: result } = action;
  if (result.success) {
    state.category = result.payload!;
  }
}

const addCategoryState = (state: State, action: PayloadAction<ApiResult<Category>>) => {
  const { success } = action.payload;
  if (success) {
    state.dialog = { open: true, title: 'افزودن دسته بندی', message: 'دسته بندی با موفقیت ذخیره شد' }
  } else {
    state.dialog = { open: true, title: 'خطا', message: 'مشکلی رخ داده است' }
  }
}

const editCategoryState = (state: State, action: PayloadAction<ApiResult<Category>>) => {
  const { success } = action.payload;
  if (success) {
    state.dialog = { open: true, title: 'ویرایش دسته بندی', message: 'تغییرات با موفقیت ذخیره شد' }
  } else {
    state.dialog = { open: true, title: 'خطا', message: 'مشکلی رخ داده است' }
  }
}

export const { reducer, actions } = slice;
export default reducer;

