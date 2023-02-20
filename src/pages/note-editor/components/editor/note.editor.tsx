import { Component, CSSProperties, ReactNode } from "react";
import { connect } from "react-redux";
import { Button, ButtonGroup, Panel, Stack } from "rsuite";
import { Note } from "../../../../model/note";
import { dispatch } from "../../../../redux";
import { actions } from "../../reducer";
import { State } from "../../reducer/state";
import Editor from "./pages/note.edit";
import NoteView from "./pages/note.view";

interface Props {
    note: Note
    page: 'edit' | 'code' | 'view'
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
                    <h3>{this.props.note.title}</h3>
                    <ButtonGroup>
                        <Button onClick={() => dispatch(actions.changePage('edit'))} appearance={(this.props.page === 'edit') ? 'primary' : 'default'} size="sm">ویرایشگر</Button>
                        <Button onClick={() => dispatch(actions.changePage('view'))} appearance={(this.props.page === 'view') ? 'primary' : 'default'} size="sm">پیش نمایش</Button>
                        <Button onClick={() => dispatch(actions.changePage('code'))} appearance={(this.props.page === 'code') ? 'primary' : 'default'} size="sm">نمای کد</Button>
                    </ButtonGroup>
                </Stack>
            }>
                {
                    (this.props.page === 'edit')
                        ?
                        <Editor />
                        :
                        (this.props.page === 'view')
                            ? <NoteView />
                            : <> Code View </>
                }
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
