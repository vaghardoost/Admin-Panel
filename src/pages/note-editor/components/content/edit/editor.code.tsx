import { connect } from "react-redux";
import { Input, Card } from 'antd';

import { Code, Note } from "../../../../../model/note";
import { dispatch } from "../../../../../redux";
import { actions } from "../../../reducer";
import { State } from "../../../reducer/state";
import { getActions } from "./_section.actions";


const EditorCode = ({ note: { content }, index }: Props) => {
  const code: Code = {
    text: "",
    ...content![index],
    type: "code",
  }

  return <>
    <Card
      style={{ backgroundColor: 'whitesmoke' }}
      extra={getActions(index, content!.length - 1)}
      title="کد">
      <code className="">
        <Input.TextArea
          value={code.text}
          dir='ltr'
          rows={8}
          onKeyDown={(e) => { keyDown(e) }}
          onChange={(text) => change(text.target.value)} />
      </code>
    </Card>
  </>

  function change(text: string) {
    code.text = text;
    dispatch(actions.updateSection({
      index: index,
      section: code
    }))
  }

  function keyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    // if (e.key === 'Tab') {
    //   e.preventDefault();
    //   var start = ref.current!.input!.selectionStart;
    //   var end = ref.current!.input!.selectionEnd;

    //   // set textarea value to: text before caret + tab + text after caret
    //   ref.current!.input!.value = ref.current!.input!.value.substring(0, start!) +
    //     "\t" + ref.current!.input!.value.substring(end!);

    //   // put caret at right position again
    //   ref.current!.input!.selectionStart =
    //     ref.current!.input!.selectionEnd = start! + 1;
    // }
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
