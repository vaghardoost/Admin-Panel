import { BgColorsOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Card, Popconfirm, Space, Table } from "antd";
import { connect } from "react-redux"
import { State } from "../reducer/state";
import { dispatch } from "../../../redux";
import { actions } from "../reducer";
import { SectionName, Bottomsheet } from "../../../model/note";

const BottomSheetEditor = ({ bottomsheet }: Props) => {
  return <>
    <Card
      title="مدیریت محیط"
      style={{ marginBottom: '15px' }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space.Compact block>
          <Button
            block
            type="dashed"
            onClick={() => dispatch(actions.openDrawer(SectionName.caption))}
          >نوشته خام</Button>

          <Button
            type="dashed"
            block
            onClick={() => dispatch(actions.openDrawer(SectionName.frame))}
          >کادر</Button>

          <Button
            type="dashed"
            block
            onClick={() => dispatch(actions.openDrawer(SectionName.title))}
          >عنوان</Button>

          <Button
            type="dashed"
            block
            onClick={() => dispatch(actions.openDrawer(SectionName.code))}
          >کد</Button>

          <Button
            type="dashed"
            block
            onClick={() => dispatch(actions.openDrawer(SectionName.namespace))}
          >فضای نام</Button>

        </Space.Compact>
        <Space.Compact block>

          <Button
            type="dashed"
            block
            onClick={() => dispatch(actions.openDrawer(SectionName.photo))}
          >تصویر</Button>

          <Button
            type="dashed"
            block
            onClick={() => dispatch(actions.openDrawer(SectionName.avatarCard))}
          >کارت آواتار</Button>

        </Space.Compact>
        <Space.Compact block>

          <Button
            type="dashed"
            block
            onClick={() => dispatch(actions.openDrawer(SectionName.carouselCard))}
          >اسلایدر تصاویر</Button>
          <Button
            type="dashed"
            block
            onClick={() => dispatch(actions.openDrawer(SectionName.gallery))}
          >گالری تصویر</Button>
          <Button
            type="dashed"
            block
            onClick={() => dispatch(actions.openDrawer(SectionName.pairGallery))}
          >تصاویر دودویی</Button>
          <Button
            type="dashed"
            block
            onClick={() => dispatch(actions.openDrawer(SectionName.carouselSm))}
          >اسلایدر کوچک</Button>
        </Space.Compact>
        <Space.Compact block>
          <Button disabled type="dashed" block> (بزودی) آهنگ </Button>
          <Button disabled type="dashed" block> (بزودی) صدا </Button>
        </Space.Compact>
      </Space>
    </Card>

    <Table
      size="small"
      pagination={{ pageSize: 5 }}
      columns={[
        { title: 'شناسه', key: 'key', dataIndex: 'key', align: 'center' },
        { title: 'نوع سکشن', key: 'section', dataIndex: 'section', align: 'center' },
        { title: 'عنوان', key: 'title', dataIndex: 'title', align: 'center' },
        { title: 'عملیات', key: 'action', dataIndex: 'action', align: 'center' },
      ]}
      dataSource={
        bottomsheet.map((e) => ({
          key: e.id,
          section: e.content?.type,
          title: e.title ?? '-',
          action: (
            <Space>
              <Popconfirm onConfirm={() => dispatch(actions.deleteBottomsheet(e.id!))} okText="بله" cancelText="خیر" title="حذف" description="این منوی کشویی حذف شود؟">
                <Button size="small" type="primary" danger>حذف</Button>
              </Popconfirm>
              <Button onClick={() => dispatch(actions.openDrawerAsEdit(e))} size="small" type="primary">ویرایش</Button>
            </Space>
          )
        }))
      }
    />

  </>
}

interface Props {
  bottomsheet: Bottomsheet[]
}

function mapStateToProps(reducer: any): Props {
  const state: State = reducer.datapackEditorReducer;
  return {
    bottomsheet: state.env.bottomsheet
  }
}

export default connect(mapStateToProps)(BottomSheetEditor);
