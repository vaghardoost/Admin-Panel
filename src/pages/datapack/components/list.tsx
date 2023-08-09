import { Button, List, Popconfirm, Space, Table } from "antd";
import { connect } from "react-redux"
import { Note } from "../../../model/note";
import { State } from "../reducer/state";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { dispatch } from "../../../redux";
import { deleteDatapackAction } from "../reducer/actions";

const DatapackList = ({ list, loading }: Props) => {
  const indexDatapackId = sessionStorage.getItem("index-datapack");
  const navigate = useNavigate();
  return <>
    <Table
      loading={loading}
      bordered
      size="small"
      columns={[
        { title: 'ردیف', key: 'no', align: 'center', dataIndex: 'no' },
        {
          title: 'شناسه',
          key: 'id',
          align: 'center',
          dataIndex: 'id',
          sorter: { compare: (a, b) => a.title.localeCompare(b.title) }
        },
        {
          title: 'عنوان',
          key: 'title',
          align: 'center',
          dataIndex: 'title',
          sorter: { compare: (a, b) => a.title.localeCompare(b.title) }
        },
        {
          title: 'عملیات',
          key: 'action',
          align: 'center',
          dataIndex: 'action',
          render(_a, item) {
            return <>
              <Space align="center">
                <Popconfirm
                  title={'حذف بسته داده'}
                  description={'آیا این بسته داده از سیستم حذف شود؟'}
                  okText={'حذف'}
                  cancelText={'خیر'}
                  onConfirm={() => dispatch(deleteDatapackAction(item.id!))}>
                  <Button size="small" danger type="primary" icon={<DeleteOutlined />}> حذف</Button>
                </Popconfirm>
                <Space />
                <Button size="small" type="primary" icon={<EditOutlined />} onClick={() => navigate(`/datapack/edit/${item.id}`)}>
                  ویرایش
                </Button>
              </Space>
            </>
          },
        },
      ]}
      dataSource={
        list.map((item, index) => ({
          key: item.id,
          id: item.id,
          title: item.title,
          no: (indexDatapackId === item.id) ? " (شاخص)" : index + 1,
        }))
      }
    />
  </>
}

interface Props {
  list: Note[]
  loading: boolean
}

function mapStateToProps(reducer: any): Props {
  const state: State = reducer.datapackReducer;
  return {
    list: state.list,
    loading: state.loading
  }
}

export default connect(mapStateToProps)(DatapackList);
