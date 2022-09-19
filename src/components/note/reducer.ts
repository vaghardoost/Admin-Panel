import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResult } from "../../class/model/api";
import { Note } from "../../class/model/note";
import { getNoteList, NotesApiResult } from "./api"

export interface State {
    note:Note[],
    filter:Filter
    authors:{label:string,value:string}[],
    tags:{label:string,value:string}[],
}

export interface Filter {
    id?:string,
    title?:string,
    author?:string[],
    category?:string[],
    tag?:[]
}

const initialState:State = {
    note:[],
    filter:{},
    authors:[],
    tags:[]
}

const slice = createSlice({
    name: 'notes',
    initialState: initialState,
    reducers: {
        setFilter:(state:State,action:PayloadAction<Filter>)=>{
            state.filter = action.payload;
        },
        cleanFilter:(state:State)=>{
            state.filter = {}
        }
    },
    extraReducers(builder) {
        builder.addCase(query.fulfilled,(state:State,action:PayloadAction<ApiResult<NotesApiResult>>)=>{
            state.note = action.payload.data?.note ?? [];
        })
    },
})

export const query = createAsyncThunk('notes/query',async (filter:Filter):Promise<ApiResult<NotesApiResult>>=> {
    return await getNoteList(filter);
})

export const {actions,reducer} = slice;
export default reducer;
