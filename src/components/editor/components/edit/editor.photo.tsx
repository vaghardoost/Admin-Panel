import { connect } from "react-redux"
import { Avatar, Button, Card, Drawer, Input, Select, Space } from 'antd';
import { useState } from "react";

import { cdn } from "../../../../config";
import { getActions } from "./_section.actions";
import { State } from "../../redux/state";
import { Photo, RichText, SectionName, SectionType } from "../../../../model/note"
import RichTextView from "../richtext";

const PhotoComponent = ({ index, photos, content, onChange }: Props) => {
  const namespace = sessionStorage.getItem('namespace');

  const [state, setState] = useState<Photo>({
    richtext: [],
    url: '',
    ...content![index],
    type: SectionName.photo
  });

  const [type, setType] = useState<string>(state.link?.split('=>')[0] ?? 'url');
  const [link, setLink] = useState<string>(state.link?.split('=>')[1] ?? '');

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
          photos.map(file => (
            <Avatar
              onClick={() => {
                setState({ ...state, url: `${cdn}/${namespace}/photo/${file}` });
                onChange?.({ ...state, url: `${cdn}/${namespace}/photo/${file}` })
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
        <img src={state.url} style={{ width: '100%' }} />
        <Button block onClick={() => setOpen(true)}>انتخاب تصویر</Button>
        <RichTextView onChange={(richtext) => onChangeRich(richtext)} richtext={state.richtext} />
        <Space.Compact style={{ margin: '0 auto' }} block dir='ltr'>
          <Input
            value={link}
            onChange={(e) => {
              if (e.target.value === '') {
                setLink('');
                onChange?.({ ...state, link: undefined })
                setState({ ...state, link: undefined });
                return
              }
              setLink(e.target.value);
              onChange?.({ ...state, link: `${type}=>${e.target.value}` });
              setState({ ...state, link: `${type}=>${e.target.value}` })
            }}
            placeholder='شناسه' />
          <Select
            defaultValue={type}
            onChange={(e) => {
              setType(e);
              onChange?.({ ...state, link: `${e}=>${link}` });
              setState({ ...state, link: `${e}=>${link}` });
            }}
            options={[
              { value: 'url', label: 'لینک خارجی' },
              { value: 'bottomsheet', label: 'منو کشویی' },
              { value: 'datapack', label: 'صفحه دیگر' },
            ]}
          />
        </Space.Compact>
      </Space>

    </Card>
  </>

  function onChangeRich(richtext: RichText[]) {
    setState({ ...state, richtext: richtext });
    onChange?.({ ...state, richtext: richtext });
  }
}

interface Props {
  content: SectionType[]
  index: number
  photos: string[]
  onChange?: (section: SectionType) => void
}

function mapStateToProps(reducer: any) {
  const { content, data }: State = reducer
  return {
    content: content,
    photos: data.photoList
  }
}

export default connect(mapStateToProps)(PhotoComponent);

export const photoInitState: Photo = {
  type: SectionName.photo,
  richtext: [],
  url: ""
}

interface EditorProps {
  onChange?: (section: SectionType) => void
  photos: string[]
  init?: Photo
}

export function EditorPhoto({ onChange, photos, init }: EditorProps) {
  return <PhotoComponent onChange={onChange} index={0} content={[init ?? photoInitState]} photos={photos} />
} 
