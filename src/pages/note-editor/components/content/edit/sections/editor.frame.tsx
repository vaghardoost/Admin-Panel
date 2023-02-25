import { connect } from "react-redux"
import { Button, ButtonGroup, Panel } from "rsuite";
import { Frame, Note, RichText } from "../../../../../../model/note"
import { State } from "../../../../reducer/state";
import RichtextEditor from "../../../../../../components/richtext.editor"
import { dispatch } from "../../../../../../redux";
import { actions } from "../../../../reducer";

function EditorFrame({ index, note: { content } }: Props) {

  const frame: Frame = {
    richtext: [],
    ...content![index],
    type: 'frame'
  }
  const length = content!.length - 1;
  return <>
    <Panel bodyFill header={<h4>کادر</h4>}>
      <RichtextEditor onChange={(richtext) => onChange(richtext)} richtext={frame.richtext} />
      <div className="around">
        <ButtonGroup justified>
          {(index !== 0) ? <Button onClick={() => move('up')}>انتقال به بالا</Button> : <></>}
          {(index !== length) ? <Button onClick={() => move('down')}>انتقال به پایین</Button> : <></>}
          <Button onClick={() => dispatch(actions.resetQuick())}>بستن</Button>
          <Button onClick={() => remove()}>حذف</Button>
        </ButtonGroup>
      </div>
    </Panel>
  </>

  function move(dest: 'up' | 'down') {
    dispatch(actions.moveSection({ dest: dest, index: index }));
  }

  function remove() {
    dispatch(actions.removeSection({ index: index }));
  }

  function onChange(richtext: RichText[]) {
    frame.richtext = richtext;
    dispatch(actions.updateSection({ index: index, section: frame }))
  }
}

const mapStateToProps = (reducer: any) => {
  const { note }: State = reducer.addNoteReducer;
  return {
    note: note
  };
}

export default connect(mapStateToProps)(EditorFrame);

interface Props {
  index: number
  note: Note
}
