import { useEffect, useState } from "react"
import NoteList from "./components/list"
import { dispatch } from "../../redux";
import { getNoteList, categoryList } from "./reducer/actions";

export default () => {

  const [firstTime, setFirstTime] = useState<boolean>(true);
  useEffect(() => {
    if (firstTime) {
      dispatch(getNoteList())
      dispatch(categoryList())
      setFirstTime(false);
    }
  })

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8" style={{ margin: '10px auto' }}>
          <NoteList />
        </div>
      </div>
    </div>
  )
}