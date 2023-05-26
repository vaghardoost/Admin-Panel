import NamespaceModel from "../../model/namespace"

export interface State {
  namespace_modal: {
    open: boolean
    list?: NamespaceModel[]
    select?: string
  }
}

export const initialState: State = {
  namespace_modal: {
    open: false,
    select: sessionStorage.getItem('namespace') ?? undefined
  }
} 