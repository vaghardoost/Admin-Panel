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
    Carousel | AvatarCard | CarouselCard;

export enum SectionName {
    caption = 'caption',
    photo = 'photo',
    frame = 'frame',
    code = 'code',
    title = 'title',
    gallery = 'gallery',
    pairGallery = 'pair-gallery',
    carousel = 'carousel',
    avatarCard = 'avatar-card',
    carouselCard = 'carousel-card',
}

export interface Environment {
    background?: string
    bottomSheet: Bottomsheet[]
}

export interface Bottomsheet {
    id?: string
    title: string
    content?: SectionType
    background?: string
    ok?: string
    cancel?: string
}

export interface Caption extends Section {
    type: SectionName.caption
    richtext: RichText[]
}

export interface Photo extends Section {
    type: SectionName.photo
    url: string
    richtext: RichText[]
}

export interface Frame extends Section {
    type: SectionName.frame
    richtext: RichText[]
}

export interface Code extends Section {
    type: SectionName.code
    text: string
}

export interface Title extends Section {
    type: SectionName.title
    text: string
    header: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
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

export interface Carousel extends Section {
    type: SectionName.carousel
    list: {
        id?: string
        link?: string
        photo: string
    }[]
}

export interface CarouselCard extends Section {
    type: SectionName.carouselCard
    list: {
        photo: string
        title: string
        subtitle: string
    }[]
}

export interface AvatarCard extends Section {
    type: SectionName.avatarCard
    title: string
    subtitle: string
    avatar: string
}
