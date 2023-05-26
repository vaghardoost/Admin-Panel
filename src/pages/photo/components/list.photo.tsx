import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Button, Image, Popconfirm, Space, Table, message } from "antd";
import { DeleteOutlined, CopyOutlined, InfoCircleOutlined } from "@ant-design/icons"

import { dispatch } from "../../../redux";
import State from "../reducer/state";
import { loadPhotoList, removePhoto } from "../reducer/actions";
import { cdn } from "../../../config";

const ListComponent = ({ list }: Props) => {
  const namespace = sessionStorage.getItem('namespace');

  const [firstTime, setTime] = useState<boolean>(true);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (firstTime) {
      dispatch(loadPhotoList());
      setTime(false);
    }
  });

  return <>
    {contextHolder}
    <Table
      size="small"
      columns={[
        { title: 'ردیف', dataIndex: 'no', key: 'no', align: 'center' },
        { title: 'تصویر', dataIndex: 'image', key: 'image', align: 'center' },
        { title: 'نام فایل', dataIndex: 'name', key: 'name', align: 'center' },
        { title: 'عملیات', dataIndex: 'action', key: 'action', align: 'center' },
      ]}
      dataSource={
        list.map((file, index) => {
          return {
            key: file,
            no: index + 1,
            name: file,
            action: <Space>
              <Popconfirm
                title="حذف فایل"
                description='آیا این فایل از سرور حذف شود؟'
                okText="حذف"
                cancelText="خیر"
                icon={<InfoCircleOutlined style={{ color: 'red' }} />}
                onConfirm={async () => {
                  await dispatch(removePhoto(file));
                  dispatch(loadPhotoList());
                }}
              >
                <Button type="link">
                  <DeleteOutlined /> حذف
                </Button>
              </Popconfirm>

              <Button
                type="link"
                onClick={() => {
                  const namespace = sessionStorage.getItem('namespace')
                  navigator.clipboard.writeText(`${cdn}/${namespace}/photo/${file}`);
                  messageApi.open({
                    type: 'success',
                    content: 'آدرس فایل کپی شد'
                  })
                }}
              >
                <CopyOutlined /> کپی آدرس
              </Button>
            </Space>,
            image: <Image
              height={40}
              src={`${cdn}/${namespace}/photo/demo.${file}`}
              preview={{
                src: `${cdn}/${namespace}/photo/${file}`,
                mask: <></>
              }}
            />
          }
        })
      }
    />
  </>
}

interface Props {
  list: string[]
}

const mapStateToProps = (reducer: any): Props => {
  const state: State = reducer.photoReducer;
  return { list: state.list };
}

export default connect(mapStateToProps)(ListComponent);
