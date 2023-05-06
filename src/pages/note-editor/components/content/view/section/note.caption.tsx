import { Caption } from "../../../../../../model/note";
import NoteRich from "./note.rich"

export default ({ caption }: Props) => {
  return <>{
    (caption.richtext.length === 0)
      ? <p style={{ opacity: '0.3' }}>پاراگراف خالی</p>
      : caption.richtext.map((rich) => <NoteRich richtext={rich} />)
  }</>
}

interface Props {
  caption: Caption
}
