import { Card, Input, Select, Space } from "antd";
import { connect } from "react-redux"
import RichtextEditor from "../richtext"

import { getActions, getLinkType } from "./_section.actions";
import { Frame, SectionName, SectionType } from "../../../../model/note"
import { State } from "../../redux/state";
import { useState } from "react";

const FrameComponent = ({ index, content, onChange }: Props) => {

  const [state, setState] = useState<Frame>({
    content: [],
    ...content![index],
    type: SectionName.frame
  });

  const [link, setLink] = useState<string>(getLinkType(state.link)[1]);
  const [type, setType] = useState<string>(getLinkType(state.link)[0]);


  return <>
    <Card
      style={{ backgroundColor: 'whitesmoke' }}
      extra={getActions(index, content!.length - 1)}
      title="فریم">
      <RichtextEditor
        onChange={(richtext) => {
          setState({ ...state, content: richtext });
          onChange?.({ ...state, content: richtext })
        }}
        richtext={state.content} />
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
  content: []
}

interface EditorProps {
  onChange?: (section: SectionType) => void
  init?: Frame
}

export function EditorFrame({ onChange, init }: EditorProps) {
  return <FrameComponent onChange={onChange} index={0} content={[init ?? frameInitState]} />
} 
