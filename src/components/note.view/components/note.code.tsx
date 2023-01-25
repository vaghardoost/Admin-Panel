import { Input } from "rsuite"
import { Code } from "../../../model/note"

export const NoteComponentCode = ({code}:Props) => {
  return <div dir="ltr">
    <code>
      <Input style={{resize: 'none',backgroundColor:'whitesmoke'}} as='textarea' value={code.text} readOnly rows={(code.text.match(/\n/g) || '').length + 1} />
    </code>
  </div>
}

interface Props {
  code:Code
}
