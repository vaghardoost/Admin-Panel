export interface Note {
    id?: string
    title: string
    category?: string
    photo?: string
    tag: string[]
    content?: SectionType[]
    author: any
    env?: Environment
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
    link?: string
    type: string
}

export type SectionType =
    Caption | Photo | Frame |
    Code | Title | Gallery | PairGallery |
    Carousel | AvatarCard;

export interface Environment {
    background?: string
    bottomSheet: BottomSheet[]
}

export interface BottomSheet {
    title: string
    content: SectionType[]
    ok?: string
    cancel?: string
}

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

export interface Gallery extends Section {
    type: 'gallery'
    list: {
        id?: string
        link?: string
        caption?: string
        photo: string
    }[]
}

export interface PairGallery extends Section {
    type: 'pair-gallery'
    list: {
        id?: string
        link?: string,
        caption?: string
        photo: string
    }[]
}

export interface Carousel extends Section {
    type: 'carousel'
    list: {
        id?: string
        link?: string
        photo: string
    }[]
}

export interface CarouselCard extends Section {
    type: 'carousel-card'
    list: {
        photo: string
        title: string
        subtitle: string
    }
}

export interface AvatarCard extends Section {
    type: 'avatar-card'
    title: string
    subtitle: string
    avatar: string
}
