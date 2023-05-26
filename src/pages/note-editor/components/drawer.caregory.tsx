import { connect } from "react-redux";
import { Button, Drawer, Tree } from "antd";

import { categoryListBuilder } from "../../../utils";
import { dispatch } from "../../../redux";
import { actions } from "../reducer";
import { State } from "../reducer/state";
import { Category } from "../../../model/category";


const NoteCategory = ({ list, open }: Props) => {
  return (
    <Drawer
      open={open}
      closable={false}
      extra={
        <>
          <Button onClick={() => dispatch(actions.resetCategory())} type="text">بدون دسته بندی</Button>
          <Button onClick={() => dispatch(actions.drawerCategory(false))} type="text">بستن</Button>
        </>
      }
      title="انتخاب دسته بندی"
      placement="left"
    >
      <Tree
        onSelect={(key) => {
          if (key[0] === '') {
            dispatch(actions.resetCategory());
            return;
          }
          dispatch(actions.setCategorySelected(key[0].toString()));
        }}
        showLine
        defaultExpandAll
        treeData={categoryListBuilder(list)}
      />
    </Drawer>
  )

}

interface Props {
  list: Category[]
  open: boolean
}

function mapStateToProps(reducer: any): Props {
  const state: State = reducer.addNoteReducer;
  return {
    list: state.category.list,
    open: state.category.open
  }
}

export default connect(mapStateToProps)(NoteCategory);