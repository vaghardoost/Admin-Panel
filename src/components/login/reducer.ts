import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResult } from "../../class/model/api";
import { LoginApiResult,login as apiLogin } from "./api";


export interface State {
    status:'normal'|'error'|'vlidation'|'loading'|'success'
}

const initialState:State = {
    status:'normal'
}

const slice  = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {
        loading:(state:State)=>{
            state.status = "loading";
        },
        validationError:(state:State)=>{
            state.status = "vlidation";
        },
        changeStatus:(state:State,action:PayloadAction<boolean>)=>{
            state.status = (action.payload)?"success":"normal";
        }
    },
    extraReducers(builder) {
        builder.addCase(login.fulfilled,(state:State,action:PayloadAction<ApiResult<LoginApiResult>>)=>{
            const { success,data } = action.payload;
            if(success){
                state.status = "success";
                sessionStorage.setItem('token',data!.token);
                sessionStorage.setItem('id',data!.id);
            }else{
                state.status = "error";
            }
        });
    },
})

export const login = createAsyncThunk(
    'login/login',
    async(payload:Payload):Promise<ApiResult<LoginApiResult>>=>{
        return await apiLogin(payload.username,payload.password);
    }
)

export interface Payload{
    username:string
    password:string
}

const { reducer,actions } = slice;
export default reducer;
export const {loading,validationError,changeStatus} = actions;
