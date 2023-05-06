import { CSSProperties } from "react";
import { connect } from "react-redux"
import { Link } from "react-router-dom";
import { Button, ButtonGroup, Stack } from "rsuite";
import { cdn } from "../../../../config";
import { Category } from "../../../../model/category";
import { State } from "../../reducer/state";

function CatCard({ category }: Props) {
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
      <div className='margin card-demo'>
        <div style={style}>
          {
            (category.avatar)
              ? <img className="img" src={`${cdn}/photo/${category.avatar}`} alt="" />
              : <div className="img no-img">بدون تصویر</div>
          }
        </div>
        <div className="card-body around">
          <h4>{category.label}</h4>
          <p>{category.description}</p>

          {
            (category.parent === undefined)
              ? <></>
              : <p>دسته بندی بالا:{category.parent}</p>
          }
        </div>
      </div>
      <Stack justifyContent="center">
        <ButtonGroup>
          <Button size="sm"><Link to={`/category/add/${category!.id}`}>افزودن به زیرشاخه</Link></Button>
          <Button size="sm"><Link to={`/category/edit/${category!.id}`}>ویرایش</Link></Button>
        </ButtonGroup>
      </Stack>
    </>
    : <div className="card margin around">
      <h4 style={{ width: '100%', textAlign: 'center' }}>دسته بندی انتخاب نشده</h4>
    </div>
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