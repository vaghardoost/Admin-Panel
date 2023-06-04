import { useState } from "react";
import { connect } from "react-redux";
import { Avatar, Button, Card, Drawer, Image, Input, Select, Space, Table, message } from "antd";
import { ClearOutlined, CloseCircleOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { generate } from "randomstring"

import { getActions } from "./_section.actions";
import { PairGallery, SectionName, SectionType } from "../../../../model/note"
import { State } from "../../redux/state";
import { cdn } from "../../../../config";

const PairGalleryComponent = ({ index, content, photos, onChange }: Props) => {
  const namespace = sessionStorage.getItem('namespace');

  const [state, setState] = useState<PairGallery>(content![index] as PairGallery)
  const [open, setOpen] = useState<boolean>(false);

  const [item, setItem] = useState<{ photo: string, link?: string, id?: string, caption?: string }>({ photo: '' });
  const [msg, context] = message.useMessage();

  const [type, setType] = useState<string>(state.link?.split('=>')[0] ?? 'url');
  const [link, setLink] = useState<string>(state.link?.split('=>')[1] ?? '');

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
                  ...state.list,
                  {
                    ...item,
                    id: generate({ length: 8, charset: 'ABCDEF0123456789' }),
                  }
                ]
                setState({ ...state, list: list });
                onChange?.({ ...state, list: list });
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
            <Space.Compact style={{ margin: '0 auto' }} block dir='ltr'>
              <Input
                value={link}
                onChange={(e) => {
                  if (e.target.value === '') {
                    setLink('');
                    setItem({ ...item, link: undefined });
                    return
                  }
                  setLink(e.target.value);
                  setItem({ ...item, link: `${type}=>${e.target.value}` })
                }}
                placeholder='شناسه' />
              <Select
                defaultValue={type}
                onChange={(e) => {
                  setType(e);
                  setItem({ ...item, link: `${e}=>${link}` });
                }}
                options={[
                  { value: 'url', label: 'لینک خارجی' },
                  { value: 'bottomsheet', label: 'منو کشویی' },
                  { value: 'datapack', label: 'صفحه دیگر' },
                ]}
              />
            </Space.Compact>
          </div>
        </Card>
      }>
      <Space wrap style={{ width: '100%' }}>
        {
          photos.map(file => (
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
      extra={getActions(index, content!.length - 1)}>
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
                onChange?.({ ...state, list: [] });
                setState({ ...state, list: [] });
              }}
              disabled={state.list.length === 0}
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
          { title: 'شناسه', key: 'id', dataIndex: 'id', align: 'center', fixed: 'left' },
          { title: 'تصویر', key: 'photo', dataIndex: 'photo', align: 'center' },
          { title: 'عنوان', key: 'title', dataIndex: 'title', align: 'center' },
          { title: 'لینک', key: 'link', dataIndex: 'link', align: 'center' },
          {
            title: 'عملیات',
            key: 'action',
            dataIndex: 'action',
            align: 'center',
            fixed: 'right',
            render: (_a, _b, i) => <Button
              size="small"
              onClick={() => {
                const list = [...state.list];
                list.splice(i, 1);
                setState({ ...state, list: list })
                onChange?.({ ...state, list: list })
              }}
              type="primary"
              danger>
              حذف
            </Button>
          },

        ]}
        dataSource={
          state.list.map((item, i) => {
            return {
              key: item.id,
              id: item.id,
              photo: <Image height={50} src={item.photo} />,
              title: item.caption ?? '-',
              link: item.link ?? '-',
            }
          })
        } />
    </Card>
  </>
}

interface Props {
  index: number
  content: SectionType[]
  photos: string[]
  onChange?: (section: SectionType) => void
}

const mapStateToProps = (reducer: any) => {
  const { content, data }: State = reducer;
  return {
    content: content,
    photos: data.photoList,
  };
}

export default connect(mapStateToProps)(PairGalleryComponent);

export const pairGalleryInitState: PairGallery = {
  type: SectionName.pairGallery,
  list: []
}

interface EditorProps {
  onChange?: (section: SectionType) => void
  photos: string[]
  init?: PairGallery
}

export function EditorPairGallery({ onChange, photos, init }: EditorProps) {
  return <PairGalleryComponent onChange={onChange} index={0} content={[init ?? pairGalleryInitState]} photos={photos} />
}


