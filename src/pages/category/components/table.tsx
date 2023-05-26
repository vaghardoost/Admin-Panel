import { connect } from "react-redux"
import { Avatar, Button, Card, Popconfirm, Space, Table } from "antd"
import { DeleteOutlined, EditOutlined, InfoCircleOutlined } from "@ant-design/icons";

import { State } from "../reducer/state";
import { deleteCat } from "../reducer/actions"
import { Category } from "../../../model/category";
import { dispatch } from "../../../redux";
import { useNavigate } from "react-router-dom";


interface Props {
  select?: Category
  loading: boolean
}

const NoteTable = ({ select, loading }: Props) => {
  const navigate = useNavigate();
  return <>
    <Space style={{ width: '100%' }} direction="vertical">
      {
        (select)
          ?
          <Card
            actions={[
              <Popconfirm
                title="حذف دسته بندی"
                description='اگر دسته بندی حذف شود دسته بندی های پایین دستی و نوشته های آن دیگر قابل رهگیری نخواهند بود'
                okText="حذف"
                cancelText="خیر"
                icon={<InfoCircleOutlined style={{ color: 'red' }} />}
                onConfirm={async () => {
                  dispatch(deleteCat(select.id!))
                }}
              >
                <DeleteOutlined /> حذف
              </Popconfirm>,
              <div onClick={() => { navigate(`/category/edit/${select.id!}`) }}><EditOutlined /> ویرایش</div>
            ]}
            loading={loading}
            title={loading ? 'درحال بارگذاری داده ها' : select.label}>
            <Space style={{ width: '100%' }}>
              <Avatar size={100} src={select.avatar} />
              <div>
                <h3>{select.label}</h3>
                <h6>{select.description}</h6>
                <p style={{ opacity: '.5' }}>شناسه:{select.id}</p>
              </div>
            </Space>
          </Card>
          :
          <></>
      }

      <Table
        size="small"
        bordered
        loading={loading}
        columns={[
          { title: 'ردیف', dataIndex: 'no', key: 'no', align: 'center' },
          { title: 'شناسه', dataIndex: 'id', key: 'id', align: 'center' },
          { title: 'عنوان', dataIndex: 'title', key: 'title', align: 'center' },
          { title: 'تاریخ', dataIndex: 'date', key: 'date', align: 'center' },
          { title: 'عملیات', dataIndex: 'option', key: 'option', align: 'center' },
        ]}
        dataSource={select?.note?.map((note, index) => {
          return {
            no: index,
            id: note.id,
            title: note.title,
            date: 'تاریخ',
            option: <>
              <Popconfirm
                title="حذف فایل"
                description='آیا این فایل از سرور حذف شود؟'
                okText="حذف"
                cancelText="خیر"
                icon={<InfoCircleOutlined style={{ color: 'red' }} />}
                onConfirm={async () => {

                }}
              >
                <Button type="link">حذف</Button>
              </Popconfirm>
              <Button type="link">ویرایش</Button>
            </>
          }
        })}
      />
    </Space>
  </>
}

const mapStateToProps = (reducer: any): Props => {
  const state: State = reducer.categoryReducer;
  return {
    select: state.select,
    loading: state.loading
  }
}

export default connect(mapStateToProps)(NoteTable);
