import { generate } from "randomstring"
import { Frame } from "../../../../../../model/note"

import NoteRich from "./note.rich"

export default ({ frame }: Props) => {
  return <>
    <div className="card around">
      {
        frame.richtext.map((rich) => {
          return <NoteRich key={generate()} richtext={rich} />
        })
      }
    </div>
  </>
}


interface Props {
  frame: Frame
}
