import { Component, CSSProperties, Fragment, ReactNode } from "react";
import { connect } from "react-redux";
import { Note,Word,Paragraph } from "../../../class/model/note";
import NoteViewer from "../../../class/viewer";

interface Props{
    note:Note
}

class ViewerComponent extends Component<Props>{

    public render(): ReactNode {
        return (
            <NoteViewer note={this.props.note} />
        )
    }

}


function mapStateToProps(reducer:any):Props {
    const state = reducer.addNoteReducer;
    return {
        note:state.note
    }
}
export default connect(mapStateToProps)(ViewerComponent)