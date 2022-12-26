import { ApiResult } from "../../../model/api";
import { Category } from "../../../model/category";
import { Note } from "../../../model/note";
import { cdn, server } from "../../../config";
import axios from "axios";
import File from "../../../model/file";

const api = axios.create({baseURL:server})
const fileApi = axios.create({baseURL:cdn})

export const loadCategory = async ():Promise<ApiResult<Category[]>>=> {
    const { data } = await api.get("/category");
    const { success,payload } = data;
    return {
        success:success,
        data:payload
    }
}

export const loadNote = async (id:string):Promise<ApiResult<Note>>=> {
    // soon
    return {
        success:false,
    }
}

export const saveNote = async (note:Note):Promise<ApiResult<Note>>=>{
    const token = sessionStorage.getItem('token');
    const { data } = await api.post(
        '/note',
        note,
        { headers: {"Authorization" : `Bearer ${token}`} }
    )
    return {
        success:data.success,
        data:data.payload
    }
}

export const loadList = async ():Promise<ApiResult<File[]>> => {
    const token = sessionStorage.getItem("file-token");
    const { data } = await fileApi.get('/photo/list',
        { headers: {"Authorization" : `Bearer ${token}`} }
    );
    return {
        success:true,
        data:data.payload
    }
}
