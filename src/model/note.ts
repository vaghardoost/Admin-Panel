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


export interface Section {
    id?: string
    link?: string
    type: SectionName
}

export type SectionType =
    Caption | Photo | Frame |
    Code | Title | Gallery | PairGallery |
    AvatarCard | CarouselCard | CarouselSm | Namespace
    // | Carousel
    ;

export enum SectionName {
    caption = 'caption',
    frame = 'frame',
    photo = 'photo',
    code = 'code',
    title = 'title',
    gallery = 'gallery',
    pairGallery = 'pair-gallery',
    carouselCard = 'carousel-card',
    avatarCard = 'avatar-card',

    namespace = 'namespace',
    carouselSm = 'carousel-sm',

    // carousel = 'carousel',
}

export interface Environment {
    bottomsheet: Bottomsheet[]
}

export interface Bottomsheet {
    id?: string
    title: string
    content?: SectionType
}

export interface Caption extends Section {
    type: SectionName.caption
    content: RichText[]
}

export interface Photo extends Section {
    type: SectionName.photo
    url: string
    content?: RichText[]
}

export interface Frame extends Section {
    type: SectionName.frame
    content: RichText[]
}

export interface Code extends Section {
    type: SectionName.code
    text: string
}

export interface Title extends Section {
    type: SectionName.title
    text: string
    header: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    align?: 'start' | 'end' | 'center'
}

export interface Gallery extends Section {
    type: SectionName.gallery
    list: {
        id?: string
        link?: string
        caption?: string
        photo: string
    }[]
}

export interface PairGallery extends Section {
    type: SectionName.pairGallery
    list: {
        id?: string
        link?: string,
        caption?: string
        photo: string
    }[]
}

export interface CarouselSm extends Section {
    type: SectionName.carouselSm
    list: {
        id?: string
        link?: string
        caption?: string
        photo: string
    }[]
}

export interface CarouselCard extends Section {
    type: SectionName.carouselCard
    list: {
        id: string,
        link: string,
        photo: string,
        title: string,
        subtitle: string,
    }[]
}

export interface AvatarCard extends Section {
    type: SectionName.avatarCard
    title: string
    subtitle: string
    avatar: string
}

export interface Namespace extends Section {
    type: SectionName.namespace
    namespace: string
}
