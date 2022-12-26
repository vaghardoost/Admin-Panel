import { Component, ReactNode } from "react"
import { connect } from "react-redux"
import { Button, ButtonGroup, Modal } from "rsuite"
import { dispatch } from "../../../redux"
import { actions } from "../reducer"
import { removeNoteAction, queryAction } from "../reducer/action"
import { State } from "../reducer/state"

class ModalRemove extends Component<Props> {
  render():ReactNode{
    return(
      <Modal size="sm" open={this.props.open}>
        <Modal.Title>
          <h3>حذف نوشته</h3>
        </Modal.Title>
        <Modal.Body>
          <h6 className="fg-red">آیا این نوشته با شناسه ی {this.props.id} از سیستم حذف شود؟</h6>
        </Modal.Body>
        <Modal.Footer>
          <ButtonGroup>
            <Button onClick={()=>this.remove()} color="red" appearance="primary">حذف</Button>
            <Button onClick={()=>dispatch(actions.removeModal({open:false,id:''}))}>بستن</Button>
          </ButtonGroup>
        </Modal.Footer>
      </Modal>
    )
  }

  private async remove(){
    await dispatch(removeNoteAction(this.props.id));
    await dispatch(queryAction({}));
    dispatch(actions.removeModal({open:false,id:''}));
  }
}

interface Props {
  open:boolean,
  id:string,
}

const mapStateToProps = (reducer:any):Props =>{
  const state:State = reducer.noteReducer;
  return {
    open:state.remove.open,
    id:state.remove.id
  }
}

export default connect(mapStateToProps)(ModalRemove)
