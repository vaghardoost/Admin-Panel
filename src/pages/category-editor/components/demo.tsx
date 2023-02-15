import { Component, CSSProperties, ReactNode } from "react";
import { connect } from "react-redux";
import { Button, Stack } from "rsuite";
import { cdn } from "../../../config";
import { Category } from "../../../model/category";
import { dispatch } from "../../../redux";
import * as actions from "../reducer/actions";
import { State } from "../reducer/state";

import '../stylesheets/index.css';
class CategoryDemo extends Component<Props> {
  public render(): ReactNode {
    const style: CSSProperties = {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: this.props.category.color,
      height: '120px',
      borderRadius: '10px 10px 0 0',
      boxShadow: 'rgba(0, 0, 0, 0.1) 0 0 10px 1px',
      marginBottom: '60px',
    }

    return <>
      <div className='margin card-demo'>
        <div style={style}>
          {
            (this.props.category.avatar)
              ? <img className="img" src={`${cdn}/photo/${this.props.category.avatar}`} alt="" />
              : <div className="img no-img">بدون تصویر</div>
          }
        </div>
        <div className="card-body">
          <h3>{this.props.category.label}</h3>
          <p>{this.props.category.description}</p>

          {
            (this.props.category.parent === undefined)
              ? <></>
              : <p>دسته بندی بالا:{this.props.category.parent}</p>
          }
        </div>
      </div>
      <Stack justifyContent="center">
        {
          (this.props.editable)
            ? <Button appearance="primary" onClick={() => { this.update() }}>تغییرات ذخیره</Button>
            : <Button appearance="primary" onClick={() => { this.insert() }}>افزودن دسته بندی</Button>
        }
      </Stack>
    </>
  }

  private insert() {
    dispatch(actions.addCategory(this.props.category));
  }

  private update() {
    dispatch(actions.editCategory({ id: this.props.editable!, category: this.props.category }));
  }
}

interface Props {
  category: Category,
  editable?: string,
}

function mapStateToProps(reducer: any): Props {
  const state: State = reducer.categoryEditorReducer;
  return {
    category: state.category,
    editable: state.ediable
  }
}

export default connect(mapStateToProps)(CategoryDemo);
