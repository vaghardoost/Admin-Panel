import axios from "axios"
import { ApiResult } from "../../../model/api"
import { cdn, server } from "../../../config"

const api = axios.create({baseURL:server})
const fileApi = axios.create({baseURL:cdn})

export interface LoginApiResult {
    fileToken:string
    token:string
}

export async function login(username:string,password:string):Promise<ApiResult<LoginApiResult>> {
    
    const apiResult = await api.post("/auth/admin",
        {username:username,password:password}
    );

    const fileResult = await fileApi.post("/auth",
        {username:username,password:password}
    );
    
    const success = apiResult.data.success && fileResult.data.success;
    
    return {
        success:success,
        payload: { 
            token:(success) ? apiResult.data.payload.token:undefined,
            fileToken:(success) ? fileResult.data.payload.token:undefined,
        }
    }

}
