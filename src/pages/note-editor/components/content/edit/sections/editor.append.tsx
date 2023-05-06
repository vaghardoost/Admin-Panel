import { connect } from "react-redux"

import { Button, ButtonGroup, Panel, Stack } from "rsuite";
import { dispatch } from "../../../../../../redux";
import { actions } from "../../../../reducer";
import { generate } from 'randomstring'


function EditorAppend() {
  return <>
    <Panel bordered>
      <h4 style={{ width: '100%', textAlign: 'center' }}>افزودن قسمت</h4>
      <Stack justifyContent="center">
        <ButtonGroup>
          <Button onClick={() => {
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

          <Button onClick={() => {
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

          <Button onClick={() => {
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

          <Button onClick={() => {
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

          <Button onClick={() => {
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
        </ButtonGroup>
      </Stack>
    </Panel>
  </>
}

export default connect()(EditorAppend)
