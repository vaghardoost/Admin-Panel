import {Component, ReactNode} from "react";
import { connect } from "react-redux";
import { Button, ButtonGroup, Modal, Stack } from "rsuite";
import { Category } from "../../../model/category";
import { dispatch } from "../../../redux";
import { actions } from "../reducer";
import { deleteCat } from "../reducer/actions";
import { State } from "../reducer/state";

interface Props {
    show:boolean,
    category?:Category
}

class DeleteModal extends Component<Props> {
    public render(): ReactNode {
        const {Body,Footer} = Modal;
        return (
            <Modal open={this.props.show}>
                <Body>
                    {
                        (this.props.category && this.props.category.label !== "root")
                        ?<>
                            <h5>آیا دسته بندی حذف شود؟</h5>
                            <h6 className="around">دقت کنید در صورت حذف شدن این دسته بندی سایر دسته بندی های زیردست غیرقابل رصد خواهند شد</h6>
                        </>
                        :<h5>یک دسته بندی را انتخاب کنید</h5>
                    }
                </Body>
                <Footer>
                    <Stack justifyContent="flex-end">
                        <ButtonGroup>
                            {
                                (this.props.category && this.props.category.label !== "root")
                                    ? <Button onClick={()=>this.delete()} color="red" appearance="primary">بله</Button>
                                    : <></>
                            }
                            <Button onClick={()=>dispatch(actions.modalDelete(false))}>بستن</Button>
                        </ButtonGroup>
                    </Stack>
                </Footer>
            </Modal>
        )
    }

    private delete(){
        dispatch(deleteCat(this.props.category!.id!));
        dispatch(actions.reset())
        dispatch(actions.modalDelete(false))
    }
}

const mapStateToProps = (reducer:any):Props=>{
    const state:State = reducer.categoryReducer;
    return {
        show:state.modal.delete.show,
        category:state.select
    }
}

export default connect(mapStateToProps)(DeleteModal);
