import { useEffect, useState } from "react"
import DatapackList from "./components/list"
import { dispatch } from "../../redux";
import { loadListAction } from "./reducer/actions"

export default () => {
  const [isFirstTime, setFirstTime] = useState<boolean>(true);
  useEffect(() => {
    if (isFirstTime) {
      dispatch(loadListAction());
      setFirstTime(false);
    }
  })
  return <>
    <div className="container">
      <div className="row">
        <div className="col-md-8" style={{ margin: '10px auto' }}>
          <DatapackList />
        </div>
      </div>
    </div>
  </>
}
