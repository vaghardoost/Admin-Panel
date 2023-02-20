import { connect } from "react-redux";
import { NoteComponent } from "../../../../../components/note.view";
import { Note } from "../../../../../model/note";
import { dispatch } from "../../../../../redux";
import { actions } from "../../../reducer";
import { State } from "../../../reducer/state"

function NoteView(props: Props) {
  return <NoteComponent quickIndex={props.quickIndex} itemClick={(section, index) => { dispatch(actions.quick({ index: index, section: section })) }} note={props.note} />
}

interface Props {
  note: Note
  quickIndex?:number,
}

function mapStateToProps(reducer: any): Props {
  const state: State = reducer.addNoteReducer;
  return {
    note: state.note,
    quickIndex: state.quick.index,
  }
}

export default connect(mapStateToProps)(NoteView);