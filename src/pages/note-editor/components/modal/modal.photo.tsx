import { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { Avatar, Button, Modal, Panel, Stack } from "rsuite";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import ModalTitle from "rsuite/esm/Modal/ModalTitle";
import { cdn } from "../../../../config";
import File from "../../../../model/file";
import { dispatch } from "../../../../redux";
import { actions } from "../../reducer";
import { State } from "../../reducer/state";


class ModalPhoto extends Component<Props>{
  render(): ReactNode {
    const { list, open, photo } = this.props;
    return (
      <Modal size="sm" open={open}>
        <ModalTitle> <h4>انتخاب تصویر برای نوشته</h4> </ModalTitle>
        <ModalBody>
          <div className='around'>
            <Stack justifyContent="center">
              <img className='img' src={(photo) ? cdn + "/photo/" + photo : ``} />
            </Stack>
          </div>
          <Panel>
            <div className="around editor">
              <div className='around'>
                {
                  list.map((file) => {
                    return <Avatar onClick={() => { dispatch(actions.setNotePhoto(file.id)) }} size="sm" circle src={cdn + "/photo/demo/" + file.id} />
                  })
                }
              </div>
            </div>
          </Panel>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => dispatch(actions.photoPicker(false))}>بستن</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

interface Props {
  open: boolean
  list: File[]
  photo?: string
}

const mapStateToProps = (reducer: any): Props => {
  const state: State = reducer.addNoteReducer;
  return {
    list: state.photoList,
    open: state.picker.photo.open,
    photo: state.note.photo
  }
}

export default connect(mapStateToProps)(ModalPhoto);
