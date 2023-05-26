import axios from "axios"
import { cdn, server } from "../../../config"
import { ApiResult } from "../../../model/api";
import { Category } from "../../../model/category";

const fileApi = axios.create({ baseURL: cdn });
const api = axios.create({ baseURL: server });

export const loadPhoto = async () => {
  const namespace = sessionStorage.getItem('namespace');
  const url = `${cdn}/photo/${namespace}`;
  const { data } = await fileApi.get(url);
  return {
    success: true,
    payload: data.payload
  }
}

export const updateCategory = async (id: string, data: Category) => {
  const token = sessionStorage.getItem("token");
  const namespace = sessionStorage.getItem('namespace');
  const url = `${server}/category/${namespace}/${id}`;

  const { data: result } = await api.post<ApiResult<any>>(
    url,
    data,
    { headers: { "Authorization": `Bearer ${token}` } }
  )
  console.log(result.payload, data);
  return result;
}

export const addCategory = async (data: Category) => {
  const token = sessionStorage.getItem("token");
  const namespace = sessionStorage.getItem('namespace');
  const url = `${server}/category/${namespace}`;
  const res = await api.put<ApiResult<any>>(
    url,
    data,
    { headers: { "Authorization": `Bearer ${token}` } }
  );

  return res.data
}

export const loadCategory = async (id: string) => {
  const namespace = sessionStorage.getItem('namespace');
  const url = `${server}/category/${namespace}/${id}`;
  const { data } = await api.get<ApiResult<Category>>(url);
  return data;
}

export const loadCategoryList = async () => {
  const namespace = sessionStorage.getItem('namespace');
  const { data } = await api.get<ApiResult<Category[]>>(`${server}/category/${namespace}`);
  return data;
}
