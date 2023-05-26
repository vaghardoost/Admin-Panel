import { PairGallery } from "../../../../../model/note";;


export default ({ pairgallery }: Props) => {
  return <>
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-evenly'
    }}>
      {
        pairgallery.list.map((item) => (
          <div>
            <img
              style={{
                width: '220px',
                height: '125px',
                margin: '10px 0 10px 0',
                borderRadius: '10px',
                objectFit: 'cover'
              }}
              src={item.photo} />
            <p
              style={{
                width: '100%',
                textAlign: 'center'
              }}>
              {item.caption}
            </p>
          </div>
        ))
      }
    </div>
  </>
}

interface Props {
  pairgallery: PairGallery
}
