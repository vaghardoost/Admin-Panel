import { Buffer } from "buffer";

export default interface State {
  list: string[]
  select?: {
    id: string
    content: string
  }
  modal: {
    save: boolean
    delete: boolean
  }
}

export const initialState:State = {
  list:[],
  modal: {
    save: false,
    delete: false
  }
};
