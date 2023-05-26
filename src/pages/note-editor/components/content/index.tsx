import { connect } from "react-redux";
import { Card } from "antd";

import { Note } from "../../../../model/note";
import { State } from "../../reducer/state";
import View from "./view";
import EditorAppend from "./edit/editor.append";

interface Props {
  note: Note
  edit?: string
}

const NoteEditor = ({ note }: Props) => {
  return (
    <Card
      actions={[<EditorAppend />]}
      style={{ marginTop: '20px' }}
      title={note.title ?? "عنوان وارد کنید"}>
      <View />
    </Card >
  )

}

function mapStateToProps(reducer: any): Props {
  const state: State = reducer.addNoteReducer;
  return {
    note: state.note,
    edit: state.edit
  }
}

export default connect(mapStateToProps)(NoteEditor)
