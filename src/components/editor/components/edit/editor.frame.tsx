import { Card, Input, Select, Space } from "antd";
import { connect } from "react-redux"
import RichtextEditor from "../richtext"

import { getActions } from "./_section.actions";
import { Frame, SectionName, SectionType } from "../../../../model/note"
import { State } from "../../redux/state";
import { useState } from "react";

const FrameComponent = ({ index, content, onChange }: Props) => {

  const [state, setState] = useState<Frame>({
    richtext: [],
    ...content![index],
    type: SectionName.frame
  });

  const [type, setType] = useState<string>(state.link?.split('=>')[0] ?? 'url');
  const [link, setLink] = useState<string>(state.link?.split('=>')[1] ?? '');


  return <>
    <Card
      style={{ backgroundColor: 'whitesmoke' }}
      extra={getActions(index, content!.length - 1)}
      title="فریم">
      <RichtextEditor
        onChange={(richtext) => {
          setState({ ...state, richtext: richtext });
          onChange?.({ ...state, richtext: richtext })
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

const mapStateToProps = (reducer: any) => {
  const { content }: State = reducer;
  return {
    content: content
  };
}

interface Props {
  index: number
  content: SectionType[]
  onChange?: (section: SectionType) => void
}

export default connect(mapStateToProps)(FrameComponent);

export const frameInitState: Frame = {
  type: SectionName.frame,
  richtext: []
}

interface EditorProps {
  onChange?: (section: SectionType) => void
  init?: Frame
}

export function EditorFrame({ onChange, init }: EditorProps) {
  return <FrameComponent onChange={onChange} index={0} content={[init ?? frameInitState]} />
} 
