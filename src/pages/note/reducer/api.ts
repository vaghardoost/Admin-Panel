import { ApiResult } from "../../../model/api";
import { Note } from "../../../model/note";
import axios from "axios";
import { server } from "../../../config";
import { Category } from "../../../model/category";
import { data as hardcode } from "./_notes";

const api = axios.create({ baseURL: server });

export const getNote = async (id: string) => {
    const namespace = sessionStorage.getItem("namespace");
    const url = `${server}/note/${namespace}/${id}`
    const { data } = await api.get<ApiResult<Note>>(url);
    return {
        success: data.success,
        payload: data.payload
    };
}

export const getNoteList = async () => {
    // const namespace = sessionStorage.getItem("namespace");
    // const url = `${server}/note/${namespace}`
    // const { data } = await api.get<ApiResult<Note[]>>(url);
    return {
        success: true,
        payload: hardcode
    };
}

export const categoryList = async () => {
    const namespace = sessionStorage.getItem("namespace");
    const url = `${server}/category/${namespace}`
    const { data } = await api.get<ApiResult<Category[]>>(url);
    return {
        success: data.success,
        payload: data.payload
    }
}

export const removeNote = async (id: string): Promise<ApiResult<any>> => {
    const token = sessionStorage.getItem('token');
    const { data } = await api.delete(
        '/note/',
        {
            headers: { "Authorization": `Bearer ${token}` },
            data: { id: id },
        }
    );
    return {
        success: data.success,
        payload: data.payload
    }
}

export const refreshServer = async () => {
    const token = sessionStorage.getItem('token');
    await api.patch(
        '/note/refresh',
        {},
        {
            headers: { "Authorization": `Bearer ${token}` },
        }
    )
}