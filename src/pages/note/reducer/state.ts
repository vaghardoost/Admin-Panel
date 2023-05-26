import { Category } from "../../../model/category"
import { Note } from "../../../model/note"

export interface State {
  note: Note[],
  category: Category[],
}

export const initialState: State = {
  note: [],
  category: [],
}
