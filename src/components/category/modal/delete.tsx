import {Component, ReactNode} from "react";
import { connect } from "react-redux";
import { Button, ButtonGroup, Modal, Stack } from "rsuite";
import { dispatch } from "../../../class/redux";
import { actions, State } from "../reducer";

interface Props {
    show:boolean
}

class DeleteModal extends Component<Props> {
    public render(): ReactNode {
        const {Title,Body,Footer} = Modal;
        return (
            <Modal open={this.props.show}>
                <Body>
                    <h5>آیا دسته بندی حذف شود؟</h5>
                    <h6 className="around">دقت کنید در صورت حذف شدن این دسته بندی سایر دسته بندی های زیردست غیرقابل رصد خواهند شد</h6>
                </Body>
                <Footer>
                    <Stack justifyContent="flex-end">
                        <ButtonGroup>
                            <Button color="red" appearance="primary">بله</Button>
                            <Button onClick={()=>dispatch(actions.modalDelete(false))}>خیر</Button>
                        </ButtonGroup>
                    </Stack>
                </Footer>
            </Modal>
        )
    }
}

const mapStateToProps = (reducer:any):Props=>{
    const state:State = reducer.categoryReducer;
    return {
        show:state.modal.delete.show
    }
}

export default connect(mapStateToProps)(DeleteModal);
