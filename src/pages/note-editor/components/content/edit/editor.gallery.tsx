import { connect } from "react-redux";
import { Note } from "../../../../../model/note";
import { State } from "../../../reducer/state";

const EditorAvatarCard = ({ }: Props) => {
  return <></>
}

interface Props {
  index: number
  note: Note
}

const mapStateToProps = (reducer: any) => {
  const { note }: State = reducer.addNoteReducer;
  return {
    note: note
  };
}

export default connect(mapStateToProps)(EditorAvatarCard);
