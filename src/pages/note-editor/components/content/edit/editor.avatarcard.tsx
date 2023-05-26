import { connect } from "react-redux";
import { Avatar, Button, Card, Drawer, Input, Space } from "antd";
import { getActions } from "./_section.actions"
import { AvatarCard, Note } from "../../../../../model/note";
import { State } from "../../../reducer/state";
import { useState } from "react";
import { cdn } from "../../../../../config";
import { dispatch } from "../../../../../redux";
import { actions } from "../../../reducer";


const EditorAvatarCard = ({ index, note, list }: Props) => {
  const [open, setOpenDrawer] = useState<boolean>(false);
  const namespace = sessionStorage.getItem('namespace');
  const avatarCard: AvatarCard = {
    title: "",
    subtitle: "",
    avatar: "",
    ...note.content![index],
    type: "avatar-card",
  }

  const changeTitle = (text: string) => {
    avatarCard.title = text;
    dispatch(actions.updateSection({ index: index, section: avatarCard }));
  }

  const changeSubtitle = (text: string) => {
    avatarCard.subtitle = text;
    dispatch(actions.updateSection({ index: index, section: avatarCard }));
  }

  return <>
    <Drawer
      placement="left"
      open={open}
      closable={false}
      extra={
        <Space>
          <Button onClick={() => setOpenDrawer(false)}>بستن</Button>
        </Space>
      }
      title="انتخاب عکس">
      <Space direction="horizontal" wrap align="center" style={{ width: '100%' }}>
        {
          list.map(file => (
            <Avatar
              onClick={() => {
                avatarCard.avatar = `${cdn}/${namespace}/photo/demo.${file}`;
                dispatch(actions.updateSection({ index: index, section: avatarCard }));
              }}
              size={100}
              shape="square"
              key={file}
              src={`${cdn}/${namespace}/photo/demo.${file}`} />
          ))
        }
      </Space>
    </Drawer>
    <Card
      style={{ backgroundColor: 'whitesmoke' }}
      title="کارت آواتار"
      extra={getActions(index, note.content!.length - 1)}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Avatar
          onClick={() => setOpenDrawer(true)}
          size={50}
          src={avatarCard.avatar} />

        <Input
          value={avatarCard.title}
          onChange={(e) => changeTitle(e.target.value)}
          placeholder="عنوان"
          allowClear />

        <Input.TextArea
          value={avatarCard.subtitle}
          onChange={(e) => changeSubtitle(e.target.value)}
          maxLength={140}
          rows={3}
          allowClear
          placeholder="محتوا" />

      </Space>
    </Card>
  </>
}

interface Props {
  index: number
  note: Note
  list: string[]
}

const mapStateToProps = (reducer: any) => {
  const { note, photo, }: State = reducer.addNoteReducer;
  return {
    note: note,
    list: photo.list
  };
}

export default connect(mapStateToProps)(EditorAvatarCard);
