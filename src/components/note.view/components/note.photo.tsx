import { generate } from "randomstring"
import { Photo } from "../../../model/note"
import NoteRich from "./note.rich"

export const NoteComponentPhoto = ({photo}:Props) => {
    return <>
      <div className="card">
        <img className="card-img" src={photo.url}/>
        {
          (photo.richtext.length > 0)
          ?
            <div style={{padding:'10px'}}>
            {
              photo.richtext.map(rich=>
                <NoteRich key={generate()} richtext={rich}/>
              )
            }
            </div>
          :
            <></>
        }
      </div>
    </>
}

interface Props {
  photo: Photo
}
