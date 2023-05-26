import axios from "axios";
import { server } from "../../config";
import { ApiResult } from "../../model/api";
import NamespaceModel from "../../model/namespace";

const api = axios.create({ baseURL: server })

export const loadNamespaceList = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const token = sessionStorage.getItem('token');
  const { data } = await api.get<ApiResult<NamespaceModel[]>>('namespace', {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  return data.payload;
}

