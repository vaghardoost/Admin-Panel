import { ApiResult } from "../../class/model/api"

export interface LoginApiResult {
    token:string
    id:string
}

export async function login(username:string,password:string):Promise<ApiResult<LoginApiResult>> {
    await new Promise( resolve => setTimeout(resolve, 1500) )
    if(username === "admin" && password === "pass"){
        return {
            success:true,
            data:{
                token:'aljshdlksdflgsdafiulgdasl',
                id:'123321123'
            }
        }
    }
    return {
        success:false
    }
}
