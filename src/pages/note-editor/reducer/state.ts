import { Category } from "../../../model/category"
import { Note, SectionType } from "../../../model/note"

export interface State {
    note: Note
    edit?: string
    category: {
        open: boolean
        list: Category[]
    }
    editSection: {
        visible: boolean
        index?: number
        section?: SectionType
    }
    draft: {
        save: {
            modal: boolean,
            status: 'normal' | 'validation' | 'duplicate'
        },
        load: {
            modal: boolean
            status?: string
        }
    }
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
    editSection: {
        visible: false
    },
    draft: {
        load: {
            modal: false
        },
        save: {
            modal: false,
            status: 'normal'
        }
    },
    category: {
        list:[],
        open:false
    },
    photo: {
        open: false,
        list: []
    },
}