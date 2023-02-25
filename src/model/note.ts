export interface Note {
    id?: string
    title: string
    category?: string
    photo?: string
    tag: any[]
    content?: SectionType[]
    author: any
}

export interface RichText {
    content: RichSpan[],
    dir?: 'rtl' | 'ltr'
}

export interface RichSpan {
    text: string
    style?: RichStyle
}

interface RichStyle {
    weight?: RichWeight[]
    size?: number
    color?: string
}

export type RichWeight = 'BOLD' | 'ITALIC' | 'STRIKETHROUGH' | 'UNDERLINE'

interface Section {
    id?: string
    type: string
}

export type SectionType = Caption | Photo | Frame | Code | Title;

export interface Caption extends Section {
    type: 'caption'
    richtext: RichText[]
}

export interface Photo extends Section {
    type: 'photo'
    url: string
    richtext: RichText[]
}

export interface Frame extends Section {
    type: 'frame'
    richtext: RichText[]
}

export interface Code extends Section {
    type: 'code'
    text: string
}

export interface Title extends Section {
    type: 'title'
    text: string
    header: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

