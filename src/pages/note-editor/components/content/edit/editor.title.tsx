import { connect } from "react-redux"
import { Button, Card, Input, Space } from "antd"

import { getActions } from "./_section.actions"
import { Note, Title } from "../../../../../model/note"
import { actions } from "../../../reducer"
import { dispatch } from "../../../../../redux"
import { State } from "../../../reducer/state"

const EditorTitle = ({ note: { content }, index }: Props) => {

  const title: Title = {
    header: 'h1',
    text: '',
    ...content![index],
    type: 'title'
  }

  const TitleHeader = `${title.header}` as keyof JSX.IntrinsicElements;

  function setH(tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") {
    title.header = tag;
    dispatch(actions.updateSection({ index: index, section: title }))
  }

  return <>
    <Card
      style={{ backgroundColor: 'whitesmoke' }}
      title="عنوان"
      extra={getActions(index, content!.length - 1)}>
      <Space style={{ width: '100%' }} direction="vertical">
        <Space.Compact block>
          <Button block onClick={() => setH('h1')} type={(title.header === 'h1') ? 'primary' : 'default'}>h1</Button>
          <Button block onClick={() => setH('h2')} type={(title.header === 'h2') ? 'primary' : 'default'}>h2</Button>
          <Button block onClick={() => setH('h3')} type={(title.header === 'h3') ? 'primary' : 'default'}>h3</Button>
          <Button block onClick={() => setH('h4')} type={(title.header === 'h4') ? 'primary' : 'default'}>h4</Button>
          <Button block onClick={() => setH('h5')} type={(title.header === 'h5') ? 'primary' : 'default'}>h5</Button>
          <Button block onClick={() => setH('h6')} type={(title.header === 'h6') ? 'primary' : 'default'}>h6</Button>
        </Space.Compact>
        <Input
          value={title.text}
          onChange={(e) => {
            title.text = e.target.value;
            dispatch(actions.updateSection({ index: index, section: title }));
          }}
          placeholder="عنوان" />
        <TitleHeader>{title.text}</TitleHeader>
      </Space>
    </Card>
  </>

}

interface Props {
  note: Note
  index: number
}

function mapStateToProps(reducer: any) {
  const state: State = reducer.addNoteReducer;
  return {
    note: state.note
  }
}

export default connect(mapStateToProps)(EditorTitle)