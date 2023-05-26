import { CSSProperties } from "react";
import { connect } from "react-redux"
import { Category } from "../../../model/category";
import { State } from "../reducer/state";

const CatCard = ({ category }: Props) => {
  const style: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: category?.color,
    height: '120px',
    borderRadius: '10px 10px 0 0',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0 0 10px 1px',
    marginBottom: '60px',
  }
  return (category)
    ?
    <>
      <div className='card-demo'>
        <div style={style}>
          {
            (category.avatar)
              ? <img className="img" src={category.avatar} alt="" />
              : <div className="img no-img">بدون تصویر</div>
          }
        </div>
        <div className="card-body around">
          <h4>{category.label}</h4>
          <p>{category.description}</p>
        </div>
      </div>
    </>
    :
    <></>
}

interface Props {
  category?: Category
}

function mapStateToProps(reducer: any): Props {
  const state: State = reducer.addNoteReducer;
  const list = state.category.list;
  let category: Category | undefined = undefined;
  for (const cat of list) {
    if (cat.id === state.note.category) {
      category = cat;
      break;
    }
  }
  return { category: category }
}
export default connect(mapStateToProps)(CatCard);