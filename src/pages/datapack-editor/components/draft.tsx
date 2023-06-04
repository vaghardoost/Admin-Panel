import { Button, Drawer, Popconfirm, Table } from "antd";
import { connect } from "react-redux"
import { dispatch } from "../../../redux";
import { actions } from "../reducer";
import { InfoCircleOutlined } from "@ant-design/icons";
import { dispatch as editorDispatch, actions as editorActions } from "../../../components/editor/redux"
import { Note } from "../../../model/note";
import { State } from "../reducer/state";

const DraftDrawer = ({ open,data }: Props) => {
  return <>
    <Drawer
      open={open}
      placement="left"
      width={700}
      onClose={() => dispatch(actions.drawerDraft(false))}
      extra={
        <Button
          onClick={() => {
            dispatch(actions.saveDraft());
          }}>
          ذخیره نوشته ی فعلی
        </Button>
      }
      title="بارگذاری پیشنویس های ذخیره شده">
      <Table
        size="small"
        bordered
        columns={[
          { title: 'ردیف', key: 'no', dataIndex: 'no', align: 'center' },
          { title: 'تاریخ', key: 'key', dataIndex: 'key', align: 'center' },
          { title: 'عنوان نوشته', key: 'title', dataIndex: 'title', align: 'center' },
          { title: 'عملیات', key: 'actions', dataIndex: 'actions', align: 'center' },
        ]}
        dataSource={
          data.map(({ key, note }, index) => {
            return {
              no: index + 1,
              key: key,
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
                    if(note.env) dispatch(actions.setEnv(note.env));
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
