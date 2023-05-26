import { CSSProperties, useRef, useState } from "react";
import { connect } from "react-redux";
import { Note } from "../../../model/note";

import { dispatch } from "../../../redux";
import { actions } from "../reducer";
import { addNote, update } from "../reducer/actions";
import { State } from "../reducer/state";
import { Button, Card, Input, Space, Tag } from "antd";
import type { InputRef } from 'antd';


const NoteHeader = ({ note, edit }: Props) => {
  const namespace = sessionStorage.getItem('namespace');
  const ref = useRef<InputRef>(null);
  const [inputValue, setInputValue] = useState<string>('')

  const imgStyle: CSSProperties = {
    width: '100%',
    borderRadius: '5px',
    textAlign: 'center',
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: "center"
  }

  return <>
    <Card
      bordered
      title={
        <Space style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
          <Space.Compact block direction="horizontal">
            <Button onClick={() => dispatch(actions.modalSave(true))}>ذخیره پیش نویس</Button>
            <Button onClick={() => dispatch(actions.modalLoad(true))}>بارگذاری پیش نویس</Button>
          </Space.Compact>
          {
            (edit)
              ? <Button type="primary" onClick={() => dispatch(update(note))}>ذخیره تغییرات</Button>
              : <Button type="primary" onClick={() => dispatch(addNote(note))}>انتشار نوشته</Button>
          }
        </Space>
      }>
      <Space style={{ width: '100%' }} direction="vertical">
        {
          (note.photo)
            ? <img style={imgStyle} src={note.photo} />
            : <h2 style={imgStyle}>نوشته بدون عکس</h2>
        }
        <Space.Compact block>
          <Button block onClick={() => dispatch(actions.drawerPhoto(true))}>انتخاب تصویر</Button>
          <Button block onClick={() => dispatch(actions.resetNotePhoto())}>بدون عکس</Button>
          <Button block onClick={() => dispatch(actions.drawerCategory(true))}>انتخاب دسته بندی</Button>
          <Button block onClick={() => dispatch(actions.resetCategory())}>بدون دسته بندی</Button>
        </Space.Compact>
        <Input value={note.title} onChange={(text) => dispatch(actions.changeTitle(text.target.value))} placeholder="عنوان نوشته" />
        <Input
          ref={ref}
          value={inputValue}
          onPressEnter={(e) => {
            dispatch(actions.pushTag(ref.current!.input!.value));
            setInputValue('')
          }}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="کلمات کلیدی" />
        <div style={{ width: '100%' }}>
          {
            note.tag.map(text => (
              <Tag key={text} closable onClose={() => dispatch(actions.pullTag(text))}>{text}</Tag>
            ))
          }
        </div>
      </Space>
    </Card>
  </>
}

interface Props {
  note: Note
  edit?: string
}

function mapStateToProps(reducer: any): Props {
  const state: State = reducer.addNoteReducer;
  return {
    edit: state.edit,
    note: state.note
  }
}

export default connect(mapStateToProps)(NoteHeader);
