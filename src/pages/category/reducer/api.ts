import { ApiResult } from "../../../model/api"
import { Category } from "../../../model/category"
import axios from "axios";
import { server } from "../../../config";
const api = axios.create({ baseURL: server })

export const loadCategoryList = async () => {
    const namespace = sessionStorage.getItem('namespace');
    const url = `${server}/category/${namespace}`
    const { data } = await api.get<ApiResult<Category[]>>(url);
    const { success, payload } = data;
    return {
        success: success,
        payload: payload
    }
}

export const loadCategory = async (id: string) => {
    await new Promise(res => setTimeout(res, 1000));
    const namespace = sessionStorage.getItem('namespace');
    const url = `${server}/category/${namespace}/${id}`
    const { data } = await api.get<ApiResult<Category>>(url);
    const { success, payload } = data;
    return {
        success: success,
        payload: payload
    }
}

export const deleteCategory = async (id: string) => {
    const token = sessionStorage.getItem("token");
    await api.delete(
        "/note/category",
        {
            headers: { "Authorization": `Bearer ${token}` },
            data: { id: id },
        }
    );
}

export const refreshServer = async () => {
    const token = sessionStorage.getItem('token');
    await api.patch(
        '/note/category/refresh',
        {},
        {
            headers: { "Authorization": `Bearer ${token}` },
        }
    )
}
