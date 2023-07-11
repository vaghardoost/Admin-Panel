import { Button, Card, Drawer, Input, Space } from "antd";
import { connect } from "react-redux"
import { State } from "../reducer/state";
import { generate } from "randomstring"

import { AvatarCard, Bottomsheet, Caption, CarouselCard, CarouselSm, Code, Frame, Gallery, Namespace, PairGallery, Photo, SectionName, Title } from "../../../model/note";

import NoteCaption from "../../../components/editor/components/view/note.caption";
import NoteTitle from "../../../components/editor/components/view/note.title";
import NoteFrame from "../../../components/editor/components/view/note.frame";
import NoteCode from "../../../components/editor/components/view/note.code";
import NotePhoto from "../../../components/editor/components/view/note.photo";
import NoteAvatarcard from "../../../components/editor/components/view/note.avatarcard";
import NotePairgallery from "../../../components/editor/components/view/note.pairgallery";
import NoteCarouselCard from "../../../components/editor/components/view/note.carouselcard";
import NoteCarouselSm from "../../../components/editor/components/view/note.carouselsm";
import NoteNamespace from "../../../components/editor/components/view/note.namespace";
import NoteGallery from "../../../components/editor/components/view/note.gallery";

import { EditorCaption, captionInitState } from "../../../components/editor/components/edit/editor.caption"
import { EditorTitle, titleInitState } from "../../../components/editor/components/edit/editor.title"
import { EditorFrame, frameInitState } from "../../../components/editor/components/edit/editor.frame";
import { EditorCode, codeInitState } from "../../../components/editor/components/edit/editor.code";
import { EditorPhoto, photoInitState } from "../../../components/editor/components/edit/editor.photo";
import { EditorAvatarCard, avatarCardInitState } from "../../../components/editor/components/edit/editor.avatarcard";
import { EditorPairGallery, pairGalleryInitState } from "../../../components/editor/components/edit/editor.pairgalley";
import { EditorCarouselCard, carouselCardInitState } from "../../../components/editor/components/edit/editor.carouselcard";
import { EditorCarouselSm, carouselSmInitState } from "../../../components/editor/components/edit/editor.carouselsm";
import { EditorNamespace, namespaceInitState } from "../../../components/editor/components/edit/editor.namespace";
import { EditorGallery, galleryInitState } from "../../../components/editor/components/edit/editor.gallery";

import { dispatch } from "../../../redux";
import { actions } from "../reducer";
import { useEffect, useState } from "react";

