import { ClearOutlined, CloseCircleOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Drawer, Image, Input, Select, Space, Table, message } from "antd";
import { connect } from "react-redux";
import { useState } from "react";
import { generate } from "randomstring";

import { getActions, getLinkType } from "./_section.actions";
import { CarouselCard, SectionName, SectionType } from "../../../../model/note"
import { State } from "../../redux/state";
import { cdn } from "../../../../config";

const { TextArea } = Input;

const CarouselCardComponent = ({ index, photos, content, onChange }: Props) => {
  const namespace = sessionStorage.getItem('namespace')

  const [state, setState] = useState<CarouselCard>(content![index] as CarouselCard);
  const [open, setOpen] = useState<boolean>(false);

  const emptyItem = { photo: '', id: '', subtitle: '', title: '' };
  const [item, setItem] = useState<{ id: string, link?: string, photo: string, title: string, subtitle: string }>(emptyItem);
  const [msg, context] = message.useMessage();

  const [link, setLink] = useState<string>(getLinkType(state.link)[1]);
  const [type, setType] = useState<string>(getLinkType(state.link)[0]);

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

                setItem(emptyItem);
                setLink("");
                setType("url");
              }}
              type='ghost'
              icon={<PlusOutlined />}>
              افزودن
            </Button>,
            <Button
              onClick={() => {
                setItem(emptyItem);
                setLink("");
                setType("url");
              }}
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
                margin: '5px',
              }}
              src={item.photo} />
            <Input onChange={(e) => setItem({ ...item, title: e.target.value })} value={item.title} style={{ marginBottom: '5px' }} placeholder="عنوان" maxLength={30} />
            <TextArea onChange={(e) => setItem({ ...item, subtitle: e.target.value })} value={item.subtitle} placeholder="توضیحات" maxLength={60} />
            <Space.Compact style={{ margin: '10px auto' }} block dir='ltr'>
              <Input
                value={link}
                onChange={(e) => {
                  const { value: link } = e.target;
                  if (link === '') {
                    setLink('');
                    setItem({ ...item, link: undefined });
                    return
                  }
                  setLink(link);
                  setItem({ ...item, link: (type === "url") ? link : `@${type}/${link}` })
                }}
                placeholder='شناسه' />
              <Select
                defaultValue={type}
                value={type}
                onChange={(e) => {
                  setType(e);
                  setItem({ ...item, link: (e === "url") ? link : `@${e}/${link}` });
                }}
                options={[
                  { value: 'url', label: 'لینک خارجی' },
                  { value: 'bottomsheet', label: 'منو کشویی' },
                  { value: 'datapack', label: 'صفحه دیگر' },
                  { value: 'namespace', label: 'فضای دیگر' },
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
                onChange?.({ ...state, list: [] })
                setState({ ...state, list: [] })
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
    photos: data.photoList
  };
}

export default connect(mapStateToProps)(CarouselCardComponent);

export const carouselCardInitState: CarouselCard = {
  type: SectionName.carouselCard,
  list: []
}

interface EditorProps {
  onChange?: (section: SectionType) => void
  photos: string[]
  init?: CarouselCard
}

export function EditorCarouselCard({ onChange, photos, init }: EditorProps) {
  return <CarouselCardComponent onChange={onChange} index={0} content={[init ?? carouselCardInitState]} photos={photos} />
} 
