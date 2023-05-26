import { connect } from "react-redux";

import { Category } from "../../../model/category";
import { categoryListBuilder } from "../../../utils";
import { State } from "../reducer/state";
import { Card, Tree } from "antd";
import { dispatch } from "../../../redux";
import { actions } from "../reducer";
import { loadCategory } from "../reducer/actions";


interface Props {
  list: Category[],
  select?: Category
}

const ListCategory = ({ list }: Props) => {
  return <>
    <Card
      title="لیست دسته  بندی ها">
      <div style={{ height: '300px', overflow: 'auto' }}>
        <Tree
          onSelect={(key) => {
            if (key[0] === '') {
              dispatch(actions.reset());
              return;
            }
            dispatch(actions.loading(true));
            dispatch(loadCategory(key[0].toString()));
          }}
          defaultExpandAll
          showLine
          treeData={categoryListBuilder(list)}
        />
      </div>
    </Card>
  </>
}

const mapStateToProps = (reducer: any): Props => {
  const state: State = reducer.categoryReducer;
  return {
    list: state.list,
    select: state.select
  }
}

export default connect(mapStateToProps)(ListCategory);