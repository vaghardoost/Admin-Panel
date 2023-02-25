import { RefObject, createRef } from "react"
import { connect } from "react-redux";
import { Button, ButtonGroup, Input, Panel } from "rsuite";
import { Code, Note } from "../../../../../../model/note";
import { dispatch } from "../../../../../../redux";
import { actions } from "../../../../reducer";
import { State } from "../../../../reducer/state";

function EditorCode({ note: { content }, index }: Props) {
  const code: Code = {
    text: "",
    ...content![index],
    type: "code",
  }

  const length = content!.length - 1;
  const ref: RefObject<HTMLTextAreaElement> = createRef();

  return <>
    <Panel bodyFill header={<h4>کد</h4>}>
      <code className="around">
        <Input value={code.text} as='textarea' dir='ltr' rows={8} ref={ref} onKeyDown={(e) => { keyDown(e) }} onChange={(text) => change(text)} />
      </code>
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

  function change(text: string) {
    code.text = text;
    dispatch(actions.updateSection({
      index: index,
      section: code
    }))
  }

  function keyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Tab') {
      e.preventDefault();
      var start = ref.current!.selectionStart;
      var end = ref.current!.selectionEnd;

      // set textarea value to: text before caret + tab + text after caret
      ref.current!.value = ref.current!.value.substring(0, start) +
        "\t" + ref.current!.value.substring(end);

      // put caret at right position again
      ref.current!.selectionStart =
        ref.current!.selectionEnd = start + 1;
    }
  }

}

function mapStateToProps(reducer: any) {
  const state: State = reducer.addNoteReducer;
  return {
    note: state.note
  }
}

interface Props {
  note: Note
  index: number
}

export default connect(mapStateToProps)(EditorCode)
