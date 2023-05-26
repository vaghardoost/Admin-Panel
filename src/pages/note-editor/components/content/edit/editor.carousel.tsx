import { connect } from "react-redux";
import { Note, Carousel } from "../../../../../model/note";
import { State } from "../../../reducer/state";
import { useState } from "react";
import { Avatar, Button, Card, Drawer, Image, Input, Space, Table, message } from "antd";
import { ClearOutlined, CloseCircleOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { generate } from "randomstring";
import { dispatch } from "../../../../../redux";
import { actions } from "../../../reducer";
import { cdn } from "../../../../../config";
import { getActions } from "./_section.actions";

const EditorCarousel = ({ index, note, list }: Props) => {
  const namespace = sessionStorage.getItem('namespace')
  const section: Carousel = note.content![index] as Carousel

  const [open, setOpen] = useState<boolean>(false);
  const [item, setItem] = useState<{ photo: string, link?: string, id?: string }>({ photo: '' });
  const [msg, context] = message.useMessage();

  return <>
    {context}
    <Drawer
      destroyOnClose
      extra={
        <Button
          onClick={() => setOpen(false)}
          type='ghost'
          icon={<CloseCircleOutlined />}>
          بستن
        </Button>
      }
      title="افزودن عکس"
      placement="left"
      open={open}
      closable={false}
      footer={
        <Card
          bodyStyle={{ margin: '10px', padding: 0 }}
          actions={[
            <Button
              onClick={() => {
                if (item.photo === '') {
                  msg.open({
                    type: 'error',
                    content: 'باید حتما یک تصویر انتخاب کنید'
                  })
                  return;
                }
                const list = [
                  ...section.list,
                  {
                    ...item,
                    id: generate({ length: 8, charset: 'ABCDEF0123456789' }),
                  }
                ]
                dispatch(
                  actions.updateSection({
                    index: index,
                    section: { ...section, list: list }
                  })
                )
                setItem({ photo: '' });
              }}
              type='ghost'
              icon={<PlusOutlined />}>
              افزودن
            </Button>,
            <Button
              onClick={() => setItem({ photo: '' })}
              type='ghost'
              icon={<ClearOutlined />}>
              پاک کردن
            </Button>,
          ]}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <img
              style={{
                maxHeight: '200px',
                objectFit: 'contain',
                margin: '10px',
              }}
              src={item?.photo} />
            <Input onChange={(e) => setItem({ ...item, link: e.target.value })} value={item?.link} placeholder="لینک" />
          </div>
        </Card>
      }>
      <Space wrap style={{ width: '100%' }}>
        {
          list.map(file => (
            <Avatar
              onClick={() => setItem({ ...item, photo: `${cdn}/${namespace}/photo/${file}` })}
              size={40}
              shape="square"
              key={file}
              src={`${cdn}/${namespace}/photo/demo.${file}`} />
          ))
        }
      </Space>
    </Drawer >
    <Card
      style={{ backgroundColor: 'whitesmoke' }}
      title="اسلایدر عکس"
      extra={getActions(index, note.content!.length - 1)}>
      <Table
        footer={() => (
          <Space.Compact block>
            <Button
              onClick={() => setOpen(true)}
              icon={<PlusOutlined />}
              block>
              افزودن
            </Button>
            <Button
              onClick={() => {
                dispatch(actions.updateSection({
                  index: index,
                  section: {
                    ...section,
                    list: []
                  }
                }))
              }}
              disabled={section.list.length === 0}
              icon={<ClearOutlined />}
              block>
              پاک کردن همه
            </Button>
          </Space.Compact>
        )}
        bordered
        size="small"
        pagination={{ pageSize: 4 }}
        columns={[
          { title: 'شناسه', key: 'id', dataIndex: 'id', align: 'center' },
          { title: 'تصویر', key: 'photo', dataIndex: 'photo', align: 'center' },
          { title: 'لینک', key: 'link', dataIndex: 'link', align: 'center' },
          { title: 'عملیات', key: 'action', dataIndex: 'action', align: 'center' },
        ]}
        dataSource={
          section.list.map((item, i) => {
            return {
              key: item.id,
              id: item.id,
              photo: <Image height={50} src={item.photo} />,
              link: item.link ?? '-',
              action: <>
                <Button
                  onClick={() => {
                    const list = [...section.list];
                    list.splice(i, 1);
                    dispatch(actions.updateSection({
                      index: index,
                      section: {
                        ...section,
                        list: list
                      }
                    }))
                  }}
                  type="ghost"
                  icon={<DeleteOutlined />}>
                  پاک کردن
                </Button>
              </>
            }
          })
        } />
    </Card>
  </>
}


interface Props {
  index: number
  note: Note
  list: string[]
}

const mapStateToProps = (reducer: any) => {
  const { note, photo }: State = reducer.addNoteReducer;
  return {
    note: note,
    list: photo.list
  };
}

export default connect(mapStateToProps)(EditorCarousel);
