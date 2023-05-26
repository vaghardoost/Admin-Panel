import ListComponent from "./components/list.photo";
import UploadComponent from "./components/upload.photo";

export default () => {
  return (
    <>
      <div className="container margin">
        <div className="row">
          <div className="col-md-12">
            آمار و ارقام
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <ListComponent />
          </div>
          <div className="col-md-4">
            <UploadComponent/>
          </div>
        </div>

      </div>
    </>
  )
}

