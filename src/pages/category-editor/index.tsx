import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { dispatch } from "../../redux";
import { actions } from "./reducer";
import { loadCategory, loadPhoto,loadCategoryList } from "./reducer/actions";
import CategoryFields from "./components/fields";
import CategoryDemo from "./components/demo";
import CategoryEditorModal from "./components/modal";

export default ({ edit }: Props) => {
  const [firstTime, setFirstTime] = useState<boolean>(true);
  const { id } = useParams();

  useEffect(() => {
    if (firstTime) {
      dispatch(loadPhoto());
      dispatch(loadCategoryList());
      if (edit) {
        dispatch(actions.setEditable(id!));
        dispatch(actions.dialog({ message: 'درحال بارگذاری', title: 'ویرایش دسته بندی' }));
        dispatch(loadCategory(id!)).then(async () => {
          dispatch(actions.dialogClose());
        });
      } else {
        dispatch(actions.reset());
        if (id) {
          dispatch(actions.setParent(id!));
        }
      }
      setFirstTime(false);
    }
  });


  return <>
    <CategoryEditorModal />
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <CategoryFields />
        </div>
        <div className="col-md-4">
          <CategoryDemo />
        </div>
      </div>
    </div>
  </>
}

interface Props {
  edit?: boolean
}
