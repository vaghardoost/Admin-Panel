import { Card } from "antd";
import { connect } from "react-redux"

import { Frame, Note, RichText } from "../../../../../model/note"
import { State } from "../../../reducer/state";
import RichtextEditor from "../../../../../components/richtext.editor"
import { dispatch } from "../../../../../redux";
import { actions } from "../../../reducer";
import { getActions } from "./_section.actions";

const EditorFrame = ({ index, note: { content } }: Props) => {

  const frame: Frame = {
    richtext: [],
    ...content![index],
    type: 'frame'
  }
  
  return <>
    <Card
      style={{ backgroundColor: 'whitesmoke' }}
      extra={getActions(index, content!.length - 1)}
      title="فریم">
      <RichtextEditor
        onChange={(richtext) => {
          frame.richtext = richtext;
          dispatch(actions.updateSection({ index: index, section: frame }))
        }}
        richtext={frame.richtext} />
    </Card>
  </>

  function onChange(richtext: RichText[]) {
    frame.richtext = richtext;
    dispatch(actions.updateSection({ index: index, section: frame }))
  }
}

const mapStateToProps = (reducer: any) => {
  const { note }: State = reducer.addNoteReducer;
  return {
    note: note
  };
}

export default connect(mapStateToProps)(EditorFrame);

interface Props {
  index: number
  note: Note
}
