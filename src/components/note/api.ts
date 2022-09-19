import { ApiResult } from "../../class/model/api";
import { Note } from "../../class/model/note";
import { Filter } from "./reducer";

export async function getNoteList(filter:Filter):Promise<ApiResult<NotesApiResult>> {
    return {
        success:true,
        data:{
            note:[
                {
                    title:"the message",
                    category:"1525684",
                    tag:[],
                    content:[],
                    author:"berbang"
                }
            ]
        }
    };
}

export interface NotesApiResult {
    note:Note[]
}