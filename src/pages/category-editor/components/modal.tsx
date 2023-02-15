import { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { Button, ButtonGroup, Modal } from "rsuite";
import { dispatch } from "../../../redux";
import { actions } from "../reducer";
import { State } from "../reducer/state";

class CategoryEditorModal extends Component<Props> {
  public render(): ReactNode {
    return <>
      <Modal open={this.props.open}>
        <Modal.Header closeButton={false}>
          <h4>{this.props.title}</h4>
        </Modal.Header>
          <p>{this.props.message}</p>
        <Modal.Body>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => { dispatch(actions.dialogClose()) }}>بستن</Button>
        </Modal.Footer>
      </Modal>
    </>
  }
}

interface Props {
  title: string,
  message: string
  open: boolean
}

function mapStateToProps(reducer: any): Props {
  const state: State = reducer.categoryEditorReducer;
  return { ...state.dialog }
}

export default connect(mapStateToProps)(CategoryEditorModal);
