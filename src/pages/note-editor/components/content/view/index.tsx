import { generate } from "randomstring";
import { AvatarCard, Caption, Carousel, Code, Frame, Note, PairGallery, Photo, SectionType, Title } from "../../../../../model/note";
import NoteViewCaption from "./note.caption"
import NoteViewPhoto from "./note.photo"
import NoteViewFrame from "./note.frame"
import NoteViewTitle from "./note.title"
import NoteViewCode from "./note.code"
import NoteViewAvatarCard from "./note.avatarcard"
import NoteViewPairGallery from "./note.pairgallery"
import NoteViewCarousel from "./note.carousel"

import NoteEditCaption from "../edit/editor.caption";
import NoteEditPhoto from "../edit/editor.photo";
import NoteEditFrame from "../edit/editor.frame";
import NoteEditTitle from "../edit/editor.title";
import NoteEditCode from "../edit/editor.code";
import NoteEditAvatarCard from "../edit/editor.avatarcard";
import NoteEditPairGallery from "../edit/editor.pairgalley";
import NoteEditCarousel from "../edit/editor.carousel";

import { connect } from "react-redux";
import { State } from "../../../reducer/state";
import { dispatch } from "../../../../../redux";
import { actions } from "../../../reducer";
import { Space } from "antd";

const View = ({ note, editSectionIndex: quickIndex }: Props) => {

  function getView(section: SectionType) {
    switch (section.type) {
      case "caption":
        return <NoteViewCaption caption={section as Caption} />
      case "photo":
        return <NoteViewPhoto photo={section as Photo} />
      case "frame":
        return <NoteViewFrame frame={section as Frame} />
      case "title":
        return <NoteViewTitle title={section as Title} />
      case "code":
        return <NoteViewCode code={section as Code} />
      case "avatar-card":
        return <NoteViewAvatarCard avatarCard={section as AvatarCard} />
      case "pair-gallery":
        return <NoteViewPairGallery pairgallery={section as PairGallery} />
        case "carousel":
          return <NoteViewCarousel carousel={section as Carousel} />
      default:
        return <h3 className='fg-red'>نوع ناشناخته داده</h3>
    }
  }

  function getEdit(section: SectionType, index: number) {
    switch (section.type) {
      case "caption": return <NoteEditCaption index={index} />
      case "photo": return <NoteEditPhoto index={index} />
      case "frame": return <NoteEditFrame index={index} />
      case "title": return <NoteEditTitle index={index} />
      case "code": return <NoteEditCode index={index} />
      case "avatar-card": return <NoteEditAvatarCard index={index} />
      case "pair-gallery": return <NoteEditPairGallery index={index} />
      case "carousel": return <NoteEditCarousel index={index} />
      default: return <h3 className='fg-red'>نوع ناشناخته داده</h3>
    }
  }

  return <>
    <Space style={{ width: '100%' }} direction="vertical">
      {
        note.content!.map((section, index) => <div
          key={section.id}
          onDoubleClick={() => {
            if (quickIndex !== index)
              dispatch(actions.quick({ index: index, section: section }))
          }}
          className="section-container">
          {
            (quickIndex === index)
              ? getEdit(section, index)
              : getView(section)
          }
        </div>)
      }
    </Space>
  </>

}


interface Props {
  note: Note
  editSectionIndex?: number
}

function mapStateToProps(reducer: any): Props {
  const state: State = reducer.addNoteReducer;
  return {
    note: state.note,
    editSectionIndex: state.editSection.index
  }
}

export default connect(mapStateToProps)(View)
