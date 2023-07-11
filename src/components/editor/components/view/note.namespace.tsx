import { Input } from "antd";
import { Namespace } from "../../../../model/note"

export default ({ namespace }: Props) => {
  return (
    <Input
      style={{ resize: 'none', backgroundColor: 'whitesmoke' }}
      value={`نمایش یک فضای نام با شناسه (${namespace.namespace})`}
      readOnly />
  )
}

interface Props {
  namespace: Namespace
}
