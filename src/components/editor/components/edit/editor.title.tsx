import { connect } from "react-redux"
import { Button, Card, Input, Select, Space } from "antd"

import { getActions } from "./_section.actions"
import { SectionName, SectionType, Title } from "../../../../model/note"
import { State } from "../../redux/state"
import { useState } from "react"


const TitleComponent = ({ content, index, onChange }: Props) => {

  const [state, setState] = useState<Title>({
    header: 'h1',
    text: '',
    ...content![index],
    type: SectionName.title
  });

  const [type, setType] = useState<string>(state.link?.split('=>')[0] ?? 'url');
  const [link, setLink] = useState<string>(state.link?.split('=>')[1] ?? '');


  const TitleHeader = `${state.header}` as keyof JSX.IntrinsicElements;

  function setH(tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") {
    setState({ ...state, header: tag });
    onChange?.({ ...state, header: tag });
  }

  return <>
    <Card
      style={{ backgroundColor: 'whitesmoke' }}
      title="عنوان"
      extra={getActions(index, content!.length - 1)}>
      <Space style={{ width: '100%' }} direction="vertical">
        <Space.Compact block>
          <Button block onClick={() => setH('h1')} type={(state.header === 'h1') ? 'primary' : 'default'}>h1</Button>
          <Button block onClick={() => setH('h2')} type={(state.header === 'h2') ? 'primary' : 'default'}>h2</Button>
          <Button block onClick={() => setH('h3')} type={(state.header === 'h3') ? 'primary' : 'default'}>h3</Button>
          <Button block onClick={() => setH('h4')} type={(state.header === 'h4') ? 'primary' : 'default'}>h4</Button>
          <Button block onClick={() => setH('h5')} type={(state.header === 'h5') ? 'primary' : 'default'}>h5</Button>
          <Button block onClick={() => setH('h6')} type={(state.header === 'h6') ? 'primary' : 'default'}>h6</Button>
        </Space.Compact>
        <Space.Compact block>
          <Button block type={(state.align && state.align == 'start') ? "primary" : "default"} onClick={() => { setState({ ...state, align: 'start' }); onChange?.({ ...state, align: 'start' }); }}>راست</Button>
          <Button block type={(state.align && state.align == 'center') ? "primary" : "default"} onClick={() => { setState({ ...state, align: 'center' }); onChange?.({ ...state, align: 'center' }); }}>وسط</Button>
          <Button block type={(state.align && state.align == 'end') ? "primary" : "default"} onClick={() => { setState({ ...state, align: 'end' }); onChange?.({ ...state, align: 'end' }); }}>چپ</Button>
        </Space.Compact>
        <Input
          value={state.text}
          onChange={(e) => {
            setState({ ...state, text: e.target.value });
            onChange?.({ ...state, text: e.target.value });
          }}
          placeholder="عنوان" />
        <TitleHeader align={(state.align == "start") ? "right" : (state.align == "center") ? "center" : "left"}>{state.text}</TitleHeader>
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
      </Space>
    </Card>
  </>

}

interface Props {
  content: SectionType[]
  index: number
  onChange?: (section: SectionType) => void
}

function mapStateToProps(reducer: any) {
  const { content }: State = reducer;
  return {
    content: content
  }
}

export default connect(mapStateToProps)(TitleComponent)

export const titleInitState: Title = {
  type: SectionName.title,
  text: "",
  header: "h1"
}

interface EditorProps {
  onChange?: (section: SectionType) => void
  init?: Title
}

export function EditorTitle({ onChange, init }: EditorProps) {
  return <TitleComponent onChange={onChange} index={0} content={[init ?? titleInitState]} />
} 
