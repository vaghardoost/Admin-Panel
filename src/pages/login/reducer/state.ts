export interface State {
  status: 'normal' | 'error' | 'loading' | 'success'
  message?: string
}

export const initialState: State = {
  status: 'normal'
}