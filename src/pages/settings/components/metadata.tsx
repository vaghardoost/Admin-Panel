import { connect } from "react-redux";
import State from "../reducer/state";
import { Avatar, Badge, Button, Card, Descriptions, Drawer, Form, Input, Space } from "antd";
import { useEffect, useState } from "react";
import { cdn } from "../../../config";
import { dispatch } from "../../../redux";
import { actions } from "../reducer";
import { updateNamespace } from "../reducer/actions";

const NamespaceData = ({ loading, namespace, photos }: Props) => {
  const nID = sessionStorage.getItem('namespace');
  const role = sessionStorage.getItem('role');

  const [open, setOpen] = useState<boolean>(false);
  const [image, setImage] = useState<string>();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(namespace)
  }, [form, namespace]);

  return (
    <>
      <Drawer
        placement="left"
        open={open}
        closable={true}
        onClose={() => setOpen(false)}
        title="انتخاب عکس">
        <Space direction="horizontal" wrap align="center" style={{ width: '100%' }}>
          {
            photos.map(file => (
              <Avatar
                onClick={() => {
                  form.setFieldValue("avatar", `${cdn}/${nID}/photo/demo.${file}`);
                  setImage(`${cdn}/${nID}/photo/demo.${file}`);
                }}
                size={75}
                shape="square"
                key={file}
                src={`${cdn}/${nID}/photo/demo.${file}`} />
            ))
          }
        </Space>
      </Drawer>

      <Form
        form={form}
        initialValues={namespace}
        onFinish={(data) => {
          dispatch(actions.loading());
          dispatch(updateNamespace(data));
        }}>
        <Card
          title="آمار و وضعیت"
          loading={loading}
          extra={
            <Button disabled={(role !== "Admin")} loading={loading} htmlType="submit">
              {(loading) ? "درحال بارگذاری" : "ویرایش اطلاعات"}
            </Button>
          }>
          <Descriptions column={2}>
            <Descriptions.Item label="شناسه">{namespace?.id}</Descriptions.Item>
            <Descriptions.Item label="بسته داده شاخص">{namespace?.datapack ?? 'وجود ندارد'}</Descriptions.Item>
            <Descriptions.Item label="وضعیت">
              <Badge status={
                (namespace?.state === 'اجرا')
                  ? 'processing'
                  : (namespace?.state === 'معلق')
                    ? 'error'
                    : 'default'
              }
                text={namespace?.state} />
            </Descriptions.Item>
          </Descriptions>

          <img style={{ width: '100px', height: '100px', cursor: 'pointer', objectFit: 'cover' }} src={image ?? namespace?.avatar} onClick={() => { if (role === "Admin") setOpen(true) }} />
          <Form.Item name='avatar' label='آدرس'>
            <Input bordered={false} readOnly />
          </Form.Item>

          <Form.Item name='name' label='نام فضا'>
            <Input readOnly={(role !== "Admin")} placeholder="نام اصلی فضا" bordered={false} />
          </Form.Item>

          <Form.Item name='description' label='توضیحات'>
            <Input readOnly={(role !== "Admin")} placeholder="درباره ی فضا" bordered={false} />
          </Form.Item>

        </Card>
      </Form>
    </>
  )
}

interface Props {
  loading: boolean
  photos: string[],
  namespace?: {
    id: string
    name: string
    avatar: string,
    description: string
    state: "اجرا" | "معلق" | "درحال بارگذاری"
    datapack?: string
  }
}

const mapStateToProps = (reducer: any): Props => {
  const state: State = reducer.settingReducer;
  return {
    namespace: state.namespace,
    photos: state.photos,
    loading: state.loading,
  }
}

export default connect(mapStateToProps)(NamespaceData);
