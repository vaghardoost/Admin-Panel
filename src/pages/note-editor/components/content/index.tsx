import { Component, CSSProperties, ReactNode } from "react";
import { connect } from "react-redux";
import { Button, ButtonGroup, Panel, Stack } from "rsuite";
import { Note } from "../../../../model/note";
import { dispatch } from "../../../../redux";
import { actions } from "../../reducer";
import { State } from "../../reducer/state";

import View from "./view"
import Edit from "./edit"
import EditorAppend from "./edit/sections/editor.append";

interface Props {
    note: Note
    page: 'edit' | 'view'
    edit?: string
}

class NoteEditor extends Component<Props>{
    private style: CSSProperties = {
        borderBottom: '1px solid #30343f30',
        padding: '10px'
    };
    public render(): ReactNode {
        return (
            <Panel className="bg-light" bordered header={
                <Stack style={this.style} justifyContent="space-between">
                    {
                        (this.props.note.title === '')
                            ? <p className='fg-red'>عنوان را وارد کنید</p>
                            : <h3>{this.props.note.title}</h3>
                    }
                </Stack>
            }>
                {
                    <View />
                }
                <EditorAppend />
            </Panel>
        )
    }

}

function mapStateToProps(reducer: any): Props {
    const state: State = reducer.addNoteReducer;
    return {
        note: state.note,
        edit: state.edit,
        page: state.page
    }
}

export default connect(mapStateToProps)(NoteEditor)
