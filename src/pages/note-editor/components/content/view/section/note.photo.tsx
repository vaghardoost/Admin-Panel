import { generate } from "randomstring"
import { Photo } from "../../../../../../model/note"

import NoteRich from "./note.rich"

export default ({ photo }: Props) => {
  return <>
    <div style={{ maxWidth: '70%', marginLeft: 'auto', marginRight: 'auto' }}>
      <img style={{ width: '100%' }} src={photo.url} />
      {
        (photo.richtext.length > 0)
          ?
          <div style={{ padding: '10px' }}>
            {
              photo.richtext.map(rich =>
                <NoteRich key={generate()} richtext={rich} />
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
