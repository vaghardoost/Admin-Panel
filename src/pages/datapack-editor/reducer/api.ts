import { cdn, server } from "../../../config";
import { ApiResult } from "../../../model/api";
import axios from "axios";
import { Note } from "../../../model/note";

const api = axios.create();

export const loadPhotoList = async (): Promise<string[]> => {
  const namespace = sessionStorage.getItem('namespace');
  const url = `${cdn}/photo/${namespace}`
  const { data } = await api.get<ApiResult<any>>(url);
  console.log(data);
  return data.payload.files
}

export const saveDatapack = async (data: any) => {
  const namespace = sessionStorage.getItem('namespace');
  const token = sessionStorage.getItem('token');
  const url = `${server}/datapack/${namespace}`
  const { data: result } = await api.put<ApiResult<Note>>(
    url,
    data,
    { headers: { "Authorization": `Bearer ${token}` } }
  )
  return result.payload;
}

export const loadDatapack = async (id: string) => {
  const url = `${server}/datapack/${id}`;
  const { data } = await api.get<ApiResult<Note>>(url);
  return data
}

export const updateDatapack = async ({ content, env, id }: any) => {
  const namespace = sessionStorage.getItem('namespace');
  const token = sessionStorage.getItem('token');
  const url = `${server}/datapack/${namespace}/${id}`
  const { data } = await api.post<ApiResult<Note>>(
    url,
    { content: content, env: env },
    { headers: { "Authorization": `Bearer ${token}` } }
  )
  return data;
}

export const setIndexDatapackId = async (id: string) => {
  const namespace = sessionStorage.getItem('namespace');
  const token = sessionStorage.getItem('token');
  const url = `${server}/namespace/${namespace}`;
  const { data } = await api.post<ApiResult<any>>(
    url,
    { datapack: id },
    { headers: { "Authorization": `Bearer ${token}` } }
  );
  console.log(data);

  return { ...data, datapack: id };
}

