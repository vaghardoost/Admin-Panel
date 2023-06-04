import { Avatar, Button, Image, List, Popconfirm, Space, Tag } from "antd"
import { connect } from "react-redux"
import { State } from "../reducer/state"
import { Note } from "../../../model/note"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Category } from "../../../model/category";
import { useNavigate } from "react-router-dom";

const NoteList = ({ list, category }: Props) => {
  const navigate = useNavigate();
  return <>
    <List
      itemLayout="vertical"
      dataSource={list}
      renderItem={(note: Note) =>
        <List.Item
          key={note.id!}
          extra={
            note.photo
              ? <Image src={note.photo} height={120} />
              : <Space align="center" style={{ width: '120px', height: '100px' }}>
                بدون عکس
              </Space>
          }
          actions={[
            <Popconfirm
              title={'حذف نوشته'}
              description={'آیا این نوشته از سیستم حذف شود؟'}
              okText={'حذف'}
              cancelText={'خیر'}
              onConfirm={() => { }}
            >
              <Button type="text"><DeleteOutlined /> حذف</Button>
            </Popconfirm>,
            <Button type="text" onClick={() => navigate(`/note/edit/${note.id}`)}>
              <EditOutlined /> ویرایش
            </Button>
          ]}
        >
          <List.Item.Meta
            avatar={
              <Avatar
                size={50}
                src={
                  category.find((cat) => {
                    if (cat.id === note.category) return cat
                  })?.avatar
                }
              />}
            title={note.title}
            description={
              (
                category.find(cat => {
                  if (cat.id === note.category) return cat
                })?.label
              )
            }
          />
          <Space size={[0, 8]} wrap>{note.tag.map(tag => <Tag>{tag}</Tag>)}</Space>
        </List.Item>

      }
      pagination={{ pageSize: 10 }} />
  </>
}

interface Props {
  list: Note[]
  category: Category[]
}

const mapStateToProps = (reducer: any): Props => {
  const state: State = reducer.noteReducer;
  return {
    list: state.note,
    category: state.category,
  }
}

export default connect(mapStateToProps)(NoteList);
