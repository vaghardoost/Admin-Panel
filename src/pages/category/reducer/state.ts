import { Category } from "../../../model/category"

export interface State {
  list: Category[]
  select?: Category
  modal: {
    delete: {
      show: boolean
    },
    message: {
      title: string,
      content: string,
      show: boolean,
    }
  }
}

export const initialState: State = {
  list: [],
  modal: {
    delete: {
      show: false,
    },
    message: {
      show: false,
      title: "",
      content: ""
    }
  },
}
