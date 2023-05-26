import { Carousel, Image } from "antd"
import { Carousel as CarouselModel } from "../../../../../model/note"

export default ({ carousel }: Props) => {
  return <>
    <Carousel autoplay style={{ backgroundColor: 'whitesmoke' }}>
      {
        carousel.list.map((item) => (
          <Image key={item.id} src={item.photo} />
        ))
      }
    </Carousel>
  </>
}

interface Props {
  carousel: CarouselModel
}
