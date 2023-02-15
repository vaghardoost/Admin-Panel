import { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { Button, Modal } from "rsuite";
import { dispatch } from "../../../redux";
import { actions } from "../reducer";
import { State } from "../reducer/state";

class MessageModal extends Component<Props> {
  render(): ReactNode {
    return <>
      <Modal open={this.props.show}>
        <Modal.Title><h4>{this.props.title}</h4></Modal.Title>
        <Modal.Body><p>{this.props.content}</p></Modal.Body>
        <Modal.Footer>
          <Button onClick={()=>dispatch(actions.modalMessageClose())}>بستن</Button>
        </Modal.Footer>
      </Modal>
    </>
  }
}

interface Props {
  show: boolean
  title: string
  content: string
}

function mapStateToProps(reducer: any): Props {
  const state: State = reducer.noteReducer;
  return {
    ...state.message
  }
}

export default connect(mapStateToProps)(MessageModal)