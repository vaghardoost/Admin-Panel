import { connect } from "react-redux";
import { Card, Upload } from "antd";

import State from "../reducer/state";
import { cdn } from "../../../config";
import { PlusOutlined } from "@ant-design/icons";
import { dispatch } from "../../../redux";
import { loadPhotoList } from "../reducer/actions";


const UploadComponent = ({ }: Props) => {
  const token = sessionStorage.getItem("file-token");
  const namespace = sessionStorage.getItem("namespace");

  return (
    <Card
      title="آپلود تصویر جدید">
      <Upload
        multiple
        action={`${cdn}/photo/${namespace}`}
        listType="picture-card"
        headers={{ "Authorization": `Bearer ${token}` }}
        onChange={() => dispatch(loadPhotoList())}
      >
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      </Upload>
    </Card>
  )
}

interface Props { }

const mapStateToProps = (reducer: any): Props => {
  const state: State = reducer.photoReducer;
  return {}
}

export default connect(mapStateToProps)(UploadComponent)
