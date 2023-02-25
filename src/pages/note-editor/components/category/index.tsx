import { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { Button, Panel, Stack, Tree } from "rsuite";
import { ItemDataType } from "rsuite/esm/@types/common";

import { categoryTreeBuilder } from "../../../../other";
import { dispatch } from "../../../../redux";
import { actions } from "../../reducer";
import { loadCategoryList } from "../../reducer/actions";
import { State } from "../../reducer/state";

class NoteCategory extends Component<Props>{

    constructor(props: Props) {
        super(props);
        dispatch(loadCategoryList());
    }

    public render(): ReactNode {
        return (
            <Panel style={{ height: '100%' }} bordered header={
                <Stack justifyContent="space-between">
                    <h5>انتخاب دسته بندی</h5>
                    <Button onClick={() => dispatch(actions.resetCat())} appearance="primary" color="blue">بدون دسته بندی</Button>
                </Stack>
            }>
                <Tree value={this.props.select} onSelect={(item) => this.select(item.value!.toString())} data={this.props.tree} defaultExpandAll virtualized />
            </Panel>
        )
    }

    private select(id: string) {
        dispatch(actions.setCategorySelected(id));
    }

}

interface Props {
    tree: ItemDataType<string>[],
    loading: boolean,
    select?: string,
}

function mapStateToProps(reducer: any): Props {
    const state: State = reducer.addNoteReducer;
    return {
        tree: categoryTreeBuilder(state.category.list)[0].children!,
        loading: (state.category.buttonStatus === 'loading'),
        select: state.note.category,
    }
}

export default connect(mapStateToProps)(NoteCategory);