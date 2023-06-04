import { connect } from "react-redux";
import { Note } from "../../../model/note";
import { State } from "../reducer/state";
import { Button, Drawer, Popconfirm, Table } from "antd";
import { dispatch } from "../../../redux";
import { actions } from "../reducer";
import { actions as editorActions, dispatch as editorDispatch } from "../../../components/editor/redux/index"
import { InfoCircleOutlined } from "@ant-design/icons";

const DraftDrawer = ({ data, open, note }: Props) => {
  return (
    <Drawer
      open={open}
      placement="left"
      width={700}
      onClose={() => dispatch(actions.drawerDraft(false))}
      extra={
        <Button
          onClick={() => {
            const date = new Date();
            const key = `${date.toLocaleDateString('fa-IR')} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
            localStorage.setItem(key, JSON.stringify(note));
            dispatch(actions.drawerDraft(false));
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
                    if (note.photo) dispatch(actions.setNotePhoto(note.photo));
                    if (note.title) dispatch(actions.setTitle(note.title));
                    if (note.category) dispatch(actions.setCategorySelected(note.category));
                    note.tag.forEach(tag => dispatch(actions.pushTag(tag)))
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
    </Drawer>)
}

interface Props {
  open: boolean
  data: { key: string, note: Note }[]
  note: Note
}

const mapStateToProps = (reducer: any): Props => {


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

  const state: State = reducer.addNoteReducer;
  return {
    open: state.draft,
    data: data,
    note: state.note
  }
}

export default connect(mapStateToProps)(DraftDrawer);