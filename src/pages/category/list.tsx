import { Component, ReactNode } from "react"
import { connect } from "react-redux";
import { Button, ButtonGroup, Panel, Stack, Tree } from "rsuite";
import { Category } from "../../model/category";
import { categoryTreeBuilder } from "../../other";
import { dispatch } from "../../redux";
import { actions, State } from "./code/reducer";


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
                    <ButtonGroup>
                        <Button onClick={()=>dispatch(actions.modalDelete(true))} appearance="primary" color="blue">حذف</Button>
                        <Button onClick={()=>dispatch(actions.modalUpdate(true))} appearance="primary" color="blue">ویرایش</Button>
                    </ButtonGroup>
                </Stack>
            }> 
                <Tree 
                    onSelect={(data)=>{
                        const category:Category = {
                            id:data.value!.toString(),
                            label:data.label!.toString(),
                            parent:""
                        }
                        for (const cat of this.props.list) {
                            if (data.value === cat.id){
                                category.parent = cat.parent;
                                break;
                            }
                        }
                        dispatch(actions.select(category));
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