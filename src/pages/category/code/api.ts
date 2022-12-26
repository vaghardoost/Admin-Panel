import { ApiResult } from "../../../model/api"
import { Category } from "../../../model/category"
import axios from "axios";
import { server } from "../../../config";
const api = axios.create({baseURL:server})

export const loadCategory = async ():Promise<ApiResult<Category[]>>=> {
    const { data } = await api.get("/category");
    const { success,payload } = data;
    return {
        success:success,
        data:payload
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
        success:false
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

export const updateCategory = async (data:Category)=>{
    const token = sessionStorage.getItem("token");
    await api.patch(
        "/category",
        data,
        { headers: {"Authorization" : `Bearer ${token}`} }
    )
}


