import { ApiResult } from "../../../model/api"
import axios from "axios";
import { cdn } from "../../../config";
import { Buffer } from "buffer";

const api = axios.create({baseURL:cdn})

export const loadList = async ():Promise<ApiResult<any[]>> => {
  const token = sessionStorage.getItem("file-token");
  const { data } = await api.get('/photo/list',
    { headers: {"Authorization" : `Bearer ${token}`} }
  );
  return {
    success:true,
    payload:data.payload
  }
}

export const download = async(id:string):Promise<{id:string,content:string}> =>{
  const url = cdn + "/photo/" + id;
  const { data } = await api.get(url,{ responseType: 'arraybuffer' });
  return {
    id:id,
    content:Buffer.from(data, 'binary').toString('base64')
  };
}

export const remove = async(id:string):Promise<ApiResult<any>> => {
  const token = sessionStorage.getItem("file-token");
  const url = cdn + "/photo/" + id;
  await api.delete( 
    url,
    { headers: {"Authorization" : `Bearer ${token}`} }
  )
  return {
    success:true
  }
}
