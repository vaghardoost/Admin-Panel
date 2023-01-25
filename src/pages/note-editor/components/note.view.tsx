import { generate } from "randomstring";
import { connect } from "react-redux";
import { NoteComponent } from "../../../components/note.view";
import { Note } from "../../../model/note";
import { State } from "../reducer/state"

function NoteView(props:Props) {
  return <NoteComponent key={generate()} note={props.note} />
}

interface Props {
  note:Note
}

function mapStateToProps(reducer:any):Props {
  const state:State = reducer.addNoteReducer;
  return {
    note:state.note
  }
}

export default connect(mapStateToProps)(NoteView);