import { connect } from "react-redux";
import { CarouselCard, SectionName, SectionType } from "../../../../model/note"
import { State } from "../../redux/state";
import { cdn } from "../../../../config";

const CarouselCardComponent = ({ content, index }: Props) => {
  return <></>
}

interface Props {
  index: number
  content: SectionType[]
  photos: string[]
  onChange?: (section: SectionType) => void
}

const mapStateToProps = (reducer: any) => {
  const { content, data }: State = reducer;
  return {
    content: content,
    photos: data.photoList
  };
}

export default connect(mapStateToProps)(CarouselCardComponent);

export const carouselCardInitState: CarouselCard = {
  type: SectionName.carouselCard,
  list: []
}

interface EditorProps {
  onChange?: (section: SectionType) => void
  photos: string[]
}

export function EditorCaption({ onChange, photos }: EditorProps) {
  return <CarouselCardComponent onChange={onChange} index={0} content={[carouselCardInitState]} photos={photos} />
}