const AddSection = ({ open, type, photos, bottomsheet }: Props) => {

  const [state, setState] = useState<Bottomsheet>(
    {
      id: generate({ charset: 'ABCDEF1234567890', length: 8 }),
      title: ''
    }
  );

  useEffect(() => {
    if (bottomsheet)
      setState(bottomsheet)
  }, [bottomsheet])

  let view = <></>
  let edit = <></>

  switch (type) {
    case SectionName.caption:
      view = <NoteCaption caption={state.content as Caption ?? bottomsheet?.content as Caption ?? captionInitState} />
      edit = <EditorCaption init={bottomsheet?.content as Caption} onChange={(s) => setState({ ...state, content: s })} />
      break;
    case SectionName.title:
      view = <NoteTitle title={state.content as Title ?? bottomsheet?.content as Title ?? titleInitState} />
      edit = <EditorTitle init={bottomsheet?.content as Title} onChange={(s) => setState({ ...state, content: s })} />
      break;
    case SectionName.frame:
      view = <NoteFrame frame={state.content as Frame ?? bottomsheet?.content as Frame ?? frameInitState} />
      edit = <EditorFrame init={bottomsheet?.content as Frame} onChange={(s) => setState({ ...state, content: s })} />
      break;
    case SectionName.code:
      view = <NoteCode code={state.content as Code ?? bottomsheet?.content as Code ?? codeInitState} />
      edit = <EditorCode init={bottomsheet?.content as Code} onChange={(s) => setState({ ...state, content: s })} />
      break;
    case SectionName.photo:
      view = <NotePhoto photo={state.content as Photo ?? bottomsheet?.content as Photo ?? photoInitState} />
      edit = <EditorPhoto init={bottomsheet?.content as Photo} onChange={(s) => setState({ ...state, content: s })} photos={photos} />
      break;
    case SectionName.avatarCard:
      view = <NoteAvatarcard avatarCard={state.content as AvatarCard ?? bottomsheet?.content as AvatarCard ?? avatarCardInitState} />
      edit = <EditorAvatarCard init={bottomsheet?.content as AvatarCard} onChange={(s) => setState({ ...state, content: s })} photos={photos} />
      break;
    case SectionName.pairGallery:
      view = <NotePairgallery pairgallery={state.content as PairGallery ?? bottomsheet?.content as PairGallery ?? pairGalleryInitState} />
      edit = <EditorPairGallery init={bottomsheet?.content as PairGallery} onChange={(s) => setState({ ...state, content: s })} photos={photos} />
      break;
    case SectionName.gallery:
      view = <NoteGallery gallery={state.content as Gallery ?? bottomsheet?.content as Gallery ?? galleryInitState} />
      edit = <EditorGallery init={bottomsheet?.content as Gallery} onChange={(s) => setState({ ...state, content: s })} photos={photos} />
      break;
    case SectionName.carouselCard:
      view = <NoteCarouselCard carouselCard={state.content as CarouselCard ?? bottomsheet?.content as CarouselCard ?? carouselCardInitState} />
      edit = <EditorCarouselCard init={bottomsheet?.content as CarouselCard} onChange={(s) => setState({ ...state, content: s })} photos={photos} />
      break;
    case SectionName.carouselSm:
      view = <NoteCarouselSm carouselSm={state.content as CarouselSm ?? bottomsheet?.content as CarouselSm ?? carouselSmInitState} />
      edit = <EditorCarouselSm init={bottomsheet?.content as CarouselSm} onChange={(s) => setState({ ...state, content: s })} photos={photos} />
      break;
    case SectionName.namespace:
      view = <NoteNamespace namespace={state.content as Namespace ?? bottomsheet?.content as Namespace ?? namespaceInitState} />
      edit = <EditorNamespace init={bottomsheet?.content as Namespace} onChange={(s) => setState({ ...state, content: s })} />
      break;

  }

  return <>
    <Drawer
      destroyOnClose
      extra={<>
        <Button
          onClick={() => {
            bottomsheet
              ? dispatch(actions.updateBottomsheet({ ...state, id: bottomsheet.id }))
              : dispatch(actions.pushBottomsheet(state))
            dispatch(actions.closeDrawer());
            setState({
              id: generate({ charset: 'ABCDEF0123456789', length: 8 }),
              title: '',
            });
          }}>
          {
            bottomsheet
              ? 'ویرایش'
              : 'افزودن'
          }
        </Button>
      </>}
      onClose={() => {
        dispatch(actions.closeDrawer());
        setState({
          id: generate({ charset: 'ABCDEF0123456789', length: 8 }),
          title: '',
        });
      }}
      width={600}
      open={open}
      placement="left">
      <Space style={{ width: '100%' }} direction="vertical">
        <Input onChange={(e) => setState({ ...state, title: e.target.value })} placeholder="عنوان" value={state.title} />
        {edit}
        <Card
          title={state.title}>
          {view}
        </Card>
      </Space>

    </Drawer >
  </>
}

interface Props {
  open: boolean
  type: SectionName
  photos: string[]
  bottomsheet?: Bottomsheet
}

function mapStateToProps(reducer: any): Props {
  const { drawerBottomsheet: drawer, photo }: State = reducer.datapackEditorReducer;
  return {
    photos: photo,
    open: drawer.open,
    type: drawer.type,
    bottomsheet: drawer.bottomsheet
  }
}

export default connect(mapStateToProps)(AddSection);

