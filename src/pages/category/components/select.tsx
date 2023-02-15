import { Component, CSSProperties, ReactNode } from "react"
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, ButtonGroup, Stack } from "rsuite";
import { cdn } from "../../../config";
import { Category } from "../../../model/category";
import { dispatch } from "../../../redux";
import { actions } from "../reducer";
import { State } from "../reducer/state";

interface Props {
   category?: Category
}

class SelectedCategory extends Component<Props> {
   public render(): ReactNode {
      const style: CSSProperties = {
         display: 'flex',
         justifyContent: 'center',
         backgroundColor: this.props.category?.color,
         height: '120px',
         borderRadius: '10px 10px 0 0',
         boxShadow: 'rgba(0, 0, 0, 0.1) 0 0 10px 1px',
         marginBottom: '60px',
      }
      return (this.props.category)
         ?
         <>
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
               <ButtonGroup>
                  <Button size="sm"><Link to={`/category/add/${this.props.category!.id}`}>افزودن به زیرشاخه</Link></Button>
                  <Button size="sm"><Link to={`/category/edit/${this.props.category!.id}`}>ویرایش</Link></Button>
                  <Button size="sm" onClick={() => dispatch(actions.modalDelete(true))}>حذف</Button>
               </ButtonGroup>
            </Stack>
         </>
         : <></>
   }
}

const mapStateToProps = (reducer: any): Props => {
   const state: State = reducer.categoryReducer;
   return {
      category: state.select
   }
}

export default connect(mapStateToProps)(SelectedCategory);
