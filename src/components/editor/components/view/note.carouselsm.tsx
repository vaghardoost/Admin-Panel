import { CarouselSm as CarouselModel } from "../../../../model/note"

export default ({ carouselSm }: Props) => {
  return <>
    <div style={{ overflowX: 'scroll', display: 'flex' }}>
      {
        (carouselSm.list.length > 0)
          ? carouselSm.list.map((item) => <div>
            <img
              style={{
                height: '75px',
                width: '120px',
                margin: '10px',
                borderRadius: '10px',
                objectFit: 'cover',
              }}
              src={item.photo} />
            <p style={{ textAlign: 'center' }}>{item.caption}</p>
          </div>)
          : <>لیست خالی...</>
      }
    </div>
  </>
}

interface Props {
  carouselSm: CarouselModel
}
