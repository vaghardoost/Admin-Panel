import { Note } from "../../../model/note"

export interface State {
  list: Note[]
  loading: boolean
}

export const initialState: State = {
  list: [],
  loading: false
}
