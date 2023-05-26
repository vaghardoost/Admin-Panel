import { connect } from "react-redux";
import { Avatar, Button, Card, ColorPicker, Input, List, Space, TreeSelect, message } from "antd";

import { Category } from "../../../model/category";
import { dispatch } from "../../../redux";
import { actions } from "../reducer";
import { State } from "../reducer/state";
import { categoryTreeBuilder } from "../../../utils";

const { TextArea } = Input;

const CategoryFields = ({ category, photoList, catList }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();

  return <>
    {contextHolder}
    <Card
      className="margin"
      title="دسته بندی بالا"
    >
      <Space
        direction="vertical"
        style={{ width: '100%' }}>
        <Input
          value={category.label}
          onChange={(e) => dispatch(actions.setTitle(e.target.value))}
          placeholder="عنوان دسته بندی" />
        <TextArea
          value={category.description}
          onChange={(e) => dispatch(actions.setDesc(e.target.value))}
          rows={3}
          placeholder='توضیحات دسته بندی'>
        </TextArea>
        <Space.Compact block>
          <ColorPicker
            value={category.color ?? '#fff'}
            onChange={(color) => dispatch(actions.setColor(`#${color.toHex()}`))}>
            <Button block>انتخاب رنگ</Button>
          </ColorPicker>
          <Button block onClick={() => dispatch(actions.setNoColor())}>بدون رنگ</Button>
          <Button block onClick={() => dispatch(actions.setNoAvatar())}>بدون عکس</Button>
        </Space.Compact>
        <TreeSelect
          treeLine
          treeData={categoryTreeBuilder(catList)}
          style={{ width: '100%' }}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder="دسته بندی والد (این دسته بندی زیرمجموعه کدام باشد؟)"
          allowClear
          treeDefaultExpandAll
          value={category.parent}
          onChange={(data) => {
            if (data === category.id) {
              messageApi.open({
                type:'error',
                content:'خود دسته بندی را به عنوان والد نمیتوان انتخاب کرد'
              })
              return;
            }
            dispatch(actions.setParent(data as string))
          }}
        />
        <List
          bordered
          size="small"
          header="تصویر دسته بندی"
          grid={{ gutter: 1, column: 10 }}
          dataSource={photoList}
          renderItem={(item) => (
            <div style={{justifyContent: 'center',display: 'flex',margin: '3px'}}>
              <Avatar
                onClick={() => {
                  dispatch(actions.setAvatar(item));
                }}
                src={item} size={50} />
            </div>
          )}
        />
      </Space>
    </Card>
  </>
}

interface Props {
  category: Category
  photoList: string[]
  catList: Category[]
}

function mapStateToProps(reducer: any): Props {
  const state: State = reducer.categoryEditorReducer;
  return {
    category: state.category,
    photoList: state.photoList,
    catList: state.categoryList
  }
}

export default connect(mapStateToProps)(CategoryFields)