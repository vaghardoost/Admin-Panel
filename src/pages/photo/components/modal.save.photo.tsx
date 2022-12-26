import { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { Button, Modal, Uploader } from "rsuite";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import ModalTitle from "rsuite/esm/Modal/ModalTitle";
import { cdn } from "../../../config";
import { dispatch } from "../../../redux";
import { modalSave } from "../reducer";
import { loadPhotoList } from "../reducer/actions";
import State from "../reducer/state";

class SaveModalPhoto extends Component<Props> {
  public render(): ReactNode {
    const token = sessionStorage.getItem("file-token");
    return(
      <Modal overflow={true} backdrop="static" open={this.props.open}>
        <ModalTitle>
          <h4>آپلود عکس جدید</h4>
        </ModalTitle>
        <ModalBody>
          <Uploader 
            multiple 
            listType="picture" 
            action={cdn + "/photo/upload"} 
            headers={ {"Authorization" : `Bearer ${token}`} }
            onSuccess={()=>this.success()}
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={()=>dispatch(modalSave(false))}>بستن</Button>  
        </ModalFooter>
      </Modal>
    )
  }

  private success() {
    dispatch(loadPhotoList());
  }
}

interface Props {
  open:boolean
}

const mapStateToProps = (reducer:any):Props => {
  const state:State = reducer.photoReducer;
  return {
    open:state.modal.save
  }
}

export default connect(mapStateToProps)(SaveModalPhoto)
