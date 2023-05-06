import { ApiResult } from "../../../model/api"
import { Category } from "../../../model/category"
import axios from "axios";
import { server } from "../../../config";
const api = axios.create({ baseURL: server })

export const loadCategory = async (): Promise<ApiResult<Category[]>> => {
    const { data } = await api.get("/note/category");
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
