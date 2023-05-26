import { connect } from "react-redux"


import { generate } from 'randomstring'
import { Space, Button } from "antd";
import { dispatch } from "../../../../../redux";
import { actions } from "../../../reducer";


function EditorAppend() {
  return <>
    <div className="around">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space.Compact block>
          <Button
            block
            type="dashed"
            onClick={() => {
              dispatch(
                actions.addSection(
                  {
                    id: generate({ charset: '0123456789abcdef', length: 8 }),
                    type: 'caption',
                    richtext: [],
                  }
                )
              )
            }}>نوشته خام</Button>

          <Button
            type="dashed"
            block
            onClick={() => {
              dispatch(
                actions.addSection(
                  {
                    id: generate({ charset: '0123456789abcdef', length: 8 }),
                    type: 'frame',
                    richtext: []
                  }
                )
              )
            }}>کادر</Button>

          <Button type="dashed" block onClick={() => {
            dispatch(
              actions.addSection(
                {
                  id: generate({ charset: '0123456789abcdef', length: 8 }),
                  type: 'title',
                  header: 'h3',
                  text: ''
                }
              )
            )
          }}>عنوان</Button>

          <Button type="dashed" block onClick={() => {
            dispatch(
              actions.addSection(
                {
                  id: generate({ charset: '0123456789abcdef', length: 8 }),
                  type: 'code',
                  text: ''
                }
              )
            )
          }}>کد</Button>
        </Space.Compact>
        <Space.Compact block>
          <Button
            type="dashed"
            block
            onClick={() => {
              dispatch(
                actions.addSection(
                  {
                    id: generate({ charset: '0123456789abcdef', length: 8 }),
                    type: 'photo',
                    richtext: [],
                    url: ''
                  }
                )
              )
            }}>تصویر</Button>

          <Button
            type="dashed"
            block
            onClick={() => {
              dispatch(
                actions.addSection(
                  {
                    id: generate({ charset: '0123456789abcdef', length: 8 }),
                    type: 'carousel',
                    list: [],
                  }
                )
              )
            }}>اسلایدر تصاویر</Button>

          <Button
            type="dashed"
            block
            onClick={() => {
              dispatch(
                actions.addSection(
                  {
                    id: generate({ charset: '0123456789abcdef', length: 8 }),
                    type: 'gallery',
                    list: [],
                  }
                )
              )
            }}>گالری تصویر</Button>

          <Button
            type="dashed"
            block
            onClick={() => {
              dispatch(
                actions.addSection(
                  {
                    id: generate({ charset: '0123456789abcdef', length: 8 }),
                    type: 'pair-gallery',
                    list: [],
                  }
                )
              )
            }}>تصاویر دودویی</Button>

          <Button
            type="dashed"
            block
            onClick={() => {
              dispatch(
                actions.addSection(
                  {
                    id: generate({ charset: '0123456789abcdef', length: 8 }),
                    type: 'avatar-card',
                    avatar: '',
                    title: '',
                    subtitle: '',
                  }
                )
              )
            }}>کارت آواتار</Button>
        </Space.Compact>
        <Space.Compact block>
          <Button disabled type="dashed" block> (بزودی) آهنگ </Button>
          <Button disabled type="dashed" block> (بزودی) صدا </Button>
        </Space.Compact>
      </Space>
    </div>
  </>
}

export default connect()(EditorAppend)
