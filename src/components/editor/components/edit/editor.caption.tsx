import { connect } from 'react-redux'
import { Card, Input, Select, Space } from 'antd';

import RichtextEditor from "../richtext"
import { getActions } from './_section.actions';
import { Caption, SectionType, SectionName } from "../../../../model/note"
import { State } from '../../redux/state';
import { useState } from 'react';

const CaptionComponent = ({ index, content, onChange }: Props) => {

  const [state, setState] = useState<Caption>({ ...content[index] as Caption });


  const [type, setType] = useState<string>(state.link?.split('=>')[0] ?? 'url');
  const [link, setLink] = useState<string>(state.link?.split('=>')[1] ?? '');

  return <>
    <Card
      style={{ backgroundColor: 'whitesmoke' }}
      extra={getActions(index, content!.length - 1)}
      title="پاراگراف">
      <RichtextEditor
        onChange={(richtext) => {
          setState({ ...state, richtext: richtext });
          onChange?.({ ...state, richtext: richtext });
        }}
        richtext={state.richtext} />
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
    </Card>
  </>

}

interface Props {
  index: number
  content: SectionType[]
  onChange?: (section: SectionType) => void
}

const mapStateToProps = (reducer: any) => {
  const { content }: State = reducer;
  return {
    content: content
  };
}

export default connect(mapStateToProps)(CaptionComponent);

export const captionInitState: Caption = {
  type: SectionName.caption,
  richtext: []
}

interface EditorProps {
  onChange?: (section: SectionType) => void
  init?: Caption
}

export function EditorCaption({ onChange, init }: EditorProps) {
  return <CaptionComponent onChange={onChange} index={0} content={[init ?? captionInitState]} />
} 
