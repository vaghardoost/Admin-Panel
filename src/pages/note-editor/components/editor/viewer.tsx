import { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { Note } from "../../../../model/note";
import { NoteComponent } from "../../../../components/note.view";
interface Props{
    note:Note
}

class ViewerComponent extends Component<Props>{

    public render(): ReactNode {
        return (
            <>
                <NoteComponent note={this.props.note}/>
            </>
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