import File from "../../../model/file";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResult } from "../../../model/api";
import { Category } from "../../../model/category";
import { addCat, deleteCat, loadCatList, loadPhoto, updateCat } from "./actions";
import { initialState, State } from "./state";

const slice = createSlice({
  name: 'category',
  initialState: initialState,
  reducers: {
    select:(state:State,action:PayloadAction<Category>)=>{
      state.select = action.payload;
    },
    modalDelete:(state:State,action:PayloadAction<boolean>)=>{
      state.modal.delete.show = action.payload;
    },
    modalUpdate:(state:State,action:PayloadAction<boolean>)=>{
      state.modal.create = {
        ...state.modal.create,
        update: true,
        show: action.payload,
        message: '',
      }
    },
    reset:(state:State)=>{
      delete state.select;
      delete state.modal.create.message;
      delete state.modal.create.selectedFile;
    },
    modalCreate:(state:State,action:PayloadAction<boolean>)=>{
      state.modal.create = {
        ...state.modal.create,
        update: false,
        show: action.payload,
        message: '',
        selectedFile: undefined
      }
    },
    modalCreateMessage:(state:State,action:PayloadAction<string>)=>{
      state.modal.create.message = action.payload;
    },
    modalCreateSelectPhoto:(state:State,action:PayloadAction<File>)=>{
      state.modal.create.selectedFile = action.payload;
    }
  },
    extraReducers(builder) {
        builder.addCase(loadCatList.fulfilled,(state:State,action:PayloadAction<ApiResult<Category[]>>)=>{
            const { success,payload } = action.payload;
            if(success){
                state.list = payload!;
            }
        });
        builder.addCase(addCat.fulfilled,(state:State,action:PayloadAction<ApiResult<any>>)=>{
            const { success,payload } = action.payload;
            if(success){
                state.list = payload!;
            }
        });
        builder.addCase(deleteCat.fulfilled,(state:State,action:PayloadAction<ApiResult<any>>)=>{
            const { success,payload } = action.payload;
            if(success){
                state.list = payload!;
            }
        });
        builder.addCase(updateCat.fulfilled,(state:State,action:PayloadAction<ApiResult<any>>)=>{
            const { success,payload } = action.payload;
            if(success){
                state.list = payload!;
            }
        });
        builder.addCase(loadPhoto.fulfilled,(state:State,action:PayloadAction<ApiResult<File[]>>)=>{
            const { success,payload } = action.payload;
            if(success){
                state.modal.create.list = payload!;
            }
        });
    },
});



export const {reducer,actions} = slice;
export default reducer;