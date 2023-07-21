import { connect } from "react-redux"
import { Avatar, Button, Card, Drawer, Input, Select, Space } from 'antd';
import { useState } from "react";

import { cdn } from "../../../../config";
import { getActions, getLinkType } from "./_section.actions";
import { State } from "../../redux/state";
import { Photo, RichText, SectionName, SectionType } from "../../../../model/note"
import RichTextView from "../richtext";

const PhotoComponent = ({ index, photos, content, onChange }: Props) => {
  const namespace = sessionStorage.getItem('namespace');

  const [state, setState] = useState<Photo>({
    url: '',
    ...content![index],
    type: SectionName.photo
  });

  const [link, setLink] = useState<string>(getLinkType(state.link)[1]);
  const [type, setType] = useState<string>(getLinkType(state.link)[0]);

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
        {
          state.content
            ? <RichTextView onChange={(richtext) => onChangeRich(richtext)} richtext={state.content} />
            : <></>
        }
        <Space.Compact style={{ margin: '0 auto' }} block dir='ltr'>
          <Input
            value={link}
            onChange={(e) => {
              const { value: link } = e.target;
              if (link === '') {
                setLink('');
                onChange?.({ ...state, link: undefined })
                setState({ ...state, link: undefined });
                return
              }
              setLink(link);
              onChange?.({ ...state, link: (type === "url") ? link : `@${type}/${link}` });
              setState({ ...state, link: (type === "url") ? link : `@${type}/${link}` });
            }}
            placeholder='شناسه' />
          <Select
            defaultValue={type}
            onChange={(e) => {
              setType(e);
              onChange?.({ ...state, link: (e === "url") ? link : `@${e}/${link}` });
              setState({ ...state, link: (e === "url") ? link : `@${e}/${link}` });
            }}
            options={[
              { value: 'url', label: 'لینک خارجی' },
              { value: 'bottomsheet', label: 'منو کشویی' },
              { value: 'datapack', label: 'صفحه دیگر' },
              { value: 'namespace', label: 'فضای دیگر' },
            ]}
          />
        </Space.Compact>
      </Space>

    </Card>
  </>

  function onChangeRich(richtext: RichText[]) {
    setState({ ...state, content: richtext });
    onChange?.({ ...state, content: richtext });
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
  content: [],
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
