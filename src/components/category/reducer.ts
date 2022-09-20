import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResult } from "../../class/model/api";
import Category from "../../class/model/category";
import { loadCategory } from "./api"

export interface State {
    list:Category
    select:Category
    modal:{
        delete:{
            show:boolean
        }
        update:{
            show:boolean
        }
    }
}

const initialState:State = {
    list:{label:"root",id:"root",children:[]},
    select:{label:"root",id:"root",children:[]},
    modal:{
        delete:{
            show:false,
        },
        update:{
            show:false,
        },
    }
}

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
            state.modal.update.show = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(loadCategoryList.fulfilled,(state:State,action:PayloadAction<ApiResult<Category>>)=>{
            const { success,data } = action.payload;
            if(success){
                state.list = data!;
            }
        })
    },
});

export const loadCategoryList = createAsyncThunk('category/load',async ():Promise<ApiResult<Category>>=> await loadCategory())

export const {reducer,actions} = slice;
export default reducer;