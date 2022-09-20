import { Component, ReactNode } from "react"
import { connect } from "react-redux";
import { Button, ButtonGroup, Panel, Stack, Tree } from "rsuite";
import { ItemDataType } from "rsuite/esm/@types/common";
import Category from "../../class/model/category";
import { dispatch } from "../../class/redux";
import { actions, State } from "./reducer";


interface Props{
    data:Category,
    loading:boolean,
    select?:Category
}

class ListCategory extends Component <Props>{
    public render(): ReactNode {
        return (
            <Panel className="bg-light" shaded header={
                <Stack justifyContent="space-between">
                    <h5>انتخاب دسته بندی</h5>
                    <h5>{this.props.select!.label}</h5>
                    <ButtonGroup>
                        <Button onClick={()=>dispatch(actions.modalDelete(true))} appearance="primary" color="blue">حذف</Button>
                        <Button onClick={()=>dispatch(actions.modalUpdate(true))} appearance="primary" color="blue">ویرایش</Button>
                    </ButtonGroup>
                </Stack>
            }> 
                <Tree 
                    onSelect={(data)=>{
                        dispatch(actions.select({
                            id:data['value']!.toString(),
                            label:data['label']!.toString(),
                            children:[]
                        }));
                    }}
                    value={this.props.select!.id} data={this.catToItemData()} 
                    defaultExpandAll
                    virtualized/>
            </Panel>
        )
    }

    private catToItemData():ItemDataType<string | number>[]{
        function deeper(category:Category):ItemDataType<string | number> {
            const result:ItemDataType<string | number> = {
                label:category.label,
                value:category.id,
                children:[]
            }
            for (const child of category.children) {
                result.children!.push(deeper(child));
            }
            return result
        }
        const result = deeper(this.props.data);
        return [result];
    }
}

const mapStateToProps = (reducer:any):Props=> {
    const state:State = reducer.categoryReducer;
    return {
        data:state.list,
        loading:false,
        select:state.select
    } 
}

export default connect(mapStateToProps)(ListCategory);