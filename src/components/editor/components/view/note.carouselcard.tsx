import { Card } from "antd"
import { CarouselCard as CarouselModel } from "../../../../model/note"
const { Meta } = Card;

export default ({ carouselCard }: Props) => {
  return <>
    <div style={{ overflowX: 'scroll', display: 'flex' }}>
      {
        (carouselCard.list.length > 0)
          ?
          carouselCard.list.map((item) => (
            <Card
              hoverable
              bordered
              style={{ width: 240, minWidth: 240, margin: '5px 10px' }}
              cover={<img
                style={{
                  maxHeight: '200px',
                  objectFit: 'contain',
                }}
                src={item.photo} />}>
              <Meta title={item.title} description={item.subtitle} />
            </Card>
          ))
          : <>لیست خالی...</>
      }
    </div>
  </>
}

interface Props {
  carouselCard: CarouselModel
}
