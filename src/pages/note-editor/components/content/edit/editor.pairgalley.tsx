import { useState } from "react";
import { connect } from "react-redux";
import { Avatar, Button, Card, Drawer, Image, Input, Space, Table, message } from "antd";
import { generate } from "randomstring"

import { Note, PairGallery } from "../../../../../model/note";
import { State } from "../../../reducer/state";
import { getActions } from "./_section.actions";
import { ClearOutlined, CloseCircleOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { dispatch } from "../../../../../redux";
import { actions } from "../../../reducer";
import { cdn } from "../../../../../config";

const EditorPairGallery = ({ index, note, list }: Props) => {
  const namespace = sessionStorage.getItem('namespace')
  const section: PairGallery = note.content![index] as PairGallery

  const [open, setOpen] = useState<boolean>(false);

  const [item, setItem] = useState<{ photo: string, link?: string, id?: string, caption?: string }>({ photo: '' });
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
            <Input onChange={(e) => setItem({ ...item, caption: e.target.value })} value={item?.caption} placeholder="عنوان" />
            <Input onChange={(e) => setItem({ ...item, link: e.target.value })} value={item?.link} placeholder="لینک" />
          </div>
        </Card>
      }>
      <Space wrap style={{ width: '100%' }}>
        {
          list.map(file => (
            <Avatar
              onClick={() => setItem({ ...item, photo: `${cdn}/${namespace}/photo/demo.${file}` })}
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
      title="تصاویر دودویی"
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
              onClick={() => { }}
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
          { title: 'عنوان', key: 'title', dataIndex: 'title', align: 'center' },
          { title: 'لینک', key: 'link', dataIndex: 'link', align: 'center' },
          { title: 'عملیات', key: 'action', dataIndex: 'action', align: 'center' },
        ]}
        dataSource={
          section.list.map((item, i) => {
            return {
              key: item.id,
              id: item.id,
              photo: <Image height={50} src={item.photo} />,
              title: item.caption ?? '-',
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
    list: photo.list,
  };
}

export default connect(mapStateToProps)(EditorPairGallery);
