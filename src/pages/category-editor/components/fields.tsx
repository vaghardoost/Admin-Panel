import { Component, CSSProperties, ReactNode } from "react";
import { SliderPicker } from "react-color";
import { connect } from "react-redux";
import { Input, Panel } from "rsuite";
import { Category } from "../../../model/category";
import { dispatch } from "../../../redux";
import { actions } from "../reducer";
import { State } from "../reducer/state";

import '../stylesheets/index.css'
class CategoryFields extends Component<Props> {
  public render(): ReactNode {
    const style: CSSProperties = {
      backgroundColor: this.props.category.color ?? "#fff",
      display: 'flex',
      flexDirection: 'column',
      height: '100px',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'black',
      borderRadius: '5px',
      border: '#00000020 solid 1px'
    }
    return <>
      <Panel bordered className='margin' header={<h5>دسته بندی بالا</h5>}>
        <Input value={this.props.category.label} onChange={(text) => dispatch(actions.setTitle(text))} className='bottom' placeholder="عنوان دسته بندی" />
        <Input value={this.props.category.description} onChange={(text) => dispatch(actions.setDesc(text))} className='bottom' as='textarea' rows={3} placeholder='توضیحات دسته بندی' />
        <div onClick={() => { dispatch(actions.setNoColor()) }} className='bottom color-view' style={style}>
          <h3>{this.props.category.color ?? "بدون رنگ"}</h3>
          {
            (this.props.category.color)
              ? <p>برای بدون رنگ بودن کلیک کنید</p>
              : <></>
          }
        </div>
        <SliderPicker onChange={(color) => { dispatch(actions.setColor(color.hex)) }} color={this.props.category.color} />
      </Panel>
    </>
  }
}

interface Props {
  category: Category
}

function mapStateToProps(reducer: any): Props {
  const state: State = reducer.categoryEditorReducer;
  return {
    category: state.category
  }
}

export default connect(mapStateToProps)(CategoryFields)