export interface State {
  status:'normal'|'error'|'vlidation'|'loading'|'success'
}

export const initialState:State = {
  status:'normal'
}