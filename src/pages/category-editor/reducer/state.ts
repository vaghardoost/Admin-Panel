import { Category } from "../../../model/category"

export interface State {
  ediable?: string
  category: Category
  list: string[]
  dialog: {
    title: string
    message: string
    open:boolean
  }
}

export const initialState: State = {
  category: {
    note: [],
    label: '',
    description: ''
  },
  dialog: {
    title: '',
    message: '',
    open:false,
  },
  list: []
}