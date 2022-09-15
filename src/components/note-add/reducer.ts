import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResult } from "../../class/model/api";
import Category from "../../class/model/category";
import { Note,noteMaker } from "../../class/render";
import { loadCategory,loadNote as apiLoadNote } from "./api";
import { buildRaw } from "../../class/render"

export interface State {
    note:Note
    draft:{
        save:{
            modal:boolean,
            status:'normal'|'validation'|'duplicate'
        },
        load:{
            modal:boolean
            status?:string
        }
    }
    category:{
        data:Category,
        buttonStatus:'loading'|'normal'
    }
    raw:string
    page:'edit'|'code'|'view'
}

const initialState:State = {
    note: {
        title: "",
        content: [],
        tag: [],
        category:"root"
    },
    draft:{
        load:{
            modal:false
        },
        save:{
            modal:false,
            status:'normal'
        }
    },
    category: {
        data:{
            id: "root",
            label: "root",
            children: []
        },
        buttonStatus:'normal'
    },
    raw: '',
    page: 'edit'
}

const slice = createSlice({
    name: 'note-add',
    initialState: initialState,
    reducers: {
        changeContent:(state:State,action:PayloadAction<string>)=>{
            state.raw = action.payload;
            state.note.content = noteMaker(action.payload);
        },
        changePage:(state:State,action:PayloadAction<'edit'|'code'|'view'>)=>{
            state.page = action.payload;
        },
        changeTitle:(state:State,action:PayloadAction<string>)=>{
            state.note.title = action.payload;
        },
        setTag:(state:State,action:PayloadAction<string[]>)=>{
            state.note.tag = action.payload;
        },
        setButtonLoad:(state:State)=>{
            state.category.buttonStatus = "loading";
        },
        setCategorySelected:(state:State,action:PayloadAction<string>)=>{
            state.note.category = action.payload;
        },
        modalSave:(state:State,action:PayloadAction<boolean>)=>{
            state.draft.save = {
                modal:action.payload,
                status:'normal'
            }
        },
        modalSaveStatus:(state:State,action:PayloadAction<'validation'|'duplicate'>)=>{
            state.draft.save.status = action.payload;
        },
        modalLoad:(state:State,action:PayloadAction<boolean>)=>{
            state.draft.load = {
                modal:action.payload,
                status:undefined
            }
        },
        modalLoadSelect:(state:State,action:PayloadAction<string>)=>{
            state.draft.load.status = action.payload;
        },
        setNote:(state:State,action:PayloadAction<Note>)=>{
            state.note = action.payload; 
        }
    },
    extraReducers(builder) {
        builder.addCase(loadCategoryList.fulfilled,(state:State,action:PayloadAction<ApiResult<Category>>)=>{
            const {success,data} = action.payload;
            if(success) {
                state.category = {
                    data:data!,
                    buttonStatus:"normal"
                }
            }
        });
        builder.addCase(loadNote.fulfilled,(state:State,action:PayloadAction<ApiResult<Note>>)=>{
            const {success,data} = action.payload;
            if(success){
                state.note = data!;
                state.raw = buildRaw(data!.content);
            }
        });
    },
})

export const loadCategoryList = createAsyncThunk('note-add/catlist',async ()=>{
    return await loadCategory();
});

export const loadNote = createAsyncThunk('note-add/load',async(id:string)=>{
    return await apiLoadNote(id);
});

export const {reducer,actions} = slice;
export default reducer;