import { Component, ReactNode, RefObject, createRef} from "react";
import { connect } from "react-redux";
import { Button, ButtonGroup, Input, InputPicker, Modal, SelectPicker, Stack } from "rsuite";
import { Category } from "../../../model/category";
import { categoryListBuilder } from "../../../other";
import { dispatch } from "../../../redux";
import { actions, State, updateCat } from "../code/reducer";

interface Props {
    show:boolean
    category?:Category
    list:any[]
}

class UpdateModal extends Component<Props> {

    private inputRef:RefObject<HTMLInputElement> = createRef()
    public render(): ReactNode {
        const {Title,Body,Footer} = Modal;
        return (
            <Modal open={this.props.show}>
                <Title>ویرایش دسته بندی</Title>
                <Body>
                    {
                        (this.props.category && this.props.category.label !== "root")
                        ?<>
                            <div>
                                <label htmlFor="label">عنوان</label>
                                <Input id="label" value={this.props.category.label} ref={this.inputRef} placeholder="عنوان جدید برای دسته بندی"/>
                            </div>
                            <div style={{height:'10px'}}/>
                            <div>
                            <label htmlFor="category">دسته بندی زیرشاخه</label>
                                <SelectPicker defaultValue={this.props.category.parent} block data={categoryListBuilder(this.props.list)}/>
                            </div>
                        </>
                        :<h5>یک دسته بندی را انتخاب کنید</h5>
                    }
                </Body>
                <Footer>
                    <Stack justifyContent="flex-end">
                        <ButtonGroup>
                            {
                                (this.props.category && this.props.category.label !== "root")
                                ?<Button onClick={()=>this.update()} color="green" appearance="primary">ثبت</Button>
                                :<></>
                            }
                            <Button onClick={()=>dispatch(actions.modalUpdate(false))}>بستن</Button>
                        </ButtonGroup>
                    </Stack>
                </Footer>
            </Modal>
        )
    }

    private update(){
        const text = this.inputRef.current!.value;
        if(text !== ""){
            dispatch(updateCat({
                id:this.props.category!.id,
                label:text,
                parent:this.props.category!.parent,
            }));
        }
        dispatch(actions.modalUpdate(false))
    }
}

const mapStateToProps = (reducer:any):Props=>{
    const state:State = reducer.categoryReducer;
    return {
        show:state.modal.update.show,
        category:state.select,
        list:state.list,
    }
}

export default connect(mapStateToProps)(UpdateModal);
