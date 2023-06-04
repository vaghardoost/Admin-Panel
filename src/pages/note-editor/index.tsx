import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { dispatch } from "../../redux";
import { actions } from "./reducer";
import { dispatch as editorDispatch, actions as editorActions } from "../../components/editor/redux/index"
import { loadPhoto, loadCategoryList, loadNote } from "./reducer/actions";
import Metadata from "./components/metadata";
import CategoryDrawer from "./components/drawer.caregory";
import PhotoDrawer from "./components/drawer.photo";
import ContentNote from "../../components/editor"
import { Note, SectionType } from "../../model/note";
import { ApiResult } from "../../model/api";
import DraftDrawer from "./components/drawer.draft"


export default () => {
  const [firstTime, setFirstTime] = useState<boolean>(true);
  const { id } = useParams();

  useEffect(() => {
    if (firstTime) {
      dispatch(actions.reset());
      editorDispatch(editorActions.reset())
      dispatch(loadCategoryList());
      editorDispatch(editorActions.setDisableSections([
        'pair-gallery', 'carousel', 'carousel-card', 'avatar-card', 'gallery'
      ]))
      dispatch(loadPhoto()).then((action) => {
        const { success, payload } = action.payload as ApiResult<any>;
        if (success) {
          const result = [];
          for (const file of payload.files) {
            if (!file.startsWith('demo')) result.push(file)
          }
          editorDispatch(editorActions.setPhotoList(result.reverse()));
        }
      });
      if (id) {
        dispatch(actions.setEditable(id));
        dispatch(loadNote(id)).then((e) => {
          const { success, payload } = e.payload as ApiResult<Note>;
          if (success) editorDispatch(editorActions.setContent(payload!.content!))
        });
      }
      setFirstTime(false);
    }
  })

  return <>
    <PhotoDrawer />
    <CategoryDrawer />
    <DraftDrawer />
    <div className="container">
      <div className="row">
        <div className="col-md-9" style={{ margin: '15px auto' }}>
          <Metadata />
        </div>
      </div>


      <div className="row">
        <div className="col-md-7" style={{ margin: '10px auto' }}>
          <ContentNote change={(content: SectionType[]) => dispatch(actions.setContent(content))} />
        </div>
      </div>

    </div>

  </>

}