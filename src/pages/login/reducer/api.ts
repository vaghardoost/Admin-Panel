import axios from "axios"
import decoder from "jwt-decode";

import { ApiResult } from "../../../model/api"
import { cdn, server } from "../../../config"
import { TokenModel } from "../../../model/token";

const api = axios.create({ baseURL: server })
const fileApi = axios.create({ baseURL: cdn })

export interface LoginApiResult {
    fileToken: string
    token: string
}

export async function login(username: string, password: string): Promise<ApiResult<LoginApiResult>> {
    const apiResult = await api.post("/auth",
        { username: username, password: password }
    );

    if (apiResult.data.success) {
        const token = decoder<TokenModel>(apiResult.data.payload.token);
        if (['Operator', 'Manager'].includes(token.role)) {
            return { success: false, message: 'این سیستم برای مدیران و پشتیبانان نیست!' };
        }
        const fileResult = await fileApi.post("/auth",
            { username: username, password: password }
        );
        return {
            success: true,
            payload: {
                token: apiResult.data.payload.token,
                fileToken: fileResult.data.payload.token,
            }
        }
    }
    return {
        success: false,
        message: 'حساب کاربری در سیستم یافت نمیشود'
    }
}
