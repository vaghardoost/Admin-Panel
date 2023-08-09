import { Button, Drawer, Input, Popconfirm, Space, Table } from "antd";
import { connect } from "react-redux"
import { dispatch } from "../../../redux";
import { actions } from "../reducer";
import { InfoCircleOutlined } from "@ant-design/icons";
import { dispatch as editorDispatch, actions as editorActions } from "../../../components/editor/redux"
import { Note } from "../../../model/note";
import { State } from "../reducer/state";
import { useState } from "react";

const DraftDrawer = ({ open, data }: Props) => {
  const [title, setTitle] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  return <>
    <Drawer
      open={open}
      placement="left"
      width={700}
      onClose={() => {
        dispatch(actions.drawerDraft(false))
        setTitle('');
        setError(false);
      }}
      title="بارگذاری پیشنویس های ذخیره شده">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space.Compact block>
          <Input value={title} status={error ? "error" : ""} onChange={(e) => setTitle(e.target.value)} placeholder="عنوان نوشته فعلی" />
          <Button
            danger={error}
            onClick={() => {
              if (title.length === 0) {
                setError(true);
              } else {
                dispatch(actions.saveDraft(title));
              }
            }}>
            ذخیره نوشته ی فعلی
          </Button>
        </Space.Compact>
        <Table
          size="small"
          bordered
          columns={[
            { title: 'ردیف', key: 'no', dataIndex: 'no', align: 'center' },
            { title: 'تاریخ', key: 'key', dataIndex: 'key', align: 'center' },
            { title: 'عنوان', key: 'id', dataIndex: 'id', align: 'center' },
            { title: 'عنوان نوشته', key: 'title', dataIndex: 'title', align: 'center' },
            { title: 'عملیات', key: 'actions', dataIndex: 'actions', align: 'center' },
          ]}
          dataSource={
            data.map(({ key, note }, index) => {
              return {
                no: index + 1,
                key: key,
                id: note.id,
                title: note.title ?? '< بدون عنوان >',
                actions: <>
                  <Popconfirm
                    title='حذف پیشنویس'
                    okText='حذف'
                    cancelText='خیر'
                    description='پیش نویس حذف شود؟'
                    onConfirm={() => {
                      localStorage.removeItem(key);
                      dispatch(actions.drawerDraft(false));
                    }}
                    icon={<InfoCircleOutlined style={{ color: 'red' }} />}>
                    <Button type="link">حذف</Button>
                  </Popconfirm>
                  <Button
                    onClick={() => {
                      editorDispatch(editorActions.setContent(note.content!));
                      if (note.env) dispatch(actions.setEnv(note.env));
                      dispatch(actions.setTitle(note.title));
                      dispatch(actions.drawerDraft(false));
                    }}
                    type="link">
                    بارگذاری
                  </Button>
                </>
              }
            })
          }
        />
      </Space>
    </Drawer>
  </>
}

interface Props {
  open: boolean
  data: { key: string, note: Note }[]
}

function mapStateToProps(reducer: any): Props {
  const data: { key: string, note: Note }[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    try {
      const record = JSON.parse(localStorage.getItem(key!)!);
      data.push({ note: record, key: key ?? 'بدون عنوان' });
    } catch {
      localStorage.removeItem(key!);
    }
  }
  const state: State = reducer.datapackEditorReducer;
  return {
    open: state.drawerDraft,
    data: data
  }
}

export default connect(mapStateToProps)(DraftDrawer);
