import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResult } from "../../../model/api";
import { Category } from "../../../model/category";
import { Note } from "../../../model/note";
import { initialState, State } from "./state";
import { changeContent, changePage, changeTitle, loadCategoryList, loadNote, modalLoad, modalLoadSelect, modalSave, modalSaveStatus, setButtonLoad, setCategorySelected, setNote, setTag, setModalPhoto, loadPhoto, pickerPhotoSelect, pickerPhotoCaption, addNote, closeAlertModal } from "./actions";
import File from "../../../model/file";


const slice = createSlice({
    name: 'note-add',
    initialState: initialState,
    reducers: {
        changeContent:changeContent,
        changePage:changePage,
        changeTitle:changeTitle,
        setTag:setTag,
        setButtonLoad:setButtonLoad,
        setCategorySelected:setCategorySelected,
        modalSave:modalSave,
        modalSaveStatus:modalSaveStatus,
        modalLoad:modalLoad,
        modalLoadSelect:modalLoadSelect,
        setNote:setNote,
        modalphoto:setModalPhoto,
        pickerPhotoSelect:pickerPhotoSelect,
        pickerPhotoCaption:pickerPhotoCaption,
        closeAlertModal:closeAlertModal,
    },
    extraReducers(builder) {
        builder.addCase(loadCategoryList.fulfilled,loadCategoryListState);
        builder.addCase(loadPhoto.fulfilled,loadPhotoState);
        builder.addCase(addNote.fulfilled,addNoteState)
    },
});

const addNoteState = (state:State,action:PayloadAction<ApiResult<Note>>) => {
    const { success,data } = action.payload;
    if (success) {
        state.picker.alert = {
            message:'نوشته با موفقیت در سرور ذخیره شد',
            open:true,
            status:'black',
            title:'انتشار نوشته'
        }
        state = initialState;
    } else {
        state.picker.alert = {
            message:'خطایی رخ داد',
            open:true,
            status:'red',
            title:'انتشار نوشته'
        }
    }
}

const loadPhotoState = (state:State,action:PayloadAction<ApiResult<File[]>>) => {
    const { data,success } = action.payload;
    if(success){
        state.picker.photo = {
            ...state.picker.photo,
            list:data!,
        }
    }
}

const loadCategoryListState = (state:State,action:PayloadAction<ApiResult<Category[]>>)=>{
    const {success,data} = action.payload;
    if(success) {
        state.category = {
            list:data!,
            buttonStatus:"normal"
        }
    }
}




export const {reducer,actions} = slice;
export default reducer;