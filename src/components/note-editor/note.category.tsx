import { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { Button, Panel, Stack, Tree } from "rsuite";
import { ItemDataType } from "rsuite/esm/@types/common";
import { State,actions, loadCategoryList } from "./reducer";
import { dispatch } from "../../class/redux"
import Category from "../../class/model/category";

interface Props{
    data:Category,
    loading:boolean,
    select?:string
}

class CategpryList extends Component<Props>{
   

    constructor(props:Props){
        super(props);
        this.getData();
    }

    public render(): ReactNode {
        return(
            <Panel className="bg-light" shaded header={
                <Stack justifyContent="space-between">
                    <h5>انتخاب دسته بندی</h5>
                    <Button loading = {(this.props.loading)} onClick={()=>this.getData()} appearance="primary" color="blue">بارگذاری مجدد</Button>
                </Stack>
            }>
                <Tree value={this.props.select} onSelect={(item)=>dispatch(actions.setCategorySelected(item.value!.toString()))} data={this.catToItemData()} defaultExpandAll virtualized/>
            </Panel>
        )
    }

    private getData(){
        dispatch(actions.setButtonLoad());
        dispatch(loadCategoryList());
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

function mapStateToProps(reducer:any):Props {
    const state:State = reducer.addNoteReducer;
    return {
        data:state.category.data,
        loading:(state.category.buttonStatus === 'loading'),
        select:state.note.category
    }
}

export default connect(mapStateToProps)(CategpryList);