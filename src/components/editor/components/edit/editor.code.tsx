import { connect } from "react-redux";
import { Input, Card, Space, Select } from 'antd';


import { getActions } from "./_section.actions";
import { Code, SectionName, SectionType } from "../../../../model/note"
import { State } from "../../redux/state";
import { useState } from "react";


const CodeComponent = ({ content, index, onChange }: Props) => {

  const [state, setState] = useState<Code>({
    text: "",
    ...content![index],
    type: SectionName.code,
  })

  const [type, setType] = useState<string>(state.link?.split('=>')[0] ?? 'url');
  const [link, setLink] = useState<string>(state.link?.split('=>')[1] ?? '');


  return <>
    <Card
      style={{ backgroundColor: 'whitesmoke' }}
      extra={getActions(index, content!.length - 1)}
      title="کد">
      <code className="">
        <Input.TextArea
          value={state.text}
          dir='ltr'
          rows={8}
          onChange={(text) => change(text.target.value)} />
      </code>
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
              onChange?.({ ...state, link: `@${type}/${e.target.value}` });
              setState({ ...state, link: `@${type}/${e.target.value}` });
          }}
          placeholder='شناسه' />
        <Select
          defaultValue={type}
          onChange={(e) => {
            setType(e);
            onChange?.({ ...state, link: `@${e}/${link}` });
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

  function change(text: string) {
    setState({ ...state, text: text })
    onChange?.({ ...state, text: text });
  }

}

interface Props {
  content: SectionType[]
  index: number
  onChange?: (section: SectionType) => void
}

function mapStateToProps(reducer: any) {
  const state: State = reducer;
  return {
    content: state.content
  }
}

export default connect(mapStateToProps)(CodeComponent)

export const codeInitState: Code = {
  type: SectionName.code,
  text: ""
}

interface EditorProps {
  onChange?: (section: SectionType) => void
  init?: Code
}

export function EditorCode({ onChange, init }: EditorProps) {
  return <CodeComponent onChange={onChange} index={0} content={[init ?? codeInitState]} />
}
