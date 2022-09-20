import { Component, ReactNode, RefObject, createRef } from "react";
import { connect } from "react-redux";
import { Button, ButtonGroup, Input, Modal } from "rsuite";
import { Note } from "../../../class/model/note";
import { dispatch } from "../../../class/redux";
import { actions, State } from "../reducer";

interface Props {
    modal:boolean
    status:'normal'|'validation'|'duplicate'
    note:Note
}

class SaveModal extends Component<Props> {
    
    private saveDraftTextField:RefObject<HTMLInputElement> = createRef()
    
    public render(): ReactNode {
        return (
            <Modal overflow={true} backdrop="static" open={this.props.modal}>
                    <Modal.Header>
                        <h5>ذخیره پیش نویس</h5>
                        {
                            (this.props.status === 'validation')
                                ? <p className="fg-red">برای پیش نویس حتما یک نام انتخاب کنید</p>
                                : (this.props.status === 'duplicate')
                                    ? <p className="fg-red">یک پیش نویس دیگر با همین مشخصات ذخیره شده است نام دیگری انتخاب کنید</p>
                                    : <></>
                        }
                    </Modal.Header>
                    <Modal.Body>
                        <Input ref={this.saveDraftTextField} placeholder="شناسه ذخیره پیش نویس"/>
                    </Modal.Body>
                    <Modal.Footer>
                        <ButtonGroup>
                            <Button onClick={()=>{dispatch(actions.modalSave(false))}} size="sm">بستن</Button>
                            <Button onClick={()=>this.saveDraft()} size="sm" appearance="primary" color="green">ذخیره</Button>
                        </ButtonGroup>
                    </Modal.Footer>
                </Modal>
        )
    }

    
    private saveDraft(){
        const text = this.saveDraftTextField.current!.value;
        if (text === ""){
            dispatch(actions.modalSaveStatus('validation'));
            return;
        }
        if(localStorage.getItem(text) !== null){
            dispatch(actions.modalSaveStatus('duplicate'));
            return;
        }
        localStorage.setItem(text,JSON.stringify(this.props.note));
        dispatch(actions.modalSave(false));
    }
}

const mapStateToProps = (reducer:any):Props=>{
    const state:State = reducer.addNoteReducer;
    return {
        modal:state.draft.save.modal,
        status:state.draft.save.status,
        note:state.note
    }
}

export default connect(mapStateToProps)(SaveModal);