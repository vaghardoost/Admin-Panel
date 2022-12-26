import { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { Button, ButtonGroup, Modal, Stack } from "rsuite";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import ModalTitle from "rsuite/esm/Modal/ModalTitle";
import { dispatch } from "../../../redux";
import State from "../reducer/state";
import { deSelect, modalDelete } from "../reducer"
import { loadPhotoList, removePhoto } from "../reducer/actions"

class DeleteModalPhoto extends Component<Props> {
  public render(): ReactNode {
    return(
      <Modal overflow={true} backdrop="static" open={this.props.open}>
        <ModalTitle>
          <h3>حذف تصویر</h3>
        </ModalTitle>
        <ModalBody>
          <h6>آیا تصویر با آیدی {this.props.id} حذف شود؟</h6>
          <p className="fg-red">فایل تصویر در سرور باقی خواهد ماند ولی دیگر توسط سرور آدرس دهی نخواهد شد</p>
        </ModalBody>
        <ModalFooter>
          <Stack justifyContent="flex-end">
            <ButtonGroup>
              <Button onClick={()=>this.close()}>بستن</Button>
              <Button onClick={()=>this.remove()} color="red" appearance="primary">حذف</Button>
            </ButtonGroup>
          </Stack>
        </ModalFooter>
      </Modal>
    )
  }

  private close(){
    dispatch(modalDelete(false))
  }

  private async remove() {
    await dispatch(removePhoto(this.props.id));
    await dispatch(loadPhotoList());
    dispatch(deSelect())
  }
}

interface Props {
  open:boolean
  id:string
}

const mapStateToProps = (reducer:any):Props => {
  const state:State = reducer.photoReducer;
  return {
    id: state.select?.id ?? "",
    open: state.modal.delete,
  }
}

export default connect(mapStateToProps)(DeleteModalPhoto)
