import { Component, ReactNode,RefObject,createRef } from "react"
import { connect } from "react-redux";
import { Button, Input, Panel, Stack } from "rsuite";
import { Category } from "../../model/category";
import { dispatch } from "../../redux";
import { addCat, State,actions } from "./code/reducer";

interface Props {
    status:"normal"|"error"|"loading"
    select?:Category
    message?:string
}

class AddCategory extends Component<Props> {

    private inputRef:RefObject<HTMLInputElement> = createRef();

    public render(): ReactNode {
        return (
            <Panel className="bg-light" bordered header={
                <>
                    <h5>دسته بندی جدید</h5>
                    <p style={{fontSize:"small",fontWeight:"bolder"}} className={(this.props.status === "error") ? "fg-red":""}>{this.props.message}</p>
                </>
            }>
                <h6 style={{marginBottom:'10px'}}>زیرشاخه:{this.props.select?.label ?? "هنوز انتخاب نشده"}</h6>
                <Input ref={this.inputRef} placeholder="عنوان دسته بندی" />
                <Button onClick={()=>this.submit()} appearance="primary" block style={{marginTop:'10px'}}>ذخیره</Button>
            </Panel>
        )
    }

    private submit(){
        const label = this.inputRef.current!.value;
        if(label === ""){
            dispatch(actions.addPanelState({status:"error",message:"نام دسته بندی را وارد کنید"}))
            return;
        }
        if(!this.props.select){
            dispatch(actions.addPanelState({status:"error",message:"یک دسته بندی را به عنوان زیر شاخه انتخاب کنید"}));
            return;
        }
        dispatch(
            addCat({
                label:label,
                parent:this.props.select!.id!
            })
        )
        this.inputRef.current!.value = "";
    }

}

const mapStateToProps = (reducer:any):Props=>{
    const state:State = reducer.categoryReducer;
    return {
        select:state.select,
        status:state.addPanel.status,
        message:state.addPanel.message
    }
}

export default connect(mapStateToProps)(AddCategory);
