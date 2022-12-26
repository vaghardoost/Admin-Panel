import { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { Button, Modal } from "rsuite";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import ModalTitle from "rsuite/esm/Modal/ModalTitle";
import { NoteComponent } from "../../../components/note.view";
import { Note } from "../../../model/note";
import { dispatch } from "../../../redux";
import { actions } from "../reducer";
import { State } from "../reducer/state";

class ModalNote extends Component<Props> {

  public render():ReactNode {
    return(
      <Modal size="lg" open={(this.props.status !== 'close')}>
        <ModalTitle>
          <h2>
            {this.props.note?.title}
          </h2>
        </ModalTitle>
        <ModalBody>
          {
            (this.props.note)
            ?
              <NoteComponent note={this.props.note} />
            :
              <h1>Nothing To Showing </h1>
          }
        </ModalBody>
        <ModalFooter>
          <Button onClick={()=>dispatch(actions.closeModal())}>بستن</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

interface Props {
  status:'loading'|'showing'|'close'
  note?:Note
}

const mapStateToProps = (reducer:any):Props=>{
  const state:State = reducer.noteReducer;
  return {
    status:state.select.status,
    note:state.select.note
  }
}

export default connect(mapStateToProps)(ModalNote)
