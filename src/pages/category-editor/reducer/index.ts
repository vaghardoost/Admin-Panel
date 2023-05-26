import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState, State } from "./state";
import * as action from "./actions";
import { ApiResult } from "../../../model/api";
import { Category } from "../../../model/category";
import { cdn } from "../../../config";

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
    builder.addCase(action.loadCategoryList.fulfilled, loadCategoryListState);
    builder.addCase(action.addCategory.fulfilled, addCategoryState);
    builder.addCase(action.editCategory.fulfilled, editCategoryState);
  },
});

const loadCategoryListState = (state: State, action: PayloadAction<ApiResult<Category[]>>) => {
  const { payload: result } = action;
  if (result.success) {
    state.categoryList = result.payload!;
  }
}

const loadPhotoState = (state: State, action:  PayloadAction<ApiResult<any>>) => {
  const namespace = sessionStorage.getItem('namespace');
  const result = [];
  const { files } = action.payload!.payload;
  for (const file of files) {
    if (file.startsWith('demo')) {
      result.push(`${cdn}/${namespace}/photo/${file}`);
    }
  }
  result.reverse();
  state.photoList = result;
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

