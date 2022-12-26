import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResult } from "../../../model/api";
import { Category } from "../../../model/category";
import { categoryTreeBuilder } from "../../../other";
import { loadCategory as loadApi, addCategory as addApi,deleteCategory as deleteApi,updateCategory as updateApi } from "./api"


export interface State {
    list:Category[]
    select?:Category
    modal:{
        delete:{
            show:boolean
        }
        update:{
            show:boolean
        }
    }
    addPanel:{
        status:"normal"|"error"|"loading"
        message?:string
    }
}

const initialState:State = {
    list:[],
    modal:{
        delete:{
            show:false,
        },
        update:{
            show:false,
        },
    },
    addPanel:{
        status:"normal"
    }
}

const slice = createSlice({
    name: 'category',
    initialState: initialState,
    reducers: {
        addPanelState:(state:State,action:PayloadAction<{status:"normal"|"error"|"loading",message?:string}>)=>{
            state.addPanel = action.payload;
        },
        select:(state:State,action:PayloadAction<Category>)=>{
            state.select = action.payload;
        },
        modalDelete:(state:State,action:PayloadAction<boolean>)=>{
            state.modal.delete.show = action.payload;
        },
        modalUpdate:(state:State,action:PayloadAction<boolean>)=>{
            state.modal.update.show = action.payload;
        },
        deselect:(state:State)=>{
            delete state.select;
        }
    },
    extraReducers(builder) {
        builder.addCase(loadCatList.fulfilled,(state:State,action:PayloadAction<ApiResult<Category[]>>)=>{
            const { success,data } = action.payload;
            if(success){
                state.list = data!;
            }
        });
        builder.addCase(addCat.fulfilled,(state:State,action:PayloadAction<ApiResult<any>>)=>{
            const { success,data } = action.payload;
            if(success){
                state.list = data!;
            }
        });
        builder.addCase(deleteCat.fulfilled,(state:State,action:PayloadAction<ApiResult<any>>)=>{
            const { success,data } = action.payload;
            if(success){
                state.list = data!;
            }
        });
        builder.addCase(updateCat.fulfilled,(state:State,action:PayloadAction<ApiResult<any>>)=>{
            const { success,data } = action.payload;
            if(success){
                state.list = data!;
            }
        });
    },
});

export const loadCatList = createAsyncThunk(
    'category/load',
    async ():Promise<ApiResult<Category[]>> => await loadApi()
)

export const addCat = createAsyncThunk(
    'category/add',
    async (data:Category):Promise<ApiResult<Category[]>> => {
        await addApi(data);
        return await loadApi();
    }
)

export const deleteCat = createAsyncThunk(
    'category/delete',
    async (id:string):Promise<ApiResult<Category[]>>=>{
        await deleteApi(id);
        return await loadApi();
    }
)

export const updateCat = createAsyncThunk(
    'category/update',
    async (data:Category):Promise<ApiResult<Category[]>>=>{
        await updateApi(data);
        return await loadApi();
    }
)

export const {reducer,actions} = slice;
export default reducer;