import { Note, Photo, Caption, Frame, Title, Code, SectionType } from "../../model/note"
import { NoteComponentCode } from "./components/note.code";
import { NoteComponentFrame } from "./components/note.frame";
import { NoteComponentPhoto } from "./components/note.photo";
import { NoteComponentTitle } from "./components/note.title";
import NoteCaptionView from "./components/note.caption";
import { generate } from "randomstring";

export function NoteComponent({ note, itemClick, quickIndex }: Props) {

  function get(section: SectionType) {
    const { type } = section;
    const key: React.Key = generate({ length: 8 });
    switch (type) {
      case "caption":
        return <NoteCaptionView key={key} caption={section as Caption} />
      case "photo":
        return <NoteComponentPhoto key={key} photo={section as Photo} />
      case "frame":
        return <NoteComponentFrame key={key} frame={section as Frame} />
      case "title":
        return <NoteComponentTitle key={key} title={section as Title} />
      case "code":
        return <NoteComponentCode key={key} code={section as Code} />
      default:
        return <h3 key={key} className='fg-red'>نوع ناشناخته داده</h3>
    }

  }

  return <>
    {
      note.content!.map((section, index) =>
        <div
          style={(quickIndex === index) ? { backgroundColor: "whitesmoke",border:'rgba(128, 128, 128, 0.2) solid 1px' } : {}}
          onClick={() => (itemClick) ? itemClick(section, index) : undefined}
          className="section-container">
          {get(section)}
        </div>
      )
    }
    <style>{`
    .section-container {
      border-radius: 5px;
      padding:5px;
    }
    .section-container:hover {
      background-color: whitesmoke;
      cursor: pointer;
    }
  `}</style>
  </>
}
interface Props {
  note: Note
  quickIndex?: number
  itemClick?: (section: SectionType, index: number) => void
}