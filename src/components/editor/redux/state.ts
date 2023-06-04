import { Environment, SectionType } from "../../../model/note"

export interface State {
  content: SectionType[]
  env?: Environment
  editSectionId?: string
  data: {
    photoList: string[]
  }
  disableSection: string[]
}

export const initialState: State = {
  content: [],
  data: {
    photoList: []
  },
  disableSection: []
}
