import { Component, ReactNode } from "react"
import { connect } from "react-redux";
import { Button, ButtonGroup, Panel, Stack } from "rsuite";
import { cdn } from "../../../config";
import { Category } from "../../../model/category";
import { dispatch } from "../../../redux";
import { actions } from "../reducer";
import { State } from "../reducer/state";

interface Props {
    category?:Category
}

class SelectedCategory extends Component<Props> {
    
    public render(): ReactNode {        
        return (this.props.category)
            ? <>
                <Panel bordered header={
                    <Stack justifyContent="flex-end">
                        <ButtonGroup>
                            <Button size="sm" onClick={()=>dispatch(actions.modalUpdate(true))}>ویرایش</Button>
                            <Button size="sm" onClick={()=>dispatch(actions.modalCreate(true))}>افزودن</Button>
                            <Button size="sm" onClick={()=>dispatch(actions.modalDelete(true))}>حذف</Button>
                        </ButtonGroup>
                    </Stack>
                }>
                    <h4>{this.props.category!.label}</h4>
                    {
                        (this.props.category!.avatar)
                        ? <img style={{width:"100%",maxHeight:'300px'}} src={cdn+"/photo/"+this.props.category!.avatar}/>
                        : <>دسته بندی فاقد تصویر</>
                    }
                    <h6 style={{width:"100%",textAlign:'center'}}>{this.props.category!.description}</h6>
                </Panel>
            </>
            : <></>
    }

}

const mapStateToProps = (reducer:any):Props=>{
    const state:State = reducer.categoryReducer;
    return {
        category:state.select
    }
}

export default connect(mapStateToProps)(SelectedCategory);
