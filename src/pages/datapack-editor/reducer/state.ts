import { Bottomsheet, Environment, SectionName, SectionType } from "../../../model/note"

export interface State {
  id?: string
  loading: boolean
  content: SectionType[]
  env: Environment
  photo: string[]
  title: string
  drawerDraft: boolean
  drawerBottomsheet: {
    open: boolean
    type: SectionName
    bottomsheet?: Bottomsheet
  }
}

export const initialState: State = {
  content: [],
  photo: [],
  loading: false,
  title: '',
  drawerBottomsheet: {
    open: false,
    type: SectionName.caption
  },
  env: {
    bottomsheet: []
  },
  drawerDraft: false
}
