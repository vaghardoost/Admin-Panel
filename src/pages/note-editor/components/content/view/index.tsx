import { generate } from "randomstring";
import { Caption, Code, Frame, Note, Photo, SectionType, Title } from "../../../../../model/note";
import NoteViewCaption from "./section/note.caption"
import NoteViewPhoto from "./section/note.photo"
import NoteViewFrame from "./section/note.frame"
import NoteViewTitle from "./section/note.title"
import NoteViewCode from "./section/note.code"

import NoteEditCaption from "../edit/sections/editor.caption";
import NoteEditPhoto from "../edit/sections/editor.photo";
import NoteEditFrame from "../edit/sections/editor.frame";
import NoteEditTitle from "../edit/sections/editor.title";
import NoteEditCode from "../edit/sections/editor.code";

import { connect } from "react-redux";
import { Component, ReactNode } from "react";
import { State } from "../../../reducer/state";
import { dispatch } from "../../../../../redux";
import { actions } from "../../../reducer";

class View extends Component<Props> {
    render(): ReactNode {
        const { note, quickIndex } = this.props;
        return <>
            {
                note.content!.map((section, index) =>
                    <div
                        onClick={() => {
                            if (quickIndex !== index)
                                dispatch(actions.quick({ index: index, section: section }))
                        }}
                        className="section-container">
                        {
                            (quickIndex === index)
                                ? this.getEdit(section, index)
                                : this.get(section)
                        }
                    </div>
                )
            }
        </>
    }

    private get(section: SectionType) {
        const { type } = section;
        const key: React.Key = generate({ length: 8 });
        switch (type) {
            case "caption":
                return <NoteViewCaption key={key} caption={section as Caption} />
            case "photo":
                return <NoteViewPhoto key={key} photo={section as Photo} />
            case "frame":
                return <NoteViewFrame key={key} frame={section as Frame} />
            case "title":
                return <NoteViewTitle key={key} title={section as Title} />
            case "code":
                return <NoteViewCode key={key} code={section as Code} />
            default:
                return <h3 key={key} className='fg-red'>نوع ناشناخته داده</h3>
        }
    }

    private getEdit(section: SectionType, index: number) {
        switch (section.type) {
            case "caption": return <NoteEditCaption index={index} />
            case "photo": return <NoteEditPhoto index={index} />
            case "frame": return <NoteEditFrame index={index} />
            case "title": return <NoteEditTitle index={index} />
            case "code": return <NoteEditCode index={index} />
            default: return <h3 className='fg-red'>نوع ناشناخته داده</h3>
        }
    }
}


interface Props {
    note: Note
    quickIndex?: number
}

function mapStateToProps(reducer: any): Props {
    const state: State = reducer.addNoteReducer;
    return {
        note: state.note,
        quickIndex: state.quick.index
    }
}

export default connect(mapStateToProps)(View)
