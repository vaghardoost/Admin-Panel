import axios from "axios";
import { server } from "../../../config";
import { ApiResult } from "../../../model/api";
import { Note } from "../../../model/note";

const api = axios.create({ baseURL: server });

export async function loadList() {
  const namespace = sessionStorage.getItem('namespace');
  const url = `${server}/datapack/namespace/${namespace}`;
  try {
    const { data } = await api.get<ApiResult<Note[]>>(url);
    if (data.success) {
      return data.payload
    }
  } catch {
    sessionStorage.clear();
  }
}

export async function deleteDatapack(id: string) {
  const namespace = sessionStorage.getItem('namespace');
  const token = sessionStorage.getItem('token');
  const url = `${server}/datapack/${namespace}`;
  try {
    await api.delete(
      url,
      {
        headers: { "Authorization": `Bearer ${token}` },
        data: { id: id },
      }
    )
    return await loadList();
  } catch {
    sessionStorage.clear();
  }
}
