import { Category } from "../../../model/category"
import File from "../../../model/file"
import { Note, SectionType } from "../../../model/note"

export interface State {
    note: Note
    edit?: string
    photoList: File[]
    quick: {
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
    category: {
        list: Category[],
        buttonStatus: 'loading' | 'normal'
    }
    picker: {
        alert: {
            title: string
            message: string
            status: 'red' | 'green' | 'black'
            open: boolean
        }
        photo: {
            open: boolean
        }
    }
    page: 'edit' | 'view'
}

export const initialState: State = {
    note: {
        title: "",
        content: [],
        tag: [],
        author: '',
    },
    quick: {
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
        list: [],
        buttonStatus: 'normal'
    },
    picker: {
        alert: {
            message: '',
            open: false,
            status: 'black',
            title: ''
        },
        photo: {
            open: false
        }
    },
    page: 'view',
    photoList: []
}