import { Input } from "antd";
import { Code } from "../../../../model/note"

export default ({ code }: Props) => {
  return <div dir="ltr">
    <code>
      <Input.TextArea style={{ resize: 'none', backgroundColor: 'whitesmoke' }} value={code.text} readOnly rows={(code.text.match(/\n/g) || '').length + 1} />
    </code>
  </div>
}

interface Props {
  code: Code
}
