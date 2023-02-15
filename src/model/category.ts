import { Note } from "./note"

export interface Category {
    id?: string
    label: string
    parent?: string
    description: string
    color?: string
    avatar?: string
    note?:Note[]
}
