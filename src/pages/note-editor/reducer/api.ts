import { ApiResult } from "../../../model/api";
import { Category } from "../../../model/category";
import { Note } from "../../../model/note";
import { cdn, server } from "../../../config";
import axios from "axios";
import File from "../../../model/file";

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
    const { data } = await api.get<ApiResult<Note>>(`/note/${id}`);
    return data;
}

export const saveNote = async (note: Note) => {
    const token = sessionStorage.getItem("file-token");
    const { data } = await api.post<ApiResult<Note>>(
        '/note',
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
    const { data, status } = await api.patch(`/note/${note.id}`,
        note,
        { headers: { "Authorization": `Bearer ${token}` } },
    );
    console.log(status);
    return {
        success: true,
        payload: data.payload
    }
}

