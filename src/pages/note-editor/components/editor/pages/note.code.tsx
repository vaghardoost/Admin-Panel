import { connect } from "react-redux"
import { Panel } from "rsuite"
import { Note } from "../../../../../model/note";
import { State } from "../../../reducer/state";

function CodeView({ note }: Props) {
  return <>
    <Panel dir="ltr" bordered>
      <code>
        <pre style={{ width: '45rem', height: '250px', overflowY: 'scroll', overflowX: 'scroll' }}>
          {JSON.stringify(note, null, 5)}
        </pre>
      </code>
    </Panel>
  </>
}

interface Props {
  note: Note
}

function mapStateToProps(reducer: any): Props {
  const state: State = reducer.addNoteReducer;
  return { note: state.note };
}

export default connect(mapStateToProps)(CodeView)