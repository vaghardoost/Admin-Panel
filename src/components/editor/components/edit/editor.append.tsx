import { connect } from "react-redux"
import { generate } from 'randomstring'
import { Space, Button } from "antd";

import { actions, dispatch } from "../../redux";
import { State } from "../../redux/state";
import { SectionName } from "../../../../model/note";

export const Append = ({ disabled }: Props) => {

  return <>
    <div className="around">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space.Compact block>

          <Button
            block
            type="dashed"
            disabled={disabled.includes('caption')}
            onClick={() => {
              dispatch(
                actions.addSection(
                  {
                    id: generate({ charset: '0123456789abcdef', length: 8 }),
                    type: SectionName.caption,
                    richtext: [],
                  }
                )
              )
            }}>نوشته خام</Button>

          <Button
            type="dashed"
            block
            disabled={disabled.includes('frame')}
            onClick={() => {
              dispatch(
                actions.addSection(
                  {
                    id: generate({ charset: '0123456789abcdef', length: 8 }),
                    type: SectionName.frame,
                    richtext: []
                  }
                )
              )
            }}>کادر</Button>

          <Button
            disabled={disabled.includes('title')}
            type="dashed"
            block
            onClick={() => {
              dispatch(
                actions.addSection(
                  {
                    id: generate({ charset: '0123456789abcdef', length: 8 }),
                    type: SectionName.title,
                    header: 'h3',
                    text: ''
                  }
                )
              )
            }}>عنوان</Button>

          <Button
            disabled={disabled.includes('code')}
            type="dashed"
            block
            onClick={() => {
              dispatch(
                actions.addSection(
                  {
                    id: generate({ charset: '0123456789abcdef', length: 8 }),
                    type: SectionName.code,
                    text: ''
                  }
                )
              )
            }}>کد</Button>

        </Space.Compact>
        <Space.Compact block>

          <Button
            disabled={disabled.includes('photo')}
            type="dashed"
            block
            onClick={() => {
              dispatch(
                actions.addSection(
                  {
                    id: generate({ charset: '0123456789abcdef', length: 8 }),
                    type: SectionName.photo,
                    richtext: [],
                    url: ''
                  }
                )
              )
            }}>تصویر</Button>

          <Button
            disabled={disabled.includes('carousel')}
            type="dashed"
            block
            onClick={() => {
              dispatch(
                actions.addSection(
                  {
                    id: generate({ charset: '0123456789abcdef', length: 8 }),
                    type: SectionName.carousel,
                    list: [],
                  }
                )
              )
            }}>اسلایدر تصاویر</Button>

          <Button
            disabled={disabled.includes('gallery')}
            type="dashed"
            block
            onClick={() => {
              dispatch(
                actions.addSection(
                  {
                    id: generate({ charset: '0123456789abcdef', length: 8 }),
                    type: SectionName.gallery,
                    list: [],
                  }
                )
              )
            }}>گالری تصویر</Button>

          <Button
            disabled={disabled.includes('pair-gallery')}
            type="dashed"
            block
            onClick={() => {
              dispatch(
                actions.addSection(
                  {
                    id: generate({ charset: '0123456789abcdef', length: 8 }),
                    type: SectionName.pairGallery,
                    list: [],
                  }
                )
              )
            }}>تصاویر دودویی</Button>

          <Button
            disabled={disabled.includes('avatar-card')}
            type="dashed"
            block
            onClick={() => {
              dispatch(
                actions.addSection(
                  {
                    id: generate({ charset: '0123456789abcdef', length: 8 }),
                    type: SectionName.avatarCard,
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

interface Props {
  disabled: string[]
}

function mapStateToProps(reducer: any): Props {
  const state: State = reducer;
  return {
    disabled: state.disableSection
  }
}

export default connect(mapStateToProps)(Append)
