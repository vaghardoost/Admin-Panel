import { connect } from "react-redux"
import { Panel } from "rsuite"
import { Note } from "../../../model/note"
import { State } from "../reducer/state"

function CodeView({note}:Props) {
  return <>
  <Panel bordered header={<h3>نمای کد</h3>} >
    <pre dir="ltr" style={{height:'250px',overflowY: 'scroll'}}>
      <code>
        {JSON.stringify(note,null,5)}
      </code>
    </pre>
  </Panel>
  </>
}

interface Props {
  note:Note
}

function mapStateToProps(reducer:any):Props {
  const state:State = reducer.addNoteReducer;
  return {note:state.note};
}

export default connect(mapStateToProps)(CodeView)