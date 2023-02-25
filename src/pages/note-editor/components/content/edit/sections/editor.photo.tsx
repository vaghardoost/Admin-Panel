import { generate } from "randomstring"
import { connect } from "react-redux"
import { Avatar, Button, ButtonGroup, Panel, Stack } from "rsuite"
import RichTextView from "../../../../../../components/richtext.editor"

import { cdn } from "../../../../../../config"
import File from "../../../../../../model/file"
import { Note, Photo, RichText } from "../../../../../../model/note"
import { dispatch } from "../../../../../../redux"
import { actions } from "../../../../reducer"
import { State } from "../../../../reducer/state"

function EditorPhoto({ index, list, note: { content } }: Props) {

  const photo: Photo = {
    richtext: [],
    url: '',
    ...content![index],
    type: 'photo'
  }

  const length = content!.length - 1;

  return <>
    <Panel bodyFill header={<h4>تصویر</h4>}>
      <div className="around editor">
        <div className='around'>
          {
            list.map((file) => {
              return <Avatar key={generate()} onClick={() => { selectPhoto(file.id) }} size="sm" circle src={cdn + "/photo/demo/" + file.id} />
            })
          }
        </div>

        <div className='around'>
          <Stack justifyContent="center">
            <img className='img' src={photo.url} />
          </Stack>
        </div>

        <div className='around'>
          <RichTextView onChange={(richtext) => onChange(richtext)} richtext={photo.richtext} />
        </div>
        <div className="around">
          <ButtonGroup justified>
            {(index !== 0) ? <Button onClick={() => move('up')}>انتقال به بالا</Button> : <></>}
            {(index !== length) ? <Button onClick={() => move('down')}>انتقال به پایین</Button> : <></>}
            <Button onClick={() => dispatch(actions.resetQuick())}>بستن</Button>
            <Button onClick={() => remove()}>حذف</Button>
          </ButtonGroup>
        </div>
      </div>
    </Panel>
  </>

  function onChange(richtext: RichText[]) {
    photo.richtext = richtext;
    dispatch(actions.updateSection({ index: index, section: photo }));
  }

  function move(dest: 'up' | 'down') {
    dispatch(actions.moveSection({ dest: dest, index: index }));
  }

  function remove() {
    dispatch(actions.removeSection({ index: index }));
  }

  function selectPhoto(id: string) {
    photo.url = cdn + "/photo/" + id;
    dispatch(actions.updateSection({ index: index, section: photo }));
  }
}

interface Props {
  note: Note
  index: number
  list: File[]
}

function mapStateToProps(reducer: any) {
  const state: State = reducer.addNoteReducer
  return {
    note: state.note,
    list: state.photoList
  }
}

export default connect(mapStateToProps)(EditorPhoto);