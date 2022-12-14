import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResult } from "../../../model/api";
import { Category } from "../../../model/category";
import { Note } from "../../../model/note";
import { categoryListAction, getNoteAction, queryAction, removeNoteAction } from "./action";
import { categoryList } from "./api";
import { Filter, initialState, State } from "./state";

const slice = createSlice({
  name: 'notes',
  initialState: initialState,
  reducers: {
      setFilter:(state:State,action:PayloadAction<Filter>)=>{
          state.filter = action.payload;
      },
      cleanFilter:(state:State)=>{
          state.filter = {}
      },
      closeModal:(state:State)=>{
        state.select.status = 'close'
      },
      removeModal:(state:State,action:PayloadAction<{id:string,open:boolean}>)=>{
        state.remove = action.payload
      }
  },
  extraReducers(builder) {
        builder.addCase(queryAction.fulfilled,queryState);
        builder.addCase(categoryListAction.fulfilled,categoryListState);
        builder.addCase(getNoteAction.fulfilled,getNoteState);
        builder.addCase(removeNoteAction.fulfilled,removeNoteState)
  },
})

const removeNoteState = (state:State,action:PayloadAction<ApiResult<any>>)=>{
    if (action.payload.success) {
        state.remove.open = false;
    }
}

const getNoteState = (state:State,action:PayloadAction<ApiResult<Note>>)=>{
    const { data } = action.payload;
    state.select.note = data
    state.select.status = 'showing'
}

const queryState = (state:State,action:PayloadAction<ApiResult<Note[]>>)=>{
    state.note = action.payload.data!;
}

const categoryListState = (state:State,action:PayloadAction<ApiResult<Category[]>>)=>{
    const {success,data} = action.payload;
    if(success){
        state.categoryList = data!;
    }
}

export const {actions,reducer} = slice;
export default reducer;
