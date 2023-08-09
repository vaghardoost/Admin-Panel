import Namespace from "./components/metadata";
import { Space } from "antd";
import { dispatch } from "../../redux";
import { loadPhotoAction, loadNamespaceAction } from './reducer/actions';
import { actions } from "./reducer";
export default () => {

  dispatch(actions.loading());
  dispatch(loadPhotoAction());
  dispatch(loadNamespaceAction());

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8" style={{ margin: '10px auto' }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Namespace />
          </Space>
        </div>
      </div>
    </div>
  )
}