import { generate } from "randomstring";
import { Caption } from "../../../model/note"
import NoteRich from "./note.rich"

export default ({ caption }:Props) => {
  return <>
    {
      caption.richtext.map((rich)=>{
        return <NoteRich key={generate()} richtext={rich}/>
      })
    }
  </>
}



interface Props {
  caption:Caption
}
