import { connect } from "react-redux";

import { cdn } from "../../../config";
import { State } from "../reducer/state";
import { Avatar, Button, Drawer, Space } from "antd";
import { dispatch } from "../../../redux";
import { actions } from "../reducer";

const ModalPhoto = ({ list, open, photo }: Props) => {
  const namespace = sessionStorage.getItem('namespace');
  return (
    <Drawer
      placement="left"
      open={open}
      closable={false}
      extra={
        <Space>
          <Button onClick={() => dispatch(actions.drawerPhoto(false))}>بستن</Button>
        </Space>
      }
      title="انتخاب تصویر برای نوشته">
      <Space direction="horizontal" wrap align="center" style={{ width: '100%' }}>
        {
          list.map(file => (
            <Avatar
              onClick={() => dispatch(actions.setNotePhoto(`${cdn}/${namespace}/photo/${file}`))}
              size={100}
              shape="square"
              key={file}
              src={`${cdn}/${namespace}/photo/demo.${file}`} />
          ))
        }
      </Space>
    </Drawer>
  )
}

interface Props {
  open: boolean
  list: string[]
  photo?: string
}

const mapStateToProps = (reducer: any): Props => {
  const state: State = reducer.addNoteReducer;
  return {
    list: state.photo.list,
    open: state.photo.open,
    photo: state.note.photo
  }
}

export default connect(mapStateToProps)(ModalPhoto);
