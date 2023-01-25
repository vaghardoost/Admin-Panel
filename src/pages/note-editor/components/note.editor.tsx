import { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { Button, ButtonGroup, Input, Panel, Stack, TagInput } from "rsuite";
import { Note } from "../../../model/note";
import { dispatch } from "../../../redux";
import { actions } from "../reducer";
import { addNote, update } from "../reducer/actions";
import { State } from "../reducer/state";
import Editor from "./editor";
import NoteView from "./note.view";

interface Props {
    note: Note
    page: 'edit'|'code'|'view'
    edit?: string
}

class NoteEditor extends Component<Props>{

    public render(): ReactNode {
        return (
            <Panel className="bg-light" bordered header={
                <Stack justifyContent="space-between">
                    <ButtonGroup>
                        <Button onClick={()=>dispatch(actions.changePage('edit'))} appearance={(this.props.page === 'edit') ? 'primary':'default'} size="sm">ویرایشگر</Button>
                        <Button onClick={()=>dispatch(actions.changePage('view'))} appearance={(this.props.page === 'view') ? 'primary':'default'} size="sm">پیش نمایش</Button>
                        <Button onClick={()=>dispatch(actions.changePage('code'))} appearance={(this.props.page === 'code') ? 'primary':'default'} size="sm">نمای کد</Button>
                    </ButtonGroup>

                    <ButtonGroup>
                        <Button size="sm" onClick={()=>dispatch(actions.modalSave(true))} appearance="default">ذخیره پیش نویس</Button>
                        <Button size="sm" onClick={()=>dispatch(actions.modalLoad(true))} appearance="default">بارگذاری پیش نویس</Button>
                        {
                            (this.props.edit)
                                ? <Button size="sm" onClick={()=>dispatch(update(this.props.note))}>ذخیره تغییرات</Button>
                                : <Button size="sm" onClick={()=>dispatch(addNote(this.props.note))}>انتشار نوشته</Button>
                        }
                    </ButtonGroup>
                </Stack>
            }>
                {
                    (this.props.page === 'edit')
                        ? 
                            <div>
                                <Input value={this.props.note.title} onChange={(text)=>dispatch(actions.changeTitle(text))} style={{marginBottom:'20px'}} placeholder="عنوان نوشته"/>
                                <Editor/>
                                <TagInput data={[]} value={this.props.note.tag} onChange={(text: string[]) => dispatch(actions.setTag((text === null) ? [] : text))} placeholder="کلمات کلیدی" style={{ marginTop: '20px' }} block trigger={"Enter"} />
                            </div>
                        :
                        (this.props.page === 'view')
                            ? <NoteView/>
                            : <>Code View</>
                }
            </Panel>
        )
    }

}

function mapStateToProps(reducer:any):Props {
    const state:State = reducer.addNoteReducer;
    return {
        note: state.note,
        edit: state.edit,
        page: state.page
    }
}

export default connect(mapStateToProps)(NoteEditor)
