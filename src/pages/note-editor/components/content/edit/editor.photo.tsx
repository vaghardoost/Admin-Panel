import { connect } from "react-redux"
import { Avatar, Button, Card, Drawer, Space } from 'antd';

import RichTextView from "../../../../../components/richtext.editor"
import { cdn } from "../../../../../config"
import { Note, Photo, RichText } from "../../../../../model/note"
import { dispatch } from "../../../../../redux"
import { actions } from "../../../reducer"
import { State } from "../../../reducer/state"
import { useState } from "react";
import { getActions } from "./_section.actions";

const EditorPhoto = ({ index, list, note: { content } }: Props) => {

  const namespace = sessionStorage.getItem('namespace');
  const photo: Photo = {
    richtext: [],
    url: '',
    ...content![index],
    type: 'photo'
  }
  const [open, setOpen] = useState<boolean>(false);

  return <>
    <Drawer
      placement="left"
      open={open}
      closable={false}
      extra={
        <Space>
          <Button onClick={() => setOpen(false)}>بستن</Button>
        </Space>
      }
      title="انتخاب عکس">
      <Space direction="horizontal" wrap align="center" style={{ width: '100%' }}>
        {
          list.map(file => (
            <Avatar
              onClick={() => {
                photo.url = `${cdn}/${namespace}/photo/${file}`;
                dispatch(actions.updateSection({ index: index, section: photo }));
              }}
              size={100}
              shape="square"
              key={file}
              src={`${cdn}/${namespace}/photo/demo.${file}`} />
          ))
        }
      </Space>
    </Drawer>
    <Card
      style={{ backgroundColor: 'whitesmoke' }}
      extra={getActions(index, content!.length - 1)}
      title="تصویر">
      <Space style={{ width: "100%" }} direction="vertical">
        <img src={photo.url} style={{ width: '100%' }} />
        <Button block onClick={() => setOpen(true)}>انتخاب تصویر</Button>
        <RichTextView onChange={(richtext) => onChange(richtext)} richtext={photo.richtext} />
      </Space>
    </Card>
  </>

  function onChange(richtext: RichText[]) {
    photo.richtext = richtext;
    dispatch(actions.updateSection({ index: index, section: photo }));
  }
}

interface Props {
  note: Note
  index: number
  list: string[]
}

function mapStateToProps(reducer: any) {
  const state: State = reducer.addNoteReducer
  return {
    note: state.note,
    list: state.photo.list
  }
}

export default connect(mapStateToProps)(EditorPhoto);