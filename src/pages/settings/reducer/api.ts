import { ApiResult } from "../../../model/api"
import axios from "axios";
import { cdn, server } from "../../../config";
import NamespaceModel from "../../../model/namespace";

const api = axios.create({ baseURL: server });
const fileApi = axios.create({ baseURL: cdn })

export const loadList = async (): Promise<ApiResult<any>> => {
  const namespace = sessionStorage.getItem('namespace');
  const url = `${cdn}/photo/${namespace}`;
  const { data } = await fileApi.get(url);
  return {
    success: true,
    payload: data.payload
  }
}

export const load = async () => {
  // await new Promise(res => setTimeout(res, 5000));
  const token = sessionStorage.getItem('token');
  const url = `${server}/namespace`;
  const { data } = await api.get<ApiResult<NamespaceModel[]>>(
    url,
    { headers: { "Authorization": `Bearer ${token}` } }
  );
  return data;
}

export const update = async (data: any): Promise<ApiResult<any>> => {
  const namespace = sessionStorage.getItem('namespace');
  const token = sessionStorage.getItem('token');
  const url = `${server}/namespace/${namespace}`;
  const { data: result } = await api.post<ApiResult<null>>(
    url,
    data,
    { headers: { "Authorization": `Bearer ${token}` } }
  );
  return (result.success) ? load() : { success: false };
}
