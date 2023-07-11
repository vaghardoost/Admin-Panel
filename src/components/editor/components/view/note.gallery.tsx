import { Image } from "antd"
import { Gallery } from "../../../../model/note"


export default ({ gallery }: Props) => {
  return <>
    <div style={{
      width: '130px',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-evenly',
      backgroundColor: 'lightgray',
      borderRadius: '10px',
    }}>
      {
        gallery.list.map((item, index) => (
          (index < 4)
            ?
            <div>
              <Image
                style={{
                  width: '50px',
                  height: '50px',
                  margin: '5px',
                  borderRadius: '10px',
                  objectFit: 'cover'
                }}
                src={item.photo} />
            </div>
            :
            <></>
        ))
      }
    </div>
  </>
}

interface Props {
  gallery: Gallery
}
