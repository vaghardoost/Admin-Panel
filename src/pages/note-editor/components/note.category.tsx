import { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { Button, Panel, Stack, Tree } from "rsuite";
import { ItemDataType } from "rsuite/esm/@types/common";
import { actions } from "../reducer";
import { dispatch } from "../../../redux"
import { categoryTreeBuilder } from "../../../other";
import { loadCategoryList } from "../reducer/actions";
import { State } from "../reducer/state";

interface Props{
    tree:ItemDataType<string>[],
    loading:boolean,
    select?:string,
}

class NoteCategory extends Component<Props>{
   

    constructor(props:Props){
        super(props);
        this.getData();
    }

    public render(): ReactNode {
        return(
            <Panel className="bg-light" bordered header={
                <Stack justifyContent="space-between">
                    <h5>انتخاب دسته بندی</h5>
                    <Button loading = {(this.props.loading)} onClick={()=>this.getData()} appearance="primary" color="blue">بارگذاری مجدد</Button>
                </Stack>
            }>
                <Tree defaultValue={this.props.select} onSelect={(item)=>this.select(item.value!.toString())} data={this.props.tree} defaultExpandAll virtualized/>
            </Panel>
        )
    }

    private select(id:string){
        dispatch(actions.setCategorySelected(id));
    }

    private getData(){
        dispatch(actions.setButtonLoad());
        dispatch(loadCategoryList());
    }
}

function mapStateToProps(reducer:any):Props {
    const state:State = reducer.addNoteReducer;
    return {
        tree:categoryTreeBuilder(state.category.list)[0].children!,
        loading:(state.category.buttonStatus === 'loading'),
        select:state.note.category,
    }
}

export default connect(mapStateToProps)(NoteCategory);