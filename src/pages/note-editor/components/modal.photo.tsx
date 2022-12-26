import { Component, ReactNode, RefObject, createRef } from "react";
import { connect } from "react-redux";
import { Avatar, Button, ButtonGroup, FlexboxGrid, Input, Modal, Stack } from "rsuite";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import ModalHeader from "rsuite/esm/Modal/ModalHeader";
import { dispatch } from "../../../redux";
import { actions } from "../reducer";
import { State } from "../reducer/state";
import { loadPhoto } from "../reducer/actions"
import File from "../../../model/file";
import { cdn } from "../../../config";

class PhotoModal extends Component<Props> {

  private readonly ref:RefObject<HTMLTextAreaElement> = createRef();

  componentDidMount(){
    dispatch(loadPhoto());
  }

  render(): ReactNode {
    return (
      <Modal size="full" overflow open={this.props.open}>
        <ModalHeader>
          <h4>اضافه کردن تصویر</h4>
        </ModalHeader>
        <ModalBody>
          <FlexboxGrid>
            <FlexboxGridItem colspan={12}>
              {
                this.props.list.map((file)=>{
                  return <Avatar onClick={()=>dispatch(actions.pickerPhotoSelect(file))} size="lg" circle src={cdn + "/photo/demo/" + file.id}/>
                })
              }
            </FlexboxGridItem>
            <FlexboxGridItem colspan={12}>
              {
                (this.props.select)
                  ? 
                  <>
                    <Stack justifyContent="center">
                      <img height={340} src={cdn + "/photo/" + this.props.select!.id}/>
                    </Stack>
                    <div className="around">
                      <Input
                        placeholder="توضیحات عکس"
                        ref={this.ref}
                        onChange={(text)=>{dispatch(actions.pickerPhotoCaption(text))}}
                        value={this.props.caption} 
                        dir="rtl" 
                        as="textarea" 
                        rows={4}/>
                    </div>
                  </>
                  : 
                  <h4>یکی از عکس ها رو انتخاب کنید</h4>
              }
            </FlexboxGridItem>
          </FlexboxGrid>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup>
            <Button size="sm" onClick={()=>this.build('append')} color="blue" appearance="primary">افزودن</Button>
            <Button size="sm" onClick={()=>this.build('copy')} color="blue" appearance="primary">رونوشت</Button>
            <Button size="sm" onClick={()=>dispatch(actions.modalphoto(false))}>بستن</Button>
          </ButtonGroup>
        </ModalFooter>
      </Modal>
    )
  }

  private async build(action:'copy'|'append'){
    const { select } = this.props;
    const text = (this.ref.current!.value).replace('\n',' ');
    
    const result = `*photo [${cdn + "/photo/" + select!.id}] ${text}`
    
    switch (action) {
      case 'append':
        dispatch(
          actions.changeContent(
            this.props.raw + "\n" + result
          )
        )
        break;
      case 'copy':
        break;
    }

    dispatch(actions.modalphoto(false));
  }

}

interface Props {
  open: boolean
  list: File[]
  caption: string
  select?: File
  raw: string
}

const mapStateToProps = (reducer:any):Props => {
  const state:State = reducer.addNoteReducer;
  return {
    ...state.picker.photo,
    raw:state.raw
  };
}

export default connect(mapStateToProps)(PhotoModal);