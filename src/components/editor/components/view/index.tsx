import { connect } from "react-redux";
import { Space } from "antd";

import { AvatarCard, Caption, CarouselCard, CarouselSm, Code, Frame, Gallery, Namespace, PairGallery, Photo, SectionType, Title } from "../../../../model/note";

import NoteViewCaption from "./note.caption"
import NoteViewPhoto from "./note.photo"
import NoteViewFrame from "./note.frame"
import NoteViewTitle from "./note.title"
import NoteViewCode from "./note.code"
import NoteViewAvatarCard from "./note.avatarcard"
import NoteViewPairGallery from "./note.pairgallery"
import NoteViewCarouselCard from "./note.carouselcard"
import NoteViewCarouselSm from "./note.carouselsm"
import NoteViewNamespace from "./note.namespace"
import NoteViewGallery from "./note.gallery"

import NoteEditCaption from "../edit/editor.caption";
import NoteEditPhoto from "../edit/editor.photo";
import NoteEditFrame from "../edit/editor.frame";
import NoteEditTitle from "../edit/editor.title";
import NoteEditCode from "../edit/editor.code";
import NoteEditAvatarCard from "../edit/editor.avatarcard";
import NoteEditPairGallery from "../edit/editor.pairgalley";
import NoteEditCarouselCard from "../edit/editor.carouselcard";
import NoteEditorCarouselSm from "../edit/editor.carouselsm";
import NoteEditorNamespace from "../edit/editor.namespace";
import NoteEditorGallery from "../edit/editor.gallery";


import { actions, dispatch } from "../../redux";
import { State } from "../../redux/state";

const View = ({ content, editSectionId, change }: Props) => {
  change(content);
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
      case "carousel-card":
        return <NoteViewCarouselCard carouselCard={section as CarouselCard} />
      case "carousel-sm":
        return <NoteViewCarouselSm carouselSm={section as CarouselSm} />
      case "namespace":
        return <NoteViewNamespace namespace={section as Namespace} />
      case "gallery":
        return <NoteViewGallery gallery={section as Gallery} />
      default:
        return <h3 className='fg-red'>نوع ناشناخته داده</h3>
    }
  }

  function getEdit(section: SectionType, index: number) {
    switch (section.type) {
      case "caption": return <NoteEditCaption index={index} onChange={(section) => update(index, section)} />
      case "photo": return <NoteEditPhoto index={index} onChange={(section) => update(index, section)} />
      case "frame": return <NoteEditFrame index={index} onChange={(section) => update(index, section)} />
      case "title": return <NoteEditTitle index={index} onChange={(section) => update(index, section)} />
      case "code": return <NoteEditCode index={index} onChange={(section) => update(index, section)} />
      case "avatar-card": return <NoteEditAvatarCard index={index} onChange={(section) => update(index, section)} />
      case "pair-gallery": return <NoteEditPairGallery index={index} onChange={(section) => update(index, section)} />
      case "carousel-card": return <NoteEditCarouselCard index={index} onChange={(section) => update(index, section)} />
      case "carousel-sm": return <NoteEditorCarouselSm index={index} onChange={(section) => update(index, section)} />
      case "namespace": return <NoteEditorNamespace index={index} onChange={(section) => update(index, section)} />
      case "gallery": return <NoteEditorGallery index={index} onChange={(section) => update(index, section)} />

      default: return <h3 className='fg-red'>نوع ناشناخته داده</h3>
    }
  }

  function update(index: number, section: SectionType) {
    dispatch(actions.updateSection({ index: index, section: section }))
  }

  return <>
    <Space style={{ width: '100%', cursor: 'pointer' }} direction="vertical">
      {
        content!.map((section, index) => <div
          key={section.id}
          onDoubleClick={() => {
            if (editSectionId !== section.id)
              dispatch(actions.seteditSectionId(section.id!))
          }}
          className="section-container">
          {
            (editSectionId === section.id)
              ? getEdit(section, index)
              : getView(section)
          }
        </div>)
      }
    </Space>
  </>

}

interface Props {
  content: SectionType[]
  editSectionId?: string
  change: (content: SectionType[]) => void
}

function mapStateToProps(reducer: any) {
  const state: State = reducer;
  return {
    content: state.content,
    editSectionId: state.editSectionId,
  }
}

export default connect(mapStateToProps)(View)
