export interface Note {
    id?: string
    title: string
    category?: string
    tag: any[]
    content?: Paragraph[]
    author: any
}

export interface Paragraph {
    text: Word[],
    url?: string,
    type?: 'photo'|'audio'|'video'|'doc'|'frame'|'title'
}


export interface Word {
    content: string,
    style?: 'italic'|'bold'|'italicBold'
}
