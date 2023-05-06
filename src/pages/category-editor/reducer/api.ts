import axios from "axios"
import { cdn, server } from "../../../config"
import { ApiResult } from "../../../model/api";
import { Category } from "../../../model/category";
import File from "../../../model/file";

const fileApi = axios.create({ baseURL: cdn });
const api = axios.create({ baseURL: server });

export const loadPhoto = async () => {
  const token = sessionStorage.getItem("file-token");
  const { data } = await fileApi.get<ApiResult<File[]>>('/photo/list',
    { headers: { "Authorization": `Bearer ${token}` } }
  );
  return {
    success: true,
    payload: data.payload
  }
}


export const updateCategory = async (id: string, data: Category) => {
  const token = sessionStorage.getItem("token");
  const { data: result } = await api.patch<ApiResult<any>>(
    `/note/category/${id}`,
    data,
    { headers: { "Authorization": `Bearer ${token}` } }
  )
  return result;
}

export const addCategory = async (data: Category) => {
  const token = sessionStorage.getItem("token");
  const { data: result } = await api.post<ApiResult<any>>(
    "/note/category",
    data,
    { headers: { "Authorization": `Bearer ${token}` } }
  );

  return result
}

export const loadCategory = async (id: string) => {
  const { data } = await api.get<ApiResult<Category>>(`/note/category/${id}`);
  return data;
}
