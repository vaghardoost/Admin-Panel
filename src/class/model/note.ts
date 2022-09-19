export interface Note {
    id?:string
    title:string
    category:string
    tag:any[]
    content:Paragraph[]
    author:string
}

export interface Paragraph {
    type:"h1"|"h2"|"h3"|"h4"|"h5"|"h6"|"tip"|"caption"
    words:Word[]
}

export interface Word {
    text:string,
    bold?:boolean,
    italic?:boolean,
}
