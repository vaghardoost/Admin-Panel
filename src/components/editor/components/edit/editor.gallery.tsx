import { connect } from "react-redux";
import { State } from "../../redux/state";
import { Gallery, SectionName, SectionType } from "../../../../model/note"
import { cdn } from "../../../../config";


const GalleryComponent = ({ content, index }: Props) => {
  return <></>
}

interface Props {
  content: SectionType[]
  index: number
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

export default connect(mapStateToProps)(GalleryComponent);


export const galleryInitState: Gallery = {
  type: SectionName.gallery,
  list: []
}

interface EditorProps {
  onChange?: (section: SectionType) => void
  photos: string[]
}

export function EditorGallery({ onChange, photos }: EditorProps) {
  return <GalleryComponent onChange={onChange} index={0} content={[galleryInitState]} photos={photos} />
} 
