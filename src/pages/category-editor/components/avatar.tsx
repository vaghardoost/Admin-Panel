import { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { Panel, Avatar } from "rsuite";
import { cdn } from "../../../config";
import { Category } from "../../../model/category";
import { dispatch } from "../../../redux";
import { actions } from "../reducer";
import { State } from "../reducer/state";
import '../stylesheets/index.css';

class CategoryAvatar extends Component<Props> {
  public render(): ReactNode {
    return <>
      <Panel bordered className='margin photo-picker' header={<h5>انتخاب تصویر</h5>}>
        <div className="avatar">
          {
            (this.props.category.avatar)
              ? <img src={cdn + "/photo/" + this.props.category.avatar} alt="" />
              : <h4>بدون عکس</h4>
          }
        </div>
        <div className="avatar-list">
          {
            this.props.list.map((file) => {
              return <Avatar className='margin' onClick={() => { dispatch(actions.setAvatar(file)) }} size="md" circle src={cdn + "/photo/demo/" + file} />
            })
          }
        </div>
      </Panel>
    </>
  }
}

interface Props {
  category: Category,
  list: string[]
}

function mapStateToProps(reducer: any): Props {
  const state: State = reducer.categoryEditorReducer;
  return {
    category: state.category,
    list: state.list,
  }
}

export default connect(mapStateToProps)(CategoryAvatar);
