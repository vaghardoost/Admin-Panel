import { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { Button, Modal } from "rsuite";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import ModalTitle from "rsuite/esm/Modal/ModalTitle";
import { dispatch } from "../../../redux";
import { actions } from "../reducer";
import { State } from "../reducer/state";

class ModalAlert extends Component<Props>{
  render(): ReactNode {
    return (
      <Modal size="sm" open={this.props.open}>
        <ModalTitle> <h4>{this.props.title}</h4> </ModalTitle>
        <ModalBody>
          <h5 color={(this.props.status)}>{this.props.message}</h5>
        </ModalBody>
        <ModalFooter>
          <Button onClick={()=>dispatch(actions.alertModal({open:false}))}>بستن</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

interface Props {
  title:string
  message: string
  status: 'red'|'green'|'black'
  open: boolean
}

const mapStateToProps = (reducer:any):Props =>{
  const state:State = reducer.addNoteReducer;
  return state.picker.alert
}

export default connect(mapStateToProps)(ModalAlert);
