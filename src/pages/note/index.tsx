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
      <div className="row around">
        <div className="col-md-8">
          <NoteList />
        </div>
      </div>
    </div>
  )
}