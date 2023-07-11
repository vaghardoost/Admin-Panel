import { useEffect, useState } from "react"
import Editor from "../../components/editor"
import BottomSheetEditor from "./components/bottomsheet"
import { dispatch as editorDispatch, actions as editorActions } from "../../components/editor/redux"
import { actions } from "./reducer"
import { dispatch } from "../../redux"
import { loadDatapackAction, loadPhotoAction } from "./reducer/actions"
import Addsection from "./components/addsection"
import DraftDrawer from "./components/draft"
import Metadata from "./components/metadata"
import { useParams } from "react-router-dom"
import { Note } from "../../model/note"
import { ApiResult } from "../../model/api"

export default () => {

  // const [isFirstTime, setFirstTime] = useState<boolean>(true);
  const { id } = useParams();

  useEffect(() => {
    // if (isFirstTime) {
    editorDispatch(editorActions.reset());
    dispatch(loadPhotoAction()).then((action) => {
      const payload = action.payload as string[];
      const result = []
      for (const file of payload) {
        if (!file.startsWith('demo')) {
          result.push(file);
        }
      }
      editorDispatch(editorActions.setPhotoList(result.reverse()));

      dispatch(actions.reset());
      if (id) {
        dispatch(actions.setEditable(id));
        dispatch(actions.setloading());
        dispatch(loadDatapackAction(id)).then((e) => {
          const { success, payload: result } = e.payload as ApiResult<Note>;
          if (success) {
            editorDispatch(editorActions.setContent(result!.content!))
            return
          }
        });
      }
    })
    // setFirstTime(false);
    // }
  })
  return <>
    <Addsection />
    <DraftDrawer />
    <div className="container">
      <div className="row">
        <div className="col-md-12" style={{ margin: '10px auto' }}>
          <Metadata />
        </div>
        <div className="col-md-6" style={{ margin: '10px auto' }}>
          <Editor change={(c) => {
            dispatch(actions.setContent(c));
          }} />
        </div>
        <div className="col-md-6" style={{ margin: '10px auto' }}>
          <BottomSheetEditor />
        </div>
      </div>
    </div>
  </>
}