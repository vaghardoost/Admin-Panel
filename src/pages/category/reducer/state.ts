import { Category } from "../../../model/category"

export interface State {
  list: Category[]
  select?: Category
  loading: boolean
}

export const initialState: State = {
  list: [],
  loading: false
}
