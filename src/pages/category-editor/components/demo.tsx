import { CSSProperties } from "react";
import { connect } from "react-redux";
import { Category } from "../../../model/category";
import { dispatch } from "../../../redux";
import * as actions from "../reducer/actions";
import { State } from "../reducer/state";

import '../stylesheets/index.css';
import { Button } from "antd";
const CategoryDemo = ({ category, editable }: Props) => {

  const style: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: category.color,
    height: '120px',
    borderRadius: '10px 10px 0 0',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0 0 10px 1px',
    marginBottom: '80px',
  }
  return <>
    <div className='margin card-demo' >
      <div style={style}>
        {
          (category.avatar)
            ? <img className="img" src={category.avatar} alt="" />
            : <div className="img no-img">بدون تصویر</div>
        }
      </div>
      <div className="card-body">
        <h3>{category.label}</h3>
        <p>{category.description}</p>

        {
          (category.parent === undefined)
            ? <></>
            : <p>دسته بندی بالا:{category.parent}</p>
        }
      </div>
    </div>
    <div className="center">
      {
        (editable)
          ?
          <Button
            type="primary"
            onClick={() => {
              dispatch(actions.editCategory({ id: editable!, category: category }));
              dispatch(actions.loadCategoryList());
            }}>
            تغییرات ذخیره
          </Button>
          :
          <Button
            type="primary"
            onClick={() => {
              dispatch(actions.addCategory(category));
              dispatch(actions.loadCategoryList());
            }}>
            افزودن دسته بندی
          </Button>
      }
    </div>
  </>

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
