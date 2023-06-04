import { Category } from "../../../model/category"
import { Note } from "../../../model/note"

export interface State {
    note: Note
    edit?: string
    pageState: {
        loading?: boolean
    }
    category: {
        open: boolean
        list: Category[]
    }
    draft: boolean
    photo: {
        open: boolean
        list: string[]
    }
}

export const initialState: State = {
    note: {
        title: "",
        content: [],
        tag: [],
        author: '',
    },
    draft: false,
    category: {
        list: [],
        open: false
    },
    photo: {
        open: false,
        list: []
    },
    pageState: {}
}