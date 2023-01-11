import { ApiResult } from "../../../model/api"
import { Category } from "../../../model/category"
import axios from "axios";
import { cdn, server } from "../../../config";
import File from "../../../model/file";
const api = axios.create({baseURL:server})
const fileApi = axios.create({baseURL:cdn})

export const loadCategory = async ():Promise<ApiResult<Category[]>>=> {
    const { data } = await api.get("/category");
    const { success,payload } = data;
    return {
        success:success,
        payload:payload
    }
}

export const addCategory = async (data:Category):Promise<ApiResult<any>>=>{
    const token = sessionStorage.getItem("token");    
    await api.post(
        "/category",
        data,
        { headers: {"Authorization" : `Bearer ${token}`} }
    );
    
    return {
        success:true
    }
}

export const deleteCategory = async (id:string)=>{
    const token = sessionStorage.getItem("token");
    await api.delete(
        "/category",
        { 
            headers: {"Authorization" : `Bearer ${token}`},
            data:{ id: id },
        }
    );
}

export const updateCategory = async (id:string,data:Category)=>{
    const token = sessionStorage.getItem("token");
    await api.patch(
        `/category/${id}`,
        data,
        { headers: {"Authorization" : `Bearer ${token}`} }
    )
}

export const loadPhotoList = async ():Promise<ApiResult<File[]>> => {
    const token = sessionStorage.getItem("file-token");
    const { data } = await fileApi.get('/photo/list',
        { headers: {"Authorization" : `Bearer ${token}`} }
    );
    return {
        success:true,
        payload:data.payload
    }
}

