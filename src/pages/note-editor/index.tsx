import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { dispatch } from "../../redux";
import { actions } from "./reducer";
import { loadNote, loadPhoto, loadCategoryList } from "./reducer/actions";
import Category from "./components/category";
import Metadata from "./components/metadata";
import CategoryDrawer from "./components/drawer.caregory";
import PhotoDrawer from "./components/drawer.photo";
import ContentNote from "./components/content"

interface Props {
  edit?: boolean
}

export default (props: Props) => {
  const [firstTime, setFirstTime] = useState<boolean>(true);

  useEffect(() => {
    if (firstTime) {
      dispatch(loadPhoto());
      dispatch(loadCategoryList())
      if (props.edit) {
        const { id } = useParams();
        dispatch(actions.setEditable(id!));
        dispatch(loadNote(id!)).then(() => { });
      } else {
        dispatch(actions.reset());
      }
      setFirstTime(false);
    }
  })

  return <>
    <PhotoDrawer />
    <CategoryDrawer />

    <div className="container">
      <div className="row around">
        <div className="col-md-8">
          <Metadata />
        </div>
        <div className="col-md-4">
          <Category/>
        </div>
        <div className="col-md-8">
          <ContentNote />
        </div>
      </div>
    </div>
  </>

}