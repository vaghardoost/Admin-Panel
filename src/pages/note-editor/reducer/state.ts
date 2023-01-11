import { Category } from "../../../model/category"
import File from "../../../model/file"
import { Note } from "../../../model/note"

export interface State {
  note:Note
  edit?:string
  draft:{
      save:{
          modal:boolean,
          status:'normal'|'validation'|'duplicate'
      },
      load:{
          modal:boolean
          status?:string
      }
  }
  category:{
      list:Category[],
      buttonStatus:'loading'|'normal'
  }
  picker: {
    photo: {
        open:boolean
        list:File[]
        select?:File
        caption:string
    }
    alert: {
        title:string
        message: string
        status: 'red'|'green'|'black'
        open: boolean
    }
  }
  raw: string
  page: 'edit'|'code'|'view'
}

export const initialState:State = {
  note: {
      title: "",
      content: [],
      tag: [],
      author:'',
  },
  draft:{
      load:{
          modal:false
      },
      save:{
          modal:false,
          status:'normal'
      }
  },
  category: {
      list:[],
      buttonStatus:'normal'
  },
  picker:{
    photo:{
        list:[],
        open:false,
        caption:''
    },
    alert:{
        message:'',
        open:false,
        status:'black',
        title:''
    }
  },
  raw: '',
  page: 'edit'
}