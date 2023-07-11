import NoteRich from "./note.rich"
import { Frame } from "../../../../model/note"

export default ({ frame }: Props) => {
  return <>
    <div className="card around">
      {
        (frame.content.length === 0)
          ? <p style={{ opacity: '0.3' }}>پاراگراف خالی</p>
          : frame.content.map((rich) => <NoteRich richtext={rich} />)
      }
    </div>
  </>
}


interface Props {
  frame: Frame
}
