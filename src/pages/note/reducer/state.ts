import { Category } from "../../../model/category"
import { Note } from "../../../model/note"

export interface State {
  note:Note[],
  filter:Filter
  authors:{label:string,value:string}[],
  tag:string[],
  categoryList:Category[],
  select:{
    note?:Note,
    status:'loading'|'showing'|'close'
  }
  remove:{
    open:boolean
    id:string
  }
}

export interface Filter {
  id?:string,
  title?:string,
  author?:string[],
  category?:string[],
  tag?:[]
}

export const initialState:State = {
  note:[],
  filter:{},
  authors:[],
  categoryList:[],
  tag:[],
  select:{
    status:'close'
  },
  remove:{
    open:false,
    id:''
  }
}
