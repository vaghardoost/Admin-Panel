import { CSSProperties, useRef, useState } from "react";
import { connect } from "react-redux";
import { Note } from "../../../model/note";

import { dispatch } from "../../../redux";
import { actions } from "../reducer";
import { saveNote, update } from "../reducer/actions";
import { State } from "../reducer/state";
import { Button, Card, Input, Space, Tag, TreeSelect } from "antd";
import type { InputRef } from 'antd';
import { categoryTreeBuilder } from "../../../utils";
import { Category } from "../../../model/category";


const NoteMetadata = ({ note, edit, categories, loading }: Props) => {

  const ref = useRef<InputRef>(null);
  const [inputValue, setInputValue] = useState<string>()

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
      actions={[
        <Space style={{ width: '95%' }} direction="vertical">
          <Space.Compact block>
            <Button block onClick={() => dispatch(actions.drawerPhoto(true))}>انتخاب تصویر</Button>
            <Button block onClick={() => dispatch(actions.resetNotePhoto())}>بدون عکس</Button>
            <Button block onClick={() => dispatch(actions.drawerCategory(true))}>انتخاب دسته بندی</Button>
            <Button block onClick={() => dispatch(actions.resetCategory())}>بدون دسته بندی</Button>
          </Space.Compact>
          <Input value={note.title} onChange={(text) => dispatch(actions.setTitle(text.target.value))} placeholder="عنوان نوشته" />
          <TreeSelect
            treeLine
            treeData={categoryTreeBuilder(categories)}
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="دسته بندی والد (این دسته بندی زیرمجموعه کدام باشد؟)"
            allowClear
            treeDefaultExpandAll
            value={note.category}
            onChange={(data) => {
              dispatch(actions.setCategorySelected(data as string))
            }}
          />
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
      ]}
      title={
        <Space style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={() => dispatch(actions.drawerDraft(true))}>پیش نویس</Button>
          {
            (edit)
              ? <Button
                type="primary"
                loading={loading}
                onClick={() => {
                  dispatch(actions.loadingState())
                  dispatch(update(note));
                }}>
                ذخیره تغییرات
              </Button>
              : <Button
                type="primary"
                loading={loading}
                onClick={() => {
                  dispatch(actions.loadingState())
                  dispatch(saveNote(note));
                }}>
                انتشار نوشته
              </Button>
          }
        </Space>}>

      <Space style={{ width: '100%' }} direction="vertical">
        {
          (note.photo)
            ? <img style={imgStyle} src={note.photo} />
            : <h2 style={imgStyle}>نوشته بدون عکس</h2>
        }

      </Space>
    </Card>
  </>
}

interface Props {
  note: Note
  edit?: string
  categories: Category[]
  loading?: boolean
}

function mapStateToProps(reducer: any): Props {
  const state: State = reducer.addNoteReducer;
  return {
    edit: state.edit,
    note: state.note,
    categories: state.category.list,
    loading: state.pageState.loading,
  }
}

export default connect(mapStateToProps)(NoteMetadata);
