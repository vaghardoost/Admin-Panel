import { connect } from "react-redux"
import { Button, Card, Descriptions, Space } from "antd";
import { saveDatapackAction, updateDatapackAction, setIndexDatapackId } from "../reducer/actions";
import { State } from "../reducer/state"
import { actions } from "../reducer";
import { dispatch } from "../../../redux";
import { Environment, SectionType } from "../../../model/note";

const Metadata = ({ id, content, env, loading }: Props) => {
  const indexDatapackId = sessionStorage.getItem("index-datapack");
  return <>
    <Card
      title={
        <Space.Compact>
          <Button onClick={() => dispatch(actions.drawerDraft(true))}>پیشنویس</Button>
          <Button loading={loading} disabled={indexDatapackId == id || !id} onClick={() => { dispatch(actions.setloading()); dispatch(setIndexDatapackId(id!)); }}>تنظیم به عنوان اصلی</Button>
        </Space.Compact>
      }
      extra={
        id
          ? <Button loading={loading} onClick={() => dispatch(updateDatapackAction({ content: content, env: env, id: id }))} type="primary">ویرایش</Button>
          : <Button loading={loading} onClick={() => dispatch(saveDatapackAction({ content: content, env: env }))} type="primary">انتشار</Button>
      }>
      <Descriptions title="اطلاعات بسته ی داده ی اپلیکیشن">
        <Descriptions.Item label="شناسه">{id ?? 'هنوز ذخیره نشده'}</Descriptions.Item>
        <Descriptions.Item label="تعداد bottomsheet">{env.bottomsheet.length}</Descriptions.Item>
        <Descriptions.Item label="تعداد section">{content.length}</Descriptions.Item>
      </Descriptions>
    </Card >
  </>
}

interface Props {
  id?: string
  content: SectionType[]
  env: Environment
  loading: boolean
}

function mapStateToProps(reducer: any): Props {
  const state: State = reducer.datapackEditorReducer;
  return {
    id: state.id,
    content: state.content,
    env: state.env,
    loading: state.loading,
  }
}

export default connect(mapStateToProps)(Metadata)
