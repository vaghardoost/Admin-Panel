import {Component, ReactNode} from "react";
import { connect } from "react-redux";
import { Button, ButtonGroup, Container, Input, Modal, Stack } from "rsuite";
import { dispatch } from "../../../class/redux";
import { actions, State } from "../reducer";

interface Props {
    show:boolean
}

class UpdateModal extends Component<Props> {
    public render(): ReactNode {
        const {Title,Body,Footer} = Modal;
        return (
            <Modal open={this.props.show}>
                <Title>ویرایش دسته بندی</Title>
                <Body>
                    <Container>
                        <Input placeholder="عنوان جدید برای دسته بندی"/>
                    </Container>
                </Body>
                <Footer>
                    <Stack justifyContent="flex-end">
                        <ButtonGroup>
                            <Button color="green" appearance="primary">ثبت</Button>
                            <Button onClick={()=>dispatch(actions.modalUpdate(false))}>بستن</Button>
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
        show:state.modal.update.show
    }
}

export default connect(mapStateToProps)(UpdateModal);
