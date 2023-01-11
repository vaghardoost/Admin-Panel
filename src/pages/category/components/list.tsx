import { Component, ReactNode } from "react"
import { connect } from "react-redux";
import { Button, Panel, Stack, Tree } from "rsuite";
import { Category } from "../../../model/category";
import { categoryTreeBuilder } from "../../../other";
import { dispatch } from "../../../redux";
import { actions } from "../reducer";
import { State } from "../reducer/state";


interface Props{
    list:Category[],
    select?:Category
}

class ListCategory extends Component <Props>{
    public render(): ReactNode {
        return (
            <Panel className="bg-light" bordered header={
                <Stack justifyContent="space-between">
                    <h5>انتخاب دسته بندی</h5>
                    <h5>{this.props.select?.label}</h5>
                    <Button size="sm" onClick={()=>{
                        dispatch(actions.reset())
                        dispatch(actions.modalCreate(true))
                    }} appearance="primary" color="blue">افزودن</Button>
                </Stack>
            }> 
                <Tree 
                    onSelect={(data)=>{
                        if(data.label === "root"){
                            dispatch(actions.reset());
                            return;
                        }
                        for (const cat of this.props.list) {
                            if (data.value === cat.id){
                                dispatch(actions.select(cat));
                                break;
                            }
                        }
                    }}
                    value={this.props.select?.id} 
                    data={categoryTreeBuilder(this.props.list)} 
                    defaultExpandAll
                    virtualized/>
            </Panel>
        )
    }

}

const mapStateToProps = (reducer:any):Props=> {
    const state:State = reducer.categoryReducer;
    return {
        list:state.list,
        select:state.select
    }
}

export default connect(mapStateToProps)(ListCategory);