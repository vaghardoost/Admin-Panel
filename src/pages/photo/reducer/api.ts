import { ApiResult } from "../../../model/api"
import axios from "axios";
import { cdn } from "../../../config";

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

export const remove = async (id: string): Promise<ApiResult<any>> => {
  const token = sessionStorage.getItem("file-token");
  const namespace = sessionStorage.getItem('namespace');
  const url = `${cdn}/photo/${namespace}/${id}`;
  await fileApi.delete(
    url,
    { headers: { "Authorization": `Bearer ${token}` } }
  )
  return {
    success: true
  }
}
