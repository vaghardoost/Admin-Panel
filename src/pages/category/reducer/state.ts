import { Category } from "../../../model/category"
import File from "../../../model/file"

export interface State {
  list: Category[]
  select?: Category
  modal: {
      delete: {
          show: boolean
      }
      create: {
        show: boolean
        list: File[]
        update?: boolean
        selectedFile?: File
        message?: string
      }
  }
}

export const initialState: State = {
  list:[],
  modal: {
      delete: {
          show: false,
      },
      create: {
        show: false,
        list: []
      }
  },
}
