import { connect } from "react-redux"
import { Button, Card, ColorPicker, Descriptions } from "antd";
import { saveDatapackAction, updateDatapackAction } from "../reducer/actions";
import { State } from "../reducer/state"
import { actions } from "../reducer";
import { dispatch } from "../../../redux";
import { Environment, SectionType } from "../../../model/note";

const Metadata = ({ id, content, env, loading }: Props) => {
  return <>
    <Card
      title={<Button onClick={() => dispatch(actions.drawerDraft(true))}>پیشنویس</Button>}
      extra={
        id
          ? <Button loading={loading} onClick={() => dispatch(updateDatapackAction({ content: content, env: env, id: id }))} type="primary">ویرایش</Button>
          : <Button loading={loading} onClick={() => dispatch(saveDatapackAction({ content: content, env: env }))} type="primary">انتشار</Button>
      }>
      <Descriptions title="اطلاعات بسته ی داده ی اپلیکیشن">
        <Descriptions.Item label="شناسه">{id ?? 'هنوز ذخیره نشده'}</Descriptions.Item>
        <Descriptions.Item label="پس زمینه">
          <ColorPicker onChange={(_color, hex) => dispatch(actions.setBackground(hex))}>
            <div
              onDoubleClick={() => dispatch(actions.resetBackground())}
              style={{
                cursor: 'pointer',
                backgroundColor: env.background,
                padding: '0 10px',
                borderRadius: '5px',
                minWidth: '75px',
                minHeight: '25px',
              }}>
              {
                env.background
                  ? <></>
                  : 'بدون پس زمینه'
              }
            </div>
          </ColorPicker>
        </Descriptions.Item>
        <Descriptions.Item label="تعداد bottomsheet">{env.bottomSheet.length}</Descriptions.Item>
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
