import { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { Note } from "../../../../model/note";
import { State } from "../../reducer/state";

interface Props {
    note:Note
}

class CodeViewComponent extends Component<Props>{

    public render(): ReactNode {
        return (
            <pre dir="ltr" style={{height:'250px',overflowY: 'scroll'}}>
                <code>
                    {JSON.stringify(this.props.note,null,5)}
                </code>
            </pre>
        );
    }
}

function mapStateToProps(reducer:any):Props {
    const state:State = reducer.addNoteReducer;
    return {
        note:state.note
    }
}
export default connect(mapStateToProps)(CodeViewComponent)
