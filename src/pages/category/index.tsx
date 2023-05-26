import { useEffect, useState } from "react";
import { dispatch } from "../../redux";
import { loadCatList } from "./reducer/actions";
import ListCategory from "./components/list"
import Table from "./components/table";

export default () => {
  const [firstTime, setFirstTime] = useState<boolean>(true);
  useEffect(() => {
    if (firstTime) {
      dispatch(loadCatList());
      setFirstTime(false);
    }
  })
  return (
    <>
      <div className="container">
        <div className="row around">
          <div className="col-md-4">
            <ListCategory />
          </div>
          <div className="col-md-8">
            <Table />
          </div>
        </div>
      </div>
    </>
  )

}