import { ApiResult } from "../../../model/api";
import { Category } from "../../../model/category";
import { Note } from "../../../model/note";
import { cdn, server } from "../../../config";
import axios from "axios";

const api = axios.create()

export const loadCategory = async () => {
    const namespace = sessionStorage.getItem('namespace');
    const url = `${server}/category/${namespace}`
    const { data } = await api.get<ApiResult<Category[]>>(url);
    const { success, payload } = data;
    return {
        success: success,
        payload: payload
    }
}

export const loadNote = async (id: string) => {
    const namespace = sessionStorage.getItem('namespace');
    const url = `${server}/note/${namespace}/${id}`
    console.log(url);
    
    const { data } = await api.get<ApiResult<Note>>(url);
    return data;
}

export const saveNote = async (note: Note) => {
    const token = sessionStorage.getItem("file-token");
    const namespace = sessionStorage.getItem('namespace');
    const url = `${server}/note/${namespace}`
    const { data } = await api.put<ApiResult<Note>>(
        url,
        note,
        { headers: { "Authorization": `Bearer ${token}` } }
    )

    return {
        success: data.success,
        payload: data.payload,
    }
}

export const loadPhotoList = async () => {
    const namespace = sessionStorage.getItem('namespace');
    const url = `${cdn}/photo/${namespace}`
    const { data: { success, payload } } = await api.get<ApiResult<any>>(url);
    return {
        success: success,
        payload: payload
    }
}

export const updateNote = async (note: Note): Promise<ApiResult<Note>> => {
    const token = sessionStorage.getItem("file-token");
    const namespace = sessionStorage.getItem('namespace');
    const url = `${server}/note/${namespace}/${note.id}`
    const { data } = await api.post<ApiResult<Note>>(
        url,
        note,
        { headers: { "Authorization": `Bearer ${token}` } }
    )
    return {
        success: true,
        payload: data.payload
    }
}

