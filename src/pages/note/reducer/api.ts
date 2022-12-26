import { ApiResult } from "../../../model/api";
import { Note } from "../../../model/note";
import axios from "axios";
import { server } from "../../../config";
import { Category } from "../../../model/category";
 
const api = axios.create({baseURL:server});

export const getNote = async (id:string):Promise<ApiResult<Note>> => {
    const { data } = await api.get(`/note/${id}`);    
    return {
        success:data.success,
        data:data.payload
    };
}

export async function getNoteList():Promise<ApiResult<Note[]>> {
    const { data } = await api.get("/note");
    return {
        success:data.success,
        data:data.payload
    };
}

export const categoryList = async ():Promise<ApiResult<Category[]>> =>{
    const { data } = await api.get("/category");
    return {
        success:data.success,
        data:data.payload
    }
}

export const removeNote = async (id:string):Promise<ApiResult<any>> => {
    const token = sessionStorage.getItem('token');
    const { data } = await api.delete(
        '/note/',
        { 
            headers: {"Authorization" : `Bearer ${token}`},
            data:{ id: id },
        }
    );
    return {
        success:data.success,
        data:data.payload
    }
}
